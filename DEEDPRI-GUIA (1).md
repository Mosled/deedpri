# GUÍA DEEDPRI - PROYECTO CLEAN STUDIO
**Actualización:** 22 Noviembre 2024  
**Desarrollador:** Jose Luis  
**Ubicación:** Zacualtipán, Hidalgo, México

---

## 🔄 HISTORIAL DE CAMBIOS
**[22-Nov-2024]** - Creación inicial de la guía
**[22-Nov-2024]** - Completada página impresion-laser.html con patrón premium
**[22-Nov-2024]** - Agregado patrón de sección de comparación (Premium vs Regular)
**[22-Nov-2024]** - Agregado patrón de CTA final con WhatsApp
**[22-Nov-2024]** - Optimización responsive para 2 columnas en móvil (Samsung A51)

---

## 📋 INFORMACIÓN DEL PROYECTO

### Datos del negocio
- **Nombre:** deedpri
- **Giro:** Centro de impresión y fotografía
- **WhatsApp:** 5217295414907
- **Redes sociales:**
  - Facebook: https://www.facebook.com/deedpri/
  - Instagram: https://www.instagram.com/deedpri_oficial
  - TikTok: https://www.tiktok.com/@deedpri_

### Colores de marca
- **Amarillo principal:** #ffd300
- **Amarillo hover:** #ffdf3a
- **Gris principal:** #545454
- **Gris oscuro:** #2a2a2a

### Colores premium (para servicios de alta calidad)
- **Naranja premium:** #ff9800
- **Naranja oscuro:** #e65100
- **Fondo premium:** linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%)

---

## 🎨 ESTILO CLEAN STUDIO

### Filosofía de diseño
- **Minimalista:** Sin excesos, espacios limpios
- **Profesional:** Elegante y moderno
- **Funcional:** Cada elemento tiene propósito
- **Consistente:** Todas las páginas siguen el mismo patrón
- **Diferenciado:** Servicios premium destacan visualmente

### Características visuales
- Tipografía Poppins (principal)
- Hero de 2 columnas (texto + imagen)
- Cards con sombras suaves
- Animaciones sutiles en hover
- Fondo blanco/gris claro
- Acentos en amarillo deedpri
- Elementos premium en naranja/dorado

---

## 🆕 PATRONES NUEVOS

### Patrón: Nota Premium en Hero

**Cuándo usar:**
- Servicios de calidad superior
- Mayor precio que alternativas económicas
- Necesitas justificar la inversión

**HTML:**
```html
<div class="hero-note hero-note-premium">
  <i class="fa-solid fa-crown"></i>
  <span><strong>CALIDAD PREMIUM:</strong> Mayor inversión, mejores resultados · Ideal para proyectos importantes</span>
</div>
```

**CSS:**
```css
.hero-note-premium {
  background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%);
  border-left: 4px solid #ff9800;
  box-shadow: 0 4px 15px rgba(255, 152, 0, 0.2);
}

.hero-note-premium i {
  color: #ff9800;
  font-size: 1.5rem;
}

.hero-note-premium span {
  font-weight: 600;
  color: #e65100;
}
```

**Usado en:** impresion-laser.html

---

### Patrón: Sección de Comparación (Premium vs Regular)

**Cuándo usar:**
- Servicios con calidad premium
- Cuando hay versión económica y premium del mismo servicio
- Para justificar diferencia de precio
- Ayudar al cliente a tomar decisión informada

**Estructura:**
- 2 columnas comparativas (1 en móvil)
- Badge "RECOMENDADO" en card premium
- Lista de características con íconos diferentes
- Card dorada para premium, gris para regular
- Footer con mensaje de valor

**Colores:**
- Regular: gris (#757575, #e0e0e0)
- Premium: naranja (#ff9800, #e65100)

**Usado en:** impresion-laser.html

---

### Patrón: CTA Final con WhatsApp

**Cuándo usar:**
- Al final de TODAS las páginas de servicio
- Antes del botón "Regresar a servicios"
- Para maximizar conversiones

**HTML:**
```html
<section class="seccion-cta-final">
  <div class="container-cta">
    <h2>¿Listo para [acción específica]?</h2>
    <p>Envíanos tu proyecto y recibe una cotización personalizada</p>
    <a href="https://wa.me/5217295414907?text=..." class="btn-cta-whatsapp" target="_blank">
      <i class="fa-brands fa-whatsapp"></i>
      Cotiza tus [servicio]
    </a>
  </div>
</section>
```

**Usado en:** impresion-laser.html

---

### Patrón: Responsive 2 Columnas en Móvil

**Cuándo usar:**
- SIEMPRE en secciones de Tamaños y Usos
- Para aprovechar mejor el espacio en móvil
- Especialmente en dispositivos medianos (412px - Samsung A51)

**CSS:**
```css
@media (max-width: 768px) {
  /* 2 COLUMNAS para mejor aprovechamiento */
  .tamanos-grid,
  .usos-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  /* Cards más compactas */
  .tamano-card,
  .uso-card {
    padding: 1.2rem 0.8rem;
  }
  
  /* Íconos más pequeños */
  .tamano-icono,
  .uso-card i {
    font-size: 2rem;
  }
}
```

**IMPORTANTE:** Comparación siempre en 1 columna en móvil para mejor lectura.

**Usado en:** impresion-laser.html

---

## 📝 ARCHIVOS DE REFERENCIA

### Ejemplo perfecto: copias-impresiones.html
**Modelo para servicios económicos/estándar.**

Características:
- Hero 2 columnas limpio
- Nota amarilla estándar
- 4 tamaños con íconos
- 4 usos comunes
- Sin sección de comparación
- Estilo Clean Studio puro

---

### Ejemplo premium: impresion-laser.html ✅ NUEVO
**Modelo para servicios premium/de alta calidad.**

Características:
- Hero 2 columnas con descripción extendida
- Nota naranja premium con corona
- 4 tamaños con badges
- Sección de comparación (Premium vs Regular)
- 4 usos comunes
- CTA final con WhatsApp
- Responsive optimizado (2 columnas en móvil)
- Colores premium (naranja/dorado)

**Cuándo usar:**
- Servicios más caros que alternativas
- Calidad superior justificada
- Necesitas destacar diferenciación
- Proyectos profesionales/empresariales

---

## 🔄 CÓMO USAR ESTA GUÍA EN UN NUEVO CHAT

### Paso 1: Subir archivos
1. DEEDPRI-GUIA.md (este archivo)
2. copias-impresiones.html (referencia económico)
3. copias-impresiones.css (referencia económico)
4. impresion-laser.html (referencia premium) ✅ NUEVO
5. impresion-laser.css (referencia premium) ✅ NUEVO

### Paso 2: Mensaje inicial
```
Hola Claude, continuamos con el proyecto deedpri.

Aquí está la guía completa del proyecto y archivos de referencia.

Para servicios económicos: usar copias-impresiones.html
Para servicios premium: usar impresion-laser.html

Necesito crear la página de [nombre del servicio].
Es un servicio [económico/premium].
```

---

## 🎯 VERSIÓN Y ACTUALIZACIONES

**Versión actual:** 1.1  
**Última actualización:** 22 Noviembre 2024  

**Páginas completadas:**
- ✅ copias-impresiones.html (servicio económico)
- ✅ impresion-fotografica.html (estilo especial oscuro)
- ✅ impresion-laser.html (servicio premium) ✅ NUEVO

**Patrones implementados:**
- ✅ Hero 2 columnas estándar
- ✅ Hero 2 columnas premium (con nota naranja)
- ✅ Sección de comparación (Premium vs Regular)
- ✅ CTA final con WhatsApp
- ✅ Responsive 2 columnas en móvil
- ✅ Cards de tamaños y usos optimizadas

---

## 💡 TIPS PARA CLAUDE

### Al crear páginas nuevas:
- Pregunta primero: ¿Es servicio económico o premium?
- Si es premium: usa impresion-laser.html como base
- Si es económico: usa copias-impresiones.html como base
- Siempre incluye CTA final con WhatsApp
- Siempre optimiza responsive para 2 columnas en móvil
- No reinventes la rueda, replica lo que funciona

### Recuerda:
- José Luis prefiere instrucciones de "DÓNDE cambiar" en lugar de código completo
- Es eficiente y práctico
- Valora la calidad sobre la velocidad
- Obsesionado con calidad de servicio
- Dispositivo de prueba: Samsung A51

---

**FIN DE LA GUÍA**

*Mantén este archivo actualizado cuando se agreguen nuevas páginas o patrones.*
