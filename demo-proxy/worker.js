// Cloudflare Worker: transparent reverse proxy for the Funsoft/Webswing live demo.
//
// Why this exists: funsoft.systempartners.biz sends `X-Frame-Options: SAMEORIGIN`,
// which blocks it from being embedded in an <iframe> on any other origin. Browsers
// enforce that header regardless of CORS, so it can't be worked around client-side.
//
// This Worker sits between the browser and funsoft.systempartners.biz. The browser
// only ever talks to *this* Worker's origin (so X-Frame-Options never applies), and
// the Worker fetches from funsoft server-side and relays the response back with the
// framing-blocking headers stripped.
//
// The demo app itself is Webswing (streams a Java desktop app over a WebSocket), and
// its bootstrap JS derives all asset/API/socket URLs from `document.location` at
// runtime rather than hardcoding the funsoft origin — so as long as everything
// (HTML, JS, CSS, REST calls, and the WebSocket) loads under this Worker's origin at
// the same path structure, no HTML/URL rewriting is needed. This proxy is a straight
// passthrough, including a WebSocket relay.

const UPSTREAM_ORIGIN = "https://funsoft.systempartners.biz";

// Response headers that block framing or otherwise don't make sense to forward as-is.
const STRIP_RESPONSE_HEADERS = [
  "x-frame-options",
  "content-security-policy",
  "content-security-policy-report-only",
];

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const upstreamUrl = new URL(url.pathname + url.search, UPSTREAM_ORIGIN);

    const upgradeHeader = request.headers.get("Upgrade");
    if (upgradeHeader && upgradeHeader.toLowerCase() === "websocket") {
      return proxyWebSocket(request, upstreamUrl);
    }

    return proxyHttp(request, upstreamUrl);
  },
};

async function proxyHttp(request, upstreamUrl) {
  const forwardHeaders = new Headers(request.headers);
  forwardHeaders.set("Host", upstreamUrl.host);
  forwardHeaders.set("Origin", "https://funsoft.systempartners.biz");
  forwardHeaders.set("Referer", "https://funsoft.systempartners.biz/funsofthmis/");
  const inboundCookie = request.headers.get("Cookie");
  if (inboundCookie) {
    forwardHeaders.set("Cookie", inboundCookie);
  }

  const upstreamResponse = await fetch(upstreamUrl.toString(), {
    method: request.method,
    headers: forwardHeaders,
    body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
    redirect: "manual",
  });

  const responseHeaders = new Headers(upstreamResponse.headers);
  for (const header of STRIP_RESPONSE_HEADERS) {
    responseHeaders.delete(header);
  }

  // Headers.get("set-cookie") only returns the first Set-Cookie header when the
  // upstream sends several (e.g. JSESSIONID + webswingID) — getSetCookie() is the
  // Workers/Fetch API that surfaces all of them. Re-scope each to this proxy's own
  // origin instead of funsoft's so the browser will actually store and resend them.
  //
  // This page is embedded in an <iframe> on a different top-level origin, so from
  // Chrome's perspective the proxy is a third-party context (confirmed by
  // `Sec-Fetch-Storage-Access: active` on the browser's requests, and no Cookie
  // header ever reaching this Worker despite the cookie being visibly stored).
  // SameSite=None;Secure is required for a cookie to be sent in a cross-site iframe
  // at all, and Partitioned (CHIPS) is Chrome's supported opt-in for exactly this
  // "iframe wants its own cookie jar keyed to the embedding page" scenario.
  responseHeaders.delete("set-cookie");
  for (const cookie of upstreamResponse.headers.getSetCookie()) {
    let rewritten = cookie.replace(/domain=[^;]+;?\s*/i, "");
    rewritten = rewritten.replace(/;\s*samesite=[^;]+/i, "");
    if (!/;\s*secure/i.test(rewritten)) rewritten += "; Secure";
    rewritten += "; SameSite=None; Partitioned";
    responseHeaders.append("set-cookie", rewritten);
  }

  // Follow redirects manually so they stay pointed at the proxy, not the upstream host.
  if ([301, 302, 303, 307, 308].includes(upstreamResponse.status)) {
    const location = upstreamResponse.headers.get("location");
    if (location) {
      const rewritten = new URL(location, upstreamUrl);
      rewritten.protocol = new URL(request.url).protocol;
      rewritten.host = new URL(request.url).host;
      responseHeaders.set("location", rewritten.toString());
    }
  }

  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    statusText: upstreamResponse.statusText,
    headers: responseHeaders,
  });
}

async function proxyWebSocket(request, upstreamUrl) {
  // Workers' fetch() throws "Fetch API cannot load: wss://…" if given a ws(s): URL —
  // the upgrade-via-fetch trick requires the request to stay http(s): and rely on the
  // Upgrade header instead, with Workers handling the protocol switch internally.
  const forwardHeaders = new Headers(request.headers);
  forwardHeaders.set("Host", upstreamUrl.host);
  forwardHeaders.set("Origin", "https://funsoft.systempartners.biz");
  forwardHeaders.set("Upgrade", "websocket");
  forwardHeaders.set("Connection", "Upgrade");
  // Same as the HTTP path: explicitly re-set Cookie, since Workers' fetch() does not
  // reliably carry it through to a subrequest on its own. The WS upgrade needs the
  // WebswingSessionId cookie funsoft issued during the CSRFToken handshake, or the
  // upgrade is silently rejected (socket closes abnormally, no close frame).
  const inboundCookie = request.headers.get("Cookie");
  if (inboundCookie) {
    forwardHeaders.set("Cookie", inboundCookie);
  }

  // Cloudflare Workers can dial an upstream WebSocket via fetch() with Upgrade header.
  const upstreamResponse = await fetch(upstreamUrl.toString(), {
    headers: forwardHeaders,
  });

  const upstreamWs = upstreamResponse.webSocket;
  if (!upstreamWs) {
    return new Response("Upstream did not upgrade to WebSocket", { status: 502 });
  }
  upstreamWs.accept();

  const [client, server] = Object.values(new WebSocketPair());
  server.accept();

  server.addEventListener("message", (event) => {
    try {
      upstreamWs.send(event.data);
    } catch (err) {
      server.close(1011, "Upstream send failed");
    }
  });
  upstreamWs.addEventListener("message", (event) => {
    try {
      server.send(event.data);
    } catch (err) {
      upstreamWs.close(1011, "Client send failed");
    }
  });

  server.addEventListener("close", (event) => {
    try {
      upstreamWs.close(event.code, event.reason);
    } catch (err) {}
  });
  upstreamWs.addEventListener("close", (event) => {
    try {
      server.close(event.code, event.reason);
    } catch (err) {}
  });

  server.addEventListener("error", () => {
    try {
      upstreamWs.close(1011, "Client error");
    } catch (err) {}
  });
  upstreamWs.addEventListener("error", () => {
    try {
      server.close(1011, "Upstream error");
    } catch (err) {}
  });

  return new Response(null, { status: 101, webSocket: client });
}
