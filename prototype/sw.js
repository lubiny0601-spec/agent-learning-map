const CACHE_NAME = 'agent-map-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './_shared/share-cover.jpg',
  './_shared/icon-192.png',
  './_shared/icon-512.png',
  './_shared/fonts/InstrumentSans-Regular.ttf',
  './_shared/fonts/InstrumentSans-Bold.ttf',
  './_shared/fonts/JetBrainsMono-Regular.ttf'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Bypass caching for non-GET requests to prevent errors
  if (event.request.method !== 'GET') {
    return;
  }

  // Bypass non-HTTP/HTTPS schemes (like chrome-extension://) to prevent fetch crashes
  if (!event.request.url.startsWith('http') && !event.request.url.startsWith('https')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch new version in background to update cache (Stale-While-Revalidate)
        fetch(event.request).then((networkResponse) => {
          if (networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
          }
        }).catch(() => {/* Ignore offline network errors */});
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
