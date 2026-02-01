/* ========================================
   BUSCADOR DE NEGOCIOS - JAVASCRIPT FUNCIONAL
   Archivo: assets/js/buscador.js
   Proyecto: deedpri
   ACTUALIZADO: Sin sessionStorage, todo por URL
   ======================================== */

// === ESPERAR A QUE EL DOM ESTÉ LISTO ===
document.addEventListener('DOMContentLoaded', function() {
  
  // === ELEMENTOS DEL DOM ===
  const searchInput = document.getElementById('searchInput');
  const voiceBtn = document.getElementById('voiceBtn');
  const locationSelect = document.getElementById('locationSelect');
  const detectBtn = document.getElementById('detectBtn');
  const exampleChips = document.querySelectorAll('.example-chip');
  const categoryCards = document.querySelectorAll('.category-card');
  const floatingCta = document.getElementById('floatingCta');

  // === BÚSQUEDA AL ESCRIBIR ===
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      const query = e.target.value.trim();
      if (query.length > 0) {
        console.log('Buscando:', query);
      }
    });

    // === ENTER PARA BUSCAR ===
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        console.log('Buscar (Enter):', query || 'Todos los negocios');
        realizarBusqueda(query);
      }
    });
  }

  // === CHIPS DE EJEMPLO ===
  exampleChips.forEach(chip => {
    chip.addEventListener('click', function() {
      const searchText = this.getAttribute('data-search') || this.textContent.trim();
      if (searchInput) {
        searchInput.value = searchText;
        searchInput.focus();
        console.log('Ejemplo seleccionado:', searchText);
        realizarBusqueda(searchText);
      }
    });
  });

  // === BOTÓN DE VOZ ===
  if (voiceBtn) {
    voiceBtn.addEventListener('click', function() {
      activarBusquedaVoz();
    });
  }

  // === SELECTOR DE UBICACIÓN ===
  if (locationSelect) {
    locationSelect.addEventListener('change', function(e) {
      const location = e.target.value;
      console.log('Ubicación cambiada a:', location);
      
      if (searchInput && searchInput.value.trim() !== '') {
        realizarBusqueda(searchInput.value.trim());
      }
    });
  }

  // === DETECTAR UBICACIÓN ===
  if (detectBtn) {
    detectBtn.addEventListener('click', function() {
      detectarUbicacion();
    });
  }

  // === CATEGORÍAS ===
  categoryCards.forEach(card => {
    card.addEventListener('click', function() {
      const category = this.getAttribute('data-category') || 
                      this.querySelector('.category-name').textContent.toLowerCase();
      console.log('Categoría seleccionada:', category);
      navegarACategoria(category);
    });
  });

  // === BOTÓN FLOTANTE CTA ===
  if (floatingCta) {
    floatingCta.addEventListener('click', function() {
      console.log('Abrir formulario de registro de negocio');
      window.location.href = 'paquetes.html';
    });
  }

  // === PARALLAX SUAVE AL SCROLL ===
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-search');
        if (hero) {
          hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  // === LOG DE INICIALIZACIÓN ===
  console.log('✅ Buscador de negocios inicializado');
  console.log(`📊 Total de negocios: ${negociosDB.length}`);
});

// === FUNCIONES PRINCIPALES ===

/**
 * Realizar búsqueda completa
 * @param {string} query - Término de búsqueda
 */
function realizarBusqueda(query) {
  console.log('Realizando búsqueda completa:', query || 'Todos');
  
  // Obtener ubicación seleccionada
  const locationSelect = document.getElementById('locationSelect');
  const ubicacion = locationSelect ? locationSelect.value : 'todos';
  
  // Navegar a página de resultados (TODO por URL, sin sessionStorage)
  const queryParam = query ? encodeURIComponent(query) : '';
  window.location.href = `resultados.html?q=${queryParam}&loc=${ubicacion}`;
}

/**
 * Activar búsqueda por voz
 */
function activarBusquedaVoz() {
  const voiceBtn = document.getElementById('voiceBtn');
  const searchInput = document.getElementById('searchInput');
  
  // Verificar soporte de Web Speech API
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    console.warn('Búsqueda por voz no soportada en este navegador');
    alert('Tu navegador no soporta búsqueda por voz. Prueba con Chrome o Edge.');
    return;
  }

  // Animación de escucha
  if (voiceBtn) {
    voiceBtn.classList.add('listening');
  }

  console.log('🎤 Búsqueda por voz activada');
  
  // IMPLEMENTACIÓN REAL
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  
  recognition.lang = 'es-MX';
  recognition.continuous = false;
  recognition.interimResults = false;
  
  recognition.onstart = function() {
    console.log('🎤 Escuchando...');
  };
  
  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    console.log('Voz detectada:', transcript);
    if (searchInput) {
      searchInput.value = transcript;
      searchInput.focus();
    }
    realizarBusqueda(transcript);
  };
  
  recognition.onerror = function(event) {
    console.error('Error de reconocimiento de voz:', event.error);
    if (event.error === 'no-speech') {
      alert('No se detectó ninguna voz. Intenta de nuevo.');
    } else {
      alert('No se pudo capturar la voz. Intenta de nuevo.');
    }
  };
  
  recognition.onend = function() {
    if (voiceBtn) {
      voiceBtn.classList.remove('listening');
    }
  };
  
  try {
    recognition.start();
  } catch (error) {
    console.error('Error al iniciar reconocimiento:', error);
    if (voiceBtn) {
      voiceBtn.classList.remove('listening');
    }
  }
}

/**
 * Detectar ubicación del usuario con GPS
 */
function detectarUbicacion() {
  console.log('📍 Detectando ubicación...');
  
  if (!navigator.geolocation) {
    alert('Tu navegador no soporta geolocalización');
    return;
  }

  const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  };

  navigator.geolocation.getCurrentPosition(
    // Éxito
    function(position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      
      console.log('Ubicación detectada:', { lat, lng });
      
      // Determinar municipio más cercano
      const municipio = determinarMunicipioCercano(lat, lng);
      
      // Actualizar selector
      const locationSelect = document.getElementById('locationSelect');
      if (locationSelect && municipio) {
        locationSelect.value = municipio;
        alert(`📍 Ubicación detectada: ${municipio.charAt(0).toUpperCase() + municipio.slice(1)}`);
      } else {
        alert(`Ubicación detectada:\nLatitud: ${lat.toFixed(4)}\nLongitud: ${lng.toFixed(4)}`);
      }
    },
    // Error
    function(error) {
      console.error('Error de geolocalización:', error);
      let mensaje = 'No se pudo detectar tu ubicación. ';
      
      switch(error.code) {
        case error.PERMISSION_DENIED:
          mensaje += 'Debes permitir el acceso a tu ubicación.';
          break;
        case error.POSITION_UNAVAILABLE:
          mensaje += 'Información de ubicación no disponible.';
          break;
        case error.TIMEOUT:
          mensaje += 'Tiempo de espera agotado.';
          break;
        default:
          mensaje += 'Error desconocido.';
      }
      
      alert(mensaje);
    },
    options
  );
}

/**
 * Determinar municipio más cercano basado en coordenadas
 * @param {number} lat - Latitud
 * @param {number} lng - Longitud
 * @returns {string} - Municipio más cercano
 */
function determinarMunicipioCercano(lat, lng) {
  // Coordenadas aproximadas de municipios
  const municipios = [
    { nombre: 'zacualtipan', lat: 20.125, lng: -98.568 },
    { nombre: 'pachuca', lat: 20.119, lng: -98.740 },
    { nombre: 'tulancingo', lat: 20.083, lng: -98.367 },
    { nombre: 'mineral-monte', lat: 20.140, lng: -98.670 },
    { nombre: 'actopan', lat: 20.267, lng: -98.933 }
  ];
  
  let cercano = null;
  let distanciaMin = Infinity;
  
  municipios.forEach(mun => {
    const distancia = Math.sqrt(
      Math.pow(lat - mun.lat, 2) + Math.pow(lng - mun.lng, 2)
    );
    if (distancia < distanciaMin) {
      distanciaMin = distancia;
      cercano = mun.nombre;
    }
  });
  
  return cercano;
}

/**
 * Navegar a página de categoría
 * @param {string} category - Nombre de la categoría
 */
function navegarACategoria(category) {
  console.log('Navegando a categoría:', category);
  
  // Obtener ubicación actual
  const locationSelect = document.getElementById('locationSelect');
  const ubicacion = locationSelect ? locationSelect.value : 'todos';
  
  // Navegar (TODO por URL)
  window.location.href = `resultados.html?cat=${category}&loc=${ubicacion}`;
}

/**
 * Obtener todos los negocios (sin filtro de búsqueda)
 * @param {string} ubicacion - Ubicación para filtrar
 * @returns {Array} - Todos los negocios
 */
function obtenerTodosLosNegocios(ubicacion) {
  console.log('📋 Mostrando todos los negocios');
  
  // Si hay ubicación específica, filtrar
  if (ubicacion && ubicacion !== 'todos') {
    return negociosDB.filter(n => n.municipio === ubicacion);
  }
  
  // Si no, devolver todos
  return negociosDB;
}

// === EXPONER FUNCIONES GLOBALES ===
window.BuscadorNegocios = {
  buscar: realizarBusqueda,
  activarVoz: activarBusquedaVoz,
  detectarUbicacion: detectarUbicacion,
  navegarCategoria: navegarACategoria
};
