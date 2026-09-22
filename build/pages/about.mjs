import { icon } from "../lib.mjs";
import {
  Header,
  Footer,
  Breadcrumbs,
  Eyebrow,
  SectionHeading,
  Accordion,
  CTASection,
  LeadershipCard,
  Badge,
} from "../components.mjs";
import { FAQS, LEADERSHIP, AWARDS } from "../data.mjs";
import { PHONE_DISPLAY, PHONE_HREF } from "../nav.mjs";

export function OurStoryPage() {
  return `
  ${Header("about-our-story.html")}
  <main id="main-content">
    ${Breadcrumbs([{ label: "Home", href: "index.html" }, { label: "About Us", href: "about-our-story.html" }, { label: "Our Story", href: "about-our-story.html" }])}

    <section class="reveal-section section-tight pt-10">
      <div class="max-w-site mx-auto px-6 md:px-8 text-center">
        ${Eyebrow("Our Story")}
        <h1 class="heading-1 mt-3 max-w-3xl mx-auto">Building Better Communities Starts Here.</h1>
      </div>
    </section>

    <section class="reveal-section section pt-6">
      <div class="max-w-site mx-auto px-6 md:px-8 grid lg:grid-cols-2 gap-16">
        <div class="flex flex-col gap-10">
          <div>
            <h2 class="heading-3">Why we started</h2>
            <p class="body-lg text-gray-500 mt-3">BCGK Communities was built from an owner's perspective, with a firsthand understanding of what it takes to operate and grow multifamily communities. We saw an opportunity to bring greater accountability, higher standards, and a more forward-thinking approach to property management. What began with our own portfolio has evolved into a management platform built to bring that same level of care, discipline, and attention to every community we serve.</p>
          </div>
          <div>
            <h2 class="heading-3">A Modern Approach.</h2>
            <p class="body-lg text-gray-500 mt-3">As our communities have grown, so has our approach. We combine experienced people, disciplined operations, and modern technology to continuously improve how properties are managed. From leasing and resident experience to reporting, communication, and AI-powered tools, we embrace better ways of working when they create meaningful value for our clients and communities.</p>
            <p class="body-base text-gray-500 mt-3">Our philosophy remains simple: never stop improving. The trust our partners place in us pushes us to raise the standard, challenge conventional ways of working, and build communities positioned to thrive for years to come.</p>
          </div>
        </div>
        <img src="images/team/team-event-colorado.jpg" alt="The BCGK Communities team celebrating together at a real estate investing conference in Colorado" class="rounded-3xl w-full h-full object-cover max-h-[520px]" />
      </div>
    </section>

    <section class="reveal-section section bg-gray-50">
      <div class="max-w-site mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-8">
        <div class="card">
          <span class="icon-tile">${icon("home", "w-6 h-6")}</span>
          <h3 class="heading-4 mt-5">Built for Owners. Focused on Residents.</h3>
          <p class="body-base text-gray-500 mt-3">We believe the strongest communities create value for everyone they serve. For owners, that means disciplined operations, thoughtful decision-making, transparent communication, and a relentless focus on property performance. For residents, it means responsive service, well-maintained homes, and communities they're proud to call home.</p>
        </div>
        <div class="card">
          <span class="icon-tile">${icon("cpu", "w-6 h-6")}</span>
          <h3 class="heading-4 mt-5">Technology That Moves Us Forward</h3>
          <p class="body-base text-gray-500 mt-3">We embrace technology as a tool to make property management smarter, faster, and more effective. Technology doesn't replace great people or great service &mdash; it gives our teams the tools to spend less time on repetitive work and more time delivering meaningful value to our clients and residents.</p>
        </div>
      </div>
    </section>

    <section class="reveal-section section">
      <div class="max-w-site mx-auto px-6 md:px-8 text-center max-w-3xl">
        ${Eyebrow("What We Believe")}
        <p class="heading-3 mt-3 !font-medium">We believe great property management is built on high standards, accountability, transparency, and a commitment to continuous improvement. Every decision we make is guided by a simple goal: operate better, serve better, and create communities built to thrive.</p>
      </div>
    </section>

    <section class="reveal-section section bg-gray-50">
      <div class="max-w-site mx-auto px-6 md:px-8 max-w-3xl">
        ${SectionHeading({ eyebrow: "Frequently Asked Questions", title: "What owners ask us most.", align: "center" })}
        ${Accordion(FAQS, "our-story-faq")}
      </div>
    </section>

    ${CTASection({
      eyebrow: "Next Steps",
      title: "Trusted by Sacramento Owners",
      body: "Let's talk about your property.",
      primaryLabel: "Schedule a Call",
      primaryHref: "contact-us.html",
      secondaryLabel: PHONE_DISPLAY,
      secondaryHref: PHONE_HREF,
    })}
  </main>
  ${Footer()}`;
}

export function LeadershipPage() {
  const alex = LEADERSHIP.find((p) => p.spotlight);
  const rest = LEADERSHIP.filter((p) => !p.spotlight);
  return `
  ${Header("about-leadership.html")}
  <main id="main-content">
    ${Breadcrumbs([{ label: "Home", href: "index.html" }, { label: "About Us", href: "about-our-story.html" }, { label: "Leadership", href: "about-leadership.html" }])}

    <section class="reveal-section section-tight pt-10">
      <div class="max-w-site mx-auto px-6 md:px-8 text-center">
        ${Eyebrow("Leadership")}
        <h1 class="heading-1 mt-3 max-w-3xl mx-auto">Leadership isn't reflected in a title &mdash; it's a mentality.</h1>
        <p class="body-lg text-gray-500 max-w-2xl mx-auto mt-5">Ingrained into who we are and how we serve, every day.</p>
      </div>
    </section>

    <section class="reveal-section section pt-6">
      <div class="max-w-site mx-auto px-6 md:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <img src="images/headshots/${alex.slug}.jpg" alt="${alex.name}" class="rounded-3xl w-full max-w-sm mx-auto lg:mx-0 aspect-square object-cover" />
        <div>
          ${Badge("Spotlight")}
          <h2 class="heading-2 mt-3">${alex.name}</h2>
          <p class="text-brand-greenDeeper font-semibold mt-1">${alex.title}</p>
          <div class="mt-5 flex flex-col gap-4">
            ${alex.bio.map((p) => `<p class="body-base text-gray-500">${p}</p>`).join("")}
          </div>
        </div>
      </div>
    </section>

    <section class="reveal-section section">
      <div class="max-w-site mx-auto px-6 md:px-8 border-t border-ink/10 pt-16">
        ${SectionHeading({
          eyebrow: "Leadership Team",
          title: "Multifamily veterans with a hands-on approach.",
          body: "Our executive team takes a hands-on approach to managing properties, safeguarding your investments, and ensuring our strategy aligns with your needs, goals, and priorities. We hold ourselves and our teams to high expectations, and we're ready to partner with you through every challenge and triumph that multifamily ownership brings.",
          align: "center",
        })}
        <div class="flex flex-wrap justify-center gap-x-12 gap-y-14">
          ${rest.map((p) => LeadershipCard(p)).join("")}
        </div>
      </div>
    </section>

    <section class="reveal-section section on-dark bg-ink">
      <div class="max-w-site mx-auto px-6 md:px-8 text-center max-w-3xl">
        <p class="heading-3 text-white !font-medium">At the core of our accomplishments, success stories, and bold ambitions, there's a devoted team that's always raising the standards.</p>
      </div>
    </section>
  </main>
  ${Footer()}`;
}

export function AwardWinningPage() {
  return `
  ${Header("about-award-winning.html")}
  <main id="main-content">
    ${Breadcrumbs([{ label: "Home", href: "index.html" }, { label: "About Us", href: "about-our-story.html" }, { label: "Award Winning", href: "about-award-winning.html" }])}

    <section class="reveal-section section-tight pt-10">
      <div class="max-w-site mx-auto px-6 md:px-8 text-center">
        ${Eyebrow("Award Winning")}
        <h1 class="heading-1 mt-3 max-w-3xl mx-auto">Award-Winning Management. Built Around Community.</h1>
        <p class="body-lg text-gray-500 max-w-2xl mx-auto mt-5">Great property management is measured by the communities we create and the people we serve. We're proud to be recognized by the communities where we operate for the service, standards, and commitment our team brings every day.</p>
      </div>
    </section>

    <section class="reveal-section section pt-6">
      <div class="max-w-site mx-auto px-6 md:px-8">
        ${SectionHeading({ eyebrow: "2025 People's Choice Awards", title: "Recognized by the communities we serve.", align: "center" })}
        <img src="images/awards/best-of-orangevale-2025.png" alt="10th Annual People's Choice Award medallion from Orangevale View, naming BCGK Communities Best of Orangevale, 2025" class="w-[27rem] md:w-[33rem] mx-auto -mt-4 mb-12" />
        <div class="grid md:grid-cols-2 gap-6">
          ${AWARDS.map(
            (a) => `
          <div class="card text-center">
            <span class="icon-tile mx-auto !bg-brand-greenTint !text-brand-greenDeep">${icon(a.icon, "w-6 h-6")}</span>
            <h3 class="heading-4 mt-5">${a.title}</h3>
            <p class="body-base text-gray-500 mt-2">${a.body}</p>
          </div>`
          ).join("")}
        </div>
      </div>
    </section>

    <section class="reveal-section section bg-gray-50">
      <div class="max-w-site mx-auto px-6 md:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <img src="images/team/summerpalooza-booth.jpg" alt="BCGK team at Summer Palooza in Orangevale, CA" class="rounded-3xl w-full h-[380px] object-cover" />
        <div>
          <p class="body-lg text-gray-500">In 2025, BCGK Communities was proudly recognized in Orangevale's People's Choice Awards as <strong class="text-ink">Best Property Management Company</strong> and <strong class="text-ink">Best New Business (Under One Year)</strong>. For us, these awards represent more than recognition. They reflect the trust residents and the local community have placed in our team and our approach.</p>
        </div>
      </div>
    </section>

    <section class="reveal-section section">
      <div class="max-w-site mx-auto px-6 md:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div class="order-2 lg:order-1">
          <h2 class="heading-3">Excellence Starts with Our People</h2>
          <p class="body-lg text-gray-500 mt-3">Behind every well-run community is a team that cares about getting the details right. From our leasing professionals and community managers to our maintenance and operations teams, we set high expectations, encourage ownership, and give our people the tools and technology they need to deliver exceptional service.</p>
        </div>
        <img src="images/team/volunteering-orange-tree.jpg" alt="BCGK team members volunteering" class="order-1 lg:order-2 rounded-3xl w-full h-[340px] object-cover" />
      </div>
    </section>

    <section class="reveal-section section bg-gray-50">
      <div class="max-w-site mx-auto px-6 md:px-8 text-center max-w-3xl">
        <h2 class="heading-3">Raising the Standard of Property Management</h2>
        <p class="body-lg text-gray-500 mt-3">Awards are a milestone, not the destination. We continue to invest in our people, operating systems, technology, and resident experience to find better ways to manage our communities. That commitment to continuous improvement is at the heart of how BCGK Communities operates.</p>
      </div>
    </section>

    ${CTASection({
      title: "Communities Built to Thrive.",
      body: "We bring an award-winning approach, disciplined operations, and a commitment to exceptional service to every community entrusted to us.",
      primaryLabel: "Hire Us",
      primaryHref: "hire-us.html",
      secondaryLabel: "View Our Properties",
      secondaryHref: "live-with-us.html",
    })}
  </main>
  ${Footer()}`;
}
