// Core layout + head for every static page in the BCGK Communities preview build.
// Self-contained build: real Tailwind CSS is compiled at build time (css/tailwind.css)
// and icons are inlined SVG (build/icons.mjs) -- no CDN / network dependency to preview.

import { SITE_URL } from "./nav.mjs";

export { icon } from "./icons.mjs";

function headBlock({ title, description, ogImagePath, ogImageWidth, ogImageHeight, file }) {
  // Absolute URLs: social/messaging link-preview crawlers (iMessage, Slack,
  // Facebook, etc.) generally won't resolve a relative og:image/og:url --
  // that's what was silently breaking the thumbnail on shared links.
  const absoluteImageUrl = `${SITE_URL}/${ogImagePath}`;
  const absolutePageUrl = file === "index.html" ? `${SITE_URL}/` : `${SITE_URL}/${file}`;
  return `
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} | BCGK Communities</title>
  <meta name="description" content="${description}" />
  <link rel="canonical" href="${absolutePageUrl}" />
  <meta property="og:title" content="${title} | BCGK Communities" />
  <meta property="og:description" content="${description}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${absolutePageUrl}" />
  <meta property="og:image" content="${absoluteImageUrl}" />
  <meta property="og:image:width" content="${ogImageWidth}" />
  <meta property="og:image:height" content="${ogImageHeight}" />
  <meta property="og:site_name" content="BCGK Communities" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="${absoluteImageUrl}" />
  <link rel="icon" href="images/logo/logo-square.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Figtree:wght@300;400;500;600;700&family=Source+Code+Pro:wght@400;500;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="css/tailwind.css" />
  <link rel="stylesheet" href="css/site.css" />
  <script>(function(){try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('js-reveal');}}catch(e){}try{document.documentElement.style.setProperty('--vp-width',window.innerWidth+'px');}catch(e){}})();</script>
  <script src="js/site.js" defer></script>
  `;
}

export function page({
  title,
  description,
  path,
  file,
  bodyClass = "",
  ogImagePath = "images/logo/social-thumbnail.png",
  ogImageWidth = 3840,
  ogImageHeight = 2160,
  content,
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
${headBlock({ title, description, ogImagePath, ogImageWidth, ogImageHeight, file })}
</head>
<body class="bg-white text-ink font-sans antialiased ${bodyClass}" data-path="${path}">
  <a href="#main-content" class="skip-link">Skip to main content</a>
  ${content}
</body>
</html>`;
}
