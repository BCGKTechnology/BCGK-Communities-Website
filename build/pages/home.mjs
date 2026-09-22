import { icon } from "../lib.mjs";
import {
  Header,
  Footer,
  Eyebrow,
  SectionHeading,
  FeatureCard,
  StatTile,
  LeadershipCard,
  CTASection,
  ContactForm,
  Marquee,
} from "../components.mjs";
import { WHAT_WE_PROVIDE } from "../data.mjs";
import { EMAIL_CONTACT_1, EMAIL_CONTACT_2 } from "../nav.mjs";

const MARQUEE_ITEMS = [
  "OPERATIONAL EXCELLENCE",
  "MODERN TECHNOLOGY",
  "EXCEPTIONAL SERVICE",
  "SACRAMENTO",
  "AUBURN",
  "ORANGEVALE",
  "AWARD-WINNING MANAGEMENT",
];

export function HomePage() {
  return `
  ${Header("index.html", { animateLogo: true })}
  <main id="main-content">

    <section class="reveal-section hero-photo">
      <img src="images/properties/the-golden-lofts/hero-dusk.jpg" alt="" aria-hidden="true" class="hero-bg is-active" />
      <img src="images/properties/almond-heights/hero-kitchen.jpg" alt="" aria-hidden="true" class="hero-bg" />
      <img src="images/properties/almond-heights/hero-exterior.jpg" alt="" aria-hidden="true" class="hero-bg" />
      <img src="images/properties/the-grove-residences/hero-kitchen.jpg" alt="" aria-hidden="true" class="hero-bg" />
      <div class="hero-content max-w-site mx-auto px-6 md:px-8 flex flex-col justify-end pb-16 md:pb-20 pt-32">
        <h1 class="heading-1 max-w-4xl text-white">Communities Built to Thrive.</h1>
        <div class="mt-9">
          <a href="live-with-us.html" class="btn btn-accent">Explore Our Communities ${icon("arrow-right", "w-4 h-4")}</a>
        </div>
      </div>
    </section>

    ${Marquee(MARQUEE_ITEMS)}

    <section class="reveal-section on-dark bg-ink section-tight">
      <div class="max-w-site mx-auto px-6 md:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          ${StatTile({ value: "+66%", label: "Almond Heights Rent Roll Since Acquisition", onDark: true })}
          ${StatTile({ value: "+39%", label: "Lincoln Heights Rent Roll Since Acquisition", onDark: true })}
          ${StatTile({ value: "100%", label: "Lincoln Heights Occupancy", onDark: true })}
          ${StatTile({ value: "+40.8%", label: "Golden Lofts Residential Rent Roll", onDark: true })}
        </div>
      </div>
    </section>

    <section class="reveal-section section">
      <div class="max-w-site mx-auto px-6 md:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          ${Eyebrow("Why BCGK Communities")}
          <h2 class="heading-2 mt-2">High standards. Real accountability. Better results.</h2>
          <p class="body-lg text-gray-500 mt-5">BCGK Communities is a modern property management company built around operational excellence, high standards, and exceptional service. We believe great property management starts with disciplined operations and a leasing team held to a higher standard, supported by modern technology and AI tools that help us work smarter, move faster, and make better decisions.</p>
          <p class="body-base text-gray-500 mt-4">Everything we do, from improving property performance to creating better resident experiences, is ultimately in service of our clients and the communities they entrust us to manage.</p>
          <a href="about-our-story.html" class="btn btn-secondary mt-7">Learn More ${icon("arrow-right", "w-4 h-4")}</a>
        </div>
        <div class="relative">
          <img src="images/team/alex-tour-model-unit.jpg" alt="BCGK team member giving a tour of a model unit" class="rounded-3xl w-full h-[420px] object-cover" />
          <div class="absolute -bottom-6 -left-6 hidden md:block card !p-4 !rounded-2xl bg-white">
            <p class="text-xs text-gray-500">Our approach</p>
            <p class="font-semibold text-ink">We Manage Like Owners.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="reveal-section section bg-gray-50">
      <div class="max-w-site mx-auto px-6 md:px-8">
        ${SectionHeading({
          eyebrow: "Our Approach",
          title: "Partnerships built on transparency and results.",
          body: "Our approach starts with putting our clients and their communities first. We build every partnership on transparent communication, a deep understanding of each property's unique needs, and tailored solutions designed to drive long-term success.",
          align: "center",
        })}
        <p class="body-base text-gray-500 max-w-3xl mx-auto text-center -mt-8">By combining disciplined operations with forward-thinking technology, AI, and evolving industry best practices, we continuously look for better ways to improve performance and create thriving communities where residents want to stay.</p>
      </div>
    </section>

    <section class="reveal-section section on-dark bg-ink relative overflow-hidden text-center">
      <div class="max-w-site mx-auto px-6 md:px-8 relative z-10">
        <span class="inline-block text-brand-green leading-none" style="font-size: 4rem; font-family: Georgia, serif;" aria-hidden="true">&ldquo;</span>
        <p class="text-3xl md:text-5xl font-semibold text-white leading-tight tracking-tight max-w-4xl mx-auto -mt-4">We don't just manage properties. We build <span class="text-brand-green">communities people are proud to call home.</span></p>
      </div>
    </section>

    <section class="reveal-section section">
      <div class="max-w-site mx-auto px-6 md:px-8">
        ${SectionHeading({
          eyebrow: "Award Winning",
          title: "Recognized for exceptional execution.",
          body: "Our award-winning approach to property management is built on a simple principle: exceptional results come from exceptional execution. We combine rigorous operational standards, high-performing leasing teams, and modern technology to create communities that operate efficiently and deliver lasting value.",
          align: "center",
        })}
        <div class="flex justify-center">
          <a href="about-award-winning.html" class="btn btn-secondary">See Our Awards ${icon("arrow-right", "w-4 h-4")}</a>
        </div>
      </div>
    </section>

    <section class="reveal-section section on-dark bg-ink">
      <div class="max-w-site mx-auto px-6 md:px-8">
        ${SectionHeading({
          eyebrow: "What We Provide",
          title: "Full-service management, end to end.",
          align: "center",
          onDark: true,
        })}
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          ${WHAT_WE_PROVIDE.map(
            (item) => `
          <div class="card !bg-white/[0.04] !border-white/10">
            <span class="icon-tile icon-tile-dark">${icon(item.icon, "w-6 h-6")}</span>
            <h3 class="heading-4 text-white mt-5">${item.title}</h3>
            <p class="body-base text-white/60 mt-2">${item.body}</p>
          </div>`
          ).join("")}
        </div>
      </div>
    </section>

    <section class="reveal-section section">
      <div class="max-w-site mx-auto px-6 md:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <img src="images/team/team-outing-san-diego.jpg" alt="The BCGK Communities team celebrating together on a boat outing in San Diego" class="order-2 lg:order-1 rounded-3xl w-full h-[420px] object-cover" />
        <div class="order-1 lg:order-2">
          ${Eyebrow("Get to Know Us")}
          <h2 class="heading-2 mt-2">A team built on collaboration and ownership.</h2>
          <p class="body-lg text-gray-500 mt-5">We are a team of professionals who deliver exceptional service and build long, trusting relationships with our residents. We create an exciting and inspiring professional environment for employees to excel through collaboration and innovation, and we grow value and minimize risk for investors, ensuring superior performance and market leadership.</p>
          <a href="about-leadership.html" class="btn btn-secondary mt-7">Meet Our Leadership ${icon("arrow-right", "w-4 h-4")}</a>
        </div>
      </div>
    </section>

    ${CTASection({
      eyebrow: "Grow With the Best",
      title: "Careers with real growth potential.",
      body: "Whether you're changing careers, a recent college graduate, or a seasoned professional, BCGK Communities offers career opportunities with unsurpassed growth potential in a collaborative and entrepreneurial environment.",
      primaryLabel: "Explore Careers",
      primaryHref: "careers.html",
      secondaryLabel: "Why We Love It Here",
      secondaryHref: "why-we-love-it-here.html",
    })}

    <section class="reveal-section section bg-gray-50">
      <div class="max-w-site mx-auto px-6 md:px-8 grid lg:grid-cols-2 gap-12">
        <div>
          ${Eyebrow("Connect With Us")}
          <h2 class="heading-2 mt-2">Questions, concerns, or interested in collaborating?</h2>
          <p class="body-lg text-gray-500 mt-5">Submit your contact information below and our team will follow up with you directly.</p>
          <div class="mt-8 flex flex-col gap-3 text-sm text-gray-600">
            <p class="flex items-start gap-2"><span class="shrink-0 mt-[3px]">${icon("mail", "w-4 h-4 text-brand-greenDeeper")}</span><span class="min-w-0">Routed to our team at <a href="mailto:${EMAIL_CONTACT_1}" class="underline">${EMAIL_CONTACT_1}</a> &amp; <a href="mailto:${EMAIL_CONTACT_2}" class="underline">${EMAIL_CONTACT_2}</a></span></p>
          </div>
        </div>
        <div>${ContactForm({ id: "home-contact" })}</div>
      </div>
    </section>

  </main>
  ${Footer()}`;
}
