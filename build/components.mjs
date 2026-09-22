import { icon } from "./lib.mjs";
import { NAV, FOOTER_COLUMNS, PHONE_DISPLAY, PHONE_HREF, EMAIL_GENERAL } from "./nav.mjs";

/* ---------------------------------------------------------------- */
/* Header / Navigation                                               */
/* ---------------------------------------------------------------- */

function navItem(item, current) {
  const isActive = current === item.href;
  if (item.children) {
    return `
    <div class="relative group nav-item">
      <button type="button"
        class="nav-link ${isActive ? "text-ink font-semibold" : "text-ink/80"}"
        aria-haspopup="true" aria-expanded="false" data-dropdown-trigger>
        <span>${item.label}</span>
        ${icon("chevron-down", "w-3.5 h-3.5 shrink-0 nav-caret")}
      </button>
      <div class="dropdown-panel" data-dropdown-panel role="menu">
        ${item.children
          .map(
            (c) => `<a role="menuitem" href="${c.href}" class="dropdown-item">${c.label}</a>`
          )
          .join("")}
      </div>
    </div>`;
  }
  return `<a href="${item.href}" class="nav-link nav-item ${isActive ? "text-ink font-semibold" : "text-ink/80"}">${item.label}</a>`;
}

export function Header(current, { animateLogo = false } = {}) {
  return `
  <header class="site-header sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-ink/5">
    <div class="max-w-site mx-auto px-5 md:px-8 h-20 flex items-center justify-between gap-4">
      <a href="index.html" class="flex items-center shrink-0 h-9 w-[195px] md:h-10 md:w-[216px]" aria-label="BCGK Communities home">
        ${
          animateLogo
            ? `<video class="h-full w-full object-contain object-left" autoplay muted playsinline aria-hidden="true">
                 <source src="video/logo-intro.webm" type="video/webm" />
                 <source src="video/logo-intro.mp4" type="video/mp4" />
               </video>`
            : `<img src="images/logo/primary-logo.png" alt="BCGK Communities" class="h-full w-full object-contain object-left" />`
        }
      </a>

      <nav aria-label="Primary" class="hidden xl:flex items-center gap-1" id="primary-nav">
        ${NAV.map((item) => navItem(item, current)).join("")}
      </nav>

      <div class="hidden xl:flex items-center gap-2 shrink-0">
        <a href="${PHONE_HREF}" class="btn-icon" title="Call ${PHONE_DISPLAY}" aria-label="Call ${PHONE_DISPLAY}">${icon("phone", "w-[18px] h-[18px]")}</a>
        <a href="hire-us.html" class="btn btn-primary whitespace-nowrap">Hire Us</a>
      </div>

      <div class="xl:hidden shrink-0">
        <button type="button" id="mobile-nav-trigger" class="btn-icon" aria-expanded="false" aria-controls="mobile-nav">
          <span class="sr-only">Open menu</span>
          ${icon("menu", "w-6 h-6")}
        </button>
      </div>
    </div>
  </header>

  <!-- The drawer + backdrop live OUTSIDE <header> on purpose: <header> has
       Tailwind's backdrop-blur (backdrop-filter), and any ancestor with a
       backdrop-filter/filter/transform/perspective/contain establishes a new
       containing block for position:fixed descendants. With these nested
       inside header, they were being positioned relative to header's box
       instead of the viewport -- which is exactly what made the mobile menu
       render off-screen (at the top of the *document*, not the viewport)
       once the page had been scrolled, forcing a scroll back to the top to
       reach it. Keeping them as siblings of <header> makes their
       position:fixed resolve against the real viewport, as intended. -->
  <div id="mobile-nav" class="mobile-nav" aria-hidden="true">
    <div class="mobile-nav-inner">
      <div class="flex items-center justify-between mb-6">
        <img src="images/logo/primary-logo.png" alt="BCGK Communities" class="h-9 w-auto rounded-lg" />
        <button type="button" id="mobile-nav-close" class="btn-icon">
          <span class="sr-only">Close menu</span>
          ${icon("x", "w-6 h-6")}
        </button>
      </div>
      <nav aria-label="Mobile" class="flex flex-col gap-1">
        ${NAV.map((item) => mobileNavItem(item)).join("")}
      </nav>
      <div class="mt-6 pt-6 border-t border-ink/10 flex flex-col gap-3">
        <a href="${PHONE_HREF}" class="nav-link">${icon("phone", "w-4 h-4")} <span>${PHONE_DISPLAY}</span></a>
        <a href="hire-us.html" class="btn btn-primary w-full justify-center">Hire Us</a>
      </div>
    </div>
  </div>
  <div id="mobile-nav-backdrop" class="mobile-nav-backdrop" aria-hidden="true"></div>`;
}

function mobileNavItem(item) {
  if (item.children) {
    return `
    <details class="mobile-accordion">
      <summary class="mobile-nav-link justify-between">${item.label} ${icon("chevron-down", "w-4 h-4")}</summary>
      <div class="pl-4 flex flex-col">
        ${item.children.map((c) => `<a href="${c.href}" class="mobile-nav-link text-base">${c.label}</a>`).join("")}
      </div>
    </details>`;
  }
  return `<a href="${item.href}" class="mobile-nav-link">${item.label}</a>`;
}

/* ---------------------------------------------------------------- */
/* Footer                                                             */
/* ---------------------------------------------------------------- */

export function Footer() {
  return `
  <footer class="on-dark bg-ink text-white">
    <div class="max-w-site mx-auto px-6 md:px-8 py-16">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
        <div class="col-span-2 lg:col-span-2">
          <img src="images/logo/primary-logo.png" alt="BCGK Communities" class="h-10 w-auto rounded-lg mb-4" />
          <p class="text-white/60 text-sm leading-relaxed max-w-xs">Communities built to thrive &mdash; operational excellence, modern technology, and exceptional service across Northern California.</p>
          <div class="mt-5 flex flex-col gap-2 text-sm">
            <a href="${PHONE_HREF}" class="footer-link inline-flex items-center gap-2">${icon("phone", "w-4 h-4")} ${PHONE_DISPLAY}</a>
            <a href="mailto:${EMAIL_GENERAL}" class="footer-link inline-flex items-center gap-2">${icon("mail", "w-4 h-4")} ${EMAIL_GENERAL}</a>
          </div>
        </div>
        ${FOOTER_COLUMNS.map(
          (col) => `
        <div>
          <h3 class="text-xs font-semibold uppercase tracking-wider text-brand-green mb-4">${col.heading}</h3>
          <ul class="flex flex-col gap-2.5">
            ${col.links.map((l) => `<li><a href="${l.href}" class="footer-link text-sm">${l.label}</a></li>`).join("")}
          </ul>
        </div>`
        ).join("")}
      </div>
      <div class="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row gap-4 md:items-center md:justify-between text-xs text-white/50">
        <p>&copy; ${new Date().getFullYear()} BCGK Communities. All rights reserved. CA DRE License #02416354.</p>
        <div class="flex flex-wrap gap-x-5 gap-y-2">
          <a href="fair-housing-statement.html" class="footer-link">Equal Housing Opportunity</a>
          <a href="terms-of-service.html" class="footer-link">Terms of Service</a>
          <a href="privacy-policy.html" class="footer-link">Privacy Policy</a>
        </div>
      </div>
    </div>
  </footer>`;
}

/* ---------------------------------------------------------------- */
/* Primitives                                                         */
/* ---------------------------------------------------------------- */

export function Eyebrow(text, onDark = false) {
  return `<p class="eyebrow ${onDark ? "text-brand-green" : "text-brand-greenDeeper"}">${text}</p>`;
}

export function Badge(text, tone = "tint") {
  const cls =
    tone === "tint"
      ? "bg-brand-greenTint text-brand-greenDeep"
      : tone === "dark"
      ? "bg-white/10 text-brand-green"
      : "bg-gray-100 text-gray-700";
  return `<span class="badge ${cls}">${text}</span>`;
}

export function SectionHeading({ eyebrow, title, body, align = "left", onDark = false }) {
  return `
  <div class="max-w-2xl ${align === "center" ? "mx-auto text-center" : ""} mb-12 md:mb-16">
    ${eyebrow ? Eyebrow(eyebrow, onDark) : ""}
    <h2 class="heading-2 ${onDark ? "text-white" : "text-ink"} mt-2">${title}</h2>
    ${body ? `<p class="body-lg mt-4 ${onDark ? "text-white/70" : "text-gray-500"}">${body}</p>` : ""}
  </div>`;
}

export function IconTile(name, onDark = false) {
  return `<span class="icon-tile ${onDark ? "icon-tile-dark" : ""}">${icon(name, "w-6 h-6")}</span>`;
}

export function FeatureCard({ icon: iconName, title, body }) {
  return `
  <div class="card card-hover">
    ${IconTile(iconName)}
    <h3 class="heading-4 mt-5">${title}</h3>
    <p class="body-base text-gray-500 mt-2">${body}</p>
  </div>`;
}

export function StatTile({ value, label, onDark = false }) {
  return `
  <div class="stat-tile ${onDark ? "stat-tile-dark" : ""}">
    <p class="stat-value ${onDark ? "text-brand-green" : "text-ink"}">${value}</p>
    <p class="stat-label ${onDark ? "text-white/60" : "text-gray-500"}">${label}</p>
  </div>`;
}

export function PropertyCard(p) {
  return `
  <a href="property-${p.slug}.html" class="property-card group">
    <div class="property-card-media">
      <img src="images/properties/${p.slug}/${p.cardPhoto || "photo-1.jpg"}" alt="${p.name} in ${p.city}" loading="lazy" />
      <span class="property-card-tag">${p.units}</span>
    </div>
    <div class="p-6">
      <p class="text-xs font-semibold uppercase tracking-wider text-brand-greenDeeper mb-1">${p.city}</p>
      <h3 class="heading-4">${p.name}</h3>
      <p class="body-base text-gray-500 mt-2 line-clamp-2">${p.tagline}</p>
      <span class="btn btn-secondary mt-5 pointer-events-none">View Community ${icon("arrow-right", "w-4 h-4")}</span>
    </div>
  </a>`;
}

export function EventCard(e) {
  const d = new Date(e.date + "T00:00:00");
  const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = d.getDate();
  return `
  <button type="button" class="event-card text-left w-full" data-event-trigger data-event-id="${e.id}">
    <div class="event-date">
      <span class="event-month">${month}</span>
      <span class="event-day">${day}</span>
    </div>
    <div class="flex-1 min-w-0">
      <h3 class="heading-4 truncate">${e.name}</h3>
      <p class="text-sm text-brand-greenDeeper font-medium mt-0.5">${e.community}</p>
      <p class="text-sm text-gray-500 mt-1">${e.time} &middot; ${e.location}</p>
    </div>
    ${icon("chevron-right", "w-5 h-5 text-gray-400 shrink-0")}
  </button>`;
}

export function LeadershipCard(person) {
  return `
  <div class="text-center w-60">
    <img src="images/headshots/${person.slug}.jpg" alt="${person.name}" class="w-60 h-60 object-cover mx-auto mb-5" />
    <h3 class="heading-4">${person.name}</h3>
    <p class="text-sm text-brand-greenDeeper font-medium mt-1">${person.title}</p>
  </div>`;
}

export function CTASection({ eyebrow, title, body, primaryLabel, primaryHref, secondaryLabel, secondaryHref }) {
  return `
  <section class="reveal-section section on-dark bg-ink">
    <div class="max-w-site mx-auto px-6 md:px-8 text-center">
      <div class="max-w-2xl mx-auto">
        ${eyebrow ? Eyebrow(eyebrow, true) : ""}
        <h2 class="heading-2 text-white mt-2">${title}</h2>
        ${body ? `<p class="body-lg text-white/70 mt-4">${body}</p>` : ""}
        <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a href="${primaryHref}" class="btn btn-accent">${primaryLabel}</a>
          ${secondaryLabel ? `<a href="${secondaryHref}" class="btn btn-ghost-dark">${secondaryLabel}</a>` : ""}
        </div>
      </div>
    </div>
  </section>`;
}

export function Marquee(items) {
  const doubled = items.concat(items);
  return `
  <div class="marquee-wrap py-4" aria-hidden="true">
    <div class="marquee-track">
      ${doubled
        .map((t) => `<span class="marquee-item"><span class="dot"></span>${t}</span>`)
        .join("")}
    </div>
  </div>`;
}

export function Breadcrumbs(items) {
  return `
  <nav aria-label="Breadcrumb" class="max-w-site mx-auto px-6 md:px-8 pt-6">
    <ol class="flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
      ${items
        .map((it, i) => {
          const isLast = i === items.length - 1;
          return `<li class="flex items-center gap-1.5">${
            isLast
              ? `<span class="text-ink font-medium" aria-current="page">${it.label}</span>`
              : `<a href="${it.href}" class="hover:text-brand-greenDeeper">${it.label}</a>${icon("chevron-right", "w-3.5 h-3.5")}`
          }</li>`;
        })
        .join("")}
    </ol>
  </nav>`;
}

export function Accordion(items, name) {
  return `
  <div class="flex flex-col gap-3">
    ${items
      .map(
        (it, i) => `
    <details class="accordion-item" ${i === 0 ? "open" : ""} name="${name}">
      <summary class="accordion-trigger">
        <span>${it.q}</span>
        ${icon("plus", "w-5 h-5 accordion-icon")}
      </summary>
      <div class="accordion-body"><p class="body-base text-gray-500">${it.a}</p></div>
    </details>`
      )
      .join("")}
  </div>`;
}

/* ---------------------------------------------------------------- */
/* Forms (placeholder submit handling until Postmark is wired up)    */
/* ---------------------------------------------------------------- */

export function ContactForm({ id = "contact-form" } = {}) {
  return `
  <form id="${id}" class="form-card" data-contact-form novalidate>
    <div class="grid sm:grid-cols-2 gap-5">
      <div class="field">
        <label for="${id}-first">First Name <span class="req">*</span></label>
        <input id="${id}-first" name="firstName" type="text" required autocomplete="given-name" />
      </div>
      <div class="field">
        <label for="${id}-last">Last Name <span class="req">*</span></label>
        <input id="${id}-last" name="lastName" type="text" required autocomplete="family-name" />
      </div>
      <div class="field">
        <label for="${id}-email">Email Address <span class="req">*</span></label>
        <input id="${id}-email" name="email" type="email" required autocomplete="email" />
      </div>
      <div class="field">
        <label for="${id}-phone">Phone Number <span class="req">*</span></label>
        <input id="${id}-phone" name="phone" type="tel" required autocomplete="tel" />
      </div>
      <div class="sm:col-span-2 border-t border-ink/10 pt-4">
        <p class="text-sm font-semibold text-ink">For Owners:</p>
      </div>
      <div class="field">
        <label for="${id}-property-name">Property Name <span class="optional">(if applicable)</span></label>
        <input id="${id}-property-name" name="propertyName" type="text" />
      </div>
      <div class="field">
        <label for="${id}-property-address">Property Address <span class="optional">(if applicable)</span></label>
        <input id="${id}-property-address" name="propertyAddress" type="text" />
      </div>
      <div class="field sm:col-span-2">
        <label for="${id}-message">Message <span class="req">*</span></label>
        <textarea id="${id}-message" name="message" rows="5" required></textarea>
      </div>
    </div>
    <button type="submit" class="btn btn-primary mt-6 w-full sm:w-auto justify-center">
      <span data-btn-label>Submit</span> ${icon("arrow-right", "w-4 h-4")}
    </button>
    <p class="form-note" data-form-note>Submissions are sent directly to our team.</p>
  </form>`;
}

export function PortalLoginForm({ id, portalName, forgotHref = "#", helpEmail = EMAIL_GENERAL }) {
  return `
  <form id="${id}" class="form-card max-w-md mx-auto" data-placeholder-form novalidate>
    <div class="flex flex-col gap-5">
      <div class="field">
        <label for="${id}-username">Username</label>
        <input id="${id}-username" name="username" type="text" placeholder="Enter your username" autocomplete="username" required />
      </div>
      <div class="field">
        <label for="${id}-password">Password</label>
        <input id="${id}-password" name="password" type="password" placeholder="Enter your password" autocomplete="current-password" required />
      </div>
    </div>
    <div class="flex items-center justify-between mt-2">
      <a href="${forgotHref}" class="text-sm font-medium text-brand-greenDeeper hover:underline">Forgot Password?</a>
    </div>
    <button type="submit" class="btn btn-primary mt-6 w-full justify-center">Log In to ${portalName}</button>
    <p class="form-note" data-form-note>Placeholder login &mdash; this portal will connect to the live ${portalName} once available.</p>
  </form>`;
}

export function Modal({ id }) {
  return `
  <div id="${id}" class="modal" role="dialog" aria-modal="true" aria-hidden="true" aria-labelledby="${id}-title">
    <div class="modal-backdrop" data-modal-close></div>
    <div class="modal-panel" role="document">
      <button type="button" class="btn-icon absolute right-4 top-4" data-modal-close>
        <span class="sr-only">Close dialog</span>
        ${icon("x", "w-5 h-5")}
      </button>
      <div data-modal-content></div>
    </div>
  </div>`;
}
