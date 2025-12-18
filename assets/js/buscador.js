/* ========================================
   BUSCADOR DE NEGOCIOS - JAVASCRIPT
   Archivo: assets/js/buscador.js
   Proyecto: deedpri
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
        // Aquí irá la lógica de búsqueda en tiempo real
        // Ejemplo: buscarNegocios(query);
      }
    });

    // === ENTER PARA BUSCAR ===
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query.length > 0) {
          console.log('Buscar (Enter):', query);
          realizarBusqueda(query);
        }
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
        // Opcionalmente ejecutar búsqueda automáticamente
        // realizarBusqueda(searchText);
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
      // Aquí irá la lógica de filtrado por ubicación
      // Ejemplo: filtrarPorUbicacion(location);
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
      // Aquí irá navegación a página de registro
      // Ejemplo: window.location.href = '/registro-negocio';
      alert('Próximamente: Formulario de registro de negocios');
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
});

// === FUNCIONES PRINCIPALES ===

/**
 * Realizar búsqueda completa
 * @param {string} query - Término de búsqueda
 */
function realizarBusqueda(query) {
  console.log('Realizando búsqueda completa:', query);
  
  // Aquí irá la lógica real de búsqueda:
  // 1. Llamar a API o buscar en base de datos
  // 2. Filtrar por ubicación seleccionada
  // 3. Mostrar resultados
  // 4. Navegar a página de resultados
  
  // Ejemplo temporal:
  // window.location.href = `/resultados?q=${encodeURIComponent(query)}`;
  
  alert(`Búsqueda: "${query}"\n\nPróximamente: Resultados en tiempo real`);
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
  
  // SIMULACIÓN (3 segundos)
  // En producción, aquí iría la implementación real de Web Speech API
  setTimeout(() => {
    if (voiceBtn) {
      voiceBtn.classList.remove('listening');
    }
    if (searchInput) {
      searchInput.value = 'plomero cerca de mí';
      searchInput.focus();
    }
    console.log('Voz detectada (simulación)');
  }, 3000);

  // IMPLEMENTACIÓN REAL (descomentar cuando esté listo):
  /*
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
    alert('No se pudo capturar la voz. Intenta de nuevo.');
  };
  
  recognition.onend = function() {
    if (voiceBtn) {
      voiceBtn.classList.remove('listening');
    }
  };
  
  recognition.start();
  */
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

  // Opciones de geolocalización
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  navigator.geolocation.getCurrentPosition(
    // Éxito
    function(position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      
      console.log('Ubicación detectada:', { lat, lng });
      
      // Aquí irá la lógica para:
      // 1. Convertir coordenadas a municipio (reverse geocoding)
      // 2. Actualizar selector de ubicación
      // 3. Filtrar resultados por cercanía
      
      alert(`Ubicación detectada:\nLatitud: ${lat.toFixed(4)}\nLongitud: ${lng.toFixed(4)}\n\nPróximamente: Filtrado automático por cercanía`);
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
 * Navegar a página de categoría
 * @param {string} category - Nombre de la categoría
 */
function navegarACategoria(category) {
  console.log('Navegando a categoría:', category);
  
  // Aquí irá la navegación real
  // window.location.href = `/categoria/${category}`;
  
  alert(`Categoría: ${category}\n\nPróximamente: Página de categoría con todos los negocios`);
}

/**
 * Filtrar negocios por ubicación
 * @param {string} location - Ubicación seleccionada
 */
function filtrarPorUbicacion(location) {
  console.log('Filtrando por ubicación:', location);
  
  // Aquí irá la lógica de filtrado
  // Si hay búsqueda activa, re-ejecutarla con nuevo filtro
  // Actualizar resultados en pantalla
}

// === EXPONER FUNCIONES GLOBALES (OPCIONAL) ===
window.BuscadorNegocios = {
  buscar: realizarBusqueda,
  activarVoz: activarBusquedaVoz,
  detectarUbicacion: detectarUbicacion,
  navegarCategoria: navegarACategoria
};
