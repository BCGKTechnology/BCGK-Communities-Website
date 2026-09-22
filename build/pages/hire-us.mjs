import { icon } from "../lib.mjs";
import { Header, Footer, Breadcrumbs, Eyebrow, SectionHeading, StatTile, CTASection } from "../components.mjs";
import { CASE_STUDIES, VALUE_PILLARS } from "../data.mjs";

function CaseStudy(cs, reverse) {
  return `
  <div class="grid lg:grid-cols-2 gap-10 items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}">
    <div class="card !p-8">
      <p class="eyebrow text-brand-greenDeeper">${cs.name}</p>
      <div class="flex items-end gap-4 mt-3 flex-wrap">
        <p class="stat-value text-ink">${cs.to}</p>
        <span class="badge bg-brand-greenTint text-brand-greenDeep">${cs.pct}</span>
      </div>
      <p class="text-sm text-gray-500 mt-1">Monthly Rent Roll &middot; ${cs.label}</p>
      ${
        cs.milestones
          ? `
      <div class="mt-6 flex items-center gap-2 flex-wrap text-sm">
        ${cs.milestones
          .map(
            (m, i) => `
          <span class="flex items-center gap-2">
            <span class="text-gray-500">${m.label}</span>
            <span class="font-semibold text-ink">${m.value}</span>
          </span>
          ${i < cs.milestones.length - 1 ? icon("arrow-right", "w-4 h-4 text-brand-green") : ""}
        `
          )
          .join("")}
      </div>`
          : ""
      }
    </div>
    <p class="body-lg text-gray-500">${cs.body}</p>
  </div>`;
}

export function HireUsPage() {
  return `
  ${Header("hire-us.html")}
  <main id="main-content">
    ${Breadcrumbs([{ label: "Home", href: "index.html" }, { label: "Hire Us", href: "hire-us.html" }])}

    <section class="reveal-section hero-gradient section-tight pt-10">
      <div class="max-w-site mx-auto px-6 md:px-8 text-center">
        ${Eyebrow("For Owners & Investors")}
        <h1 class="heading-1 mt-3 max-w-3xl mx-auto">Better Management. Measurable Results.</h1>
        <p class="body-lg text-gray-500 max-w-2xl mx-auto mt-5">BCGK Communities combines hands-on operational expertise, disciplined leasing, modern technology, and an owner's perspective to unlock the potential of multifamily properties.</p>
        <div class="mt-8 flex flex-wrap justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
          <span class="badge bg-gray-100 text-gray-700">Multifamily Property Management</span>
          <span class="badge bg-gray-100 text-gray-700">Leasing & Stabilization</span>
          <span class="badge bg-gray-100 text-gray-700">Asset Management</span>
          <span class="badge bg-gray-100 text-gray-700">Revenue Optimization</span>
          <span class="badge bg-gray-100 text-gray-700">Technology & AI</span>
        </div>
        <div class="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a href="contact-us.html" class="btn btn-primary">Talk With Our Team ${icon("arrow-right", "w-4 h-4")}</a>
        </div>
      </div>
    </section>

    <section class="reveal-section section on-dark bg-ink">
      <div class="max-w-site mx-auto px-6 md:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          ${Eyebrow("We Manage Like Owners.", true)}
          <h2 class="heading-2 text-white mt-2">Every decision starts with long-term value.</h2>
          <p class="body-lg text-white/70 mt-5">BCGK was built from an owner's perspective. We understand that every operational decision ultimately affects the performance and long-term value of an asset. That means looking beyond day-to-day management to identify opportunities across leasing, rents, expenses, ancillary revenue, resident retention, technology, and property operations.</p>
        </div>
        <div>
          ${Eyebrow("Turning Better Operations Into Performance", true)}
          <h2 class="heading-2 text-white mt-2">A strategy built around your property.</h2>
          <p class="body-lg text-white/70 mt-5">Every property presents a different challenge. Some need aggressive lease-up. Others need stronger operations, improved resident retention, better revenue management, or an entirely new approach. We dig into the details, identify where performance is being left on the table, and build a strategy around the needs of the individual property.</p>
        </div>
      </div>
    </section>

    <section class="reveal-section section">
      <div class="max-w-site mx-auto px-6 md:px-8">
        ${SectionHeading({ eyebrow: "Case Studies", title: "The Results Speak for Themselves.", align: "center" })}
        <div class="flex flex-col gap-14">
          ${CASE_STUDIES.map((cs, i) => CaseStudy(cs, i % 2 === 1)).join("")}
        </div>
      </div>
    </section>

    <section class="reveal-section section bg-gray-50">
      <div class="max-w-site mx-auto px-6 md:px-8">
        ${SectionHeading({
          eyebrow: "Untapped Potential",
          title: "Every Property Has Room to Improve.",
          body: "Improving property performance rarely comes from a single initiative. Our team looks across the entire operation to identify opportunities to increase revenue, improve efficiency, strengthen leasing, elevate the resident experience, and protect the long-term value of the asset.",
          align: "center",
        })}
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          ${VALUE_PILLARS.map(
            (v) => `
          <div class="card card-hover">
            <span class="icon-tile">${icon(v.icon, "w-6 h-6")}</span>
            <h3 class="heading-4 mt-5">${v.title}</h3>
            <p class="body-base text-gray-500 mt-2">${v.body}</p>
          </div>`
          ).join("")}
        </div>
      </div>
    </section>

    <section class="reveal-section section">
      <div class="max-w-site mx-auto px-6 md:px-8 grid lg:grid-cols-2 gap-14">
        <div class="card !p-8">
          <span class="icon-tile">${icon("route", "w-6 h-6")}</span>
          <h2 class="heading-3 mt-5">A Better Transition Starts on Day One.</h2>
          <p class="body-base text-gray-500 mt-3">Changing property management companies shouldn't mean months of operational chaos. Our team approaches every transition with a structured plan for people, systems, leasing, financial operations, resident communication, vendors, and property-level priorities. We identify immediate opportunities while building the foundation for long-term performance.</p>
        </div>
        <div class="card !p-8">
          <span class="icon-tile">${icon("cpu", "w-6 h-6")}</span>
          <h2 class="heading-3 mt-5">Modern Tools. Better Decisions.</h2>
          <p class="body-base text-gray-500 mt-3">We combine experienced operators with modern property technology, automation, and AI to give our teams better information and eliminate unnecessary manual work. The goal isn't technology for technology's sake &mdash; it's giving our people more time to serve residents and focus on decisions that move properties forward.</p>
        </div>
      </div>
    </section>

    <section class="reveal-section section bg-gray-50 text-center">
      <div class="max-w-site mx-auto px-6 md:px-8 max-w-2xl">
        <h2 class="heading-2">Your Property. Our Responsibility.</h2>
        <p class="body-lg text-gray-500 mt-5">When an owner entrusts us with a community, we treat that responsibility seriously. We believe in transparent communication, measurable accountability, and an operating strategy tailored to the realities of each asset. Our job is simple: understand where your property is today, where it can go, and relentlessly work to close the gap.</p>
      </div>
    </section>

    ${CTASection({
      title: "Let's Build a Better-Performing Community.",
      body: "Whether you're transitioning from another management company, stabilizing a new acquisition, navigating a lease-up, or looking for better performance from an existing portfolio, BCGK Communities brings an owner-minded approach built around execution and results.",
      primaryLabel: "Talk With Our Team",
      primaryHref: "contact-us.html",
    })}
  </main>
  ${Footer()}`;
}
