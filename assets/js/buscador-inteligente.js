/* ========================================
   BUSCADOR INTELIGENTE - FASE 1
   Archivo: assets/js/buscador-inteligente.js
   Sistema de Keywords y Sinónimos
   ======================================== */

/**
 * BÚSQUEDA INTELIGENTE CON KEYWORDS Y SINÓNIMOS
 * Esta función reemplaza a buscarNegocios() anterior
 * 
 * @param {string} query - Término de búsqueda
 * @param {string} ubicacion - Ubicación para filtrar
 * @returns {Array} - Negocios ordenados por relevancia
 */
function buscarNegociosInteligente(query, ubicacion) {
  console.log('🧠 Búsqueda inteligente:', query);
  
  if (!query || query.trim() === '') {
    return filtrarPorUbicacion(negociosDB, ubicacion);
  }
  
  query = query.toLowerCase().trim();
  const terminosExpandidos = expandirConSinonimos(query);
  
  // Calcular scores
  const negociosConScore = negociosDB.map(negocio => {
    const score = calcularScore(negocio, query, terminosExpandidos);
    return { negocio, score };
  });
  
  // Filtrar y ordenar
  let resultados = negociosConScore
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.negocio);
  
  // Filtrar por ubicación
  resultados = filtrarPorUbicacion(resultados, ubicacion);
  
  console.log(`✅ ${resultados.length} resultados para "${query}"`);
  return resultados;
}

/**
 * Calcular score de relevancia para un negocio
 * @param {Object} negocio - Negocio a evaluar
 * @param {string} queryOriginal - Query original del usuario
 * @param {Array} terminosExpandidos - Términos con sinónimos
 * @returns {number} - Score de relevancia
 */
function calcularScore(negocio, queryOriginal, terminosExpandidos) {
  let score = 0;
  let tieneCoincidencia = false;
  
  const nombre = negocio.nombre.toLowerCase();
  const categoria = (negocio.categoria || '').toLowerCase();
  const subcategoria = (negocio.subcategoria || '').toLowerCase();
  const descripcion = (negocio.descripcion || '').toLowerCase();
  const keywords = negocio.keywords || [];
  
  // 1. COINCIDENCIA EXACTA EN NOMBRE (máxima prioridad)
  if (nombre.includes(queryOriginal)) {
    score += 100;
    tieneCoincidencia = true;
  }
  
  // 2. COINCIDENCIA EN KEYWORDS (alta prioridad)
  terminosExpandidos.forEach(termino => {
    // Ignorar adjetivos comunes
    if (esAdjetivoIgnorable(termino)) {
      return;
    }
    
    // Buscar en keywords
    const keywordMatch = keywords.some(kw => kw.toLowerCase().includes(termino));
    if (keywordMatch) {
      score += 50;
      tieneCoincidencia = true;
    }
    
    // Buscar en nombre (parcial)
    if (nombre.includes(termino) && !nombre.includes(queryOriginal)) {
      score += 40;
      tieneCoincidencia = true;
    }
    
    // Buscar en subcategoría
    if (subcategoria.includes(termino)) {
      score += 35;
      tieneCoincidencia = true;
    }
    
    // Buscar en categoría
    if (categoria.includes(termino)) {
      score += 30;
      tieneCoincidencia = true;
    }
    
    // Buscar en descripción
    if (descripcion.includes(termino)) {
      score += 15;
      tieneCoincidencia = true;
    }
  });
  
  // SOLO APLICAR BONUS SI HAY ALGUNA COINCIDENCIA
  if (tieneCoincidencia) {
    // 3. BONUS POR DESTACADO
    if (negocio.destacado) {
      score += 10;
    }
    
    // 4. BONUS POR RATING ALTO
    if (negocio.rating >= 4.5) {
      score += 8;
    } else if (negocio.rating >= 4.0) {
      score += 5;
    }
    
    // 5. BONUS POR VERIFICADO
    if (negocio.verificado) {
      score += 3;
    }
  }
  
  return score;
}

/**
 * Filtrar negocios por ubicación
 * @param {Array} negocios - Array de negocios
 * @param {string} ubicacion - Ubicación para filtrar
 * @returns {Array} - Negocios filtrados
 */
function filtrarPorUbicacion(negocios, ubicacion) {
  if (!ubicacion || ubicacion === 'todos') {
    return negocios;
  }
  
  return negocios.filter(n => n.municipio === ubicacion);
}

/**
 * REEMPLAZAR la función buscarNegocios anterior
 * Para mantener compatibilidad con código existente
 */
function buscarNegocios(query, ubicacion) {
  return buscarNegociosInteligente(query, ubicacion);
}

console.log('✅ Buscador Inteligente FASE 1 activado');
console.log('🎯 Sistema de Keywords y Sinónimos funcionando');
