// Vercel serverless function (Node.js runtime) -- BCGK Communities contact
// form -> Postmark. Lives at api/contact.js at the deploy root; Vercel's
// zero-config "Other" framework preset automatically turns any file under
// an `api/` folder into a serverless function at the matching /api/... path
// -- no vercel.json, no framework, no build step required for this to work.
//
// The static site's contact form (dist/js/site.js, forms marked
// [data-contact-form]) already POSTs JSON here with this shape:
//   { firstName, lastName, email, phone, propertyName, propertyAddress, message }
// propertyName/propertyAddress are optional ("For Owners:" fields); every
// other field is required (also enforced client-side via `required`).
//
// Required environment variable (Vercel Project -> Settings -> Environment
// Variables -- never commit this):
//   POSTMARK_SERVER_TOKEN   Postmark Server API Token (Servers -> your
//                           server -> API Tokens -> Server API Token)
// Optional:
//   CONTACT_FROM_EMAIL      Defaults to CustomerService@bcgkcommunities.com
//                           below. Must be a verified Sender Signature or
//                           Domain in this Postmark server.
//
// Recipients are intentionally hardcoded, not env-configurable: who
// receives contact-form leads is a business decision that should go
// through code review like any other change, not a deploy-time setting.

const POSTMARK_API_URL = "https://api.postmarkapp.com/email";

const TO_RECIPIENTS = [
  "chuck@bcgk.com",
  "alex@bcgk.com",
  "customerservice@bcgkcommunities.com",
].join(",");

const FROM_ADDRESS = process.env.CONTACT_FROM_EMAIL || "CustomerService@bcgkcommunities.com";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  const token = process.env.POSTMARK_SERVER_TOKEN;
  if (!token) {
    console.error("[contact] POSTMARK_SERVER_TOKEN is not set");
    res.status(500).json({ ok: false, error: "Email service is not configured." });
    return;
  }

  // Vercel's Node.js runtime auto-parses a JSON request body into req.body.
  const body = req.body || {};
  const firstName = String(body.firstName || "").trim();
  const lastName = String(body.lastName || "").trim();
  const email = String(body.email || "").trim();
  const phone = String(body.phone || "").trim();
  const propertyName = String(body.propertyName || "").trim();
  const propertyAddress = String(body.propertyAddress || "").trim();
  const message = String(body.message || "").trim();

  if (!firstName || !lastName || !email || !phone || !message) {
    res.status(400).json({ ok: false, error: "Please fill in all required fields." });
    return;
  }
  if (!EMAIL_RE.test(email)) {
    res.status(400).json({ ok: false, error: "Please enter a valid email address." });
    return;
  }

  const fields = [
    ["First Name", firstName],
    ["Last Name", lastName],
    ["Email", email],
    ["Phone", phone],
    ["Property Name", propertyName || "(not provided)"],
    ["Property Address", propertyAddress || "(not provided)"],
  ];

  const textBody =
    fields.map(([label, value]) => `${label}: ${value}`).join("\n") +
    `\n\nMessage:\n${message}`;

  const htmlBody = `
    <table style="font-family: sans-serif; font-size: 14px; color: #001E2B; border-collapse: collapse;">
      ${fields
        .map(
          ([label, value]) =>
            `<tr><td style="padding:4px 12px 4px 0; font-weight:600; white-space:nowrap;">${label}</td><td>${escapeHtml(
              value
            )}</td></tr>`
        )
        .join("")}
    </table>
    <p style="font-family: sans-serif; font-size: 14px; color: #001E2B; white-space: pre-wrap; margin-top: 16px;">
      <strong>Message:</strong><br/>${escapeHtml(message)}
    </p>
  `;

  try {
    const pmRes = await fetch(POSTMARK_API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Postmark-Server-Token": token,
      },
      body: JSON.stringify({
        From: FROM_ADDRESS,
        To: TO_RECIPIENTS,
        ReplyTo: email,
        Subject: `New contact form submission from ${firstName} ${lastName}`,
        TextBody: textBody,
        HtmlBody: htmlBody,
        MessageStream: "outbound",
      }),
    });

    const pmData = await pmRes.json().catch(() => ({}));

    if (!pmRes.ok) {
      console.error("[contact] Postmark send failed", pmRes.status, pmData);
      res.status(502).json({ ok: false, error: "We couldn't send your message. Please try again shortly." });
      return;
    }

    res.status(200).json({ ok: true, messageId: pmData.MessageID });
  } catch (err) {
    console.error("[contact] Postmark request error", err);
    res.status(502).json({ ok: false, error: "We couldn't send your message. Please try again shortly." });
  }
};
