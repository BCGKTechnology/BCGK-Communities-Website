import { icon } from "../lib.mjs";
import { Header, Footer, Breadcrumbs, Eyebrow, PropertyCard } from "../components.mjs";
import { PROPERTIES } from "../data.mjs";

const REGION_MAP = {
  "almond-heights": "Auburn",
  "lincoln-heights": "Auburn",
  "the-golden-lofts": "Sacramento",
  "the-grove-residences": "Orangevale",
  "woodrow-apartments": "Other Locations",
};

const REGIONS = ["All Communities", "Sacramento", "Auburn", "Orangevale", "Other Locations"];

export function LiveWithUsPage() {
  return `
  ${Header("live-with-us.html")}
  <main id="main-content">
    ${Breadcrumbs([{ label: "Home", href: "index.html" }, { label: "Live With Us", href: "live-with-us.html" }])}

    <section class="reveal-section section-tight pt-10">
      <div class="max-w-site mx-auto px-6 md:px-8 text-center">
        ${Eyebrow("Live With Us")}
        <h1 class="heading-1 mt-3 max-w-3xl mx-auto">Find Your Next Home</h1>
        <p class="body-lg text-gray-500 max-w-2xl mx-auto mt-5">Explore BCGK Communities across Northern California. From vibrant urban neighborhoods to quieter suburban communities, find a place that feels like home.</p>
      </div>
    </section>

    <section class="reveal-section section pt-6">
      <div class="max-w-site mx-auto px-6 md:px-8">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">
          <div class="flex flex-wrap gap-2" data-filter-group role="group" aria-label="Filter by region">
            ${REGIONS.map(
              (r, i) =>
                `<button type="button" class="filter-pill" data-filter-value="${r === "All Communities" ? "all" : r}" aria-pressed="${i === 0}">${r}</button>`
            ).join("")}
          </div>
          <div class="relative w-full lg:w-72">
            <label for="property-search" class="sr-only">Search by community name or city</label>
            ${icon("search", "w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400")}
            <input id="property-search" type="search" placeholder="Search by community or city" class="w-full pl-10 pr-4 py-2.5 rounded-full border border-ink/10 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green" />
          </div>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${PROPERTIES.map(
            (p) => `
          <div data-property-card data-region="${REGION_MAP[p.slug]}" data-name="${p.name}" data-city="${p.city}">
            ${PropertyCard(p)}
          </div>`
          ).join("")}
        </div>
        <p id="properties-empty" class="hidden text-center text-gray-500 py-16">No communities match your search. Try a different name or city.</p>
      </div>
    </section>
  </main>
  ${Footer()}`;
}

export function PropertyDetailPage(p) {
  const photos = Array.from({ length: p.photos }, (_, i) => `images/properties/${p.slug}/photo-${i + 1}.jpg`);
  return `
  ${Header("live-with-us.html")}
  <main id="main-content">
    ${Breadcrumbs([
      { label: "Home", href: "index.html" },
      { label: "Live With Us", href: "live-with-us.html" },
      { label: p.name, href: `property-${p.slug}.html` },
    ])}

    <section class="reveal-section section-tight pt-8">
      <div class="max-w-site mx-auto px-6 md:px-8">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p class="text-sm font-semibold uppercase tracking-wider text-brand-greenDeeper">${p.city} &middot; ${p.units}</p>
            <h1 class="heading-1 mt-2">${p.name}</h1>
            <p class="body-lg text-gray-500 mt-3 max-w-2xl">${p.summary}</p>
          </div>
          <a href="${p.website}" target="_blank" rel="noopener noreferrer" class="btn btn-primary shrink-0">Visit Community Website ${icon("external-link", "w-4 h-4")}</a>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 rounded-3xl overflow-hidden">
          <img src="${photos[0]}" alt="${p.name} photo 1" class="col-span-2 row-span-2 w-full h-full object-cover aspect-[4/3] md:aspect-auto" />
          ${photos
            .slice(1)
            .map((src, i) => `<img src="${src}" alt="${p.name} photo ${i + 2}" class="w-full h-full object-cover aspect-square" loading="lazy" />`)
            .join("")}
        </div>
      </div>
    </section>

    <section class="reveal-section section pt-4">
      <div class="max-w-site mx-auto px-6 md:px-8 grid lg:grid-cols-3 gap-14">
        <div class="lg:col-span-2 flex flex-col gap-10">
          <div>
            <h2 class="heading-3">${p.tagline}</h2>
            <p class="body-lg text-gray-500 mt-3">${p.intro}</p>
          </div>
          <div class="grid sm:grid-cols-2 gap-8">
            <div>
              <h3 class="heading-4 flex items-center gap-2">${icon("building-2", "w-5 h-5 text-brand-greenDeeper")} Community Amenities</h3>
              <ul class="mt-4 flex flex-col gap-2.5">
                ${p.amenities.map((a) => `<li class="flex items-start gap-2.5 text-sm text-gray-600"><span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-green shrink-0"></span>${a}</li>`).join("")}
              </ul>
            </div>
            <div>
              <h3 class="heading-4 flex items-center gap-2">${icon("key-round", "w-5 h-5 text-brand-greenDeeper")} Apartment Features</h3>
              <ul class="mt-4 flex flex-col gap-2.5">
                ${p.features.map((a) => `<li class="flex items-start gap-2.5 text-sm text-gray-600"><span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-green shrink-0"></span>${a}</li>`).join("")}
              </ul>
            </div>
          </div>
          <div class="card !bg-gray-50">
            <h3 class="heading-4">${p.neighborhood.heading}</h3>
            <p class="body-base text-gray-500 mt-2">${p.neighborhood.body}</p>
          </div>
        </div>

        <aside class="lg:sticky lg:top-28 h-fit flex flex-col gap-5">
          ${p.stat ? `
          <div class="card !bg-ink text-center">
            <p class="stat-value text-brand-green">${p.stat.value}</p>
            <p class="stat-label text-white/70 mt-1">${p.stat.label}</p>
          </div>` : ""}
          <div class="card">
            <h3 class="heading-4">Find Your Home at ${p.name}</h3>
            <p class="body-base text-gray-500 mt-2">Explore floor plans, current availability, photos, amenities, and leasing information on the official community website.</p>
            <a href="${p.website}" target="_blank" rel="noopener noreferrer" class="btn btn-primary mt-5 w-full justify-center">Visit Community Website ${icon("external-link", "w-4 h-4")}</a>
            <a href="contact-us.html" class="btn btn-secondary mt-3 w-full justify-center">Ask a Question</a>
          </div>
        </aside>
      </div>
    </section>

    <section class="reveal-section section bg-gray-50">
      <div class="max-w-site mx-auto px-6 md:px-8 text-center">
        <h2 class="heading-3">Explore More BCGK Communities</h2>
        <a href="live-with-us.html" class="btn btn-secondary mt-5">View All Properties ${icon("arrow-right", "w-4 h-4")}</a>
      </div>
    </section>
  </main>
  ${Footer()}`;
}
