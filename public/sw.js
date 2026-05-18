const CACHE_NAME = 'smsv-dashboard-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/logo.png',
  '/logo-192.png',
  '/logo-512.png',
  '/Logo-smsv-solo.png',
  '/favicon.ico'
];

// Instalar el Service Worker y almacenar activos en caché
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activar el Service Worker y limpiar cachés antiguas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Estrategia de respuesta: Network First con fallback a Caché
self.addEventListener('fetch', (event) => {
  // Solo interceptar peticiones GET dentro de nuestra app
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Evitar interceptar/cachear llamadas a API, autenticación y utilidades del servidor
  const url = new URL(event.request.url);
  if (
    url.pathname.startsWith('/api/') || 
    url.pathname.startsWith('/user/') || 
    url.pathname.startsWith('/sanctum/') ||
    url.pathname.includes('check-2fa') ||
    url.pathname.includes('check-storage')
  ) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Almacenar respuesta fresca en caché para soporte offline posterior
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Si no hay red, responder con el recurso almacenado en caché
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Si es una navegación y no hay caché, retornar index.html
          if (event.request.mode === 'navigate') {
            return caches.match('/');
          }
        });
      })
  );
});
