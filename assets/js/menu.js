/*
  Archivo: menu.js
  Proyecto: DEEDPRI (versión final 2025)
  Descripción: Control del menú lateral, overlay, animaciones "reveal" y botón flotante de WhatsApp.
  Notas: Código comentado en español para aprendizaje.
*/

// ===== Selección de elementos clave =====
const menuBtn = document.getElementById('menuBtn');   // Botón hamburguesa
const nav = document.getElementById('mainNav');       // Panel lateral de navegación
const overlay = document.getElementById('overlay');   // Fondo semitransparente
const closeBtn = document.getElementById('closeBtn'); // Botón ✖ dentro del panel
const navLinks = document.querySelectorAll('#mainNav a'); // Enlaces del menú
const revealEls = document.querySelectorAll('.reveal');   // Elementos con animación de entrada
const yearEl = document.getElementById('year');       // Año dinámico en el footer
const fab = document.querySelector('.whatsapp-fab');  // Botón flotante de WhatsApp
const mainContent = document.querySelector('#mainContent');

// ===== Funciones para abrir/cerrar el menú =====
function openMenu(){
  // Cambiamos estados visuales
  menuBtn.classList.add('open');
  nav.classList.add('open');
  overlay.classList.add('show');
  // Accesibilidad: actualizamos roles/atributos
  menuBtn.setAttribute('aria-expanded','true');
  
  // 🟡 Nuevo: volver inerte el resto del contenido
  mainContent.setAttribute('inert', '');
  // (opcional) también el header si no forma parte del menú
  // document.querySelector('.topbar').setAttribute('inert', '');

  // Bloquear scroll del fondo
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';

  // Foco al primer enlace del menú
  const firstLink = nav.querySelector('a');
  if (firstLink) firstLink.focus();

  // Ocultar botón flotante
  if (fab) fab.style.display = 'none';
}

function closeMenu(){
  menuBtn.classList.remove('open');
  nav.classList.remove('open');
  overlay.classList.remove('show');
  menuBtn.setAttribute('aria-expanded','false');
  // 🟢 Quitar inert al contenido principal
  mainContent.removeAttribute('inert');
  // document.querySelector('.topbar').removeAttribute('inert');

  // Restaurar scroll
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';

  // Foco de regreso al botón del menú
  menuBtn.focus();

  // Mostrar el botón flotante nuevamente
  if (fab) fab.style.display = '';
}

// ===== Eventos del botón hamburguesa =====
menuBtn.addEventListener('click', () => {
  const isOpen = nav.classList.contains('open');
  if (isOpen) closeMenu();
  else openMenu();
});

// ===== Cierre por overlay, tecla Escape y clic en enlaces =====
overlay.addEventListener('click', closeMenu);
if (closeBtn) closeBtn.addEventListener('click', closeMenu);
navLinks.forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav.classList.contains('open')) closeMenu();
});

// ===== Animación "reveal" con IntersectionObserver =====
if ('IntersectionObserver' in window){
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        // Activamos animación y dejamos de observar ese elemento
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  },{ threshold: 0.12 });

  revealEls.forEach(el => io.observe(el));
} else {
  // Fallback para navegadores antiguos
  revealEls.forEach(el => el.classList.add('active'));
}

// ===== Año dinámico en el footer =====
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Efecto scroll en header =====
const header = document.querySelector('.topbar');
if (header) {
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });
}