// Minimal self-authored line-icon set (24x24, stroke-based, lucide-inspired) so the
// build has zero runtime dependency on an external icon CDN.

const PATHS = {
  "shield-check": '<path d="M12 2 4 5v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V5l-8-3Z"/><path d="m9 12 2 2 4-4"/>',
  "wrench": '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.8 2.8-2-2 2.8-2.8Z"/>',
  "sparkles": '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/>',
  "search-check": '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4-4"/><path d="m8 10.5 1.8 1.8L13.5 8.6"/>',
  "layout-grid": '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  "line-chart": '<path d="M4 19V5M4 19h16"/><path d="m6.5 15 4-4.5 3 2.5 5-6"/>',
  "users": '<circle cx="8.5" cy="8" r="3.2"/><path d="M2.5 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M15.5 8.5a3 3 0 1 1 3 3.6"/><path d="M20 20c0-2.6-1.8-4.8-4.2-5.6"/>',
  "trending-up": '<path d="m3 17 6-6 4 4 7-8"/><path d="M14 7h6v6"/>',
  "dollar-sign": '<path d="M12 2v20"/><path d="M17 6.5c0-1.9-2.2-3.5-5-3.5s-5 1.4-5 3.3c0 4 10 2 10 6 0 1.9-2.2 3.4-5 3.4s-5-1.5-5-3.4"/>',
  "settings": '<circle cx="12" cy="12" r="3.2"/><path d="M12 3v2.5M12 18.5V21M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M3 12h2.5M18.5 12H21M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/>',
  "heart-handshake": '<path d="M12 7 9.5 4.7a3.4 3.4 0 0 0-4.8 4.8L12 17l4.2-4.2"/><path d="m13 10 2.5-2.3a3.4 3.4 0 0 1 4.8 4.8L15 18l-2-2"/><path d="m9 13 2 2 2-2"/>',
  "cpu": '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/>',
  "eye": '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  "award": '<circle cx="12" cy="8" r="5.2"/><path d="m8.5 12.8-1.7 7.7 5.2-2.8 5.2 2.8-1.7-7.7"/>',
  "rocket": '<path d="M13.5 3c3 0 6 3 6 6s-1 5-3 7l-3 3-2-2 1-2.5"/><path d="M13.5 3c-3 0-6 3-6 6s1 5 3 7l1.5-1.5"/><path d="m6 15-2.5 5L9 17.5"/><circle cx="14" cy="9" r="1.6"/>',
  "phone": '<path d="M6.5 4h3l1.3 4.2-2 1.6a12.5 12.5 0 0 0 5.4 5.4l1.6-2L20 14.5v3a1.7 1.7 0 0 1-1.9 1.7A16 16 0 0 1 4.8 5.9 1.7 1.7 0 0 1 6.5 4Z"/>',
  "mail": '<rect x="3" y="5" width="18" height="14" rx="2.2"/><path d="m4 6.5 8 6.5 8-6.5"/>',
  "menu": '<path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17"/>',
  "x": '<path d="M5 5l14 14M19 5 5 19"/>',
  "chevron-down": '<path d="m5.5 8.5 6.5 7 6.5-7"/>',
  "chevron-right": '<path d="m8.5 5.5 7 6.5-7 6.5"/>',
  "chevron-left": '<path d="m15.5 5.5-7 6.5 7 6.5"/>',
  "arrow-right": '<path d="M4 12h15.5M13.5 6l6 6-6 6"/>',
  "external-link": '<path d="M9 5H5.5A2.5 2.5 0 0 0 3 7.5v11A2.5 2.5 0 0 0 5.5 21h11a2.5 2.5 0 0 0 2.5-2.5V15"/><path d="M14 4h6v6M20 4 10.5 13.5"/>',
  "search": '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.5-4.5"/>',
  "calendar": '<rect x="3" y="4.5" width="18" height="16" rx="2.2"/><path d="M3 9.5h18M8 3v3M16 3v3"/>',
  "calendar-days": '<rect x="3" y="4.5" width="18" height="16" rx="2.2"/><path d="M3 9.5h18M8 3v3M16 3v3M7.5 13.5h1.5M11.2 13.5h1.6M15 13.5h1.5M7.5 17h1.5M11.2 17h1.6"/>',
  "clock": '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3.2 2"/>',
  "map-pin": '<path d="M12 21.5s7-6.3 7-12A7 7 0 0 0 5 9.5c0 5.7 7 12 7 12Z"/><circle cx="12" cy="9.5" r="2.4"/>',
  "check": '<path d="M4.5 12.5 9.5 17.5 19.5 6.5"/>',
  "check-circle": '<circle cx="12" cy="12" r="9"/><path d="m8 12.3 2.8 2.7L16.5 9"/>',
  "plus": '<path d="M12 4.5v15M4.5 12h15"/>',
  "list": '<path d="M9 6.5h11.5M9 12h11.5M9 17.5h11.5M4 6.5h.01M4 12h.01M4 17.5h.01" stroke-linecap="round"/>',
  "route": '<circle cx="6" cy="18" r="2.3"/><circle cx="18" cy="6" r="2.3"/><path d="M8.2 18H14a4 4 0 0 0 4-4V9.8"/>',
  "home": '<path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9.5a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V10"/>',
  "building-2": '<rect x="4" y="3" width="10" height="18" rx="1"/><rect x="14" y="9" width="6" height="12" rx="1"/><path d="M7.5 7h1M11 7h1M7.5 11h1M11 11h1M7.5 15h1M11 15h1"/>',
  "key-round": '<circle cx="8" cy="15.5" r="4.3"/><path d="M11.3 12.3 19 4.6M15.5 8.1l2.4 2.4M18.6 5l2.4 2.4"/>',
  "briefcase": '<rect x="3" y="7.5" width="18" height="12" rx="2"/><path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5M3 13h18"/>',
  "info": '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.6v.1"/>',
  "lightbulb": '<path d="M9 18h6M10 21h4M8 14.5a5.5 5.5 0 1 1 8 0c-.9.9-1.5 1.7-1.5 3H9.5c0-1.3-.6-2.1-1.5-3Z"/>',
  "smile": '<circle cx="12" cy="12" r="9.3"/><path d="M8.2 14.2s1.4 2.3 3.8 2.3 3.8-2.3 3.8-2.3M8.7 9.5h.01M15.3 9.5h.01"/>',
  "life-buoy": '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.6"/><path d="m6 6 3.6 3.6M18 6l-3.6 3.6M6 18l3.6-3.6M18 18l-3.6-3.6"/>',
  "download": '<path d="M12 3.5v11.5M8 11.5l4 4 4-4"/><path d="M4.5 17v2a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-2"/>',
  "waves": '<path d="M2 8.5c1.7-1.7 3.3-1.7 5 0s3.3 1.7 5 0 3.3-1.7 5 0 3.3 1.7 5 0"/><path d="M2 14.5c1.7-1.7 3.3-1.7 5 0s3.3 1.7 5 0 3.3-1.7 5 0 3.3 1.7 5 0"/><path d="M2 20.5c1.7-1.7 3.3-1.7 5 0s3.3 1.7 5 0 3.3-1.7 5 0 3.3 1.7 5 0"/>',
  "dog": '<path d="M10 5.2 8 3l-.5 3.3L4 8v3.5c0 4.5 3.3 8 8 8s8-3.5 8-8V8l-3.5-1.7L16 3l-2 2.2Z"/><path d="M9 13h.01M15 13h.01M10.5 16.5c.5.6 1 .6 1.5.6s1-.1 1.5-.6"/>',
  "cigarette-off": '<path d="M3 3l18 18"/><path d="M3 13.5h9M15.5 13.5H21v3H4.5"/><path d="M6.5 13.5v3M18.5 8c.6-.6.6-1.6 0-2.2M18.5 3.5c1.4 1.4 1.4 3.7 0 5.1" opacity="0.6"/>',
  "car": '<path d="M4 16V11l2-4.5h12L20 11v5"/><path d="M4 16h16v2.5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V17H7v1.5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z"/><circle cx="7.5" cy="16" r="1.3"/><circle cx="16.5" cy="16" r="1.3"/>',
  "trash-2": '<path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6.5 7l1 12.5a1.5 1.5 0 0 0 1.5 1.4h6a1.5 1.5 0 0 0 1.5-1.4L17.5 7"/><path d="M10 11v6M14 11v6"/>',
  "sparkle": '<path d="M12 2.5c.6 3.6 2.4 5.4 6 6-3.6.6-5.4 2.4-6 6-.6-3.6-2.4-5.4-6-6 3.6-.6 5.4-2.4 6-6Z"/>',
};

export function icon(name, cls = "w-5 h-5") {
  const inner = PATHS[name];
  if (!inner) {
    console.warn(`[icons] missing icon: ${name}`);
    return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"></svg>`;
  }
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
}
