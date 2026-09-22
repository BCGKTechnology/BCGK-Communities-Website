import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { page } from "./lib.mjs";
import { HomePage } from "./pages/home.mjs";
import { OurStoryPage, LeadershipPage, AwardWinningPage } from "./pages/about.mjs";
import { HireUsPage } from "./pages/hire-us.mjs";
import { LiveWithUsPage, PropertyDetailPage } from "./pages/live-with-us.mjs";
import { UpcomingEventsPage } from "./pages/upcoming-events.mjs";
import { CareersPage, WhyWeLoveItHerePage } from "./pages/work-with-us.mjs";
import {
  ResidentPortalPage,
  OwnerPortalPage,
  EmployeePortalPage,
  CommunityGuidelinesPage,
  AvoidingRentalScamsPage,
} from "./pages/portals.mjs";
import { ContactUsPage } from "./pages/contact.mjs";
import {
  AccessibilityStatementPage,
  BrokerLicensesPage,
  FairHousingPage,
  PrivacyPolicyPage,
  RentersRightsPage,
  TermsOfServicePage,
} from "./pages/legal.mjs";
import { PROPERTIES } from "./data.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "..", "dist");

const pages = [
  { file: "index.html", path: "/", title: "Communities Built to Thrive", description: "BCGK Communities combines operational excellence, modern technology, and exceptional service to create communities residents love and properties that perform.", content: HomePage() },
  { file: "about-our-story.html", path: "/about/our-story", title: "Our Story", description: "Building better communities starts here — learn how BCGK Communities was built from an owner's perspective.", content: OurStoryPage() },
  { file: "about-leadership.html", path: "/about/leadership", title: "Leadership", description: "Meet the leadership team behind BCGK Communities and our operating philosophy.", content: LeadershipPage() },
  { file: "about-award-winning.html", path: "/about/award-winning", title: "Award Winning", description: "BCGK Communities was recognized in Orangevale's 2025 People's Choice Awards for property management excellence.", content: AwardWinningPage() },
  { file: "hire-us.html", path: "/hire-us", title: "Hire Us", description: "Better management, measurable results — see how BCGK Communities improves performance across our managed portfolio.", content: HireUsPage() },
  { file: "live-with-us.html", path: "/live-with-us/view-our-properties", title: "View Our Properties", description: "Explore BCGK Communities across Northern California and find your next home.", content: LiveWithUsPage() },
  { file: "upcoming-events.html", path: "/live-with-us/upcoming-events", title: "Upcoming Events", description: "See upcoming resident events, activities, and community gatherings at your BCGK community.", content: UpcomingEventsPage() },
  { file: "careers.html", path: "/careers", title: "Careers", description: "Explore career opportunities with BCGK Communities and find your place with our growing team.", content: CareersPage() },
  { file: "why-we-love-it-here.html", path: "/work-with-us/why-we-love-it-here", title: "Why We Love It Here", description: "See what makes working at BCGK Communities different.", content: WhyWeLoveItHerePage() },
  { file: "resident-portal.html", path: "/residents/resident-portal", title: "Resident Portal", description: "Log in to your BCGK Communities Resident Portal to make payments, submit maintenance requests, and manage your account.", content: ResidentPortalPage() },
  { file: "community-guidelines.html", path: "/residents/community-guidelines", title: "Community Guidelines", description: "Review BCGK Communities resident guidelines covering pools, pets, parking, trash, and community conduct.", content: CommunityGuidelinesPage() },
  { file: "avoiding-rental-scams.html", path: "/residents/avoiding-rental-scams", title: "Avoiding Rental Scams", description: "Learn how to protect yourself from fraudulent rental listings and impersonation scams.", content: AvoidingRentalScamsPage() },
  { file: "owner-portal.html", path: "/owners/owner-portal", title: "Owner Portal", description: "Access your BCGK Communities Owner Portal for property financials, statements, and reports.", content: OwnerPortalPage() },
  { file: "employee-portal.html", path: "/employees/employee-portal", title: "Employee Portal", description: "Log in to the BCGK Communities employee portal.", content: EmployeePortalPage() },
  { file: "contact-us.html", path: "/contact-us", title: "Contact Us", description: "Get in touch with the BCGK Communities team.", content: ContactUsPage() },
  { file: "accessibility-statement.html", path: "/accessibility-statement", title: "Accessibility Statement", description: "BCGK Communities' commitment to an accessible website experience.", content: AccessibilityStatementPage() },
  { file: "broker-licenses-and-disclosures.html", path: "/broker-licenses-and-disclosures", title: "Broker Licenses and Disclosures", description: "BCGK Communities California real estate broker license and disclosure information.", content: BrokerLicensesPage() },
  { file: "fair-housing-statement.html", path: "/fair-housing-statement", title: "Fair Housing Statement", description: "BCGK Communities' commitment to equal housing opportunity.", content: FairHousingPage() },
  { file: "privacy-policy.html", path: "/privacy-policy", title: "Privacy Policy", description: "How BCGK Communities collects, uses, and protects personal information.", content: PrivacyPolicyPage() },
  { file: "renters-rights-and-resources.html", path: "/renters-rights-and-resources", title: "Renters' Rights & Resources", description: "Resources on renter rights and responsibilities in California.", content: RentersRightsPage() },
  { file: "terms-of-service.html", path: "/terms-of-service", title: "Terms of Service", description: "Terms governing use of the BCGK Communities website.", content: TermsOfServicePage() },
];

for (const p of PROPERTIES) {
  pages.push({
    file: `property-${p.slug}.html`,
    path: `/live-with-us/view-our-properties/${p.slug}`,
    title: p.name,
    description: p.summary,
    content: PropertyDetailPage(p),
  });
}

fs.mkdirSync(DIST, { recursive: true });

let count = 0;
for (const p of pages) {
  const html = page({ title: p.title, description: p.description, path: p.path, content: p.content });
  fs.writeFileSync(path.join(DIST, p.file), html, "utf8");
  count++;
}

console.log(`Built ${count} pages into ${DIST}`);
