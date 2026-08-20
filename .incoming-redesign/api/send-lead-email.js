import { sendSmtpMail } from "./_smtp.js";

const LABELS = {
  demo_request: "Product demo request",
  contact_message: "Contact form message",
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { kind, payload } = req.body || {};
  if (!payload || typeof payload !== "object") {
    res.status(400).json({ error: "payload is required" });
    return;
  }

  const label = LABELS[kind] || "Website lead";
  const fields = Object.entries(payload)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
  const replyTo = typeof payload.email === "string" ? payload.email : undefined;

  try {
    await sendSmtpMail({
      subject: `[Funsoft Website] ${label}`,
      text: `${label}\n\n${fields}`,
      replyTo,
    });
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Lead email failed:", err.message);
    res.status(500).json({ error: "Failed to send email notification" });
  }
}
