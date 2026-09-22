import { icon } from "../lib.mjs";
import { Header, Footer, Breadcrumbs, Eyebrow, PortalLoginForm } from "../components.mjs";
import { EMAIL_GENERAL, PHONE_DISPLAY, PHONE_HREF } from "../nav.mjs";

function PortalPage({ current, crumbLabel, eyebrow, title, body, formId, portalName, benefits }) {
  return `
  ${Header(current)}
  <main id="main-content">
    ${Breadcrumbs([{ label: "Home", href: "index.html" }, { label: crumbLabel, href: current }])}

    <section class="reveal-section section">
      <div class="max-w-site mx-auto px-6 md:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          ${Eyebrow(eyebrow)}
          <h1 class="heading-1 mt-3">${title}</h1>
          <p class="body-lg text-gray-500 mt-5">${body}</p>
          ${
            benefits
              ? `<ul class="mt-6 flex flex-col gap-3">
            ${benefits.map((b) => `<li class="flex items-start gap-3 text-sm text-gray-600"><span class="icon-tile !w-8 !h-8 !rounded-lg shrink-0">${icon("check", "w-4 h-4")}</span><span class="pt-1">${b}</span></li>`).join("")}
          </ul>`
              : ""
          }
          <div class="card !bg-gray-50 mt-8">
            <h2 class="heading-4 flex items-center gap-2">${icon("life-buoy", "w-5 h-5 text-brand-greenDeeper")} Need Help?</h2>
            <p class="body-base text-gray-500 mt-2">Having trouble accessing your account? Contact your property management team or email us at <a href="mailto:${EMAIL_GENERAL}" class="text-brand-greenDeeper underline underline-offset-2">${EMAIL_GENERAL}</a> or <a href="${PHONE_HREF}" class="text-brand-greenDeeper underline underline-offset-2">${PHONE_DISPLAY}</a>.</p>
          </div>
        </div>
        <div>${PortalLoginForm({ id: formId, portalName })}</div>
      </div>
    </section>
  </main>
  ${Footer()}`;
}

export function ResidentPortalPage() {
  return PortalPage({
    current: "resident-portal.html",
    crumbLabel: "Resident Portal",
    eyebrow: "Residents",
    title: "Welcome Home",
    body: "Access your BCGK Communities Resident Portal to make payments, view your account, submit maintenance requests, and manage your resident information anytime.",
    formId: "resident-login",
    portalName: "Resident Portal",
    benefits: ["Make rent payments online", "Submit and track maintenance requests", "View your account and lease details"],
  });
}

export function OwnerPortalPage() {
  return PortalPage({
    current: "owner-portal.html",
    crumbLabel: "Owner Portal",
    eyebrow: "Owners",
    title: "Your Properties. Your Information.",
    body: "Access your BCGK Communities Owner Portal for a convenient, secure way to stay connected to your properties and financial information, 24/7.",
    formId: "owner-login",
    portalName: "Owner Portal",
    benefits: ["View property financials and statements", "Access reports and documents in one place", "Stay up to date on your investments"],
  });
}

export function EmployeePortalPage() {
  return PortalPage({
    current: "employee-portal.html",
    crumbLabel: "Employee Portal",
    eyebrow: "Employees",
    title: "Employee Portal",
    body: "Log in to access your BCGK Communities employee portal.",
    formId: "employee-login",
    portalName: "Employee Portal",
    benefits: null,
  });
}

export function CommunityGuidelinesPage() {
  const sections = [
    { icon: "waves", title: "Pool & Spa", body: "Pool areas are for residents and their guests to enjoy responsibly. Please observe all posted pool rules and community-specific hours. Children must be supervised, glass containers are prohibited, and residents are responsible for the conduct of their guests." },
    { icon: "dog", title: "Dog Park & Pets", body: "Our dog parks are shared spaces for residents and their pets. Dogs must be supervised at all times, and residents are responsible for immediately picking up and properly disposing of pet waste. Failure to pick up after your pet may result in fines or other charges as permitted by your lease and community policies." },
    { icon: "cigarette-off", title: "Smoke-Free Communities", body: "All BCGK Community properties are non-smoking communities. Smoking is prohibited in apartments, common areas, amenity spaces, and other areas designated as smoke-free under your lease and community policies." },
    { icon: "car", title: "Guest Parking", body: "Guest parking is limited to designated guest parking areas and is subject to the parking rules of your individual community. Residents are responsible for ensuring their guests park only in authorized spaces and follow all posted signage." },
    { icon: "trash-2", title: "Valet Trash", body: "Communities offering valet trash service provide doorstep collection every Monday, Wednesday, and Friday. Trash must be placed inside your BCGK-provided bin directly outside your front door by 6:00 PM. Non-BCGK bins left outside for more than 24 hours may be subject to a $25 disposal fee." },
    { icon: "sparkle", title: "Keep Our Communities Clean", body: "Please dispose of trash properly and help keep sidewalks, landscaping, parking areas, hallways, and shared spaces free of litter." },
    { icon: "users", title: "Be a Good Neighbor", body: "Please be considerate of your neighbors and help us maintain a community everyone can enjoy. Residents are responsible for the behavior of their household members, pets, and guests and should observe community quiet hours and other property-specific rules." },
  ];
  return `
  ${Header("community-guidelines.html")}
  <main id="main-content">
    ${Breadcrumbs([{ label: "Home", href: "index.html" }, { label: "Residents", href: "resident-portal.html" }, { label: "Community Guidelines", href: "community-guidelines.html" }])}

    <section class="reveal-section section-tight pt-10">
      <div class="max-w-site mx-auto px-6 md:px-8 text-center">
        ${Eyebrow("Residents")}
        <h1 class="heading-1 mt-3 max-w-3xl mx-auto">Resident Community Guidelines</h1>
        <p class="body-lg text-gray-500 max-w-2xl mx-auto mt-5">Our community guidelines are designed to help keep BCGK Communities clean, safe, and enjoyable for everyone. Please review the guidelines below and remember that your individual community and lease may include additional rules or requirements.</p>
        <div class="mt-7 flex flex-wrap items-center justify-center gap-3">
          <button type="button" class="filter-pill" aria-pressed="true">English</button>
          <button type="button" class="filter-pill" aria-pressed="false">Español</button>
          <a href="#" class="btn btn-secondary" data-placeholder-link>Download PDF ${icon("download", "w-4 h-4")}</a>
        </div>
      </div>
    </section>

    <section class="reveal-section section pt-6">
      <div class="max-w-site mx-auto px-6 md:px-8 grid sm:grid-cols-2 gap-6">
        ${sections
          .map(
            (s) => `
        <div class="card">
          <span class="icon-tile">${icon(s.icon, "w-6 h-6")}</span>
          <h2 class="heading-4 mt-5">${s.title}</h2>
          <p class="body-base text-gray-500 mt-2">${s.body}</p>
        </div>`
          )
          .join("")}
      </div>
    </section>

    <section class="reveal-section section bg-gray-50">
      <div class="max-w-site mx-auto px-6 md:px-8 text-center max-w-xl">
        <h2 class="heading-3">Questions or Concerns?</h2>
        <p class="body-base text-gray-500 mt-3">Have a question about a community rule, amenity, or service? Contact your property management office or reach our resident support team.</p>
        <div class="mt-6 flex flex-wrap justify-center gap-4">
          <a href="contact-us.html" class="btn btn-primary">Contact Us</a>
          <a href="#" class="btn btn-secondary" data-placeholder-link>Download Community Guidelines PDF ${icon("download", "w-4 h-4")}</a>
        </div>
      </div>
    </section>
  </main>
  ${Footer()}`;
}

export function AvoidingRentalScamsPage() {
  const tips = [
    "Always verify the listing. Locate the property through the official BCGK Communities website and contact the community directly to confirm the apartment, pricing, availability, and leasing information.",
    "Be cautious of deals that seem too good to be true. Significantly below-market rent, unusually low deposits, or promises of immediate move-in with little documentation can be warning signs of a fraudulent listing.",
    "Never pay before verifying the property. Do not send rent, deposits, application fees, or other payments until you have confirmed the listing and are participating in the community's official leasing process.",
    "Be suspicious of unusual payment requests. Be extremely cautious if someone asks you to send money through gift cards, cryptocurrency, wire transfers, or peer-to-peer payment services outside of the community's official payment process.",
    "Protect your personal information. Never send Social Security numbers, banking information, identification documents, or other sensitive information through an unverified email, text, or online listing.",
    "Use the official application process. Rental applications should only be completed through the secure application process provided by the individual BCGK community.",
    "Verify who you're communicating with. Legitimate BCGK Communities team members will typically communicate from an email address ending in @bcgkcommunities.com or @bcgk.com.",
    "Watch for impersonators. Scammers may copy legitimate property photos, addresses, logos, employee names, and listing information to make fraudulent advertisements appear authentic.",
    "Be cautious of pressure tactics. Someone demanding immediate payment, refusing to show you the property, or insisting on text/social-media-only communication should raise concerns.",
    "Verify listings found on third-party marketplaces. If you discover one of our properties through Craigslist, Facebook Marketplace, or another third-party site, independently locate it through BCGK Communities first.",
    "When in doubt, stop and verify. If something doesn't feel right, do not send money or personal information. Contact the property directly using the information on our official website.",
  ];
  return `
  ${Header("avoiding-rental-scams.html")}
  <main id="main-content">
    ${Breadcrumbs([{ label: "Home", href: "index.html" }, { label: "Residents", href: "resident-portal.html" }, { label: "Avoiding Rental Scams", href: "avoiding-rental-scams.html" }])}

    <section class="reveal-section section-tight pt-10">
      <div class="max-w-site mx-auto px-6 md:px-8 text-center">
        ${Eyebrow("Residents")}
        <h1 class="heading-1 mt-3 max-w-3xl mx-auto">Avoiding Rental Scams</h1>
        <p class="body-lg text-gray-500 max-w-2xl mx-auto mt-5">Your safety matters to us. Fraudulent rental listings and impersonation scams are increasingly common online. If you find a BCGK Communities property advertised somewhere other than our website, always verify the listing with us before providing personal information or making a payment.</p>
      </div>
    </section>

    <section class="reveal-section section pt-6">
      <div class="max-w-site mx-auto px-6 md:px-8 max-w-3xl">
        <h2 class="heading-3 mb-6">Tips to Avoid Rental Scams</h2>
        <div class="flex flex-col gap-4">
          ${tips
            .map(
              (t) => `
          <div class="flex gap-3 items-start">
            <span class="icon-tile !w-8 !h-8 !rounded-lg shrink-0 !bg-brand-greenTint !text-brand-greenDeep">${icon("shield-check", "w-4 h-4")}</span>
            <p class="body-base text-gray-600 pt-1">${t}</p>
          </div>`
            )
            .join("")}
        </div>
      </div>
    </section>

    <section class="reveal-section section bg-gray-50">
      <div class="max-w-site mx-auto px-6 md:px-8 max-w-2xl text-center">
        <h2 class="heading-3">Think You've Encountered a Scam?</h2>
        <p class="body-base text-gray-500 mt-3">Stop communicating with the suspected scammer and do not send additional money or personal information. Save the listing, emails, text messages, and payment receipts. Suspected rental fraud can also be reported to local law enforcement and the Federal Trade Commission.</p>
        <a href="https://consumer.ftc.gov" target="_blank" rel="noopener noreferrer" class="btn btn-primary mt-5">Report Fraud to the FTC ${icon("external-link", "w-4 h-4")}</a>
      </div>
    </section>

    <section class="reveal-section section text-center">
      <div class="max-w-site mx-auto px-6 md:px-8 max-w-xl">
        <h2 class="heading-3">We're Here to Help</h2>
        <p class="body-base text-gray-500 mt-3">If you're unsure whether a listing or communication is legitimate, contact your community directly or reach BCGK Communities at ${EMAIL_GENERAL} or ${PHONE_DISPLAY}.</p>
      </div>
    </section>
  </main>
  ${Footer()}`;
}
