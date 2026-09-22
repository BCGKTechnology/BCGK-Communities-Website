// Next.js App Router API route for the BCGK Communities contact form.
// Drop this in at app/api/contact/route.ts in the real Next.js + Tailwind +
// shadcn/ui build (see the project's "Next.js port" plan). The static
// preview's contact form (dist/js/site.js, [data-contact-form]) already
// POSTs JSON to this exact path.
//
// Required environment variables (set in Vercel: Project -> Settings ->
// Environment Variables -- never commit these):
//   POSTMARK_SERVER_TOKEN   Postmark Server API Token (Servers -> your
//                           server -> API Tokens -> Server API Token)
//   CONTACT_FROM_EMAIL      Optional. Defaults to
//                           "CustomerService@bcgkcommunities.com" below --
//                           must be a verified Sender Signature / Domain in
//                           this Postmark server, or Postmark will reject
//                           the send.
//
// Recipients are intentionally hardcoded rather than env-configurable: this
// is a business decision (who gets contact-form leads), not a deploy-time
// secret, so it belongs in code that's reviewed like any other change.

import { NextRequest, NextResponse } from "next/server";

const POSTMARK_API_URL = "https://api.postmarkapp.com/email";

const TO_RECIPIENTS = [
  "chuck@bcgk.com",
  "alex@bcgk.com",
  "customerservice@bcgkcommunities.com",
].join(",");

const FROM_ADDRESS = process.env.CONTACT_FROM_EMAIL || "CustomerService@bcgkcommunities.com";

interface ContactPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  propertyName?: string;
  propertyAddress?: string;
  message?: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const token = process.env.POSTMARK_SERVER_TOKEN;
  if (!token) {
    console.error("[contact] POSTMARK_SERVER_TOKEN is not set");
    return NextResponse.json(
      { ok: false, error: "Email service is not configured." },
      { status: 500 }
    );
  }

  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const firstName = (body.firstName || "").trim();
  const lastName = (body.lastName || "").trim();
  const email = (body.email || "").trim();
  const phone = (body.phone || "").trim();
  const propertyName = (body.propertyName || "").trim();
  const propertyAddress = (body.propertyAddress || "").trim();
  const message = (body.message || "").trim();

  // Mirrors the `required` attributes already enforced client-side -- this
  // is the server-side backstop, not the primary UX.
  if (!firstName || !lastName || !email || !phone || !message) {
    return NextResponse.json(
      { ok: false, error: "Please fill in all required fields." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const fields: Array<[string, string]> = [
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
      return NextResponse.json(
        { ok: false, error: "We couldn't send your message. Please try again shortly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, messageId: pmData.MessageID });
  } catch (err) {
    console.error("[contact] Postmark request error", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't send your message. Please try again shortly." },
      { status: 502 }
    );
  }
}
