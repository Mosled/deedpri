// === COTIZADOR DE COPIAS E IMPRESIONES AVANZADO (con botón limpiar) ===

// 💰 1️⃣ Precios base
const precios = {
  bn: { carta: 1.0, oficio: 1.5, tabloide: 3.0 },
  color: { carta: 3.0, oficio: 4.0, tabloide: 6.0 }
};

// 🎨 2️⃣ Factor por cobertura
const coberturaFactor = { baja: 1.0, media: 1.2, alta: 1.5 };

// 🔗 3️⃣ Referencias DOM
const tipoSelect = document.getElementById("tipo");
const tamanoSelect = document.getElementById("tamano");
const coberturaSelect = document.getElementById("cobertura");
const coberturaLabel = document.querySelector('label[for="cobertura"]');
const cantidadInput = document.getElementById("cantidad");
const resultado = document.getElementById("resultado");
const mensajeDescuento = document.getElementById("mensaje-descuento");
const limpiarBtn = document.getElementById("limpiar"); // 🆕 nuevo botón

// Mostrar/ocultar cobertura
coberturaLabel.style.display = "none";
coberturaSelect.style.display = "none";

tipoSelect.addEventListener("change", () => {
  const esColor = tipoSelect.value === "color";
  coberturaLabel.style.display = esColor ? "block" : "none";
  coberturaSelect.style.display = esColor ? "block" : "none";
  coberturaSelect.value = "";
  coberturaSelect.classList.remove("error-resaltado");
});

// Calcular
document.getElementById("calcular").addEventListener("click", () => {
  const tipo = tipoSelect.value;
  const tamano = tamanoSelect.value;
  const cobertura = coberturaSelect.value;
  const cantidad = parseInt(cantidadInput.value);

  // Validación cantidad
  if (!cantidad || cantidad <= 0) {
    mostrarError("Por favor, ingresa una cantidad válida.");
    return;
  }

  // Validación cobertura si es color
  if (tipo === "color" && !cobertura) {
    mostrarError("⚠️ Por favor, selecciona la cobertura de tinta (baja, media o alta).");
    coberturaSelect.classList.add("error-resaltado");
    setTimeout(() => coberturaSelect.classList.remove("error-resaltado"), 1200);
    return;
  }

  // Calcular total según tamaño
  let total;
  switch (tamano) {
    case "carta": total = calcularCarta(tipo, cobertura, cantidad); break;
    case "oficio": total = calcularOficio(tipo, cobertura, cantidad); break;
    case "tabloide": total = calcularTabloide(tipo, cobertura, cantidad); break;
    default: total = 0;
  }

  mostrarResultado(total, tipo, tamano, cantidad);
});


// 🧹 Botón LIMPIAR (con efecto de desvanecimiento)
limpiarBtn.addEventListener("click", () => {
  // 🔸 Animación de desvanecimiento en el resultado
  resultado.classList.add("desvanecer");
  mensajeDescuento.classList.add("desvanecer");

  // Espera a que termine la animación antes de limpiar todo
  setTimeout(() => {
    // Reinicia todos los campos del formulario
    tipoSelect.value = "bn";
    tamanoSelect.value = "carta";
    coberturaSelect.value = "";
    cantidadInput.value = "";
    coberturaLabel.style.display = "none";
    coberturaSelect.style.display = "none";

    // Limpia los textos
    resultado.textContent = "";
    mensajeDescuento.textContent = "";

    // Remueve las clases de animación
    resultado.classList.remove("desvanecer", "mostrar", "descuento");
    mensajeDescuento.classList.remove("desvanecer", "mostrar-mensaje");

    // ✨ Efecto visual en el botón
    limpiarBtn.classList.add("btn-limpio");
    setTimeout(() => limpiarBtn.classList.remove("btn-limpio"), 800);
  }, 500); // duración del desvanecimiento
});


// === Funciones auxiliares ===
function mostrarError(texto) {
  resultado.innerHTML = `<p class="mensaje-error">${texto}</p>`;
  resultado.classList.remove("descuento");
  resultado.classList.add("mostrar");
  mensajeDescuento.textContent = "";
}

function calcularCarta(tipo, cobertura, cantidad) {
  let precioUnit = precios[tipo].carta;
  if (tipo === "color") precioUnit *= coberturaFactor[cobertura];
  if (cantidad >= 100) precioUnit *= 0.9;
  if (cantidad >= 500) precioUnit *= 0.85;
  return precioUnit * cantidad;
}

function calcularOficio(tipo, cobertura, cantidad) {
  let precioUnit = precios[tipo].oficio;
  if (tipo === "color") precioUnit *= coberturaFactor[cobertura] * 1.05;
  if (cantidad >= 100) precioUnit *= 0.92;
  if (cantidad >= 300) precioUnit *= 0.88;
  return precioUnit * cantidad;
}

function calcularTabloide(tipo, cobertura, cantidad) {
  let precioUnit = precios[tipo].tabloide;
  if (tipo === "color") precioUnit *= coberturaFactor[cobertura] * 1.2;
  if (cantidad >= 100) precioUnit *= 0.95;
  if (cantidad >= 200) precioUnit *= 0.9;
  return precioUnit * cantidad;
}

function mostrarResultado(total, tipo, tamano, cantidad) {
  resultado.classList.remove("mostrar", "descuento");
  mensajeDescuento.textContent = "";

  const precioNormal = precios[tipo][tamano] * cantidad;
  const tieneDescuento = total < precioNormal;

  resultado.innerHTML = `
    <p><strong>${cantidad}</strong> copias ${tipo === "bn" ? "blanco y negro" : "a color"} tamaño <strong>${tamano}</strong></p>
    <p>Total: <strong>$${total.toFixed(2)} MXN</strong></p>
  `;

  if (tieneDescuento) {
    resultado.classList.add("descuento");
    mensajeDescuento.textContent = "🎉 ¡Descuento aplicado por volumen o tamaño!";
    mensajeDescuento.classList.add("mostrar-mensaje");
  } else {
    mensajeDescuento.classList.remove("mostrar-mensaje");
  }

  void resultado.offsetWidth;
  resultado.classList.add("mostrar");
}


