// Shared navigation + footer link data for BCGK Communities site

// The live production domain. Social/messaging link-preview crawlers
// (iMessage, Slack, Facebook, etc.) need a fully-qualified, absolute URL
// for og:image and og:url -- a relative path silently fails to produce a
// thumbnail in most of them. UPDATE THIS the moment a different domain
// (e.g. a custom bcgkcommunities.com domain) becomes the live one.
export const SITE_URL = "https://bcgkcommunities.com";

export const PHONE_DISPLAY = "(916) 500-0807";
export const PHONE_HREF = "tel:+19165000807";
export const EMAIL_GENERAL = "customerservice@bcgkcommunities.com";
export const EMAIL_CAREERS = "careers@bcgkcommunities.com";
export const EMAIL_CONTACT_1 = "alex@bcgk.com";
export const EMAIL_CONTACT_2 = "chuck@bcgk.com";

export const NAV = [
  { label: "Home", href: "index.html" },
  {
    label: "About Us",
    href: "about-our-story.html",
    children: [
      { label: "Our Story", href: "about-our-story.html" },
      { label: "Leadership", href: "about-leadership.html" },
      { label: "Award Winning", href: "about-award-winning.html" },
    ],
  },
  {
    label: "Live With Us",
    href: "live-with-us.html",
    children: [
      { label: "View Our Properties", href: "live-with-us.html" },
      { label: "Upcoming Events", href: "upcoming-events.html" },
    ],
  },
  { label: "Hire Us", href: "hire-us.html" },
  {
    label: "Work With Us",
    href: "careers.html",
    children: [
      { label: "Careers", href: "careers.html" },
      { label: "Why We Love It Here", href: "why-we-love-it-here.html" },
    ],
  },
  {
    label: "Residents",
    href: "resident-portal.html",
    children: [
      { label: "Resident Portal", href: "resident-portal.html" },
      { label: "Community Guidelines", href: "community-guidelines.html" },
      { label: "Avoiding Rental Scams", href: "avoiding-rental-scams.html" },
    ],
  },
  { label: "Contact", href: "contact-us.html" },
];

export const FOOTER_COLUMNS = [
  {
    heading: "Company",
    links: [
      { label: "Our Story", href: "about-our-story.html" },
      { label: "Leadership", href: "about-leadership.html" },
      { label: "Award Winning", href: "about-award-winning.html" },
      { label: "Hire Us", href: "hire-us.html" },
      { label: "Careers", href: "careers.html" },
      { label: "Why We Love It Here", href: "why-we-love-it-here.html" },
    ],
  },
  {
    heading: "Communities",
    links: [
      { label: "View Our Properties", href: "live-with-us.html" },
      { label: "Upcoming Events", href: "upcoming-events.html" },
      { label: "Almond Heights", href: "property-almond-heights.html" },
      { label: "Lincoln Heights", href: "property-lincoln-heights.html" },
      { label: "The Golden Lofts", href: "property-the-golden-lofts.html" },
      { label: "The Grove Residences", href: "property-the-grove-residences.html" },
      { label: "Woodrow Apartments", href: "property-woodrow-apartments.html" },
    ],
  },
  {
    heading: "Portals",
    links: [
      { label: "Resident Portal", href: "resident-portal.html" },
      { label: "Owner Portal", href: "owner-portal.html" },
      { label: "Employee Portal", href: "employee-portal.html" },
      { label: "Community Guidelines", href: "community-guidelines.html" },
      { label: "Avoiding Rental Scams", href: "avoiding-rental-scams.html" },
      { label: "Renters' Rights & Resources", href: "renters-rights-and-resources.html" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Accessibility Statement", href: "accessibility-statement.html" },
      { label: "Broker Licenses & Disclosures", href: "broker-licenses-and-disclosures.html" },
      { label: "Fair Housing Statement", href: "fair-housing-statement.html" },
      { label: "Privacy Policy", href: "privacy-policy.html" },
      { label: "Terms of Service", href: "terms-of-service.html" },
    ],
  },
];
