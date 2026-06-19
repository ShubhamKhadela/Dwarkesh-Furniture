/**
 * Dwarkesh Furnishing – Digital Business Card
 * Enhanced JavaScript - Black/Gold/Cream Theme
 * With crafting animations, golden sparkles, and premium effects
 */

(function () {
  'use strict';

  // ===========================
  // Scroll Animations (Enhanced)
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

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (window.scrollY > 50) {
            topnav.classList.add('scrolled');
          } else {
            topnav.classList.remove('scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ===========================
  // Golden Sparkle Particles
  // ===========================
  function initGoldenSparkles() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Create sparkles on click
    document.addEventListener('click', (e) => {
      createSparkles(e.clientX, e.clientY, 5);
    });

    // Create sparkles on scroll at random positions
    let sparkleThrottle = false;
    window.addEventListener('scroll', () => {
      if (sparkleThrottle) return;
      sparkleThrottle = true;
      setTimeout(() => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        createSparkles(x, y, 2);
        sparkleThrottle = false;
      }, 500);
    }, { passive: true });
  }

  function createSparkles(x, y, count) {
    for (let i = 0; i < count; i++) {
      const sparkle = document.createElement('div');
      const size = Math.random() * 4 + 2;
      const angle = Math.random() * 360;
      const distance = Math.random() * 60 + 20;
      const duration = Math.random() * 800 + 400;

      sparkle.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(200, 164, 92, 0.9), rgba(224, 197, 119, 0.4));
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        box-shadow: 0 0 ${size * 2}px rgba(200, 164, 92, 0.5);
        animation: sparkleFloat ${duration}ms ease-out forwards;
        --angle: ${angle}deg;
        --distance: ${distance}px;
      `;

      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), duration);
    }
  }

  // Inject sparkle animation CSS
  function injectSparkleCSS() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes sparkleFloat {
        0% {
          transform: translate(0, 0) scale(1);
          opacity: 1;
        }
        100% {
          transform: translate(
            calc(cos(var(--angle)) * var(--distance)),
            calc(sin(var(--angle)) * var(--distance) - 30px)
          ) scale(0);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
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
    const saveButtons = document.querySelectorAll('#btn-save-contact, #btn-save-contact-2, #btn-nav-save');
    saveButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        generateVCard();

        // Golden sparkle feedback
        const rect = btn.getBoundingClientRect();
        createSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2, 8);

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
  // Button Ripple Effect (Gold)
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
          background: radial-gradient(circle, rgba(200, 164, 92, 0.3), rgba(255, 255, 255, 0.15));
          border-radius: 50%;
          transform: scale(0);
          animation: rippleEffect 0.7s ease-out;
          pointer-events: none;
          z-index: 1;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 700);
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
  // 3D Card Tilt Effect
  // ===========================
  function initCardTilt() {
    const cards = document.querySelectorAll('.about__card, .services__category, .contact__card');

    cards.forEach((card) => {
      card.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -3;
        const rotateY = ((x - centerX) / centerX) * 3;

        this.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
        this.style.transition = 'transform 0.1s ease';
      });

      card.addEventListener('mouseleave', function () {
        this.style.transform = '';
        this.style.transition = 'transform 0.5s ease';
      });
    });
  }

  // ===========================
  // Section Reveal Enhancements
  // ===========================
  function initSectionReveals() {
    // Add animated borders to service cards on scroll
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
      card.style.transitionDelay = `${(index % 6) * 80}ms`;
    });

    // Hover glow for about stats
    const stats = document.querySelectorAll('.about__stat');
    stats.forEach((stat, index) => {
      stat.style.transitionDelay = `${index * 150}ms`;
    });
  }

  // ===========================
  // Typewriter Effect for Section Titles
  // ===========================
  function initTypewriterEffect() {
    const titles = document.querySelectorAll('.section-title');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const text = el.textContent;
          el.textContent = '';
          el.style.borderRight = '2px solid rgba(200, 164, 92, 0.6)';

          let i = 0;
          const timer = setInterval(() => {
            el.textContent += text[i];
            i++;
            if (i >= text.length) {
              clearInterval(timer);
              // Remove cursor after typing is done
              setTimeout(() => {
                el.style.borderRight = 'none';
              }, 500);
            }
          }, 40);

          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    titles.forEach((title) => observer.observe(title));
  }

  // ===========================
  // Smooth Counter Animation
  // ===========================
  function initScrollProgress() {
    // Golden progress line at top
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 2px;
      background: linear-gradient(90deg, rgba(200, 164, 92, 0.8), rgba(224, 197, 119, 0.6));
      z-index: 10001;
      transition: width 0.1s ease;
      box-shadow: 0 0 10px rgba(200, 164, 92, 0.4);
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }, { passive: true });
  }

  // ===========================
  // Initialize
  // ===========================
  function init() {
    injectSparkleCSS();
    initScrollAnimations();
    initTopnavScroll();
    initSaveContact();
    initSmoothScroll();
    initButtonRipple();
    initHeroParallax();
    initGoldenSparkles();
    initCardTilt();
    initSectionReveals();
    initTypewriterEffect();
    initScrollProgress();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
