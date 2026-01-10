// === COTIZADOR DE COPIAS E IMPRESIONES - PRECIOS POR RANGOS ===

// 1️⃣ Configuración de precios por rangos
const CONFIG = {
  precios: {
    bn: { 
      carta: [
        { min: 1, max: 9, precio: 2.00 },
        { min: 10, max: 49, precio: 1.70 },
        { min: 50, max: 99, precio: 1.50 },
        { min: 100, max: 299, precio: 1.30 },
        { min: 300, max: 499, precio: 1.20 },
        { min: 500, max: Infinity, precio: 1.10 }
      ],
      oficio: [
        { min: 1, max: 9, precio: 2.50 },
        { min: 10, max: 49, precio: 2.20 },
        { min: 50, max: 99, precio: 2.00 },
        { min: 100, max: 299, precio: 1.80 },
        { min: 300, max: 499, precio: 1.70 },
        { min: 500, max: Infinity, precio: 1.60 }
      ],
      tabloide: [
        { min: 1, max: 9, precio: 6.00 },
        { min: 10, max: 24, precio: 5.00 },
        { min: 25, max: 49, precio: 4.50 },
        { min: 50, max: 99, precio: 4.20 },
        { min: 100, max: Infinity, precio: 4.00 }
      ]
    },
    color: { 
      carta: [
        { min: 1, max: 9, precio: 3.00 },
        { min: 10, max: 49, precio: 2.50 },
        { min: 50, max: 99, precio: 2.20 },
        { min: 100, max: 299, precio: 2.00 },
        { min: 300, max: 499, precio: 1.90 },
        { min: 500, max: Infinity, precio: 1.80 }
      ],
      oficio: [
        { min: 1, max: 9, precio: 3.50 },
        { min: 10, max: 49, precio: 3.00 },
        { min: 50, max: 99, precio: 2.80 },
        { min: 100, max: 299, precio: 2.60 },
        { min: 300, max: 499, precio: 2.50 },
        { min: 500, max: Infinity, precio: 2.40 }
      ],
      tabloide: [
        { min: 1, max: 9, precio: 12.00 },
        { min: 10, max: 24, precio: 10.00 },
        { min: 25, max: 49, precio: 9.00 },
        { min: 50, max: 99, precio: 8.50 },
        { min: 100, max: Infinity, precio: 8.00 }
      ]
    }
  },
  
  // Duraciones de animación
  animaciones: {
    desvanecer: 400,
    resaltado: 1000,
    botonLimpio: 600
  }
};

// 2️⃣ Referencias DOM
const elementos = {
  tipo: document.getElementById('tipo'),
  tamano: document.getElementById('tamano'),
  cantidad: document.getElementById('cantidad'),
  resultado: document.getElementById('resultado'),
  mensajeDescuento: document.getElementById('mensaje-descuento'),
  calcular: document.getElementById('calcular'),
  limpiar: document.getElementById('limpiar')
};

// 3️⃣ Inicialización
function inicializar() {
  // Validar elementos críticos
  if (!elementos.tipo || !elementos.calcular) {
    console.error('⚠️ Error: Elementos del formulario no encontrados');
    return;
  }
  
  // Event listeners
  elementos.calcular.addEventListener('click', manejarCalcular);
  elementos.limpiar.addEventListener('click', manejarLimpiar);
  
  // Validación en tiempo real
  elementos.cantidad.addEventListener('input', validarCantidad);
}

// 4️⃣ Manejadores de eventos
function manejarCalcular() {
  try {
    const datos = obtenerDatosFormulario();
    
    if (!validarDatos(datos)) {
      return;
    }
    
    const resultado = calcularTotal(datos);
    mostrarResultado(resultado, datos);
    
  } catch (error) {
    console.error('❌ Error al calcular:', error);
    mostrarError('Ocurrió un error al calcular. Por favor, intenta de nuevo.');
  }
}

function manejarLimpiar() {
  elementos.resultado.classList.add('desvanecer');
  elementos.mensajeDescuento.classList.add('desvanecer');
  
  setTimeout(() => {
    resetearFormulario();
    
    // Feedback visual en el botón
    elementos.limpiar.classList.add('btn-limpio');
    setTimeout(() => {
      elementos.limpiar.classList.remove('btn-limpio');
    }, CONFIG.animaciones.botonLimpio);
    
  }, CONFIG.animaciones.desvanecer);
}

function validarCantidad(e) {
  const valor = parseInt(e.target.value);
  if (valor < 0) {
    e.target.value = '';
  }
}

// 5️⃣ Lógica de cálculo
function calcularTotal({ tipo, tamano, cantidad }) {
  // Obtener los rangos de precios para el tipo y tamaño
  const rangos = CONFIG.precios[tipo][tamano];
  
  // Encontrar el rango correcto según la cantidad
  const rangoActual = rangos.find(r => cantidad >= r.min && cantidad <= r.max);
  
  if (!rangoActual) {
    throw new Error('No se encontró un rango de precio válido');
  }
  
  const precioUnitario = rangoActual.precio;
  const total = precioUnitario * cantidad;
  
  // Información del rango para mostrar
  let rangoTexto = obtenerTextoRango(rangoActual, tamano);
  
  return { 
    total,
    precioUnitario,
    rangoTexto,
    rangoInfo: rangoActual
  };
}

// Función auxiliar para obtener el texto del rango
function obtenerTextoRango(rango, tamano) {
  // Para tabloide (rangos diferentes)
  if (tamano === 'tabloide') {
    if (rango.max === 9) return '1-9 copias';
    if (rango.min === 10 && rango.max === 24) return '10-24 copias';
    if (rango.min === 25 && rango.max === 49) return '25-49 copias';
    if (rango.min === 50 && rango.max === 99) return '50-99 copias';
    if (rango.min === 100) return '100+ copias';
  }
  
  // Para carta y oficio (rangos estándar)
  if (rango.max === 9) return '1-9 copias';
  if (rango.min === 10 && rango.max === 49) return '10-49 copias';
  if (rango.min === 50 && rango.max === 99) return '50-99 copias';
  if (rango.min === 100 && rango.max === 299) return '100-299 copias';
  if (rango.min === 300 && rango.max === 499) return '300-499 copias';
  if (rango.min === 500) return '500+ copias';
  
  return `${rango.min}-${rango.max} copias`;
}

// 6️⃣ Validaciones
function validarDatos({ cantidad }) {
  // Validar cantidad
  if (!cantidad || cantidad <= 0) {
    mostrarError('Por favor, ingresa una cantidad válida (mayor a 0).');
    resaltarError(elementos.cantidad);
    return false;
  }
  
  return true;
}

function resaltarError(elemento) {
  elemento.classList.add('error-resaltado');
  elemento.focus();
  
  setTimeout(() => {
    elemento.classList.remove('error-resaltado');
  }, CONFIG.animaciones.resaltado);
}

// 7️⃣ Utilidades
function obtenerDatosFormulario() {
  return {
    tipo: elementos.tipo.value,
    tamano: elementos.tamano.value,
    cantidad: parseInt(elementos.cantidad.value) || 0
  };
}

function limpiarResultados() {
  elementos.resultado.textContent = '';
  elementos.mensajeDescuento.textContent = '';
  elementos.resultado.classList.remove('mostrar', 'descuento', 'rango-bajo', 'rango-medio', 'rango-alto');
  elementos.mensajeDescuento.classList.remove('mostrar-mensaje', 'rango-bajo', 'rango-medio', 'rango-alto');
}

function resetearFormulario() {
  elementos.tipo.value = 'bn';
  elementos.tamano.value = 'carta';
  elementos.cantidad.value = '';
  
  limpiarResultados();
  elementos.resultado.classList.remove('desvanecer');
  elementos.mensajeDescuento.classList.remove('desvanecer');
}

// 8️⃣ Presentación de resultados
function mostrarError(texto) {
  limpiarResultados();
  elementos.resultado.innerHTML = `
    <div class="mensaje-error">
      <i class="fa-solid fa-triangle-exclamation"></i>
      <p>${texto}</p>
    </div>
  `;
  elementos.resultado.classList.add('mostrar');
}

function mostrarResultado({ total, precioUnitario, rangoTexto }, { tipo, tamano, cantidad }) {
  limpiarResultados();
  
  // Determinar clase de rango para estilos
  let claseRango = 'rango-bajo';
  
  // Para tabloide (rangos diferentes)
  if (tamano === 'tabloide') {
    if (cantidad >= 100) {
      claseRango = 'rango-alto';
    } else if (cantidad >= 25) {
      claseRango = 'rango-medio';
    }
  } else {
    // Para carta y oficio (rangos estándar)
    if (cantidad >= 500) {
      claseRango = 'rango-alto';
    } else if (cantidad >= 100) {
      claseRango = 'rango-medio';
    }
  }
  
  // Textos descriptivos
  const tipoTexto = tipo === 'bn' ? 'blanco y negro' : 'a color';
  const tamanoTexto = {
    carta: 'Carta (8.5" × 11")',
    oficio: 'Oficio (8.5" × 13")',
    tabloide: 'Tabloide (11" × 17")'
  }[tamano];
  
  // Construir HTML del resultado
  let html = `
    <div class="resumen-cotizacion">
      <div class="detalle">
        <span class="label">Cantidad:</span>
        <span class="valor"><strong>${cantidad}</strong> copias</span>
      </div>
      <div class="detalle">
        <span class="label">Tipo:</span>
        <span class="valor">${tipoTexto.charAt(0).toUpperCase() + tipoTexto.slice(1)}</span>
      </div>
      <div class="detalle">
        <span class="label">Tamaño:</span>
        <span class="valor">${tamanoTexto}</span>
      </div>
      <div class="detalle">
        <span class="label">Rango de precio:</span>
        <span class="valor">${rangoTexto}</span>
      </div>
      <div class="detalle">
        <span class="label">Precio unitario:</span>
        <span class="valor">$${precioUnitario.toFixed(2)} MXN</span>
      </div>
      <div class="detalle total">
        <span class="label">Total a pagar:</span>
        <span class="valor precio-final">$${total.toFixed(2)} MXN</span>
      </div>
    </div>
  `;
  
  elementos.resultado.innerHTML = html;
  
  // Agregar clase de rango
  elementos.resultado.classList.add(claseRango);
  
  // Mostrar mensaje informativo según el rango
  if (tamano === 'tabloide') {
    // Mensajes para tabloide
    if (cantidad >= 100) {
      elementos.mensajeDescuento.innerHTML = `
        <i class="fa-solid fa-star"></i>
        ¡Precio mayorista activado!
        <small>100+ copias - Mejor precio disponible</small>
      `;
      elementos.mensajeDescuento.classList.add('mostrar-mensaje', 'rango-alto');
    } else if (cantidad >= 25) {
      elementos.mensajeDescuento.innerHTML = `
        <i class="fa-solid fa-info-circle"></i>
        Estás en rango preferencial
        <small>Precio especial aplicado</small>
      `;
      elementos.mensajeDescuento.classList.add('mostrar-mensaje', 'rango-medio');
    }
  } else {
    // Mensajes para carta y oficio
    if (cantidad >= 500) {
      elementos.mensajeDescuento.innerHTML = `
        <i class="fa-solid fa-star"></i>
        ¡Precio mayorista activado!
        <small>500+ copias - Mejor precio disponible</small>
      `;
      elementos.mensajeDescuento.classList.add('mostrar-mensaje', 'rango-alto');
    } else if (cantidad >= 100) {
      elementos.mensajeDescuento.innerHTML = `
        <i class="fa-solid fa-info-circle"></i>
        Estás en el rango de 100-499 copias
        <small>Precio preferencial aplicado</small>
      `;
      elementos.mensajeDescuento.classList.add('mostrar-mensaje', 'rango-medio');
    }
  }
  
  // Forzar reflow para animación
  elementos.resultado.offsetWidth;
  elementos.resultado.classList.add('mostrar');
  
  // Scroll suave al resultado
  setTimeout(() => {
    elementos.resultado.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'nearest'
    });
  }, 100);
  
  // Advertencia para impresiones a color
  if (tipo === 'color') {
    const miniAdvertencia = document.createElement('div');
    miniAdvertencia.className = 'mini-advertencia-resultado';
    miniAdvertencia.innerHTML = `
      <i class="fa-solid fa-info-circle"></i>
      <small>
        💡 ℹ️ IMPORTANTE: Esta cotización asume cobertura de tinta ESTÁNDAR (texto y gráficos simples). 🎨 ¿Tu documento tiene MUCHO COLOR,
        fotos o fondos sólidos? 📱 Para cotización personalizada. 
        <a href="https://wa.me/5217295414907?text=Necesito%20cotización%20con%20alta%20cobertura%20para%20impresión/copia" 
           target="_blank" 
           rel="noopener noreferrer"
           style="color: #004aad; font-weight: 600;">
          Contáctanos
        </a> si tienes alta cobertura.
      </small>
    `;
    elementos.resultado.appendChild(miniAdvertencia);
  }
}

// 9️⃣ Iniciar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializar);
} else {
  inicializar();
}
