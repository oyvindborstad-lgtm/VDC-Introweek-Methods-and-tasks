/* ============================ ICONS ============================ */
function IC(n){const m={
  present:'<path d="M3 4h18v11H3z"/><path d="M12 15v5M8 20h8"/>',
  group:'<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.4"/><path d="M3 19v-1a4 4 0 014-4h4a4 4 0 014 4v1"/><path d="M16 14a3 3 0 013 3v1"/>',
  chat:'<path d="M21 15a2 2 0 01-2 2H8l-4 4V5a2 2 0 012-2h13a2 2 0 012 2z"/>',
  target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4"/>',
  task:'<path d="M9 11l3 3 8-8"/><path d="M21 12v6a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h11"/>',
  eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
  bulb:'<path d="M9 18h6M10 22h4M12 2a7 7 0 00-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0012 2z"/>',
  link:'<path d="M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7l-1.5 1.5"/><path d="M14 11a5 5 0 00-7 0l-3 3a5 5 0 007 7l1.5-1.5"/>',
  star:'<path d="M12 3l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.9 6.7 19.2l1-5.8L3.5 9.2l5.9-.9z"/>',
  flag:'<path d="M4 22V4s2-1 5-1 5 2 8 2 4-1 4-1v11s-1 1-4 1-5-2-8-2-5 1-5 1z"/>',
  box:'<path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 7v10l9 4 9-4V7"/>',
  clip:'<rect x="6" y="4" width="12" height="16" rx="2"/><path d="M9 4V3a1 1 0 011-1h4a1 1 0 011 1v1"/><path d="M9 10l2 2 4-4"/>',
  balance:'<path d="M12 3v18M5 21h14M7 7l-4 7a4 4 0 008 0L7 7zM17 7l-4 7a4 4 0 008 0l-4-7zM5 7h14"/>',
  rocket:'<path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2"/><path d="M14 4c3 0 6 3 6 6 0 4-5 9-9 11l-4-4C9 13 10 4 14 4z"/><circle cx="14.5" cy="9.5" r="1.5"/>',
  shield:'<path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/>',
  compass:'<circle cx="12" cy="12" r="9"/><path d="M16 8l-2.5 5.5L8 16l2.5-5.5z"/>',
  route:'<circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="5" r="2.5"/><path d="M8.5 19H15a3 3 0 000-6H9a3 3 0 010-6h6.5"/>',
  hand:'<path d="M18 11V6a2 2 0 00-4 0M14 10V4a2 2 0 00-4 0v6M10 10.5V6a2 2 0 00-4 0v8a8 8 0 008 8 8 8 0 008-8v-3a2 2 0 00-4 0"/>',
  spark:'<path d="M12 2v6m0 8v6M2 12h6m8 0h6M5 5l4 4m6 6l4 4M5 19l4-4m6-6l4-4"/>',
  layers:'<path d="M12 2l9 5-9 5-9-5z"/><path d="M3 12l9 5 9-5"/><path d="M3 17l9 5 9-5"/>',
  list:'<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  grow:'<path d="M3 17l5-5 4 4 8-8"/><path d="M16 8h5v5"/>',
  book:'<path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2z"/><path d="M19 3v18"/>',
  building:'<rect x="4" y="2" width="16" height="20" rx="1"/><path d="M8 6h2M14 6h2M8 10h2M14 10h2M8 14h2M14 14h2M10 22v-4h4v4"/>',
  /* --- new icons for tools --- */
  timer:'<circle cx="12" cy="13" r="8"/><path d="M12 13V9M9 2h6M12 5V2"/>',
  dice:'<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.3" fill="currentColor" stroke="none"/><circle cx="16" cy="8" r="1.3" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="8" cy="16" r="1.3" fill="currentColor" stroke="none"/><circle cx="16" cy="16" r="1.3" fill="currentColor" stroke="none"/>',
  vote:'<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>',
  share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',
  download:'<path d="M12 3v12m0 0l-4-4m4 4l4-4"/><path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"/>',
  print:'<path d="M6 9V3h12v6M6 18H4a2 2 0 01-2-2v-3a2 2 0 012-2h16a2 2 0 012 2v3a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
  flow:'<rect x="2" y="9" width="6" height="6" rx="1"/><rect x="16" y="9" width="6" height="6" rx="1"/><path d="M8 12h8M14 9l3 3-3 3"/>',
  grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  cols:'<rect x="3" y="4" width="5" height="16" rx="1"/><rect x="10" y="4" width="5" height="16" rx="1"/><rect x="17" y="4" width="4" height="16" rx="1"/>',
  note:'<path d="M4 4h16v12l-4 4H4z"/><path d="M20 16h-4v4"/>',
  play:'<path d="M6 4l14 8-14 8z" fill="currentColor" stroke="none"/>',
  pause:'<rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none"/><rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none"/>',
  reset:'<path d="M3 12a9 9 0 109-9 9 9 0 00-6.4 2.6L3 8"/><path d="M3 3v5h5"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  users:'<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13A4 4 0 0119 7a4 4 0 01-3 3.87"/>',
  table:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M3 15h18M9 4v16M15 4v16"/>',
  check:'<path d="M20 6L9 17l-5-5"/>',
  lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/>'
  };
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">'+(m[n]||m.star)+'</svg>';
}

/* The VDC Compass animated logomark */
function COMPASS_MARK(size){
  size=size||40;
  return '<svg class="cmark-svg" viewBox="0 0 48 48" width="'+size+'" height="'+size+'" aria-hidden="true">'+
    '<circle cx="24" cy="24" r="21" fill="none" stroke="rgba(255,255,255,.22)" stroke-width="1.5"/>'+
    '<circle cx="24" cy="24" r="21" fill="none" stroke="#fff" stroke-width="2.4" stroke-dasharray="2.5 6.2" stroke-linecap="round" class="cmark-ring"/>'+
    '<g class="cmark-needle">'+
      '<path d="M24 6 L29 24 L24 21 L19 24 Z" fill="#B1040E"/>'+
      '<path d="M24 42 L19 24 L24 27 L29 24 Z" fill="#fff"/>'+
    '</g>'+
    '<circle cx="24" cy="24" r="2.6" fill="#fff"/>'+
  '</svg>';
}
