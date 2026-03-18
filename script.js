/* ============================================================
   HOMESTEAD LANDSCAPING AND FEED — script.js
   ============================================================ */

/* ---------- NAVBAR ---------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const update = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ---------- MOBILE MENU ---------- */
function initMobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  const menu   = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  const close = () => {
    toggle.classList.remove('open');
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.toggle('open');
    menu.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    menu.setAttribute('aria-hidden', String(!isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', close));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      close();
      toggle.focus();
    }
  });
}

/* ---------- SCROLL ANIMATIONS ---------- */
function initScrollAnimations() {
  const els = document.querySelectorAll('.fade-up, .fade-in');

  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -36px 0px' }
  );

  els.forEach(el => observer.observe(el));
}

/* ---------- SMOOTH SCROLL ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ---------- ACTIVE NAV HIGHLIGHT ---------- */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(l => l.classList.remove('active'));
          const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach(s => observer.observe(s));
}

/* ---------- ESTIMATE FORM ----------
   To activate:
   1. Go to https://formspree.io and create a free account
   2. Create a new form using your business email
   3. Copy the form ID (e.g. xabcdefg)
   4. In index.html, replace YOUR_FORM_ID in the <form action> attribute
      Example: action="https://formspree.io/f/xabcdefg"
   ---------------------------------------------------------------- */
function initEstimateForm() {
  const form    = document.getElementById('estimate-form');
  const success = document.getElementById('form-success');
  const btn     = document.getElementById('form-submit');
  if (!form) return;

  /* Show success state if Formspree redirected back with ?submitted=true */
  if (window.location.search.includes('submitted=true') && success) {
    form.style.display    = 'none';
    success.style.display = 'flex';

    const section = document.getElementById('estimate');
    if (section) {
      setTimeout(() => section.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
    }
  }

  /* Client-side validation */
  form.addEventListener('submit', (e) => {
    const required = form.querySelectorAll('[required]');
    let valid = true;

    required.forEach(field => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        valid = false;
        field.style.borderColor = '#c0392b';
        field.addEventListener('input', () => { field.style.borderColor = ''; }, { once: true });
      }
    });

    if (!valid) {
      e.preventDefault();
      const first = Array.from(required).find(f => !f.value.trim());
      if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (btn) {
      btn.textContent         = 'Sending\u2026';
      btn.style.opacity       = '0.65';
      btn.style.pointerEvents = 'none';
    }
  });
}

/* ---------- FLOATING CALL BUTTON ---------- */
function initFloatCall() {
  const btn = document.querySelector('.float-call');
  if (!btn) return;

  const style = document.createElement('style');
  style.textContent = `
    @keyframes callPulse {
      0%, 100% { box-shadow: 0 4px 20px rgba(27,74,34,0.5); }
      50%       { box-shadow: 0 4px 32px rgba(27,74,34,0.72); }
    }
    .float-call { animation: callPulse 2.8s ease infinite; }
    .float-call:hover { animation: none; }
  `;
  document.head.appendChild(style);
}

/* ---------- FOOTER YEAR ---------- */
function initFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------- HERO PARALLAX ---------- */
function initParallax() {
  const bg = document.querySelector('.hero-bg');
  if (!bg) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.addEventListener('scroll', () => {
    bg.style.transform = `translateY(${window.scrollY * 0.22}px)`;
  }, { passive: true });
}

/* ---------- BOOT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initSmoothScroll();
  initActiveNav();
  initEstimateForm();
  initFloatCall();
  initFooterYear();
  initParallax();
});
