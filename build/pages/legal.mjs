import { Header, Footer, Breadcrumbs, Eyebrow } from "../components.mjs";
import { EMAIL_GENERAL, PHONE_DISPLAY, PHONE_HREF } from "../nav.mjs";

function LegalLayout({ current, title, updated, intro, sectionsHtml }) {
  return `
  ${Header(current)}
  <main id="main-content">
    ${Breadcrumbs([{ label: "Home", href: "index.html" }, { label: title, href: current }])}
    <section class="reveal-section section-tight pt-10">
      <div class="max-w-site mx-auto px-6 md:px-8 max-w-3xl">
        ${Eyebrow("Legal")}
        <h1 class="heading-1 mt-3">${title}</h1>
        ${updated ? `<p class="text-sm text-gray-500 mt-3">Last Updated: ${updated}</p>` : ""}
        ${intro ? `<p class="body-lg text-gray-500 mt-5">${intro}</p>` : ""}
      </div>
    </section>
    <section class="reveal-section section pt-4">
      <div class="max-w-site mx-auto px-6 md:px-8 max-w-3xl prose-legal">
        ${sectionsHtml}
      </div>
    </section>
  </main>
  ${Footer()}`;
}

export function AccessibilityStatementPage() {
  return LegalLayout({
    current: "accessibility-statement.html",
    title: "Accessibility Statement",
    updated: null,
    intro:
      "BCGK Communities is committed to providing a website experience that is accessible and usable for everyone, including individuals with disabilities. We believe everyone should be able to access information about our communities, services, and resources online.",
    sectionsHtml: `
      <h2>Our Commitment to Accessibility</h2>
      <p>We strive to design, develop, and maintain the BCGK Communities website and the websites of our managed communities in accordance with recognized accessibility standards, including the Web Content Accessibility Guidelines (WCAG).</p>
      <p>We continually work to improve the accessibility and usability of our websites and evaluate opportunities to make our digital experiences easier to navigate and use.</p>
      <h2>Need Assistance?</h2>
      <p>If you experience difficulty accessing or navigating any part of our website, encounter an accessibility barrier, or need assistance accessing information about one of our communities or services, please contact us.</p>
      <p><strong>Email:</strong> <a href="mailto:${EMAIL_GENERAL}">${EMAIL_GENERAL}</a><br/><strong>Phone:</strong> <a href="${PHONE_HREF}">${PHONE_DISPLAY}</a></p>
      <p>We welcome feedback and will make reasonable efforts to provide the information, service, or assistance you need through an accessible alternative.</p>
    `,
  });
}

export function BrokerLicensesPage() {
  return LegalLayout({
    current: "broker-licenses-and-disclosures.html",
    title: "Broker Licenses and Disclosures",
    updated: null,
    intro: "BCGK Communities provides property management and real estate services in California in accordance with applicable state licensing requirements.",
    sectionsHtml: `
      <h2>California Real Estate License</h2>
      <p>BCGK Communities operates under a California real estate broker license issued by the California Department of Real Estate (DRE).</p>
      <p><strong>California DRE License #02416354</strong></p>
      <h2>Licensing Information</h2>
      <p>Licensing information can be independently verified through the California Department of Real Estate. Additional disclosures may be provided where required by applicable law or in connection with specific real estate or property management services.</p>
      <p><a href="https://www2.dre.ca.gov/PublicASP/pplinfo.asp" target="_blank" rel="noopener noreferrer">Verify License with California DRE</a></p>
      <h2>Questions?</h2>
      <p>If you have questions regarding BCGK Communities' licensing or brokerage information, please contact us at <a href="mailto:${EMAIL_GENERAL}">${EMAIL_GENERAL}</a> or <a href="${PHONE_HREF}">${PHONE_DISPLAY}</a>.</p>
    `,
  });
}

export function FairHousingPage() {
  return LegalLayout({
    current: "fair-housing-statement.html",
    title: "Fair Housing Statement",
    updated: null,
    intro:
      "BCGK Communities and the properties we manage are committed to providing equal housing opportunities and complying with all applicable federal, state, and local fair housing laws, including the Fair Housing Act.",
    sectionsHtml: `
      <h2>Equal Housing Opportunity</h2>
      <p>We are committed to providing housing opportunities without unlawful discrimination based on race, color, religion, sex, national origin, familial status, disability, or any other characteristic protected by applicable federal, state, or local law.</p>
      <h2>Reasonable Accommodations & Modifications</h2>
      <p>BCGK Communities is committed to providing reasonable accommodations and permitting reasonable modifications when required by applicable law to help individuals with disabilities have an equal opportunity to use and enjoy their homes and community spaces.</p>
      <h2>Questions or Assistance</h2>
      <p>If you have questions about fair housing, need assistance, or would like to request a reasonable accommodation or modification, please contact your property management team or BCGK Communities at <a href="mailto:${EMAIL_GENERAL}">${EMAIL_GENERAL}</a> or <a href="${PHONE_HREF}">${PHONE_DISPLAY}</a>.</p>
      <p><a href="https://www.hud.gov/helping-americans/fair-housing-act-overview" target="_blank" rel="noopener noreferrer">Learn More About Fair Housing</a></p>
    `,
  });
}

export function PrivacyPolicyPage() {
  return LegalLayout({
    current: "privacy-policy.html",
    title: "Privacy Policy",
    updated: "September 19, 2026",
    intro:
      "BCGK Communities respects your privacy and is committed to protecting the personal information entrusted to us. This Privacy Policy describes how we may collect, use, disclose, and protect information when you visit our websites, inquire about a property, apply for housing, become a resident, use our resident services, or otherwise interact with BCGK Communities.",
    sectionsHtml: `
      <h2>Information We Collect</h2>
      <p>We may collect personal information that you provide directly to us, information collected automatically when you use our websites and services, and information provided by third parties involved in the leasing and property management process, including:</p>
      <ul>
        <li>Name, mailing address, email address, and telephone number</li>
        <li>Date of birth and other identifying information</li>
        <li>Rental application and leasing information</li>
        <li>Current and previous addresses and rental history</li>
        <li>Employment and income information</li>
        <li>Payment and financial information</li>
        <li>Vehicle and parking information</li>
        <li>Pet information</li>
        <li>Maintenance requests and resident communications</li>
        <li>Information submitted through contact forms, guest cards, or property inquiries</li>
        <li>Website usage, IP address, browser, device, and similar technical information</li>
        <li>Marketing and communication preferences</li>
      </ul>
      <p>Certain leasing, screening, payment, and resident services may be provided through third-party platforms that maintain their own privacy policies.</p>
      <h2>How We Collect Information</h2>
      <p>We may collect information when you visit a BCGK Communities or individual community website, request information about a property, schedule a tour, submit a contact form or guest card, apply to rent an apartment, complete resident screening, sign or renew a lease, create or use a resident portal account, make a payment, submit a maintenance request, register for or attend a community event, or apply for employment with BCGK Communities.</p>
      <h2>How We Use Your Information</h2>
      <p>We may use personal information to operate our properties and provide property management, leasing, resident, and related services, including to respond to inquiries, process applications and screening, administer leases, manage accounts, process payments, provide maintenance and resident services, communicate important information, improve our websites and services, prevent fraud, and comply with applicable laws.</p>
      <h2>How We May Share Information</h2>
      <p>Information may be shared with property owners whose communities we manage, property management and leasing technology providers, screening and verification providers, payment processors, maintenance vendors, marketing and analytics providers, insurance providers, and government agencies or law enforcement when legally required. We may also disclose information in connection with a merger, acquisition, financing, or sale of assets.</p>
      <h2>Cookies & Website Analytics</h2>
      <p>Our websites may use cookies and similar technologies to remember preferences, understand how visitors interact with our websites, measure performance, and improve our digital services. Most web browsers allow you to control or disable cookies through your browser settings.</p>
      <h2>Third-Party Websites & Services</h2>
      <p>Our websites may link to or integrate with third-party services, including property management platforms, resident portals, application systems, payment services, mapping services, and social media platforms. These services operate under their own privacy policies, and BCGK Communities is not responsible for their practices.</p>
      <h2>Data Security</h2>
      <p>We use reasonable administrative, technical, and organizational safeguards designed to protect personal information against unauthorized access, disclosure, alteration, or destruction. No website, electronic communication, database, or internet transmission can be guaranteed to be completely secure.</p>
      <h2>Data Retention</h2>
      <p>We retain personal information for as long as reasonably necessary to provide our services, manage properties and resident relationships, fulfill contractual obligations, maintain business and financial records, resolve disputes, and comply with applicable legal and regulatory requirements.</p>
      <h2>Children's Privacy</h2>
      <p>Our websites and services are not directed toward children under the age of 13, and we do not knowingly collect personal information directly from children under 13 through our websites.</p>
      <h2>Your Privacy Rights</h2>
      <p>Depending on where you live and applicable law, you may have certain rights regarding your personal information, including the right to request access to, correction of, or deletion of certain personal information. We may need to verify your identity before processing a privacy request.</p>
      <h2>California Privacy Rights</h2>
      <p>California residents may have additional rights under the California Consumer Privacy Act, as amended by the California Privacy Rights Act, and other applicable California privacy laws. BCGK Communities will not unlawfully discriminate against you for exercising applicable privacy rights.</p>
      <h2>Changes to This Privacy Policy</h2>
      <p>We may update this Privacy Policy periodically to reflect changes to our practices, technologies, services, or legal requirements. When changes are made, we will update the "Last Updated" date at the top of this page.</p>
      <h2>Contact Us</h2>
      <p><strong>BCGK Communities</strong><br/>Email: <a href="mailto:${EMAIL_GENERAL}">${EMAIL_GENERAL}</a><br/>Phone: <a href="${PHONE_HREF}">${PHONE_DISPLAY}</a></p>
    `,
  });
}

export function RentersRightsPage() {
  return LegalLayout({
    current: "renters-rights-and-resources.html",
    title: "Renters’ Rights & Resources",
    updated: null,
    intro:
      "BCGK Communities is committed to helping residents understand their rights and responsibilities. Federal, state, and local laws may provide important protections and resources for renters. Use the resources below to find information applicable to the communities we manage in California.",
    sectionsHtml: `
      <h2>California Renter Resources</h2>
      <p>California residents have rights and responsibilities established under state and local law. The California Department of Real Estate provides a comprehensive guide covering rental agreements, security deposits, rent increases, repairs, landlord access, habitability, evictions, and other common rental housing topics.</p>
      <p><a href="https://www.dre.ca.gov/publications/ResourceGuidebook/" target="_blank" rel="noopener noreferrer">View California Tenant & Landlord Guide</a></p>
      <h2>Sacramento County</h2>
      <p>Residents of BCGK Communities located in Sacramento County can access the Sacramento County Resident's Rights Form for information regarding renter rights and responsibilities, habitability standards, maintenance and repairs, property access, retaliation protections, and local code enforcement resources.</p>
      <p><a href="https://s7d9.scene7.com/is/content/greystarprod/digital/pdfs/disclosures-licenses/resident-rights-responsibilities-form-ca-sacramento-county.pdf" target="_blank" rel="noopener noreferrer">View Sacramento County Resident Rights & Responsibilities</a></p>
      <h2>Kern County</h2>
      <p>Residents of BCGK Communities located in Kern County may be protected by applicable California state and local rental housing laws. Additional renter resources and local information may be available through Kern County and the local jurisdiction where your community is located.</p>
      <p><a href="https://www.dre.ca.gov/publications/ResourceGuidebook/" target="_blank" rel="noopener noreferrer">View California Renter Resources</a></p>
      <h2>Need Assistance?</h2>
      <p>If you have questions or concerns regarding your BCGK Community, please contact your property management team or BCGK Communities at <a href="mailto:${EMAIL_GENERAL}">${EMAIL_GENERAL}</a> or <a href="${PHONE_HREF}">${PHONE_DISPLAY}</a>.</p>
    `,
  });
}

export function TermsOfServicePage() {
  return LegalLayout({
    current: "terms-of-service.html",
    title: "Terms of Service",
    updated: "September 19, 2026",
    intro: null,
    sectionsHtml: `
      <h2>Acceptance of Terms</h2>
      <p>Welcome to BCGK Communities. By accessing or using our website, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our website or services. We reserve the right to modify these Terms at any time, and your continued use of the website constitutes acceptance of those changes.</p>
      <h2>Use of Website</h2>
      <p>You agree to use our website only for lawful purposes and in a manner that does not infringe the rights of others or restrict their use and enjoyment of the website. Prohibited activities include using the website in violation of applicable laws, attempting unauthorized access to our systems, transmitting viruses or malware, engaging in fraudulent or deceptive practices, harassing other users, and collecting personal information without consent.</p>
      <h2>Property Information</h2>
      <p>The property information displayed on our website is provided for informational purposes only. While we strive to ensure accuracy, we make no warranties or representations regarding the completeness, accuracy, or reliability of any information. Property availability, pricing, features, amenities, and other information are subject to change without notice. We recommend contacting the applicable community directly to verify current information before making any decisions.</p>
      <h2>Intellectual Property</h2>
      <p>All content on this website, including text, graphics, logos, images, and software, is the property of BCGK Communities or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works of any content without our express written permission.</p>
      <h2>User Submissions</h2>
      <p>By submitting any content, feedback, or information to us through our website, including through contact forms, you grant us a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, modify, and distribute such content for purposes related to our business operations.</p>
      <h2>Disclaimer of Warranties</h2>
      <p>Our website and services are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. We do not warrant that our website will be uninterrupted, error-free, or free from viruses or other harmful components.</p>
      <h2>Limitation of Liability</h2>
      <p>To the fullest extent permitted by law, BCGK Communities shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenues, data, or goodwill resulting from your use or inability to use our website.</p>
      <h2>Indemnification</h2>
      <p>You agree to indemnify, defend, and hold harmless BCGK Communities, its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses arising out of or in any way connected with your access to or use of our website or your violation of these Terms.</p>
      <h2>Third-Party Links</h2>
      <p>Our website may contain links to third-party websites or services that are not owned or controlled by BCGK Communities. We have no control over and assume no responsibility for the content, privacy policies, or practices of third-party websites or services.</p>
      <h2>Governing Law</h2>
      <p>These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. You agree to submit to the personal and exclusive jurisdiction of the courts located in California for the resolution of any disputes.</p>
      <h2>Termination</h2>
      <p>We reserve the right to terminate or suspend your access to our website at any time, without notice, for any reason, including if we believe you have violated these Terms.</p>
      <h2>Severability</h2>
      <p>If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.</p>
      <h2>Entire Agreement</h2>
      <p>These Terms, together with our Privacy Policy, constitute the entire agreement between you and BCGK Communities regarding your use of our website and supersede all prior agreements and understandings.</p>
      <h2>Contact Us</h2>
      <p><strong>BCGK Communities</strong><br/>Email: <a href="mailto:${EMAIL_GENERAL}">${EMAIL_GENERAL}</a><br/>Phone: <a href="${PHONE_HREF}">${PHONE_DISPLAY}</a></p>
    `,
  });
}
