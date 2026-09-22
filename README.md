# BCGK Communities Website

Static preview build of the BCGK Communities marketing site (26 pages),
plus a Vercel serverless function that wires the contact form to Postmark.

## Structure

- `dist/` -- the actual deployed site: compiled HTML/CSS/JS, images, video,
  and `dist/api/contact.js` (the Postmark-backed contact form function).
  **This is what Vercel serves** -- see deploy notes below.
- `build/` -- the source that generates `dist/*.html`. A small,
  dependency-free Node "SSG" (`data.mjs`, `nav.mjs`, `components.mjs`,
  `icons.mjs`, `lib.mjs`, `pages/*.mjs`, `build.mjs`). `dist/css/site.css`
  and `dist/js/site.js` are hand-authored directly, not generated.
- `tailwind.config.js` -- Tailwind config used to compile `dist/css/tailwind.css`.
- `nextjs-integration/` -- a Next.js App Router version of the contact form
  API route, kept for when this site is ported to a real Next.js + Tailwind
  + shadcn/ui app. Not used by the current static deploy.

## Rebuilding the site after a source edit

```bash
npm install
npm run build
```

This regenerates every `dist/*.html` from `build/`, then recompiles
`dist/css/tailwind.css`. `dist/css/site.css` and `dist/js/site.js` are
edited directly (no build step for those).

## Deploying

This repo deploys to Vercel as a static site with one serverless function
(`dist/api/contact.js`) -- no framework and no Vercel build step needed,
since `dist/` is already fully built and committed. In the Vercel project
settings, set **Root Directory** to `dist`, and add the `POSTMARK_SERVER_TOKEN`
environment variable (Sender Signature verified in Postmark:
`CustomerService@bcgkcommunities.com`). See the full step-by-step deploy
guide for exact instructions.

Contact form submissions go to: chuck@bcgk.com, alex@bcgk.com, and
customerservice@bcgkcommunities.com.
# BCGK-Communities-Website
