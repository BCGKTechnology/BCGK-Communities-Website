import { icon } from "../lib.mjs";
import { Header, Footer, Breadcrumbs, Eyebrow, EventCard, Modal } from "../components.mjs";
import { EVENTS } from "../data.mjs";

const COMMUNITIES = ["All Communities", "Almond Heights", "Lincoln Heights", "The Golden Lofts", "The Grove Residences", "Woodrow Apartments"];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function UpcomingEventsPage() {
  return `
  ${Header("upcoming-events.html")}
  <main id="main-content">
    ${Breadcrumbs([{ label: "Home", href: "index.html" }, { label: "Live With Us", href: "live-with-us.html" }, { label: "Upcoming Events", href: "upcoming-events.html" }])}

    <section class="reveal-section section-tight pt-10">
      <div class="max-w-site mx-auto px-6 md:px-8 text-center">
        ${Eyebrow("What's Happening")}
        <h1 class="heading-1 mt-3 max-w-3xl mx-auto">Upcoming Events</h1>
        <p class="body-lg text-gray-500 max-w-2xl mx-auto mt-5">There's always something happening at BCGK Communities. Explore upcoming resident events, activities, and community gatherings happening at your property.</p>
      </div>
    </section>

    <section class="reveal-section section pt-6">
      <div class="max-w-site mx-auto px-6 md:px-8">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">
          <div class="flex flex-wrap gap-2" role="group" aria-label="Filter by community">
            ${COMMUNITIES.map(
              (c, i) =>
                `<button type="button" class="filter-pill" data-community-filter="${c === "All Communities" ? "all" : c}" aria-pressed="${i === 0}">${c}</button>`
            ).join("")}
          </div>
          <div class="view-toggle shrink-0" role="group" aria-label="Switch view">
            <button type="button" class="view-toggle-btn" data-view-toggle="calendar" aria-pressed="true">${icon("calendar-days", "w-4 h-4 inline -mt-0.5 mr-1")}Calendar</button>
            <button type="button" class="view-toggle-btn" data-view-toggle="list" aria-pressed="false">${icon("list", "w-4 h-4 inline -mt-0.5 mr-1")}List</button>
          </div>
        </div>

        <div id="calendar-view" class="card !p-4 md:!p-8">
          <div class="flex items-center justify-between mb-6">
            <button type="button" id="calendar-prev" class="btn-icon" aria-label="Previous month">${icon("chevron-left", "w-5 h-5")}</button>
            <h2 id="calendar-month-label" class="heading-4" aria-live="polite">Month Year</h2>
            <button type="button" id="calendar-next" class="btn-icon" aria-label="Next month">${icon("chevron-right", "w-5 h-5")}</button>
          </div>
          <div class="calendar-grid mb-1">
            ${WEEKDAYS.map((d) => `<div class="calendar-weekday">${d}</div>`).join("")}
          </div>
          <div class="calendar-grid" id="calendar-days"></div>
        </div>

        <div id="list-view" class="hidden flex-col gap-3">
          <div id="event-list" class="flex flex-col gap-3"></div>
        </div>
      </div>
    </section>

    <section class="reveal-section section bg-gray-50">
      <div class="max-w-site mx-auto px-6 md:px-8">
        ${Eyebrow("Quick Overview")}
        <h2 class="heading-2 mt-2 mb-10">Prefer a quick overview? Browse what's next.</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          ${EVENTS.slice(0, 6)
            .map(
              (e) => `
          <button type="button" class="card card-hover text-left w-full" data-event-trigger data-event-id="${e.id}">
            <p class="text-xs font-semibold uppercase tracking-wider text-brand-greenDeeper">${e.community}</p>
            <h3 class="heading-4 mt-2">${e.name}</h3>
            <p class="text-sm text-gray-500 mt-2">${new Date(e.date + "T00:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric" })} &middot; ${e.time}</p>
            <p class="text-sm text-gray-500 mt-1">${e.location}</p>
          </button>`
            )
            .join("")}
        </div>
      </div>
    </section>

    <section class="reveal-section section text-center">
      <div class="max-w-site mx-auto px-6 md:px-8 max-w-2xl">
        <h2 class="heading-3">Don't Miss What's Next</h2>
        <p class="body-lg text-gray-500 mt-3">Check back regularly for new resident events, community activities, holiday celebrations, and other ways to connect with your neighbors.</p>
      </div>
    </section>
  </main>
  ${Footer()}
  ${Modal({ id: "event-modal" })}
  <script id="events-data" type="application/json">${JSON.stringify(EVENTS)}</script>`;
}
