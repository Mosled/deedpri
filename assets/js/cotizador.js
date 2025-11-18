// === COTIZADOR DE COPIAS E IMPRESIONES - PRECIOS POR RANGOS ===

// 1️⃣ Configuración de precios por rangos
const CONFIG = {
  precios: {
    bn: { 
      carta: [
        { min: 1, max: 99, precio: 1.00 },
        { min: 100, max: 999, precio: 0.90 },
        { min: 1000, max: Infinity, precio: 0.80 }
      ],
      oficio: [
        { min: 1, max: 99, precio: 1.50 },
        { min: 100, max: 999, precio: 1.00 },
        { min: 1000, max: Infinity, precio: 0.90 }
      ],
      tabloide: [
        { min: 1, max: 99, precio: 5.00 },
        { min: 100, max: 999, precio: 4.00 },
        { min: 1000, max: Infinity, precio: 3.50 }
      ]
    },
    color: { 
      carta: [
        { min: 1, max: 99, precio: 2.00 },
        { min: 100, max: 999, precio: 1.00 },
        { min: 1000, max: Infinity, precio: 0.90 }
      ],
      oficio: [
        { min: 1, max: 99, precio: 2.50 },
        { min: 100, max: 999, precio: 2.00 },
        { min: 1000, max: Infinity, precio: 1.80 }
      ],
      tabloide: [
        { min: 1, max: 99, precio: 10.00 },
        { min: 100, max: 999, precio: 8.00 },
        { min: 1000, max: Infinity, precio: 7.00 }
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
  let rangoTexto = '';
  if (rangoActual.min === 1 && rangoActual.max === 99) {
    rangoTexto = '1-99 copias';
  } else if (rangoActual.min === 100 && rangoActual.max === 999) {
    rangoTexto = '100-999 copias';
  } else if (rangoActual.min === 1000) {
    rangoTexto = '1000+ copias';
  }
  
  return { 
    total,
    precioUnitario,
    rangoTexto,
    rangoInfo: rangoActual
  };
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
  elementos.resultado.classList.remove('mostrar', 'descuento');
  elementos.mensajeDescuento.classList.remove('mostrar-mensaje');
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
  
  // Mostrar mensaje informativo según el rango
  if (cantidad >= 100 && cantidad < 1000) {
    elementos.mensajeDescuento.innerHTML = `
      <i class="fa-solid fa-info-circle"></i>
      Estás en el rango de 100-999 copias
      <small>Precio preferencial aplicado</small>
    `;
    elementos.mensajeDescuento.classList.add('mostrar-mensaje');
  } else if (cantidad >= 1000) {
    elementos.mensajeDescuento.innerHTML = `
      <i class="fa-solid fa-star"></i>
      ¡Precio mayorista activado!
      <small>1000+ copias - Mejor precio disponible</small>
    `;
    elementos.mensajeDescuento.classList.add('mostrar-mensaje');
  }
  
  // Forzar reflow para animación
  elementos.resultado.offsetWidth;
  elementos.resultado.classList.add('mostrar');
}

// 9️⃣ Iniciar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializar);
} else {
  inicializar();
}