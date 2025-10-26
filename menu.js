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

// ===== Funciones para abrir/cerrar el menú =====
function openMenu(){
  // Cambiamos estados visuales
  menuBtn.classList.add('open');
  nav.classList.add('open');
  overlay.classList.add('show');
  // Accesibilidad: actualizamos roles/atributos
  menuBtn.setAttribute('aria-expanded','true');
  nav.setAttribute('aria-hidden','false');
  // Bloquear scroll del fondo mientras el menú está abierto
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
  // Enfocar el primer enlace del menú (mejor UX con teclado)
  const firstLink = nav.querySelector('a');
  if (firstLink) firstLink.focus();
  // Ocultar botón flotante para evitar superposición
  if (fab) fab.style.display = 'none';
}

function closeMenu(){
  menuBtn.classList.remove('open');
  nav.classList.remove('open');
  overlay.classList.remove('show');
  menuBtn.setAttribute('aria-expanded','false');
  nav.setAttribute('aria-hidden','true');
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
  // Devolver foco al botón hamburguesa
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
