// === COTIZADOR DE COPIAS E IMPRESIONES ===

// Tabla de precios base (MXN)
const precios = {
  bn: { carta: 1.0, oficio: 1.5, tabloide: 3.0 },
  color: { carta: 2.0, oficio: 3.0, tabloide: 6.0 }
};

// Factores por cobertura de tinta
const coberturaFactor = {
  baja: 1.0,
  media: 1.3,
  alta: 1.6
};

// Elementos del formulario
const tipoSelect = document.getElementById("tipo");
const coberturaLabel = document.querySelector('label[for="cobertura"]');
const coberturaSelect = document.getElementById("cobertura");
const resultado = document.getElementById("resultado");

// Inicialmente oculta la cobertura
coberturaLabel.style.display = "none";
coberturaSelect.style.display = "none";

// Muestra u oculta según el tipo
tipoSelect.addEventListener("change", () => {
  if (tipoSelect.value === "color") {
    coberturaLabel.style.display = "block";
    coberturaSelect.style.display = "block";
  } else {
    coberturaLabel.style.display = "none";
    coberturaSelect.style.display = "none";
  }
});

// Cálculo principal
document.getElementById("calcular").addEventListener("click", () => {
  const tipo = tipoSelect.value;
  const tamano = document.getElementById("tamano").value;
  const cantidad = parseInt(document.getElementById("cantidad").value);
  const cobertura = coberturaSelect.value;

  if (isNaN(cantidad) || cantidad <= 0) {
    resultado.textContent = "Por favor ingresa una cantidad válida.";
    return;
  }

  let precioUnitario = precios[tipo][tamano];

  // Descuento por volumen
  if (cantidad >= 100) {
    if (tipo === "bn") {
      precioUnitario *= 0.8;
    } else {
      precioUnitario *= 0.85;
    }
  }

  // Ajuste por cobertura (solo color)
  if (tipo === "color") {
    precioUnitario *= coberturaFactor[cobertura];
  }

  const total = precioUnitario * cantidad;

  resultado.innerHTML = `
    <p><strong>${cantidad}</strong> copias <strong>${tipo === "bn" ? "blanco y negro" : "a color"}</strong> tamaño <strong>${tamano}</strong></p>
    ${tipo === "color" ? `<p>Cobertura de tinta: <strong>${cobertura}</strong></p>` : ""}
    <p>Precio unitario: <strong>$${precioUnitario.toFixed(2)}</strong></p>
    <p>Total estimado: <strong>$${total.toFixed(2)} MXN</strong></p>
    ${cantidad >= 100 ? "<p class='descuento'>🎉 Se aplicó descuento por volumen</p>" : ""}
  `;
});

document.getElementById("calcular").addEventListener("click", function() {
  const tipo = document.getElementById("tipo").value;
  const tamano = document.getElementById("tamano").value;
  const cobertura = document.getElementById("cobertura").value;
  const cantidad = parseInt(document.getElementById("cantidad").value);
  const resultado = document.getElementById("resultado");
  const mensajeDescuento = document.getElementById("mensaje-descuento");

  if (!cantidad || cantidad <= 0) {
    resultado.textContent = "Por favor, ingresa una cantidad válida.";
    resultado.classList.remove("descuento");
    resultado.classList.add("mostrar");
    mensajeDescuento.textContent = "";
    return;
  }

  // precios base (ajústalos si ya los tienes)
  const precios = {
    bn: { carta: 1, oficio: 1.5, tabloide: 3 },
    color: { carta: 3, oficio: 4, tabloide: 6 }
  };

  const extraTinta = {
    baja: 1,
    media: 1.2,
    alta: 1.5
  };

  let total = precios[tipo][tamano] * cantidad * extraTinta[cobertura];

  // Descuento por volumen
  if (cantidad >= 100) {
    total *= 0.9; // 10% descuento
    resultado.classList.add("descuento");
    resultado.textContent = `🎉 Precio especial aplicado: $${total.toFixed(2)} MXN`;
    mensajeDescuento.textContent = "¡Gracias por tu preferencia! Aplicamos precio especial por volumen 🎉";
    mensajeDescuento.classList.add("mostrar-mensaje");
  } else {
    resultado.classList.remove("descuento");
    resultado.textContent = `💰 Total: $${total.toFixed(2)} MXN`;
    mensajeDescuento.textContent = "";
    mensajeDescuento.classList.remove("mostrar-mensaje");
  }

  // animación resultado
  resultado.classList.remove("mostrar");
  void resultado.offsetWidth; // reinicia animación
  resultado.classList.add("mostrar");
});
