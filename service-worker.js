/*
  Service Worker - DEEDPRI
  Estrategia: Cache First para assets, Network First para HTML con fallback offline.
  Funciona en Android Chrome y (limitado) en iOS Safari (solo mientras está abierto).
*/

// Versionado de caché
const CACHE_VERSION = 'v1.0.0';
const STATIC_CACHE = `deedpri-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `deedpri-runtime-${CACHE_VERSION}`;

// Rutas a precache (shell)
const APP_SHELL = [
  '/',
  '/index.html',
  '/assets/css/deedpriv2.css',
  '/assets/js/menu.js',
  '/assets/img/hero-deedpri.png',
  '/assets/img/WhatsApp.svg',
  '/manifest.json',
  // Offline fallback
  '/offline.html'
];

// Contenido mínimo para offline fallback
const OFFLINE_HTML = `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Sin conexión - deedpri</title><meta name="theme-color" content="#ffd300"><style>body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Helvetica,Arial,sans-serif;margin:0;display:flex;min-height:100vh;align-items:center;justify-content:center;background:#fff7bf;color:#222;padding:24px}main{max-width:520px;text-align:center}h1{font-size:1.4rem;margin-bottom:8px}p{opacity:.8;margin:0 0 16px}a{display:inline-block;padding:10px 16px;background:#ffd300;color:#222;border-radius:10px;text-decoration:none;font-weight:600;border:2px solid #222}a:focus{outline:3px solid #222;outline-offset:3px}</style></head><body><main><h1>Estás sin conexión</h1><p>No pudimos cargar la página. Cuando recuperes internet, vuelve a intentarlo.</p><a href="/">Volver al inicio</a></main></body></html>`;

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(STATIC_CACHE);
    // Intentar añadir shell; si alguna ruta falla, continuar sin rechazar toda la instalación
    await cache.addAll(APP_SHELL.filter(Boolean).map(url => new Request(url, { credentials: 'same-origin' }))).catch(() => {});

    // Guardar offline.html in-memory y en caché si no existe físicamente
    try {
      const resp = new Response(OFFLINE_HTML, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
      await cache.put('/offline.html', resp);
    } catch (e) {
      // noop
    }

    // Forzar activación inmediata en actualizaciones
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // Limpiar cachés antiguas
    const keys = await caches.keys();
    await Promise.all(
      keys.filter(k => ![STATIC_CACHE, RUNTIME_CACHE].includes(k)).map(k => caches.delete(k))
    );
    await self.clients.claim();
  })());
});

function isHTML(request) {
  return request.destination === 'document' || (request.headers.get('accept') || '').includes('text/html');
}

function isAsset(request) {
  const d = request.destination;
  return ['style', 'script', 'image', 'font'].includes(d) || /\.(?:css|js|png|jpg|jpeg|svg|webp|gif|woff2?|ttf|eot)$/i.test(new URL(request.url).pathname);
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Solo manejar GET y mismo origen para evitar problemas con CORS
  if (request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  // Estrategia para HTML: Network First con fallback a caché y offline
  if (isHTML(request)) {
    event.respondWith((async () => {
      try {
        const networkResponse = await fetch(request);
        const cache = await caches.open(RUNTIME_CACHE);
        cache.put(request, networkResponse.clone());
        return networkResponse;
      } catch (err) {
        const cache = await caches.open(RUNTIME_CACHE);
        const cached = await cache.match(request) || await caches.match('/offline.html');
        return cached;
      }
    })());
    return;
  }

  // Estrategia para assets: Cache First con actualización en background
  if (isAsset(request)) {
    event.respondWith((async () => {
      const cached = await caches.match(request);
      const cache = await caches.open(STATIC_CACHE);
      const fetchPromise = fetch(request).then((networkResp) => {
        if (networkResp && networkResp.ok) {
          cache.put(request, networkResp.clone());
        }
        return networkResp;
      }).catch(() => null);
      return cached || fetchPromise || caches.match('/offline.html');
    })());
    return;
  }

  // Por defecto, intentar red de forma segura
  event.respondWith(fetch(request).catch(() => caches.match('/offline.html')));
});

// Soporte para skipWaiting desde la página
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
