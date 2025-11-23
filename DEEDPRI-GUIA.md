# GUÍA DEEDPRI - PROYECTO CLEAN STUDIO
**Actualización:** 23 Noviembre 2024  
**Desarrollador:** Jose Luis  
**Ubicación:** Zacualtipán, Hidalgo, México

---

## 🔄 HISTORIAL DE CAMBIOS
**[22-Nov-2024]** - Creación inicial de la guía
**[22-Nov-2024]** - Completada página impresion-laser.html con patrón premium
**[22-Nov-2024]** - Agregado patrón de sección de comparación (Premium vs Regular)
**[22-Nov-2024]** - Agregado patrón de CTA final con WhatsApp
**[22-Nov-2024]** - Optimización responsive para 2 columnas en móvil (Samsung A51)
**[23-Nov-2024]** - Completada página impresion-stickers.html (creativo/identidad)
**[23-Nov-2024]** - Completada página diseno-personalizacion.html (visual/galería)
**[23-Nov-2024]** - Completada página impresion-publicitaria.html (material corporativo)
**[23-Nov-2024]** - Agregado patrón de galería visual con íconos circulares
**[23-Nov-2024]** - Agregado patrón de proceso en pasos numerados

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
- **Visual:** Menos texto, más imágenes cuando sea apropiado

### Características visuales
- Tipografía Poppins (principal)
- Hero de 2 columnas (texto + imagen)
- Cards con sombras suaves
- Animaciones sutiles en hover
- Fondo blanco/gris claro
- Acentos en amarillo deedpri
- Elementos premium en naranja/dorado
- Íconos grandes y expresivos

---

## 🆕 PATRONES IMPLEMENTADOS

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

**Usado en:** impresion-laser.html

---

### Patrón: CTA Final con WhatsApp

**Cuándo usar:**
- Al final de TODAS las páginas de servicio
- Antes del botón "Regresar a servicios"
- Para maximizar conversiones

**Estructura:**
- Fondo premium dorado
- Título persuasivo
- Descripción breve
- Botón verde de WhatsApp

**Usado en:** TODAS las páginas de servicio

---

### Patrón: Galería Visual con Íconos Circulares ✅ NUEVO

**Cuándo usar:**
- Servicios creativos (diseño, personalización)
- Cuando quieres menos texto y más impacto visual
- Para destacar múltiples servicios de forma elegante

**Características:**
- Íconos grandes en círculos con degradado amarillo
- Cards amplias con hover dinámico
- Barra superior animada al hover
- Transform y rotate en hover

**Estructura CSS clave:**
```css
.galeria-icono {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, var(--accent), #ffdf3a);
  border-radius: 50%;
  /* Contiene el ícono grande */
}

.galeria-card:hover .galeria-icono {
  transform: scale(1.1) rotate(5deg);
}
```

**Usado en:** diseno-personalizacion.html

---

### Patrón: Proceso en Pasos Numerados ✅ NUEVO

**Cuándo usar:**
- Servicios que requieren explicar un flujo de trabajo
- Para generar confianza mostrando el proceso
- Especialmente en servicios personalizados

**Características:**
- Números grandes en círculos amarillos
- 4 pasos claramente definidos
- Grid responsive (4 → 2 → 1 columnas)
- Hover que escala el número

**Estructura:**
```html
<div class="proceso-step">
  <div class="step-numero">1</div>
  <h3>Título del paso</h3>
  <p>Descripción breve</p>
</div>
```

**Usado en:** diseno-personalizacion.html

---

### Patrón: Responsive 2 Columnas en Móvil

**Cuándo usar:**
- SIEMPRE en secciones de Tamaños, Usos, Productos, Tipos
- Para aprovechar mejor el espacio en móvil
- Especialmente en dispositivos medianos (412px - Samsung A51)

**IMPORTANTE:** 
- Galería visual: 1 columna en móvil (mejor lectura)
- Comparación: 1 columna en móvil (mejor lectura)
- Proceso: 2 columnas en móvil
- Todo lo demás: 2 columnas en móvil

**Usado en:** Todas las páginas nuevas

---

## 📝 ARCHIVOS DE REFERENCIA

### Ejemplo económico: copias-impresiones.html
**Modelo para servicios económicos/estándar.**

Características:
- Hero 2 columnas limpio
- Nota amarilla estándar
- 4 tamaños con íconos
- 4 usos comunes
- Sin sección de comparación
- Estilo Clean Studio puro

**Cuándo usar:** Servicios básicos, económicos, cotidianos

---

### Ejemplo premium: impresion-laser.html
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

**Cuándo usar:** Servicios más caros, calidad superior, diferenciación

---

### Ejemplo creativo: impresion-stickers.html ✅ NUEVO
**Modelo para servicios de personalización e identidad.**

Características:
- Hero enfocado en creatividad
- 4 tipos de producto (troquelado, hoja, transparente, holográfico)
- 4 usos (identidad + eventos)
- Énfasis en versatilidad
- CTA enfocado en "dar identidad"

**Cuándo usar:** Servicios creativos, personalizables, versátiles

---

### Ejemplo visual: diseno-personalizacion.html ✅ NUEVO
**Modelo para servicios con enfoque en galería y portfolio.**

Características:
- Hero minimalista (menos texto)
- Galería visual con íconos circulares grandes
- 6 servicios en grid amplio
- Sección de proceso (4 pasos numerados)
- Responsive: galería 1 columna, proceso 2 columnas
- Estilo más "portfolio"

**Cuándo usar:** Servicios de diseño, creativos, cuando necesitas mostrar más que explicar

---

### Ejemplo corporativo: impresion-publicitaria.html ✅ NUEVO
**Modelo para servicios con límites claros y especificaciones.**

Características:
- Hero con nota aclaratoria (límites del servicio)
- 6-7 productos específicos
- Sección de tipos de material
- Sección de especificaciones técnicas
- Enfoque práctico para negocios

**Cuándo usar:** Servicios con límites técnicos, material corporativo, productos específicos

---

## 🔄 CÓMO USAR ESTA GUÍA EN UN NUEVO CHAT

### Paso 1: Subir archivos de referencia

**Para servicio económico:**
- DEEDPRI-GUIA.md
- copias-impresiones.html
- copias-impresiones.css

**Para servicio premium:**
- DEEDPRI-GUIA.md
- impresion-laser.html
- impresion-laser.css

**Para servicio creativo/identidad:**
- DEEDPRI-GUIA.md
- impresion-stickers.html
- impresion-stickers.css

**Para servicio visual/diseño:**
- DEEDPRI-GUIA.md
- diseno-personalizacion.html
- diseno-personalizacion.css

**Para servicio corporativo/técnico:**
- DEEDPRI-GUIA.md
- impresion-publicitaria.html
- impresion-publicitaria.css

### Paso 2: Mensaje inicial

```
Hola Claude, continuamos con el proyecto deedpri.

Aquí está la guía completa del proyecto y archivos de referencia.

Necesito crear la página de [nombre del servicio].
Es un servicio [tipo: económico/premium/creativo/visual/corporativo].
```

---

## 🎯 VERSIÓN Y ACTUALIZACIONES

**Versión actual:** 1.2  
**Última actualización:** 23 Noviembre 2024  

**Páginas completadas:**
- ✅ copias-impresiones.html (servicio económico)
- ✅ impresion-fotografica.html (estilo especial oscuro)
- ✅ impresion-laser.html (servicio premium)
- ✅ impresion-stickers.html (creativo/identidad) ✅ NUEVO
- ✅ diseno-personalizacion.html (visual/galería) ✅ NUEVO
- ✅ impresion-publicitaria.html (corporativo/técnico) ✅ NUEVO

**Patrones implementados:**
- ✅ Hero 2 columnas estándar
- ✅ Hero 2 columnas premium (con nota naranja)
- ✅ Hero minimalista (menos texto)
- ✅ Sección de comparación (Premium vs Regular)
- ✅ Galería visual con íconos circulares
- ✅ Proceso en pasos numerados
- ✅ CTA final con WhatsApp
- ✅ Responsive 2 columnas en móvil
- ✅ Cards optimizadas para diferentes propósitos

**Tipos de páginas disponibles:**
1. **Económico:** copias-impresiones.html
2. **Premium:** impresion-laser.html
3. **Creativo:** impresion-stickers.html
4. **Visual:** diseno-personalizacion.html
5. **Corporativo:** impresion-publicitaria.html
6. **Especial oscuro:** impresion-fotografica.html

---

## 💡 TIPS PARA CLAUDE

### Al crear páginas nuevas:

**Pregunta clave:** ¿Qué tipo de servicio es?
- **Económico/básico** → copias-impresiones.html
- **Premium/calidad superior** → impresion-laser.html
- **Creativo/personalización** → impresion-stickers.html
- **Visual/portfolio** → diseno-personalizacion.html
- **Corporativo/técnico** → impresion-publicitaria.html

### Checklist rápido:
- ✅ Hero 2 columnas (o minimalista si es visual)
- ✅ 4-6 cards de productos/tamaños/tipos
- ✅ 4 usos comunes (o sección de proceso)
- ✅ CTA final con WhatsApp
- ✅ Responsive 2 columnas en móvil
- ✅ Smooth scroll agregado
- ✅ CSS específico por página

### Recuerda:
- José Luis prefiere instrucciones de "DÓNDE cambiar" en lugar de código completo
- Es eficiente y práctico
- Valora la calidad sobre la velocidad
- Obsesionado con calidad de servicio
- Dispositivo de prueba: Samsung A51
- Entiende perfectamente el estilo Clean Studio

---

## 📊 ESTADÍSTICAS DEL PROYECTO

**Total de páginas:** 6 páginas de servicio completadas
**Patrones creados:** 8 patrones reutilizables
**Tiempo de desarrollo:** ~2 sesiones
**Consistencia:** 100% Clean Studio

---

## 🎨 ÍCONOS FONT AWESOME

**Recurso:** https://fontawesome.com/search?o=r&m=free

**Íconos comunes usados:**
- `fa-solid fa-crown` - Premium
- `fa-solid fa-palette` - Creatividad
- `fa-solid fa-scissors` - Corte
- `fa-solid fa-utensils` - Menús
- `fa-solid fa-newspaper` - Volantes
- `fa-solid fa-id-card` - Tarjetas
- `fa-brands fa-whatsapp` - WhatsApp

---

**FIN DE LA GUÍA**

*Mantén este archivo actualizado cuando se agreguen nuevas páginas o patrones.*  
*Última actualización: 23 Noviembre 2024*