// === COTIZADOR DE COPIAS E IMPRESIONES MEJORADO ===

// 1️⃣ Configuración centralizada
const CONFIG = {
  precios: {
    bn: { carta: 1.0, oficio: 1.5, tabloide: 3.0 },
    color: { carta: 3.0, oficio: 4.0, tabloide: 6.0 }
  },
  
  coberturaFactor: { 
    baja: 1.0, 
    media: 1.2, 
    alta: 1.5 
  },
  
  // Factores adicionales por tamaño
  factoresTamano: {
    carta: 1.0,
    oficio: 1.05,
    tabloide: 1.2
  },
  
  // Descuentos por volumen según tamaño
  descuentos: {
    carta: [
      { minimo: 100, descuento: 0.85 },
      { minimo: 100, descuento: 0.90 }
    ],
    oficio: [
      { minimo: 100, descuento: 0.88 },
      { minimo: 100, descuento: 0.92 }
    ],
    tabloide: [
      { minimo: 100, descuento: 0.90 },
      { minimo: 100, descuento: 0.95 }
    ]
  },
  
  // Duraciones de animación
  animaciones: {
    desvanecer: 500,
    resaltado: 1200,
    botonLimpio: 800
  }
};

// 2️⃣ Referencias DOM con validación
const elementos = obtenerElementosDOM();

function obtenerElementosDOM() {
  const ids = {
    tipo: 'tipo',
    tamano: 'tamano',
    cobertura: 'cobertura',
    cantidad: 'cantidad',
    resultado: 'resultado',
    mensajeDescuento: 'mensaje-descuento',
    calcular: 'calcular',
    limpiar: 'limpiar'
  };
  
  const elementos = {};
  
  for (const [key, id] of Object.entries(ids)) {
    const elemento = document.getElementById(id);
    if (!elemento) {
      console.error(`Error: No se encontró el elemento con id "${id}"`);
    }
    elementos[key] = elemento;
  }
  
  elementos.coberturaLabel = document.querySelector('label[for="cobertura"]');
  
  return elementos;
}

// 3️⃣ Inicialización
function inicializar() {
  if (!elementos.tipo || !elementos.calcular) {
    console.error('Error: Elementos críticos no encontrados');
    return;
  }
  
  // Ocultar cobertura al inicio
  toggleCobertura(false);
  
  // Event listeners
  elementos.tipo.addEventListener('change', manejarCambioTipo);
  elementos.calcular.addEventListener('click', manejarCalcular);
  elementos.limpiar.addEventListener('click', manejarLimpiar);
}

// 4️⃣ Manejadores de eventos
function manejarCambioTipo() {
  const esColor = elementos.tipo.value === 'color';
  toggleCobertura(esColor);
  
  if (!esColor) {
    elementos.cobertura.value = '';
    elementos.cobertura.classList.remove('error-resaltado');
  }
}

function manejarCalcular() {
  try {
    const datos = obtenerDatosFormulario();
    
    if (!validarDatos(datos)) {
      return;
    }
    
    const total = calcularTotal(datos);
    mostrarResultado(total, datos);
    
  } catch (error) {
    console.error('Error al calcular:', error);
    mostrarError('Ocurrió un error al calcular. Por favor, intenta de nuevo.');
  }
}

function manejarLimpiar() {
  // Animación de desvanecimiento
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

// 5️⃣ Lógica de negocio - UNIFICADA
function calcularTotal({ tipo, tamano, cobertura, cantidad }) {
  // Precio base
  let precioUnitario = CONFIG.precios[tipo][tamano];
  
  // Factor de cobertura (solo para color)
  if (tipo === 'color' && cobertura) {
    precioUnitario *= CONFIG.coberturaFactor[cobertura];
  }
  
  // Factor adicional por tamaño (solo para color)
  if (tipo === 'color') {
    precioUnitario *= CONFIG.factoresTamano[tamano];
  }
  
  // Aplicar descuento por volumen
  const factorDescuento = obtenerFactorDescuento(tamano, cantidad);
  precioUnitario *= factorDescuento;
  
  return precioUnitario * cantidad;
}

function obtenerFactorDescuento(tamano, cantidad) {
  const descuentos = CONFIG.descuentos[tamano];
  
  // Buscar el descuento aplicable (ordenados de mayor a menor)
  for (const { minimo, descuento } of descuentos) {
    if (cantidad >= minimo) {
      return descuento;
    }
  }
  
  return 1.0; // Sin descuento
}

// 6️⃣ Validaciones
function validarDatos({ tipo, tamano, cobertura, cantidad }) {
  // Validar cantidad
  if (!cantidad || cantidad <= 0) {
    mostrarError('Por favor, ingresa una cantidad válida.');
    return false;
  }
  
  // Validar cobertura para impresiones a color
  if (tipo === 'color' && !cobertura) {
    mostrarError('Por favor, selecciona la cobertura de tinta (baja, media o alta).');
    resaltarError(elementos.cobertura);
    return false;
  }
  
  return true;
}

function resaltarError(elemento) {
  elemento.classList.add('error-resaltado');
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
    cantidad: parseInt(elementos.cantidad.value)
  };
}

function toggleCobertura(mostrar) {
  const display = mostrar ? 'block' : 'none';
  elementos.coberturaLabel.style.display = display;
  elementos.cobertura.style.display = display;
}

function resetearFormulario() {
  elementos.tipo.value = 'bn';
  elementos.tamano.value = 'carta';
  elementos.cobertura.value = '';
  elementos.cantidad.value = '';
  
  toggleCobertura(false);
  
  elementos.resultado.textContent = '';
  elementos.mensajeDescuento.textContent = '';
  elementos.resultado.classList.remove('desvanecer', 'mostrar', 'descuento');
  elementos.mensajeDescuento.classList.remove('desvanecer', 'mostrar-mensaje');
}

// 8️⃣ Presentación de resultados
function mostrarError(texto) {
  elementos.resultado.innerHTML = `<p class="mensaje-error">${texto}</p>`;
  elementos.resultado.classList.remove('descuento');
  elementos.resultado.classList.add('mostrar');
  elementos.mensajeDescuento.textContent = '';
}

function mostrarResultado(total, { tipo, tamano, cantidad }) {
  // Limpiar estado anterior
  elementos.resultado.classList.remove('mostrar', 'descuento');
  elementos.mensajeDescuento.textContent = '';
  
  // Calcular si hay descuento
  const precioSinDescuento = CONFIG.precios[tipo][tamano] * cantidad;
  const tieneDescuento = total < precioSinDescuento;
  
  // Construir mensaje
  const tipoTexto = tipo === 'bn' ? 'blanco y negro' : 'a color';
  elementos.resultado.innerHTML = `
    <p><strong>${cantidad}</strong> copias ${tipoTexto} tamaño <strong>${tamano}</strong></p>
    <p>Total: <strong>$${total.toFixed(2)} MXN</strong></p>
  `;
  
  // Mostrar mensaje de descuento si aplica
  if (tieneDescuento) {
    elementos.resultado.classList.add('descuento');
    elementos.mensajeDescuento.textContent = '🎉 ¡Descuento aplicado por volumen o tamaño!';
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


