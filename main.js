/**
 * Dwarkesh Furnishing – Digital Business Card
 * Main JavaScript - Enhanced with scroll animations
 */

(function () {
  'use strict';

  // ===========================
  // Scroll Fade-In Animations (Enhanced)
  // ===========================
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    if (!animatedElements.length) return;

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

    animatedElements.forEach((el) => observer.observe(el));
  }

  // ===========================
  // Topnav Scroll Effect
  // ===========================
  function initTopnavScroll() {
    const topnav = document.getElementById('topnav');
    if (!topnav) return;

    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          
          if (scrollY > 50) {
            topnav.classList.add('scrolled');
          } else {
            topnav.classList.remove('scrolled');
          }
          
          lastScroll = scrollY;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
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
    // All save contact buttons including nav save button
    const saveButtons = document.querySelectorAll('#btn-save-contact, #btn-save-contact-2, #btn-nav-save');
    saveButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        generateVCard();

        // Brief visual feedback
        const textEl = btn.querySelector('span:last-child') || btn.querySelector('span');
        if (textEl) {
          const original = textEl.textContent;
          textEl.textContent = 'Saved! ✓';
          setTimeout(() => {
            textEl.textContent = original;
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
    const buttons = document.querySelectorAll('.hero__btn, .contact__btn, .location__btn, .topnav__btn');

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
          background: rgba(255, 255, 255, 0.25);
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
  // Scroll-triggered section reveals
  // ===========================
  function initSectionReveals() {
    // Add animated borders to service cards on scroll
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
      card.style.transitionDelay = `${(index % 6) * 80}ms`;
    });

    // Add subtle tilt on service category hover
    const categories = document.querySelectorAll('.services__category');
    categories.forEach((cat) => {
      cat.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
        this.style.boxShadow = '0 12px 40px rgba(74, 47, 34, 0.12)';
      });
      cat.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
      });
    });
  }

  // ===========================
  // Counter animation for stats
  // ===========================
  function initCounterAnimation() {
    const stats = document.querySelectorAll('.about__stat');
    stats.forEach((stat, index) => {
      stat.style.transitionDelay = `${index * 150}ms`;
    });
  }

  // ===========================
  // Initialize
  // ===========================
  function init() {
    initScrollAnimations();
    initTopnavScroll();
    initSaveContact();
    initSmoothScroll();
    initButtonRipple();
    initHeroParallax();
    initSectionReveals();
    initCounterAnimation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
