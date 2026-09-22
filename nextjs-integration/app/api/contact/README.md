# Contact form -> Postmark

`route.ts` in this folder is a Next.js App Router API route. Once the site
is ported to the real Next.js + Tailwind + shadcn/ui codebase, copy this
whole `app/api/contact/` folder in as-is.

The static preview's contact form (`dist/js/site.js`, forms marked
`data-contact-form` -- both the standalone Contact Us page and the Home
page's "Connect With Us" section, since both use the shared `ContactForm()`
component) already POSTs JSON to `/api/contact` with this shape:

```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@example.com",
  "phone": "(555) 555-0100",
  "propertyName": "",
  "propertyAddress": "",
  "message": "..."
}
```

`propertyName`/`propertyAddress` are optional ("For Owners:" fields); every
other field is required (enforced both client-side via `required` and
server-side in the route).

## Deploy setup (Vercel)

1. Ship the API route as part of the Next.js app -- no extra Vercel config
   needed, App Router API routes just work.
2. In the Vercel project: **Settings -> Environment Variables**, add:
   - `POSTMARK_SERVER_TOKEN` -- the Server API Token from Postmark
     (Servers -> your server -> API Tokens -> Server API Token). Treat this
     as a secret; never commit it or put it in client-side code.
   - `CONTACT_FROM_EMAIL` (optional) -- defaults to
     `CustomerService@bcgkcommunities.com` in the route if unset. Whatever
     you use here **must** be a verified Sender Signature or Domain in that
     Postmark server, or every send will be rejected.
3. Recipients (`chuck@bcgk.com`, `alex@bcgk.com`,
   `customerservice@bcgkcommunities.com`) are hardcoded in `route.ts` rather
   than env-configurable, since who receives leads is a business decision
   that should go through code review like anything else -- change the
   `TO_RECIPIENTS` array there if that list ever changes.

## Testing a live send without deploying anything

Postmark's API is a plain HTTPS POST -- no SDK/npm install required to test
it. Run this from any machine with normal internet access (swap in the real
Server API Token):

```bash
curl -sS -X POST "https://api.postmarkapp.com/email" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "X-Postmark-Server-Token: YOUR_SERVER_TOKEN" \
  -d '{
    "From": "CustomerService@bcgkcommunities.com",
    "To": "chuck@bcgk.com,alex@bcgk.com,customerservice@bcgkcommunities.com",
    "Subject": "[TEST] BCGK Communities contact form integration",
    "TextBody": "Live test of the contact form Postmark integration.",
    "MessageStream": "outbound"
  }'
```

A `200` response with an `ErrorCode: 0` and a `MessageID` means Postmark
accepted it for delivery to all three addresses in `To`. Common failure
modes:
- `ErrorCode 300` / "Invalid 'From' address" -- the From address/domain
  isn't verified in this Postmark server yet (Sender Signatures or Domains
  in the Postmark dashboard).
- `401` -- wrong/expired Server API Token, or using an Account token where
  a Server token is required.
- `422` with a recipient-related error -- one of the three addresses is
  suppressed in Postmark (bounced/complained previously) -- check
  **Suppressions** on the server.

Once the real route is deployed, the equivalent end-to-end test is just
submitting the live Contact Us form on the site.
