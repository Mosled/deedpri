/* ========================================
   CARRUSEL FULL BLEED PREMIUM - JAVASCRIPT CORREGIDO
   ======================================== */

// === CONFIGURACION ===
const AUTOPLAY_INTERVAL_FB = 8000; // 8 segundos

// === VARIABLES GLOBALES ===
let currentSlideFB = 0;
let autoplayTimerFB = null;
let isPausedFB = false;
let totalSlidesFB = 0;

// === ELEMENTOS DEL DOM ===
let slidesFB, dotsFB, prevBtnFB, nextBtnFB, progressFillFB, carruselContainerFB;

// === INICIALIZACION ===
function initCarruselFB() {
  slidesFB = document.querySelectorAll('.slide-fb');
  dotsFB = document.querySelectorAll('.dot-fb');
  prevBtnFB = document.querySelector('.nav-prev-fb button');
  nextBtnFB = document.querySelector('.nav-next-fb button');
  progressFillFB = document.querySelector('.progress-fill-fb');
  carruselContainerFB = document.querySelector('.hero-carrusel-fullbleed');
  
  if (!slidesFB.length) {
    console.warn('⚠️ No se encontraron slides');
    return;
  }
  
  totalSlidesFB = slidesFB.length;
  
  // Verificar elementos críticos
  if (slidesFB.length !== dotsFB.length) {
    console.warn('⚠️ Número de slides y dots no coincide');
  }
  
  // Activar primer slide
  goToSlideFB(0);
  
  // Iniciar autoplay
  startAutoplayFB();
  
  // Iniciar eventos
  setupEventListeners();
  
  console.log('✅ Carrusel Full Bleed inicializado con', totalSlidesFB, 'slides');
}

// === FUNCION PRINCIPAL: CAMBIAR SLIDE ===
function goToSlideFB(index) {
  // Validar índice
  if (index < 0 || index >= totalSlidesFB) {
    console.warn('Índice fuera de rango:', index);
    return;
  }
  
  // Remover active de todos los slides
  slidesFB.forEach(slide => {
    slide.classList.remove('active');
  });
  
  // Remover active de todos los dots
  dotsFB.forEach(dot => {
    dot.classList.remove('active');
  });
  
  // Agregar active al nuevo slide y dot
  slidesFB[index].classList.add('active');
  dotsFB[index].classList.add('active');
  
  // Actualizar índice actual
  currentSlideFB = index;
  
  // Reiniciar barra de progreso
  resetProgressBar();
  startProgressBar();
}

// === BARRA DE PROGRESO MEJORADA ===
function resetProgressBar() {
  if (!progressFillFB) return;
  progressFillFB.style.transition = 'none';
  progressFillFB.style.width = '0%';
}

function startProgressBar() {
  if (!progressFillFB || isPausedFB) return;
  
  // Forzar reflow
  void progressFillFB.offsetWidth;
  
  // Animar a 100% en 8 segundos
  progressFillFB.style.transition = 'width 8s linear';
  progressFillFB.style.width = '100%';
}

// === AUTOPLAY ===
function startAutoplayFB() {
  stopAutoplayFB();
  autoplayTimerFB = setInterval(() => {
    if (!isPausedFB) {
      nextSlideFB();
    }
  }, AUTOPLAY_INTERVAL_FB);
}

function stopAutoplayFB() {
  if (autoplayTimerFB) {
    clearInterval(autoplayTimerFB);
    autoplayTimerFB = null;
  }
}

// === NAVEGACION ===
function nextSlideFB() {
  const next = (currentSlideFB + 1) % totalSlidesFB;
  goToSlideFB(next);
}

function prevSlideFB() {
  const prev = (currentSlideFB - 1 + totalSlidesFB) % totalSlidesFB;
  goToSlideFB(prev);
}

// === EVENT LISTENERS ===
function setupEventListeners() {
  // Botones de navegación
  if (prevBtnFB) {
    prevBtnFB.addEventListener('click', () => {
      prevSlideFB();
      resetAutoplay();
    });
  }
  
  if (nextBtnFB) {
    nextBtnFB.addEventListener('click', () => {
      nextSlideFB();
      resetAutoplay();
    });
  }
  
  // Dots
  dotsFB.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlideFB(index);
      resetAutoplay();
    });
  });
  
  // Pausar en hover
  if (carruselContainerFB) {
    carruselContainerFB.addEventListener('mouseenter', () => {
      isPausedFB = true;
      stopAutoplayFB();
      if (progressFillFB) {
        progressFillFB.style.transition = 'none';
      }
    });
    
    carruselContainerFB.addEventListener('mouseleave', () => {
      isPausedFB = false;
      startAutoplayFB();
      startProgressBar();
    });
  }
  
  // Teclado
  document.addEventListener('keydown', (e) => {
    if (!carruselContainerFB) return;
    
    const rect = carruselContainerFB.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (!isVisible) return;
    
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlideFB();
      resetAutoplay();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlideFB();
      resetAutoplay();
    }
  });
  
  // Touch/Swipe
  if (carruselContainerFB) {
    let touchStartX = 0;
    
    carruselContainerFB.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    
    carruselContainerFB.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      const swipeThreshold = 50;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe izquierda -> siguiente
          nextSlideFB();
        } else {
          // Swipe derecha -> anterior
          prevSlideFB();
        }
        resetAutoplay();
      }
    }, { passive: true });
  }
  
  // Pausar al cambiar de pestaña
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isPausedFB = true;
      stopAutoplayFB();
    } else {
      isPausedFB = false;
      startAutoplayFB();
      startProgressBar();
    }
  });
}

function resetAutoplay() {
  stopAutoplayFB();
  startAutoplayFB();
  resetProgressBar();
  startProgressBar();
}

// === INICIALIZAR CUANDO EL DOM ESTÉ LISTO ===
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCarruselFB);
} else {
  initCarruselFB();
}

// Exponer funciones para debugging
window.carruselFB = {
  goToSlide: goToSlideFB,
  nextSlide: nextSlideFB,
  prevSlide: prevSlideFB,
  startAutoplay: startAutoplayFB,
  stopAutoplay: stopAutoplayFB,
  getCurrentSlide: () => currentSlideFB
};