// SEO + AI-search ("answer engine") helpers.
//
// Everything here is generated at build time from the same data the pages use
// (nav.mjs / data.mjs), so business facts -- phone, email, offices, license,
// leadership, properties -- stay consistent between what people see on the
// page, what Google reads in structured data, and what AI assistants
// (ChatGPT, Claude, Gemini, Perplexity, Copilot) read in llms.txt.

import {
  SITE_URL,
  PHONE_DISPLAY,
  EMAIL_GENERAL,
  OFFICES,
  NAV,
} from "./nav.mjs";
import { PROPERTIES, LEADERSHIP, FAQS, AWARDS } from "./data.mjs";

export const ORG_DESCRIPTION =
  "BCGK Communities is a modern property management company built around operational excellence, high standards, and exceptional service.";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const DRE_LICENSE = "02416354";
const PHONE_E164 = "+1-916-500-0807";

const abs = (file) => (file === "index.html" ? `${SITE_URL}/` : `${SITE_URL}/${file}`);

// "1201 J St Ste 200" / "Sacramento, CA 95814" -> PostalAddress
function postalAddress(lines) {
  const [street, cityLine] = lines;
  const m = cityLine.match(/^(.*),\s*([A-Z]{2})\s+(\d{5})$/);
  return {
    "@type": "PostalAddress",
    streetAddress: street,
    addressLocality: m ? m[1] : cityLine,
    addressRegion: m ? m[2] : "CA",
    postalCode: m ? m[3] : undefined,
    addressCountry: "US",
  };
}

function organization() {
  const cities = [...new Set(PROPERTIES.map((p) => p.city.replace(/, CA$/, "")))];
  return {
    "@type": ["Organization", "RealEstateAgent"],
    "@id": ORG_ID,
    name: "BCGK Communities",
    alternateName: "BCGK",
    url: `${SITE_URL}/`,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/icon-512.png`,
      width: 512,
      height: 512,
    },
    image: `${SITE_URL}/images/logo/social-thumbnail.png`,
    description: ORG_DESCRIPTION,
    slogan: "Communities Built to Thrive",
    telephone: PHONE_E164,
    email: EMAIL_GENERAL,
    address: postalAddress(OFFICES[0].lines),
    location: OFFICES.map((o) => ({
      "@type": "Place",
      name: `BCGK Communities ${o.name}`,
      address: postalAddress(o.lines),
      hasMap: o.mapUrl,
    })),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: PHONE_E164,
      email: EMAIL_GENERAL,
      areaServed: "US-CA",
      availableLanguage: ["English"],
    },
    areaServed: [
      { "@type": "State", name: "California" },
      ...cities.map((c) => ({ "@type": "City", name: `${c}, CA` })),
    ],
    knowsAbout: [
      "Property management",
      "Multifamily property management",
      "Apartment management",
      "Leasing",
      "Resident services",
      "Maintenance coordination",
    ],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "license",
      name: `California DRE Broker License #${DRE_LICENSE}`,
      recognizedBy: {
        "@type": "GovernmentOrganization",
        name: "California Department of Real Estate",
      },
    },
    award: AWARDS.map((a) => `${a.title} (Orangevale People's Choice Awards, 2025)`),
    employee: LEADERSHIP.map((l) => ({
      "@type": "Person",
      name: l.name,
      jobTitle: l.title,
    })),
  };
}

function website() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: "BCGK Communities",
    description: ORG_DESCRIPTION,
    inLanguage: "en-US",
    publisher: { "@id": ORG_ID },
  };
}

function breadcrumb(crumbs) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.file),
    })),
  };
}

// Section parent for breadcrumbs, derived from the primary nav.
function parentFor(file) {
  for (const item of NAV) {
    if (item.children && item.children.some((c) => c.href === file) && item.href !== file) {
      return { name: item.label, file: item.href };
    }
  }
  return null;
}

const PAGE_TYPE = {
  "index.html": "WebPage",
  "about-our-story.html": "AboutPage",
  "about-leadership.html": "AboutPage",
  "about-award-winning.html": "AboutPage",
  "contact-us.html": "ContactPage",
  "live-with-us.html": "CollectionPage",
};

export function jsonLdFor(p, property) {
  const url = abs(p.file);
  const graph = [];

  const crumbs = [{ name: "Home", file: "index.html" }];
  if (property) {
    crumbs.push({ name: "View Our Properties", file: "live-with-us.html" });
  } else if (p.file !== "index.html") {
    const parent = parentFor(p.file);
    if (parent && parent.file !== p.file) crumbs.push(parent);
  }
  if (p.file !== "index.html") crumbs.push({ name: p.title, file: p.file });

  const webPage = {
    "@type": PAGE_TYPE[p.file] || "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: p.fullTitle || `${p.title} | BCGK Communities`,
    description: p.description,
    inLanguage: "en-US",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
  if (p.file !== "index.html") webPage.breadcrumb = { "@id": `${url}#breadcrumb` };
  graph.push(webPage);
  if (p.file !== "index.html") graph.push({ ...breadcrumb(crumbs), "@id": `${url}#breadcrumb` });

  // The full organization + website entities live on the home page and the
  // pages people (and AI assistants) look at for "who is this company":
  // About/Contact. Other pages reference them by @id.
  if (["index.html", "about-our-story.html", "about-leadership.html", "contact-us.html", "hire-us.html"].includes(p.file)) {
    graph.push(organization());
    graph.push(website());
  }

  if (p.file === "about-our-story.html") {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  if (property) {
    const [locality] = property.city.split(",");
    const units = parseInt(String(property.units || ""), 10);
    const complex = {
      "@type": "ApartmentComplex",
      "@id": `${url}#property`,
      name: property.name,
      description: property.summary,
      url,
      image: [1, 2, 3].map((n) => `${SITE_URL}/images/properties/${property.slug}/photo-${n}.jpg`),
      address: {
        "@type": "PostalAddress",
        addressLocality: locality.trim(),
        addressRegion: "CA",
        addressCountry: "US",
      },
      amenityFeature: (property.amenities || []).map((a) => ({
        "@type": "LocationFeatureSpecification",
        name: a,
        value: true,
      })),
    };
    if (!Number.isNaN(units)) complex.numberOfAccommodationUnits = units;
    if (property.website) complex.sameAs = [property.website];
    graph.push(complex);
    webPage.about = [{ "@id": `${url}#property` }, { "@id": ORG_ID }];
  }

  // JSON inside <script> must not be able to close the tag.
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
}

// ---------------------------------------------------------------------------
// Crawl files: sitemap.xml, robots.txt, llms.txt, site.webmanifest
// ---------------------------------------------------------------------------

const PRIORITY = { "index.html": "1.0", "hire-us.html": "0.9", "live-with-us.html": "0.9", "contact-us.html": "0.8" };

export function sitemapXml(pages) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = pages
    .map(
      (p) => `  <url>
    <loc>${abs(p.file)}</loc>
    <lastmod>${today}</lastmod>
    <priority>${PRIORITY[p.file] || (p.file.startsWith("property-") ? "0.8" : "0.6")}</priority>
  </url>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export function robotsTxt() {
  // Search engines and AI assistants are explicitly welcome. Listing the AI
  // crawlers by name isn't required (the wildcard already allows them), but
  // it documents intent and survives anyone later adding a stricter default.
  const aiBots = [
    "Googlebot",
    "Bingbot",
    "Google-Extended",
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-SearchBot",
    "Claude-User",
    "PerplexityBot",
    "Perplexity-User",
    "Applebot",
    "Applebot-Extended",
    "DuckDuckBot",
  ];
  return `# BCGK Communities -- ${SITE_URL}
# Search engines and AI assistants are welcome to crawl and cite this site.

User-agent: *
Allow: /
Disallow: /api/

${aiBots.map((b) => `User-agent: ${b}\nAllow: /\nDisallow: /api/`).join("\n\n")}

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

export function llmsTxt(pages) {
  const link = (file, label, desc) => `- [${label}](${abs(file)})${desc ? `: ${desc}` : ""}`;
  const byFile = Object.fromEntries(pages.map((p) => [p.file, p]));
  const section = (files) => files.filter((f) => byFile[f]).map((f) => link(f, byFile[f].title, byFile[f].description)).join("\n");

  return `# BCGK Communities

> ${ORG_DESCRIPTION}

BCGK Communities manages multifamily apartment communities in California, with offices in Sacramento and Los Angeles. The company operates under California DRE broker license #${DRE_LICENSE} and was recognized in Orangevale's 2025 People's Choice Awards as Best Property Management Company and Best New Business.

## Key facts

- Website: ${SITE_URL}/
- Phone: ${PHONE_DISPLAY}
- Email: ${EMAIL_GENERAL}
${OFFICES.map((o) => `- ${o.name}: ${o.lines.join(", ")}`).join("\n")}
- License: California Department of Real Estate (DRE) broker license #${DRE_LICENSE}
- Services: multifamily property management, leasing, resident services, maintenance coordination, and owner reporting
- Tagline: Communities Built to Thrive

## Leadership

${LEADERSHIP.map((l) => `- ${l.name}, ${l.title}`).join("\n")}

## Communities managed

${PROPERTIES.map((p) => `- [${p.name}](${abs(`property-${p.slug}.html`)}) (${p.city}${p.units ? `, ${p.units}` : ""}): ${p.tagline}`).join("\n")}

## Company

${section(["about-our-story.html", "about-leadership.html", "about-award-winning.html", "hire-us.html", "careers.html", "why-we-love-it-here.html", "contact-us.html"])}

## Residents and owners

${section(["live-with-us.html", "upcoming-events.html", "resident-portal.html", "community-guidelines.html", "avoiding-rental-scams.html", "owner-portal.html", "renters-rights-and-resources.html"])}

## Frequently asked questions

${FAQS.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n")}

## Optional

${section(["accessibility-statement.html", "broker-licenses-and-disclosures.html", "fair-housing-statement.html", "privacy-policy.html", "terms-of-service.html"])}
`;
}

export function webManifest() {
  return JSON.stringify(
    {
      name: "BCGK Communities",
      short_name: "BCGK",
      description: ORG_DESCRIPTION,
      start_url: "/",
      display: "browser",
      background_color: "#000000",
      theme_color: "#001E2B",
      icons: [
        { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
    },
    null,
    2
  );
}

// Below-the-fold images: lazy-load + async decode (faster first paint, a
// Core Web Vitals signal). Hero slides and the header logo stay eager.
export function lazyImages(html) {
  return html.replace(/<img\b(?![^>]*\bloading=)([^>]*)>/g, (tag, attrs) => {
    if (/hero-bg|primary-logo/.test(attrs)) return tag;
    return `<img loading="lazy" decoding="async"${attrs}>`;
  });
}
