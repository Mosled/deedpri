// === COTIZADOR DE COPIAS E IMPRESIONES - VERSIÓN MEJORADA ===

// 1️⃣ Configuración centralizada y clara
const CONFIG = {
  precios: {
    bn: { 
      carta: 1.0, 
      oficio: 1.5, 
      tabloide: 3.0 
    },
    color: { 
      carta: 3.0, 
      oficio: 4.5,      // Ajustado proporcionalmente
      tabloide: 8.0     // Ajustado proporcionalmente
    }
  },
  
  // Factor de cobertura (solo para color)
  coberturaFactor: { 
    baja: 1.0,      // Sin incremento
    media: 1.15,    // +15%
    alta: 1.35      // +35%
  },
  
  // Descuentos por volumen (ordenados de mayor a menor)
  descuentos: [
    { minimo: 500, descuento: 0.80, etiqueta: '20% de descuento' },
    { minimo: 200, descuento: 0.85, etiqueta: '15% de descuento' },
    { minimo: 100, descuento: 0.90, etiqueta: '10% de descuento' }
  ],
  
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
  cobertura: document.getElementById('cobertura'),
  coberturaLabel: document.querySelector('label[for="cobertura"]'),
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
  
  // Estado inicial: ocultar cobertura
  toggleCobertura(false);
  
  // Event listeners
  elementos.tipo.addEventListener('change', manejarCambioTipo);
  elementos.calcular.addEventListener('click', manejarCalcular);
  elementos.limpiar.addEventListener('click', manejarLimpiar);
  
  // Validación en tiempo real
  elementos.cantidad.addEventListener('input', validarCantidad);
}

// 4️⃣ Manejadores de eventos
function manejarCambioTipo() {
  const esColor = elementos.tipo.value === 'color';
  toggleCobertura(esColor);
  
  if (!esColor) {
    elementos.cobertura.value = 'baja';
    elementos.cobertura.classList.remove('error-resaltado');
  }
  
  // Limpiar resultado previo
  limpiarResultados();
}

function manejarCalcular() {
  try {
    const datos = obtenerDatosFormulario();
    
    if (!validarDatos(datos)) {
      return;
    }
    
    const { total, precioBase, factorDescuento, descuentoInfo } = calcularTotal(datos);
    mostrarResultado(total, datos, precioBase, factorDescuento, descuentoInfo);
    
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
function calcularTotal({ tipo, tamano, cobertura, cantidad }) {
  // Precio base según tipo y tamaño
  let precioUnitario = CONFIG.precios[tipo][tamano];
  const precioBase = precioUnitario;
  
  // Factor de cobertura (solo para color)
  if (tipo === 'color' && cobertura) {
    precioUnitario *= CONFIG.coberturaFactor[cobertura];
  }
  
  // Aplicar descuento por volumen
  const descuentoInfo = obtenerDescuento(cantidad);
  const factorDescuento = descuentoInfo.descuento;
  precioUnitario *= factorDescuento;
  
  const total = precioUnitario * cantidad;
  
  return { 
    total, 
    precioBase, 
    factorDescuento,
    descuentoInfo
  };
}

function obtenerDescuento(cantidad) {
  // Buscar el descuento aplicable (ya ordenados de mayor a menor)
  for (const desc of CONFIG.descuentos) {
    if (cantidad >= desc.minimo) {
      return desc;
    }
  }
  
  return { minimo: 0, descuento: 1.0, etiqueta: null }; // Sin descuento
}

// 6️⃣ Validaciones
function validarDatos({ tipo, tamano, cobertura, cantidad }) {
  // Validar cantidad
  if (!cantidad || cantidad <= 0) {
    mostrarError('Por favor, ingresa una cantidad válida (mayor a 0).');
    resaltarError(elementos.cantidad);
    return false;
  }
  
  // Validar cobertura para color
  if (tipo === 'color' && !cobertura) {
    mostrarError('Por favor, selecciona la cobertura de tinta.');
    resaltarError(elementos.cobertura);
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
    cobertura: elementos.cobertura.value,
    cantidad: parseInt(elementos.cantidad.value) || 0
  };
}

function toggleCobertura(mostrar) {
  const display = mostrar ? 'block' : 'none';
  elementos.coberturaLabel.style.display = display;
  elementos.cobertura.style.display = display;
  
  if (!mostrar) {
    elementos.cobertura.value = 'baja';
  }
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
  elementos.cobertura.value = 'baja';
  elementos.cantidad.value = '';
  
  toggleCobertura(false);
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

function mostrarResultado(total, { tipo, tamano, cobertura, cantidad }, precioBase, factorDescuento, descuentoInfo) {
  limpiarResultados();
  
  const tieneDescuento = factorDescuento < 1.0;
  const precioSinDescuento = precioBase * cantidad;
  
  // Textos descriptivos
  const tipoTexto = tipo === 'bn' ? 'blanco y negro' : 'a color';
  const tamanoTexto = {
    carta: 'Carta (8.5" × 11")',
    oficio: 'Oficio (8.5" × 13")',
    tabloide: 'Tabloide (11" × 17")'
  }[tamano];
  
  const coberturaTexto = tipo === 'color' ? {
    baja: 'cobertura baja',
    media: 'cobertura media',
    alta: 'cobertura alta'
  }[cobertura] : '';
  
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
  `;
  
  if (tipo === 'color' && coberturaTexto) {
    html += `
      <div class="detalle">
        <span class="label">Cobertura:</span>
        <span class="valor">${coberturaTexto.charAt(0).toUpperCase() + coberturaTexto.slice(1)}</span>
      </div>
    `;
  }
  
  // Mostrar precio tachado si hay descuento
  if (tieneDescuento) {
    html += `
      <div class="detalle precio-original">
        <span class="label">Precio regular:</span>
        <span class="valor tachado">$${precioSinDescuento.toFixed(2)} MXN</span>
      </div>
    `;
  }
  
  html += `
      <div class="detalle total">
        <span class="label">Total a pagar:</span>
        <span class="valor precio-final">$${total.toFixed(2)} MXN</span>
      </div>
    </div>
  `;
  
  elementos.resultado.innerHTML = html;
  
  // Mostrar mensaje de descuento
  if (tieneDescuento) {
    elementos.resultado.classList.add('descuento');
    const ahorro = precioSinDescuento - total;
    elementos.mensajeDescuento.innerHTML = `
      <i class="fa-solid fa-tag"></i>
      ${descuentoInfo.etiqueta} aplicado
      <small>Ahorras $${ahorro.toFixed(2)} MXN</small>
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