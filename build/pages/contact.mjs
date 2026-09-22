import { icon } from "../lib.mjs";
import { Header, Footer, Breadcrumbs, Eyebrow, ContactForm } from "../components.mjs";
import { EMAIL_GENERAL, PHONE_DISPLAY, PHONE_HREF } from "../nav.mjs";

export function ContactUsPage() {
  return `
  ${Header("contact-us.html")}
  <main id="main-content">
    ${Breadcrumbs([{ label: "Home", href: "index.html" }, { label: "Contact Us", href: "contact-us.html" }])}

    <section class="reveal-section section">
      <div class="max-w-site mx-auto px-6 md:px-8 grid lg:grid-cols-2 gap-16">
        <div>
          ${Eyebrow("Connect With Us")}
          <h1 class="heading-1 mt-3">Let's work together</h1>
          <p class="body-lg text-gray-500 mt-5">Interested in collaborating, curious about a community, or need support? Submit your contact information below and our team will follow up with you directly.</p>

          <div class="flex flex-col gap-4 mt-9">
            <div class="flex items-center gap-3">
              <span class="icon-tile">${icon("phone", "w-5 h-5")}</span>
              <div><p class="text-sm text-gray-500">Call us</p><a href="${PHONE_HREF}" class="font-semibold text-ink">${PHONE_DISPLAY}</a></div>
            </div>
            <div class="flex items-center gap-3">
              <span class="icon-tile">${icon("mail", "w-5 h-5")}</span>
              <div class="min-w-0"><p class="text-sm text-gray-500">Email our team</p><a href="mailto:${EMAIL_GENERAL}" class="font-semibold text-ink">${EMAIL_GENERAL}</a></div>
            </div>
          </div>
        </div>
        <div>${ContactForm({ id: "contact-us-form" })}</div>
      </div>
    </section>
  </main>
  ${Footer()}`;
}
