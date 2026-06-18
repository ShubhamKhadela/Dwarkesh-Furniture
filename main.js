/**
 * Dwarkesh Furnishing – Digital Business Card
 * Main JavaScript
 */

(function () {
  'use strict';

  // ===========================
  // Scroll Fade-In Animations
  // ===========================
  function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    if (!fadeElements.length) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          // Stagger children if present
          if (entry.target.classList.contains('stagger-children')) {
            const children = entry.target.querySelectorAll('.fade-in-child');
            children.forEach((child, index) => {
              child.style.transitionDelay = `${index * 120}ms`;
            });
          }

          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach((el) => observer.observe(el));
  }

  // ===========================
  // Save Contact (vCard)
  // ===========================
  function generateVCard() {
    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'FN:Dwarkesh Furnishing',
      'N:Furnishing;Dwarkesh;;;',
      'ORG:Dwarkesh Furnishing',
      'TITLE:Premium Interior & Furniture Solutions',
      'TEL;TYPE=CELL:+919909003092',
      'TEL;TYPE=WORK:+919909003092',
      'EMAIL:dwarkeshfurnishing@gmail.com',
      'ADR;TYPE=WORK:;;Sanatan Arcade, Near Ramji Mandir, Nana Varachha Dhal;Surat;Gujarat;;India',
      'URL:https://wa.me/919909003092',
      'NOTE:Premium PVC & Wooden Furniture Solutions - Residential, Commercial, Restaurant & Office Furniture. Contact: Shubham Khadela',
      'END:VCARD',
    ].join('\n');

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'Dwarkesh_Furnishing.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function initSaveContact() {
    const saveButtons = document.querySelectorAll('#btn-save-contact, #btn-save-contact-2');
    saveButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        generateVCard();

        // Brief visual feedback
        const originalText = btn.querySelector('span:last-child');
        if (originalText) {
          const original = originalText.textContent;
          originalText.textContent = 'Saved! ✓';
          btn.style.background = 'linear-gradient(135deg, #25D366, #128C7E)';
          setTimeout(() => {
            originalText.textContent = original;
            btn.style.background = '';
          }, 2000);
        }
      });
    });
  }

  // ===========================
  // Smooth Scroll for Anchors
  // ===========================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ===========================
  // Button Ripple Effect
  // ===========================
  function initButtonRipple() {
    const buttons = document.querySelectorAll('.hero__btn, .contact__btn, .location__btn');

    buttons.forEach((btn) => {
      btn.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          transform: scale(0);
          animation: rippleEffect 0.6s ease-out;
          pointer-events: none;
          z-index: 1;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
      });
    });

    // Inject ripple animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes rippleEffect {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ===========================
  // Hero Parallax (subtle)
  // ===========================
  function initHeroParallax() {
    const heroBg = document.querySelector('.hero__bg');
    if (!heroBg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          if (scrolled < window.innerHeight) {
            heroBg.style.transform = `scale(1.05) translateY(${scrolled * 0.15}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ===========================
  // Initialize
  // ===========================
  function init() {
    initScrollAnimations();
    initSaveContact();
    initSmoothScroll();
    initButtonRipple();
    initHeroParallax();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
