import net from "net";
import tls from "tls";

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not configured`);
  return value;
}

function cleanHeader(value) {
  return String(value || "").replace(/[\r\n]+/g, " ").trim();
}

function dotStuff(value) {
  return String(value || "").replace(/\r?\n/g, "\r\n").replace(/^\./gm, "..");
}

function createLineReader(socket) {
  let buffer = "";
  const waiters = [];

  socket.on("data", (chunk) => {
    buffer += chunk.toString("utf8");
    flush();
  });
  socket.on("error", (err) => {
    while (waiters.length) waiters.shift().reject(err);
  });
  socket.on("close", () => {
    while (waiters.length) waiters.shift().reject(new Error("SMTP connection closed"));
  });

  function flush() {
    const complete = buffer.match(/(?:^|\r?\n)(\d{3}) [^\r\n]*(?:\r?\n|$)/);
    if (!complete || waiters.length === 0) return;
    const end = complete.index + complete[0].length;
    const response = buffer.slice(0, end).trimEnd();
    buffer = buffer.slice(end);
    waiters.shift().resolve(response);
  }

  return function read() {
    return new Promise((resolve, reject) => {
      waiters.push({ resolve, reject });
      flush();
    });
  };
}

async function expect(socket, read, codes) {
  const response = await read();
  const code = Number(response.slice(0, 3));
  if (!codes.includes(code)) {
    socket.destroy();
    throw new Error(`SMTP rejected command with ${code}`);
  }
  return response;
}

async function send(socket, read, command, codes) {
  socket.write(`${command}\r\n`);
  return expect(socket, read, codes);
}

function connect({ host, port }) {
  return new Promise((resolve, reject) => {
    const socket = net.connect({ host, port });
    socket.setTimeout(15000);
    socket.once("connect", () => resolve(socket));
    socket.once("timeout", () => {
      socket.destroy();
      reject(new Error("SMTP connection timed out"));
    });
    socket.once("error", reject);
  });
}

function startTls(socket, host) {
  return new Promise((resolve, reject) => {
    const secure = tls.connect({ socket, servername: host });
    secure.once("secureConnect", () => resolve(secure));
    secure.once("error", reject);
  });
}

export async function sendSmtpMail({ to, replyTo, subject, text }) {
  const host = requireEnv("SMTP_HOST");
  const port = Number(process.env.SMTP_PORT || 587);
  const user = requireEnv("SMTP_USER");
  const pass = requireEnv("SMTP_PASS");
  const from = process.env.SMTP_FROM || user;
  const recipient = to || process.env.CONTACT_TO_EMAIL || from;

  let socket = await connect({ host, port });
  let read = createLineReader(socket);

  await expect(socket, read, [220]);
  await send(socket, read, `EHLO ${host}`, [250]);
  await send(socket, read, "STARTTLS", [220]);

  socket = await startTls(socket, host);
  read = createLineReader(socket);

  await send(socket, read, `EHLO ${host}`, [250]);
  await send(socket, read, "AUTH LOGIN", [334]);
  await send(socket, read, Buffer.from(user).toString("base64"), [334]);
  await send(socket, read, Buffer.from(pass).toString("base64"), [235]);
  await send(socket, read, `MAIL FROM:<${from}>`, [250]);
  await send(socket, read, `RCPT TO:<${recipient}>`, [250, 251]);
  await send(socket, read, "DATA", [354]);

  const message = [
    `From: ${cleanHeader(process.env.SMTP_FROM_NAME || "Funsoft I-HMIS Website")} <${from}>`,
    `To: ${recipient}`,
    replyTo ? `Reply-To: ${cleanHeader(replyTo)}` : null,
    `Subject: ${cleanHeader(subject)}`,
    `Date: ${new Date().toUTCString()}`,
    "MIME-Version: 1.0",
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    dotStuff(text),
  ].filter(Boolean).join("\r\n");

  socket.write(`${message}\r\n.\r\n`);
  await expect(socket, read, [250]);
  socket.write("QUIT\r\n");
  socket.end();
}
