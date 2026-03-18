/* ============================================================
   HOMESTEAD LANDSCAPING AND FEED — script.js
   ============================================================ */

/* ---------- NAVBAR ---------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------- MOBILE MENU ---------- */
function initMobileMenu() {
  const toggle     = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!toggle || !mobileMenu) return;

  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
    mobileMenu.setAttribute('aria-hidden', !isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      mobileMenu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      toggle.classList.remove('open');
      mobileMenu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      toggle.focus();
    }
  });
}

/* ---------- SCROLL ANIMATIONS ---------- */
function initScrollAnimations() {
  const targets = document.querySelectorAll('.fade-up, .fade-in');

  if (!('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('visible'));
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
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach(el => observer.observe(el));
}

/* ---------- SMOOTH SCROLL ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ---------- ACTIVE NAV LINK ---------- */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.remove('active'));
          const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach(s => observer.observe(s));
}

/* ---------- ESTIMATE FORM ----------
   To activate:
   1. Go to https://formspree.io → create a free form
   2. Copy your form ID
   3. Replace YOUR_FORM_ID in index.html with your actual ID
   ---------------------------------------- */
function initEstimateForm() {
  const form    = document.getElementById('estimate-form');
  const success = document.getElementById('form-success');
  const submit  = document.getElementById('form-submit');
  if (!form) return;

  /* Show success message if redirected back after submission */
  if (window.location.search.includes('submitted=true') && success) {
    success.style.display = 'block';
    form.style.display    = 'none';

    const estimateSection = document.getElementById('estimate');
    if (estimateSection) {
      setTimeout(() => {
        estimateSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 400);
    }
  }

  /* Client-side validation */
  form.addEventListener('submit', (e) => {
    const requiredFields = form.querySelectorAll('[required]');
    let allValid = true;

    requiredFields.forEach(field => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        allValid = false;
        field.style.borderColor = 'rgba(200,50,50,0.6)';
        field.addEventListener('input', () => {
          field.style.borderColor = '';
        }, { once: true });
      }
    });

    if (!allValid) {
      e.preventDefault();
      const firstEmpty = Array.from(requiredFields).find(f => !f.value.trim());
      if (firstEmpty) firstEmpty.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (submit) {
      submit.textContent         = 'Sending...';
      submit.style.opacity       = '0.6';
      submit.style.pointerEvents = 'none';
    }
  });
}

/* ---------- FLOATING CALL BUTTON ---------- */
function initFloatCall() {
  const btn = document.querySelector('.float-call');
  if (!btn) return;

  const style = document.createElement('style');
  style.textContent = `
    @keyframes float-pulse {
      0%,100% { box-shadow: 0 6px 24px rgba(45,110,53,0.45); }
      50%      { box-shadow: 0 6px 36px rgba(45,110,53,0.70); }
    }
    .float-call { animation: float-pulse 2.4s ease infinite; }
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
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;

  window.addEventListener('scroll', () => {
    heroBg.style.transform = `translateY(${window.scrollY * 0.25}px)`;
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
