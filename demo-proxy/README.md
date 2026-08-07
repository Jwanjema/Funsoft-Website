# Funsoft demo proxy

Works around `funsoft.systempartners.biz` sending `X-Frame-Options: SAMEORIGIN`,
which blocks it from being embedded in an iframe on any other origin. This is a
Cloudflare Worker that fetches the site server-side (HTTP + WebSocket) and relays
it back with the blocking header stripped, so the browser only ever talks to the
Worker's own origin.

The demo app is Webswing (streams a Java desktop app over a WebSocket). Its
bootstrap script derives all asset/API/socket URLs from `document.location` at
runtime, so as long as everything loads under the proxy's origin at the same
path structure, no HTML rewriting is needed — this is a transparent passthrough.

## Deploy

Requires a free Cloudflare account (no billing needed for this traffic level).

```
cd demo-proxy
npx wrangler login       # one-time, opens a browser to authorize
npx wrangler deploy
```

This prints a URL like `https://funsoft-demo-proxy.<your-subdomain>.workers.dev`.

Then in [pages.tsx](../.incoming-redesign/src/app/pages.tsx), set:

```js
const PROXY_DEMO_URL = "https://funsoft-demo-proxy.<your-subdomain>.workers.dev/funsofthmis/";
```

## Known limitations

- **Fragility**: Webswing was not designed to be run behind a cross-origin proxy.
  If a future funsoft/Webswing update hardcodes an absolute URL anywhere (instead
  of deriving it from `document.location`), the proxy will need matching updates.
- **Latency**: adds one extra network hop (browser → Worker → funsoft) to every
  request and to the WebSocket's round trip, which may be noticeable for a
  screen-streaming app.
- **Cookies/session**: Set-Cookie domain scoping is stripped so cookies attach to
  the proxy's origin; this hasn't been tested against funsoft's login flow.
- **Not a substitute for the real fix**: the robust fix is still for
  System Partners to change the response header on funsoft.systempartners.biz
  itself (remove `X-Frame-Options`, or replace with
  `Content-Security-Policy: frame-ancestors 'self' https://yourdomain.com;`).
  This proxy is a workaround for as long as that isn't done.

## Test before relying on it

Open the deployed Worker URL directly in a browser tab first (not yet embedded)
and confirm the Webswing app actually boots and is interactive before wiring it
into the iframe — this is the step most likely to reveal a WebSocket relay issue.
