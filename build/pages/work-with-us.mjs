import { icon } from "../lib.mjs";
import { Header, Footer, Breadcrumbs, Eyebrow, CTASection } from "../components.mjs";
import { EMAIL_CAREERS } from "../nav.mjs";

const OPEN_ROLES = [
  { title: "Community Manager", location: "Auburn, CA", type: "Full-Time" },
  { title: "Leasing Consultant", location: "Sacramento, CA", type: "Full-Time" },
  { title: "Maintenance Technician", location: "Orangevale, CA", type: "Full-Time" },
  { title: "Regional Property Coordinator", location: "Sacramento, CA", type: "Full-Time" },
];

export function CareersPage() {
  return `
  ${Header("careers.html")}
  <main id="main-content">
    ${Breadcrumbs([{ label: "Home", href: "index.html" }, { label: "Work With Us", href: "careers.html" }, { label: "Careers", href: "careers.html" }])}

    <section class="reveal-section section-tight pt-10">
      <div class="max-w-site mx-auto px-6 md:px-8 text-center">
        ${Eyebrow("Careers")}
        <h1 class="heading-1 mt-3 max-w-3xl mx-auto">Find Your Place at BCGK</h1>
        <p class="body-lg text-gray-500 max-w-2xl mx-auto mt-5">We're always looking for smart, driven people who take ownership, solve problems, and care about the communities we serve. Explore our current opportunities and find where you can grow with us.</p>
      </div>
    </section>

    <section class="reveal-section section pt-6">
      <div class="max-w-site mx-auto px-6 md:px-8">
        <div class="flex items-center justify-between mb-8 flex-wrap gap-3">
          <h2 class="heading-3">Open Positions</h2>
          <span class="badge bg-gray-100 text-gray-700">${icon("info", "w-3.5 h-3.5 mr-1 inline -mt-0.5")}Live listings via Indeed/LinkedIn coming soon</span>
        </div>
        <div class="grid sm:grid-cols-2 gap-5">
          ${OPEN_ROLES.map(
            (r) => `
          <div class="card card-hover flex items-center justify-between gap-4">
            <div class="min-w-0">
              <h3 class="heading-4">${r.title}</h3>
              <p class="text-sm text-gray-500 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span class="flex items-center gap-1">${icon("map-pin", "w-3.5 h-3.5")}${r.location}</span>
                <span class="flex items-center gap-1">${icon("briefcase", "w-3.5 h-3.5")}${r.type}</span>
              </p>
            </div>
            <span class="btn btn-secondary shrink-0 !py-2 !px-4 text-sm pointer-events-none">View Role</span>
          </div>`
          ).join("")}
        </div>
        <p class="form-note mt-4">Placeholder listings shown for layout &mdash; this section will pull live openings from Indeed/LinkedIn once connected.</p>
      </div>
    </section>

    ${CTASection({
      eyebrow: "Don't See the Right Role?",
      title: "We're always looking ahead.",
      body: `We're growing, and new opportunities are always on the horizon. If you believe there's a role you could play in helping BCGK grow, we'd love to hear from you. Send your resume and a brief introduction to ${EMAIL_CAREERS}.`,
      primaryLabel: "Email Us Your Resume",
      primaryHref: `mailto:${EMAIL_CAREERS}`,
      secondaryLabel: "Why We Love It Here",
      secondaryHref: "why-we-love-it-here.html",
    })}
  </main>
  ${Footer()}`;
}

export function WhyWeLoveItHerePage() {
  const points = [
    { icon: "rocket", title: "Do Great Work. Grow With Us.", body: "BCGK is growing, and we want our people to grow right alongside it. Take on new challenges, develop your skills, and help shape what we build next." },
    { icon: "lightbulb", title: "Your Ideas Matter", body: "Good ideas don't need a certain title. We value people who speak up, solve problems, and find better ways to get things done." },
    { icon: "smile", title: "Serious About the Work. Not Ourselves.", body: "We work hard, move quickly, and hold ourselves to a high standard, but we believe work should still be enjoyable and the people around you should make it better." },
  ];
  return `
  ${Header("why-we-love-it-here.html")}
  <main id="main-content">
    ${Breadcrumbs([{ label: "Home", href: "index.html" }, { label: "Work With Us", href: "careers.html" }, { label: "Why We Love It Here", href: "why-we-love-it-here.html" }])}

    <section class="reveal-section section-tight pt-10">
      <div class="max-w-site mx-auto px-6 md:px-8 text-center">
        ${Eyebrow("Life at BCGK")}
        <h1 class="heading-1 mt-3 max-w-3xl mx-auto">Why We Love It Here</h1>
        <p class="body-lg text-gray-500 max-w-2xl mx-auto mt-5">We're building a different kind of property management company. One where great people are trusted to take ownership, bring new ideas to the table, and make a real impact.</p>
      </div>
    </section>

    <section class="reveal-section section pt-6">
      <div class="max-w-site mx-auto px-6 md:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div class="grid grid-cols-2 gap-4">
          <img src="images/team/american-river-team.jpg" alt="BCGK team outing" class="rounded-2xl aspect-square object-cover" />
          <img src="images/team/volunteering-orange-tree.jpg" alt="BCGK team volunteering" class="rounded-2xl aspect-square object-cover mt-8" />
        </div>
        <div class="flex flex-col gap-8">
          ${points
            .map(
              (p) => `
          <div class="flex gap-4">
            <span class="icon-tile shrink-0">${icon(p.icon, "w-6 h-6")}</span>
            <div>
              <h3 class="heading-4">${p.title}</h3>
              <p class="body-base text-gray-500 mt-1">${p.body}</p>
            </div>
          </div>`
            )
            .join("")}
        </div>
      </div>
    </section>

    ${CTASection({
      title: "Find Your Place at BCGK",
      body: "If you're proactive, curious, and ready to make an impact, we'd love to see what you bring to the team.",
      primaryLabel: "Explore Open Positions",
      primaryHref: "careers.html",
    })}
  </main>
  ${Footer()}`;
}
