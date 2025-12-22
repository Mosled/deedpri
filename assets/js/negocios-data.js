/* ========================================
   BASE DE DATOS DE NEGOCIOS - PRUEBA
   Archivo: assets/js/negocios-data.js
   Proyecto: deedpri
   ======================================== */

// === NEGOCIOS DE PRUEBA ===
const negociosDB = [
  // ===== PREMIUM PLUS (2) =====
  {
    id: 1,
    nombre: "Restaurante El Sabroso",
    categoria: "alimentos",
    subcategoria: "Restaurantes",
    municipio: "zacualtipan",
    direccion: "Av. Juárez #456, Centro",
    telefono: "7712345678",
    whatsapp: "7712345678",
    email: "contacto@elsabroso.com",
    horario: "Lunes a Domingo: 8:00 AM - 10:00 PM",
    descripcion: "Restaurante de comida mexicana tradicional con más de 20 años de experiencia. Especialistas en barbacoa, mole y antojitos regionales. Ambiente familiar y precios accesibles.",
    foto: "https://via.placeholder.com/800x600/ffd300/2a2a2a?text=El+Sabroso",
    galeria: [
      "https://via.placeholder.com/600x400/ffd300/2a2a2a?text=Platillo+1",
      "https://via.placeholder.com/600x400/ffd300/2a2a2a?text=Platillo+2",
      "https://via.placeholder.com/600x400/ffd300/2a2a2a?text=Interior"
    ],
    rating: 4.8,
    reviews: 34,
    facebook: "https://facebook.com/elsabroso",
    instagram: "@elsabroso_oficial",
    coordenadas: { lat: 20.1234, lng: -98.5678 },
    cupon: "15% de descuento en consumo mayor a $300",
    plan: "premium-plus",
    destacado: true,
    verificado: true
  },
  {
    id: 2,
    nombre: "Consultorio Dental Dr. García",
    categoria: "salud",
    subcategoria: "Dentistas",
    municipio: "pachuca",
    direccion: "Calle 5 de Mayo #234, Zona Centro",
    telefono: "7719876543",
    whatsapp: "7719876543",
    email: "dra.garcia@dental.com",
    horario: "Lunes a Viernes: 9:00 AM - 7:00 PM, Sábado: 9:00 AM - 2:00 PM",
    descripcion: "Clínica dental moderna con equipamiento de última generación. Especialistas en ortodoncia, endodoncia y estética dental. Aceptamos seguros médicos mayores.",
    foto: "https://via.placeholder.com/800x600/004aad/ffffff?text=Dental+Garcia",
    galeria: [
      "https://via.placeholder.com/600x400/004aad/ffffff?text=Consultorio",
      "https://via.placeholder.com/600x400/004aad/ffffff?text=Equipamiento",
      "https://via.placeholder.com/600x400/004aad/ffffff?text=Sala+Espera"
    ],
    rating: 4.9,
    reviews: 52,
    facebook: "https://facebook.com/dentalgarcia",
    instagram: "@dental_garcia",
    coordenadas: { lat: 20.1200, lng: -98.7500 },
    cupon: "Primera consulta y limpieza GRATIS",
    plan: "premium-plus",
    destacado: true,
    verificado: true
  },

  // ===== PREMIUM (8) =====
  {
    id: 3,
    nombre: "Pizzería La Italiana",
    categoria: "alimentos",
    subcategoria: "Pizzerías",
    municipio: "zacualtipan",
    direccion: "Av. Hidalgo #123, Centro",
    telefono: "7713456789",
    whatsapp: "7713456789",
    horario: "Martes a Domingo: 2:00 PM - 11:00 PM",
    descripcion: "Pizzas artesanales al horno de leña. Masa fresca todos los días. Servicio a domicilio sin costo extra en la zona centro.",
    foto: "https://via.placeholder.com/800x600/e74c3c/ffffff?text=La+Italiana",
    galeria: [
      "https://via.placeholder.com/600x400/e74c3c/ffffff?text=Pizza+1",
      "https://via.placeholder.com/600x400/e74c3c/ffffff?text=Pizza+2"
    ],
    rating: 4.6,
    reviews: 28,
    whatsapp: "7713456789",
    coordenadas: { lat: 20.1250, lng: -98.5690 },
    plan: "premium",
    destacado: true,
    verificado: true
  },
  {
    id: 4,
    nombre: "Plomería Jiménez 24/7",
    categoria: "servicios",
    subcategoria: "Plomería",
    municipio: "tulancingo",
    direccion: "Col. Centro, Tulancingo",
    telefono: "7755123456",
    whatsapp: "7755123456",
    horario: "Servicio 24 horas, todos los días",
    descripcion: "Servicio de plomería de emergencia y mantenimiento. Atención inmediata. Garantía en todos nuestros trabajos.",
    foto: "https://via.placeholder.com/800x600/3498db/ffffff?text=Plomeria+Jimenez",
    galeria: [
      "https://via.placeholder.com/600x400/3498db/ffffff?text=Herramientas",
      "https://via.placeholder.com/600x400/3498db/ffffff?text=Trabajo"
    ],
    rating: 4.7,
    reviews: 19,
    coordenadas: { lat: 20.0833, lng: -98.3667 },
    plan: "premium",
    destacado: true,
    verificado: true
  },
  {
    id: 5,
    nombre: "Veterinaria Pet Care",
    categoria: "servicios",
    subcategoria: "Veterinarios",
    municipio: "pachuca",
    direccion: "Blvd. Felipe Ángeles #567",
    telefono: "7718765432",
    whatsapp: "7718765432",
    horario: "Lunes a Sábado: 10:00 AM - 8:00 PM",
    descripcion: "Clínica veterinaria completa. Consultas, cirugías, estética canina y venta de alimentos. Médicos certificados.",
    foto: "https://via.placeholder.com/800x600/27ae60/ffffff?text=Pet+Care",
    galeria: [
      "https://via.placeholder.com/600x400/27ae60/ffffff?text=Clinica",
      "https://via.placeholder.com/600x400/27ae60/ffffff?text=Consulta"
    ],
    rating: 4.8,
    reviews: 41,
    coordenadas: { lat: 20.1180, lng: -98.7400 },
    plan: "premium",
    destacado: true,
    verificado: true
  },
  {
    id: 6,
    nombre: "Ferretería El Constructor",
    categoria: "compras",
    subcategoria: "Ferreterías",
    municipio: "zacualtipan",
    direccion: "Carretera a Tulancingo Km 2",
    telefono: "7712987654",
    whatsapp: "7712987654",
    horario: "Lunes a Sábado: 8:00 AM - 7:00 PM, Domingo: 8:00 AM - 2:00 PM",
    descripcion: "Todo para construcción y reparaciones del hogar. Materiales, herramientas y equipo. Entrega a domicilio.",
    foto: "https://via.placeholder.com/800x600/f39c12/2a2a2a?text=El+Constructor",
    galeria: [
      "https://via.placeholder.com/600x400/f39c12/2a2a2a?text=Materiales",
      "https://via.placeholder.com/600x400/f39c12/2a2a2a?text=Herramientas"
    ],
    rating: 4.5,
    reviews: 15,
    coordenadas: { lat: 20.1260, lng: -98.5700 },
    plan: "premium",
    destacado: true,
    verificado: true
  },
  {
    id: 7,
    nombre: "Cafetería Aroma",
    categoria: "alimentos",
    subcategoria: "Cafeterías",
    municipio: "pachuca",
    direccion: "Av. Revolución #890, Centro",
    telefono: "7716543210",
    whatsapp: "7716543210",
    horario: "Lunes a Domingo: 7:00 AM - 10:00 PM",
    descripcion: "Café de especialidad, repostería artesanal y desayunos. WiFi gratis. Ambiente acogedor para trabajar o platicar.",
    foto: "https://via.placeholder.com/800x600/8e44ad/ffffff?text=Cafeteria+Aroma",
    galeria: [
      "https://via.placeholder.com/600x400/8e44ad/ffffff?text=Cafe",
      "https://via.placeholder.com/600x400/8e44ad/ffffff?text=Reposteria"
    ],
    rating: 4.9,
    reviews: 67,
    coordenadas: { lat: 20.1190, lng: -98.7420 },
    plan: "premium",
    destacado: true,
    verificado: true
  },
  {
    id: 8,
    nombre: "Estética Unisex Glamour",
    categoria: "servicios",
    subcategoria: "Estéticas",
    municipio: "mineral-monte",
    direccion: "Calle Morelos #45",
    telefono: "7717654321",
    whatsapp: "7717654321",
    horario: "Martes a Domingo: 10:00 AM - 7:00 PM",
    descripcion: "Cortes de cabello para dama y caballero, tintes, permanentes, peinados para eventos. Previa cita.",
    foto: "https://via.placeholder.com/800x600/e91e63/ffffff?text=Glamour",
    galeria: [
      "https://via.placeholder.com/600x400/e91e63/ffffff?text=Salon",
      "https://via.placeholder.com/600x400/e91e63/ffffff?text=Cortes"
    ],
    rating: 4.6,
    reviews: 23,
    coordenadas: { lat: 20.1400, lng: -98.6700 },
    plan: "premium",
    destacado: true,
    verificado: true
  },
  {
    id: 9,
    nombre: "Gym Fitness Plus",
    categoria: "salud",
    subcategoria: "Gimnasios",
    municipio: "tulancingo",
    direccion: "Col. La Morena, Tulancingo",
    telefono: "7755987654",
    whatsapp: "7755987654",
    horario: "Lunes a Viernes: 6:00 AM - 10:00 PM, Sábado: 8:00 AM - 6:00 PM",
    descripcion: "Gimnasio equipado con pesas, cardio y clases grupales. Entrenadores certificados. Regaderas y vestidores.",
    foto: "https://via.placeholder.com/800x600/16a085/ffffff?text=Fitness+Plus",
    galeria: [
      "https://via.placeholder.com/600x400/16a085/ffffff?text=Equipamiento",
      "https://via.placeholder.com/600x400/16a085/ffffff?text=Clases"
    ],
    rating: 4.7,
    reviews: 38,
    coordenadas: { lat: 20.0850, lng: -98.3680 },
    cupon: "Primera semana GRATIS",
    plan: "premium",
    destacado: true,
    verificado: true
  },
  {
    id: 10,
    nombre: "Taller Mecánico Rodríguez",
    categoria: "servicios",
    subcategoria: "Mecánica",
    municipio: "actopan",
    direccion: "Carretera México-Pachuca Km 120",
    telefono: "7723456789",
    whatsapp: "7723456789",
    horario: "Lunes a Sábado: 8:00 AM - 6:00 PM",
    descripcion: "Servicio mecánico completo, afinaciones, diagnóstico computarizado, frenos y suspensión. Experiencia de 25 años.",
    foto: "https://via.placeholder.com/800x600/95a5a6/ffffff?text=Taller+Rodriguez",
    galeria: [
      "https://via.placeholder.com/600x400/95a5a6/ffffff?text=Taller",
      "https://via.placeholder.com/600x400/95a5a6/ffffff?text=Diagnostico"
    ],
    rating: 4.8,
    reviews: 31,
    coordenadas: { lat: 20.2667, lng: -98.9333 },
    plan: "premium",
    destacado: true,
    verificado: true
  },

  // ===== GRATIS (10) =====
  {
    id: 11,
    nombre: "Tacos Don Pepe",
    categoria: "alimentos",
    subcategoria: "Taquerías",
    municipio: "zacualtipan",
    direccion: "Calle Independencia #78",
    telefono: "7714567890",
    whatsapp: "7714567890",
    foto: "https://via.placeholder.com/400x300/ffd300/2a2a2a?text=Don+Pepe",
    coordenadas: { lat: 20.1240, lng: -98.5685 },
    plan: "gratis"
  },
  {
    id: 12,
    nombre: "Papelería Escolar",
    categoria: "compras",
    subcategoria: "Papelerías",
    municipio: "pachuca",
    direccion: "Av. Juárez #321",
    telefono: "7718901234",
    whatsapp: "7718901234",
    foto: "https://via.placeholder.com/400x300/3498db/ffffff?text=Papeleria",
    coordenadas: { lat: 20.1170, lng: -98.7380 },
    plan: "gratis"
  },
  {
    id: 13,
    nombre: "Electricista Ramírez",
    categoria: "servicios",
    subcategoria: "Electricistas",
    municipio: "tulancingo",
    direccion: "Col. Centro",
    telefono: "7755234567",
    whatsapp: "7755234567",
    foto: "https://via.placeholder.com/400x300/f39c12/ffffff?text=Electricista",
    coordenadas: { lat: 20.0840, lng: -98.3670 },
    plan: "gratis"
  },
  {
    id: 14,
    nombre: "Tienda de Abarrotes La Guadalupana",
    categoria: "compras",
    subcategoria: "Abarrotes",
    municipio: "zacualtipan",
    direccion: "Barrio Alto #12",
    telefono: "7712345098",
    whatsapp: "7712345098",
    foto: "https://via.placeholder.com/400x300/27ae60/ffffff?text=Abarrotes",
    coordenadas: { lat: 20.1255, lng: -98.5695 },
    plan: "gratis"
  },
  {
    id: 15,
    nombre: "Consultorio Médico General",
    categoria: "salud",
    subcategoria: "Consultorios",
    municipio: "mineral-monte",
    direccion: "Calle Hidalgo #89",
    telefono: "7717890123",
    whatsapp: "7717890123",
    foto: "https://via.placeholder.com/400x300/e74c3c/ffffff?text=Medico",
    coordenadas: { lat: 20.1410, lng: -98.6710 },
    plan: "gratis"
  },
  {
    id: 16,
    nombre: "Carpintería San José",
    categoria: "servicios",
    subcategoria: "Carpintería",
    municipio: "actopan",
    direccion: "Col. Santa María",
    telefono: "7723567890",
    whatsapp: "7723567890",
    foto: "https://via.placeholder.com/400x300/8e44ad/ffffff?text=Carpinteria",
    coordenadas: { lat: 20.2670, lng: -98.9340 },
    plan: "gratis"
  },
  {
    id: 17,
    nombre: "Panadería El Trigo",
    categoria: "alimentos",
    subcategoria: "Panaderías",
    municipio: "pachuca",
    direccion: "Calle Allende #456",
    telefono: "7716789012",
    whatsapp: "7716789012",
    foto: "https://via.placeholder.com/400x300/e67e22/ffffff?text=Panaderia",
    coordenadas: { lat: 20.1160, lng: -98.7360 },
    plan: "gratis"
  },
  {
    id: 18,
    nombre: "Cerrajería Express",
    categoria: "urgencias",
    subcategoria: "Cerrajeros",
    municipio: "zacualtipan",
    direccion: "Servicio a domicilio",
    telefono: "7715678901",
    whatsapp: "7715678901",
    foto: "https://via.placeholder.com/400x300/c0392b/ffffff?text=Cerrajeria",
    coordenadas: { lat: 20.1245, lng: -98.5680 },
    plan: "gratis"
  },
  {
    id: 19,
    nombre: "Lavandería Limpieza Total",
    categoria: "hogar",
    subcategoria: "Lavanderías",
    municipio: "tulancingo",
    direccion: "Av. Juárez #234",
    telefono: "7755890123",
    whatsapp: "7755890123",
    foto: "https://via.placeholder.com/400x300/3498db/ffffff?text=Lavanderia",
    coordenadas: { lat: 20.0845, lng: -98.3675 },
    plan: "gratis"
  },
  {
    id: 20,
    nombre: "Refaccionaria Auto Partes",
    categoria: "compras",
    subcategoria: "Refaccionarias",
    municipio: "pachuca",
    direccion: "Blvd. Colosio #789",
    telefono: "7719012345",
    whatsapp: "7719012345",
    foto: "https://via.placeholder.com/400x300/7f8c8d/ffffff?text=Refacciones",
    coordenadas: { lat: 20.1150, lng: -98.7340 },
    plan: "gratis"
  }
];

// === FUNCIÓN PARA OBTENER NEGOCIOS ===
function obtenerNegocios() {
  return negociosDB;
}

// === FUNCIÓN PARA BUSCAR NEGOCIOS ===
function buscarNegocios(query, ubicacion = null, categoria = null) {
  let resultados = [...negociosDB];
  
  // Filtrar por ubicación
  if (ubicacion && ubicacion !== 'todos') {
    resultados = resultados.filter(n => n.municipio === ubicacion);
  }
  
  // Filtrar por categoría
  if (categoria && categoria !== 'todos') {
    resultados = resultados.filter(n => n.categoria === categoria);
  }
  
  // Filtrar por query (búsqueda por texto)
  if (query && query.trim() !== '') {
    const queryLower = query.toLowerCase().trim();
    resultados = resultados.filter(negocio => {
      return (
        negocio.nombre.toLowerCase().includes(queryLower) ||
        negocio.categoria.toLowerCase().includes(queryLower) ||
        (negocio.subcategoria && negocio.subcategoria.toLowerCase().includes(queryLower)) ||
        (negocio.descripcion && negocio.descripcion.toLowerCase().includes(queryLower))
      );
    });
  }
  
  // Ordenar: Premium Plus > Premium > Gratis
  resultados.sort((a, b) => {
    const orden = { 'premium-plus': 3, 'premium': 2, 'gratis': 1 };
    return (orden[b.plan] || 0) - (orden[a.plan] || 0);
  });
  
  return resultados;
}

// === FUNCIÓN PARA OBTENER NEGOCIO POR ID ===
function obtenerNegocioPorId(id) {
  return negociosDB.find(n => n.id === parseInt(id));
}

// === FUNCIÓN PARA OBTENER POR CATEGORÍA ===
function obtenerPorCategoria(categoria, ubicacion = null) {
  return buscarNegocios('', ubicacion, categoria);
}

// === EXPORTAR (para usar en otros archivos) ===
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    negociosDB,
    obtenerNegocios,
    buscarNegocios,
    obtenerNegocioPorId,
    obtenerPorCategoria
  };
}
