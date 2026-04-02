/* ════════════════════════════════════════════════════════
   CARRUSEL HERO v3 — DEEDPRI (2025)
   Partículas + Slides animados + Swipe + Autoplay
   ════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Config ──
  const AUTOPLAY_MS = 6000;

  // ── DOM ──
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.hero-dot');
  const hero   = document.querySelector('.hero-v3');
  const particlesContainer = document.getElementById('heroParticles');

  if (!slides.length || !hero) return;

  let current = 0;
  let timer   = null;
  const total = slides.length;

  // ── Generar partículas ──
  if (particlesContainer) {
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div');
      p.className = 'hero-particle';
      p.style.left = Math.random() * 100 + '%';
      const size = 2 + Math.random() * 4;
      p.style.width  = size + 'px';
      p.style.height = size + 'px';
      p.style.animationDuration = (10 + Math.random() * 15) + 's';
      p.style.animationDelay   = Math.random() * 12 + 's';
      particlesContainer.appendChild(p);
    }
  }

  // ── Cambiar slide ──
  function goTo(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => { d.classList.remove('active'); void d.offsetWidth; });
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    current = index;
  }

  function next() { goTo((current + 1) % total); }
  function prev() { goTo((current - 1 + total) % total); }

  // ── Autoplay ──
  function startAutoplay() {
    clearInterval(timer);
    timer = setInterval(next, AUTOPLAY_MS);
  }

  function resetAutoplay() {
    clearInterval(timer);
    startAutoplay();
  }

  // ── Dots click ──
  dots.forEach(dot => {
    dot.addEventListener('click', function () {
      goTo(parseInt(this.dataset.slide, 10));
      resetAutoplay();
    });
  });

  // ── Swipe ──
  let touchStartX = 0;
  hero.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  hero.addEventListener('touchend', function (e) {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
      resetAutoplay();
    }
  }, { passive: true });

  // ── Keyboard ──
  document.addEventListener('keydown', function (e) {
    const rect = hero.getBoundingClientRect();
    const visible = rect.top < window.innerHeight && rect.bottom > 0;
    if (!visible) return;

    if (e.key === 'ArrowLeft')  { e.preventDefault(); prev(); resetAutoplay(); }
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); resetAutoplay(); }
  });

  // ── Pausa al ocultar pestaña ──
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      clearInterval(timer);
    } else {
      startAutoplay();
    }
  });

  // ── Reveal on scroll (para secciones debajo del hero) ──
  function setupReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.delay || '0', 10);
          setTimeout(function () {
            entry.target.classList.add('active');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    reveals.forEach(function (el) { observer.observe(el); });
  }

  // ── Header scroll effect ──
  function setupHeaderScroll() {
    const topbar = document.querySelector('.topbar');
    if (!topbar) return;

    let ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          topbar.classList.toggle('scrolled', window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ── Init ──
  goTo(0);
  startAutoplay();
  setupReveal();
  setupHeaderScroll();

  // ── Debug ──
  window.carruselFB = {
    goToSlide: goTo,
    nextSlide: next,
    prevSlide: prev,
    startAutoplay: startAutoplay,
    stopAutoplay: function () { clearInterval(timer); },
    getCurrentSlide: function () { return current; }
  };
})();
