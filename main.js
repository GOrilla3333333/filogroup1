/**
 * SINING BILANG SANDATA SA MAKABAGONG PANAHON
 * Main JavaScript
 * Author: Jondrin Eleazar
 */

(function () {
  'use strict';

  /* --------------------------------------------------
     Navigation: active section tracking
     -------------------------------------------------- */
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .nav-mobile a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  function getActiveSection() {
    const scrollY = window.scrollY + 80; // offset for fixed nav
    let active = null;
    sections.forEach(sec => {
      if (sec.offsetTop <= scrollY) {
        active = sec.id;
      }
    });
    return active;
  }

  function updateActiveNav() {
    const active = getActiveSection();
    navLinks.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', href === active);
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  /* --------------------------------------------------
     Navigation: smooth scroll
     -------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 54; // nav height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
        // Close mobile nav if open
        closeMobileNav();
      }
    });
  });

  /* --------------------------------------------------
     Navigation: mobile toggle
     -------------------------------------------------- */
  const navToggle = document.getElementById('nav-toggle');
  const navMobile = document.getElementById('nav-mobile');

  function closeMobileNav() {
    if (navMobile) {
      navMobile.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  }

  if (navToggle && navMobile) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMobile.classList.contains('open');
      if (isOpen) {
        closeMobileNav();
      } else {
        navMobile.classList.add('open');
        navToggle.setAttribute('aria-expanded', 'true');
      }
    });
  }

  /* --------------------------------------------------
     Reveal on scroll (Intersection Observer)
     -------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
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

    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show everything
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* --------------------------------------------------
     Back to top
     -------------------------------------------------- */
  document.querySelectorAll('a[href="#pabalat"]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  /* --------------------------------------------------
     Respect reduced motion
     -------------------------------------------------- */
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mq.matches) {
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('visible');
    });
  }

})();

