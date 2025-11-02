/* script.js - theme toggle, nav toggle, small helpers
   Mobile-first, runs on all pages.
*/

/* ---------- Utilities ---------- */
const qs = s => document.querySelector(s);
const qsa = s => Array.from(document.querySelectorAll(s));

/* ---------- Theme handling ----------
   - Detect system preference
   - Allow manual toggle
   - Persist to localStorage ("kk_theme")
*/
(function themeSetup(){
  const root = document.documentElement;
  const storageKey = "kk_theme";

  const apply = (theme) => {
    if (theme === "dark") root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
  };

  // Initial: check localStorage else system
  const saved = localStorage.getItem(storageKey);
  if (saved) {
    apply(saved);
  } else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    apply(prefersDark ? "dark" : "light");
  }

  // update theme toggle icons (for multiple toggles across pages)
  const updateIcons = () => {
    qsa('#theme-icon, #theme-icon-about, #theme-icon-projects, #theme-icon-contact').forEach(el => {
      if (!el) return;
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      el.textContent = isDark ? '🌙' : '☀️';
    });
  };
  updateIcons();

  // Attach toggle for all theme toggle buttons
  qsa('#theme-toggle, #theme-toggle-about, #theme-toggle-projects, #theme-toggle-contact').forEach(btn=>{
    if (!btn) return;
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      apply(next);
      localStorage.setItem(storageKey, next);
      updateIcons();
    });
  });

  // Listen to system changes unless user has saved preference
  if (!saved && window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      apply(e.matches ? 'dark' : 'light');
      updateIcons();
    });
  }
})();

/* ---------- Nav handling: hamburger on small screens ----------
   - Toggles nav visibility by adding .mobile-open to nav
   - Accessible: toggles aria-expanded on button
*/
(function navSetup(){
  // find all nav toggle buttons (multiple per page header variants)
  qsa('.nav-toggle').forEach(btn=>{
    const idSuffix = btn.id.split('nav-toggle')[1] || '';
    // prefer nearest nav element (same header)
    const header = btn.closest('.header-inner') || document;
    const nav = header.querySelector('.main-nav') || document.querySelector('.main-nav');

    btn.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('mobile-open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      // set accessible label
      btn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });
  });

  // close mobile nav when clicking outside or on link
  document.addEventListener('click', (ev) => {
    const navs = qsa('.main-nav.mobile-open');
    if (!navs.length) return;
    if (ev.target.closest('.main-nav') || ev.target.closest('.nav-toggle')) return;
    // close all
    navs.forEach(n => n.classList.remove('mobile-open'));
    qsa('.nav-toggle').forEach(btn => btn.setAttribute('aria-expanded','false'));
  });

  // close nav when pressing Escape
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') {
      qsa('.main-nav.mobile-open').forEach(n => n.classList.remove('mobile-open'));
      qsa('.nav-toggle').forEach(btn => btn.setAttribute('aria-expanded','false'));
    }
  });
})();

/* ---------- Small page helpers ---------- */
(function pageHelpers(){
  // set current year where present
  const yearEls = qsa('#year, #year-about, #year-projects, #year-contact');
  yearEls.forEach(el => el.textContent = new Date().getFullYear());
})();
