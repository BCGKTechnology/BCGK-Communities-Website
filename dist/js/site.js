(function () {
  "use strict";

  /* ---------------- Scroll-triggered section reveal ---------------- */
  var prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if ("IntersectionObserver" in window) {
    var revealSections = document.querySelectorAll(".reveal-section");
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealSections.forEach(function (section) { revealObserver.observe(section); });
  } else {
    document.querySelectorAll(".reveal-section").forEach(function (s) { s.classList.add("is-visible"); });
  }

  /* ---------------- Animated stat counters ---------------- */
  function animateStat(el) {
    var raw = el.textContent.trim();
    var match = raw.match(/^([+\-]?)(\d[\d,]*(?:\.\d+)?)(.*)$/);
    if (!match) return;
    var prefix = match[1];
    var numStr = match[2].replace(/,/g, "");
    var suffix = match[3];
    var target = parseFloat(numStr);
    if (isNaN(target)) return;
    var decimals = numStr.indexOf(".") !== -1 ? numStr.split(".")[1].length : 0;

    if (prefersReducedMotion) {
      el.textContent = raw;
      return;
    }

    var duration = 1400;
    var start = null;
    function easeOutExpo(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }
    function step(ts) {
      if (start === null) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = easeOutExpo(progress);
      var current = target * eased;
      el.textContent = prefix + current.toFixed(decimals) + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = raw;
      }
    }
    requestAnimationFrame(step);
  }

  var statEls = document.querySelectorAll(".stat-value");
  if (statEls.length) {
    if ("IntersectionObserver" in window) {
      var statObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateStat(entry.target);
              statObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      statEls.forEach(function (el) { statObserver.observe(el); });
    }
  }

  /* ---------------- Home hero background slideshow ---------------- */
  var heroSlides = document.querySelectorAll(".hero-photo .hero-bg");
  if (heroSlides.length > 1 && !prefersReducedMotion) {
    var heroIndex = 0;
    heroSlides.forEach(function (slide, i) { if (i !== 0) slide.classList.remove("is-active"); });
    setInterval(function () {
      var current = heroSlides[heroIndex];
      heroIndex = (heroIndex + 1) % heroSlides.length;
      var next = heroSlides[heroIndex];
      next.classList.add("is-active");
      current.classList.remove("is-active");
    }, 5000);
  }
  /* prefers-reduced-motion, or a single photo: leave the first .hero-bg
     as the only visible slide (its "is-active" class in the markup already
     covers this) and never start the interval. */

  /* ---------------- Mobile nav ---------------- */
  var trigger = document.getElementById("mobile-nav-trigger");
  var closeBtn = document.getElementById("mobile-nav-close");
  var panel = document.getElementById("mobile-nav");
  var backdrop = document.getElementById("mobile-nav-backdrop");
  var lastFocused = null;

  function openMobileNav() {
    if (!panel) return;
    lastFocused = document.activeElement;
    panel.classList.add("open");
    backdrop.classList.add("open");
    panel.setAttribute("aria-hidden", "false");
    trigger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    var firstLink = panel.querySelector("a, button");
    if (firstLink) firstLink.focus();
  }
  function closeMobileNav() {
    if (!panel) return;
    panel.classList.remove("open");
    backdrop.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");
    trigger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }
  if (trigger) trigger.addEventListener("click", openMobileNav);
  if (closeBtn) closeBtn.addEventListener("click", closeMobileNav);
  if (backdrop) backdrop.addEventListener("click", closeMobileNav);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && panel && panel.classList.contains("open")) closeMobileNav();
  });

  /* ---------------- Desktop dropdown (hover-intent + click + keyboard) ---------------- */
  // Hovering a top-level nav item with a dropdown opens it immediately and keeps
  // it open -- including while the cursor crosses the small gap between the
  // trigger and the panel -- until the visitor either clicks a link inside it
  // (normal navigation), hovers a different top-level nav item (which closes
  // this one and opens that one), or moves off the nav entirely. A short
  // close-delay (rather than closing the instant the cursor leaves the group)
  // is what makes the gap-crossing and "moving toward the panel" cases work
  // reliably; genuine "hovered somewhere else" is still whatever's left once
  // the mouse settles, since a new mouseenter (on this group or another one)
  // always cancels the pending close first.
  var dropdownCloseTimers = new WeakMap();
  var allNavGroups = document.querySelectorAll(".nav-item.group");

  function closeDropdownGroup(g) {
    var pending = dropdownCloseTimers.get(g);
    if (pending) { clearTimeout(pending); dropdownCloseTimers.delete(g); }
    g.classList.remove("open");
    var b = g.querySelector("[data-dropdown-trigger]");
    if (b) b.setAttribute("aria-expanded", "false");
  }
  function openDropdownGroup(g) {
    allNavGroups.forEach(function (other) {
      if (other !== g) closeDropdownGroup(other);
    });
    var pending = dropdownCloseTimers.get(g);
    if (pending) { clearTimeout(pending); dropdownCloseTimers.delete(g); }
    g.classList.add("open");
    var b = g.querySelector("[data-dropdown-trigger]");
    if (b) b.setAttribute("aria-expanded", "true");
  }
  function scheduleCloseDropdownGroup(g) {
    var pending = dropdownCloseTimers.get(g);
    if (pending) clearTimeout(pending);
    dropdownCloseTimers.set(g, setTimeout(function () {
      dropdownCloseTimers.delete(g);
      g.classList.remove("open");
      var b = g.querySelector("[data-dropdown-trigger]");
      if (b) b.setAttribute("aria-expanded", "false");
    }, 300));
  }

  allNavGroups.forEach(function (group) {
    if (!group.querySelector("[data-dropdown-trigger]")) return;
    group.addEventListener("mouseenter", function () { openDropdownGroup(group); });
    group.addEventListener("mouseleave", function () { scheduleCloseDropdownGroup(group); });

    var btn = group.querySelector("[data-dropdown-trigger]");
    btn.addEventListener("click", function () {
      var isOpen = group.classList.contains("open");
      if (isOpen) {
        closeDropdownGroup(group);
      } else {
        openDropdownGroup(group);
      }
    });
    // Closing on a real selection: any click on a link inside the panel
    // navigates away on its own, but drop the "open" state immediately so
    // back/forward cache doesn't restore the page with the menu stuck open.
    group.querySelectorAll("[data-dropdown-panel] a").forEach(function (link) {
      link.addEventListener("click", function () { closeDropdownGroup(group); });
    });
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".group")) {
      allNavGroups.forEach(function (g) { closeDropdownGroup(g); });
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      allNavGroups.forEach(function (g) { closeDropdownGroup(g); });
    }
  });

  /* ---------------- Contact form submit (live, via /api/contact -> Postmark) ---------------- */
  /* This posts real submissions to a Next.js API route that calls Postmark
     server-side (see /nextjs-integration/app/api/contact/route.ts). It only
     succeeds once this build is deployed alongside that route with
     POSTMARK_SERVER_TOKEN configured -- in a plain file:// preview or a
     static host with no backend, the fetch will fail and the form shows the
     error state below rather than a false "sent" confirmation. */
  document.querySelectorAll("[data-contact-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var note = form.querySelector("[data-form-note]");
      var submitBtn = form.querySelector('button[type="submit"]');
      var btnLabel = submitBtn ? submitBtn.querySelector("[data-btn-label]") : null;
      var success = form.querySelector(".form-success");
      var errorEl = form.querySelector(".form-error");
      if (!errorEl) {
        errorEl = document.createElement("div");
        errorEl.className = "form-error";
        form.appendChild(errorEl);
      }
      errorEl.classList.remove("show");
      errorEl.textContent = "";
      if (success) success.classList.remove("show");

      var payload = {};
      new FormData(form).forEach(function (value, key) {
        payload[key] = typeof value === "string" ? value : "";
      });

      var originalLabel = btnLabel ? btnLabel.textContent : null;
      if (submitBtn) submitBtn.disabled = true;
      if (btnLabel) btnLabel.textContent = "Sending…";

      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(function (res) {
          return res
            .json()
            .catch(function () {
              return {};
            })
            .then(function (data) {
              return { httpOk: res.ok, data: data };
            });
        })
        .then(function (result) {
          if (!result.httpOk || !result.data || !result.data.ok) {
            throw new Error((result.data && result.data.error) || "Something went wrong.");
          }
          if (!success) {
            success = document.createElement("div");
            success.className = "form-success";
            success.innerHTML =
              '<i data-lucide="check-circle" class="w-4 h-4" aria-hidden="true"></i><span>Thanks for reaching out! Our team will be in touch shortly.</span>';
            form.appendChild(success);
            if (window.lucide) window.lucide.createIcons();
          }
          success.classList.add("show");
          if (note) note.style.display = "none";
          success.setAttribute("tabindex", "-1");
          success.focus();
          form.reset();
        })
        .catch(function () {
          errorEl.textContent =
            "We couldn't send your message. Please try again, or email us directly at customerservice@bcgkcommunities.com.";
          errorEl.classList.add("show");
          errorEl.setAttribute("tabindex", "-1");
          errorEl.focus();
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
          if (btnLabel && originalLabel !== null) btnLabel.textContent = originalLabel;
        });
    });
  });

  /* ---------------- Placeholder form submit (portal logins -- unchanged) ---------------- */
  document.querySelectorAll("[data-placeholder-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var note = form.querySelector("[data-form-note]");
      var success = form.querySelector(".form-success");
      if (!success) {
        success = document.createElement("div");
        success.className = "form-success";
        success.innerHTML =
          '<i data-lucide="check-circle" class="w-4 h-4" aria-hidden="true"></i><span>Thanks! This is a placeholder confirmation &mdash; live email delivery goes live at launch.</span>';
        form.appendChild(success);
        if (window.lucide) window.lucide.createIcons();
      }
      success.classList.add("show");
      if (note) note.style.display = "none";
      success.setAttribute("tabindex", "-1");
      success.focus();
    });
  });

  /* ---------------- Filter pills (Properties page) ---------------- */
  var filterGroup = document.querySelector("[data-filter-group]");
  if (filterGroup) {
    var pills = filterGroup.querySelectorAll(".filter-pill");
    var cards = document.querySelectorAll("[data-property-card]");
    var searchInput = document.getElementById("property-search");

    function applyFilters() {
      var activePill = filterGroup.querySelector('.filter-pill[aria-pressed="true"]');
      var region = activePill ? activePill.getAttribute("data-filter-value") : "all";
      var query = searchInput ? searchInput.value.trim().toLowerCase() : "";
      var visibleCount = 0;
      cards.forEach(function (card) {
        var matchesRegion = region === "all" || card.getAttribute("data-region") === region;
        var haystack = (card.getAttribute("data-name") + " " + card.getAttribute("data-city")).toLowerCase();
        var matchesQuery = !query || haystack.indexOf(query) !== -1;
        var show = matchesRegion && matchesQuery;
        card.style.display = show ? "" : "none";
        if (show) visibleCount++;
      });
      var emptyState = document.getElementById("properties-empty");
      if (emptyState) emptyState.style.display = visibleCount === 0 ? "block" : "none";
    }

    pills.forEach(function (pill) {
      pill.addEventListener("click", function () {
        pills.forEach(function (p) { p.setAttribute("aria-pressed", "false"); });
        pill.setAttribute("aria-pressed", "true");
        applyFilters();
      });
    });
    if (searchInput) searchInput.addEventListener("input", applyFilters);
  }

  /* ---------------- Modal helper ---------------- */
  function setupModal(modalEl) {
    if (!modalEl) return null;
    var lastActive = null;
    function open(fillFn) {
      lastActive = document.activeElement;
      var content = modalEl.querySelector("[data-modal-content]");
      if (fillFn && content) fillFn(content);
      modalEl.classList.add("open");
      modalEl.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      var closeBtn = modalEl.querySelector("[data-modal-close]");
      if (closeBtn) closeBtn.focus();
      if (window.lucide) window.lucide.createIcons();
    }
    function close() {
      modalEl.classList.remove("open");
      modalEl.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastActive) lastActive.focus();
    }
    modalEl.querySelectorAll("[data-modal-close]").forEach(function (el) {
      el.addEventListener("click", close);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modalEl.classList.contains("open")) close();
    });
    return { open: open, close: close };
  }

  /* ---------------- Upcoming Events page ---------------- */
  var eventsDataEl = document.getElementById("events-data");
  if (eventsDataEl) {
    var EVENTS = JSON.parse(eventsDataEl.textContent);
    var eventModal = setupModal(document.getElementById("event-modal"));
    var state = { community: "all", view: "calendar", month: null, year: null };

    if (EVENTS.length) {
      var first = new Date(EVENTS[0].date + "T00:00:00");
      state.month = first.getMonth();
      state.year = first.getFullYear();
    } else {
      var now = new Date();
      state.month = now.getMonth();
      state.year = now.getFullYear();
    }

    function filteredEvents() {
      return EVENTS.filter(function (e) {
        return state.community === "all" || e.community === state.community;
      });
    }

    function fmtDate(dateStr) {
      var d = new Date(dateStr + "T00:00:00");
      return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
    }

    function fillEventModal(container, ev) {
      container.innerHTML =
        '<p class="eyebrow text-brand-greenDeeper">' + ev.community + '</p>' +
        '<h3 class="heading-3 mt-1">' + ev.name + '</h3>' +
        '<div class="mt-4 flex flex-col gap-2 text-sm text-gray-700">' +
        '<p class="flex items-center gap-2"><i data-lucide="calendar" class="w-4 h-4 text-brand-greenDeeper"></i>' + fmtDate(ev.date) + '</p>' +
        '<p class="flex items-center gap-2"><i data-lucide="clock" class="w-4 h-4 text-brand-greenDeeper"></i>' + ev.time + '</p>' +
        '<p class="flex items-center gap-2"><i data-lucide="map-pin" class="w-4 h-4 text-brand-greenDeeper"></i>' + ev.location + '</p>' +
        '</div>' +
        '<p class="body-base text-gray-600 mt-4">' + ev.description + '</p>' +
        '<button type="button" class="btn btn-primary mt-6 w-full justify-center" data-rsvp>RSVP</button>';
      var rsvpBtn = container.querySelector("[data-rsvp]");
      if (rsvpBtn) {
        rsvpBtn.addEventListener("click", function () {
          rsvpBtn.textContent = "You're on the list!";
          rsvpBtn.disabled = true;
        });
      }
    }

    function openEventById(id) {
      var ev = EVENTS.find(function (e) { return e.id === id; });
      if (ev && eventModal) eventModal.open(function (content) { fillEventModal(content, ev); });
    }

    document.addEventListener("click", function (e) {
      var trigger = e.target.closest("[data-event-trigger]");
      if (trigger) openEventById(trigger.getAttribute("data-event-id"));
    });

    var communityPills = document.querySelectorAll("[data-community-filter]");
    communityPills.forEach(function (pill) {
      pill.addEventListener("click", function () {
        communityPills.forEach(function (p) { p.setAttribute("aria-pressed", "false"); });
        pill.setAttribute("aria-pressed", "true");
        state.community = pill.getAttribute("data-community-filter");
        renderCalendar();
        renderList();
      });
    });

    var viewButtons = document.querySelectorAll("[data-view-toggle]");
    var calendarView = document.getElementById("calendar-view");
    var listView = document.getElementById("list-view");
    viewButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        viewButtons.forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
        btn.setAttribute("aria-pressed", "true");
        state.view = btn.getAttribute("data-view-toggle");
        if (calendarView) calendarView.style.display = state.view === "calendar" ? "" : "none";
        if (listView) listView.style.display = state.view === "list" ? "" : "none";
      });
    });

    var monthLabel = document.getElementById("calendar-month-label");
    var prevBtn = document.getElementById("calendar-prev");
    var nextBtn = document.getElementById("calendar-next");
    if (prevBtn) prevBtn.addEventListener("click", function () { changeMonth(-1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { changeMonth(1); });
    function changeMonth(delta) {
      state.month += delta;
      if (state.month < 0) { state.month = 11; state.year--; }
      if (state.month > 11) { state.month = 0; state.year++; }
      renderCalendar();
    }

    function renderCalendar() {
      var grid = document.getElementById("calendar-days");
      if (!grid || !monthLabel) return;
      var monthDate = new Date(state.year, state.month, 1);
      monthLabel.textContent = monthDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

      var firstDayIndex = monthDate.getDay();
      var daysInMonth = new Date(state.year, state.month + 1, 0).getDate();
      var events = filteredEvents();
      var eventsByDate = {};
      events.forEach(function (e) {
        (eventsByDate[e.date] = eventsByDate[e.date] || []).push(e);
      });

      var html = "";
      for (var i = 0; i < firstDayIndex; i++) {
        html += '<div class="calendar-cell is-outside" aria-hidden="true"></div>';
      }
      for (var day = 1; day <= daysInMonth; day++) {
        var dateStr = state.year + "-" + String(state.month + 1).padStart(2, "0") + "-" + String(day).padStart(2, "0");
        var dayEvents = eventsByDate[dateStr] || [];
        html +=
          '<div class="calendar-cell' + (dayEvents.length ? " has-event" : "") + '">' +
          '<span class="calendar-date">' + day + "</span>" +
          dayEvents
            .map(function (e) {
              return (
                '<button type="button" class="calendar-event w-full" data-event-trigger data-event-id="' +
                e.id +
                '">' +
                e.name +
                "<br/>" +
                e.time +
                "</button>"
              );
            })
            .join("") +
          "</div>";
      }
      grid.innerHTML = html;
    }

    function renderList() {
      var list = document.getElementById("event-list");
      if (!list) return;
      var events = filteredEvents().slice().sort(function (a, b) { return a.date.localeCompare(b.date); });
      if (!events.length) {
        list.innerHTML = '<p class="body-base text-gray-500 text-center py-10">No events for this community right now &mdash; check back soon.</p>';
        return;
      }
      list.innerHTML = events
        .map(function (e) {
          return (
            '<button type="button" class="event-card text-left w-full" data-event-trigger data-event-id="' +
            e.id +
            '">' +
            '<div class="event-date"><span class="event-month">' +
            new Date(e.date + "T00:00:00").toLocaleString("en-US", { month: "short" }).toUpperCase() +
            '</span><span class="event-day">' +
            new Date(e.date + "T00:00:00").getDate() +
            "</span></div>" +
            '<div class="flex-1 min-w-0"><h3 class="heading-4 truncate">' +
            e.name +
            '</h3><p class="text-sm text-brand-greenDeeper font-medium mt-0.5">' +
            e.community +
            '</p><p class="text-sm text-gray-500 mt-1">' +
            e.time +
            " &middot; " +
            e.location +
            "</p></div>" +
            '<i data-lucide="chevron-right" class="w-5 h-5 text-gray-400 shrink-0"></i>' +
            "</button>"
          );
        })
        .join("");
      if (window.lucide) window.lucide.createIcons();
    }

    renderCalendar();
    renderList();
  }

  /* ---------------- Header width lock (nav-shift fix) ---------------- */
  /* Keeps --vp-width (set once, pre-paint, in the inline <head> script) in
     sync if the browser window is actually resized while the page is open.
     Debounced since resize can fire continuously while dragging. */
  var vpWidthResizeTimer = null;
  window.addEventListener("resize", function () {
    clearTimeout(vpWidthResizeTimer);
    vpWidthResizeTimer = setTimeout(function () {
      document.documentElement.style.setProperty("--vp-width", window.innerWidth + "px");
    }, 100);
  });
})();
