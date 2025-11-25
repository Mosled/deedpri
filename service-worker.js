// Service Worker DESACTIVADO - deedpri
// Este archivo desregistra automáticamente el service worker en navegadores que lo tienen instalado

self.addEventListener('install', function(e) {
  // Forzar activación inmediata
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    // Desregistrar este service worker
    self.registration.unregister()
      .then(function() {
        // Obtener todos los clientes (pestañas/ventanas abiertas)
        return self.clients.matchAll();
      })
      .then(function(clients) {
        // Recargar cada cliente para que ya no use service worker
        clients.forEach(function(client) {
          if (client.url && 'navigate' in client) {
            client.navigate(client.url);
          }
        });
      })
  );
});

// No manejar ningún fetch - dejar que el navegador lo haga normalmente
self.addEventListener('fetch', function() {
  return;
});
