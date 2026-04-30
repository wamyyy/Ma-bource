// ════════════════════════════════════════════════════════
//  WAMY — sw.js  (Service Worker)
//  Strategy: Cache-First for static assets, Network for data
//  v8: Fixed opaque (CDN) response caching + removed demo notification
// ════════════════════════════════════════════════════════

const CACHE_NAME  = 'wamy-v8'; // ⚠️ Bump this string on every deploy to bust stale caches
const STATIC_URLS = [
  '/',
  '/index.html',
  '/style.css',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400;500;700&display=swap',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js'
];

// ── Install: pre-cache all static resources ────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // addAll will fail for opaque (cross-origin) responses if the server sends a bad status.
      // We use individual fetch+put instead of cache.addAll so one failure doesn't block the rest.
      return Promise.allSettled(
        STATIC_URLS.map(url =>
          fetch(url, { mode: 'no-cors' })
            .then(response => {
              // Accept both basic (same-origin) and opaque (cross-origin) responses
              if (response.status === 200 || response.type === 'opaque') {
                return cache.put(url, response);
              }
            })
            .catch(() => { /* individual URL failure is non-fatal */ })
        )
      );
    })
  );
  self.skipWaiting();
});

// ── Activate: clean up old caches ─────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// ── Fetch: Cache-First strategy ───────────────────────
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request)
        .then(response => {
          // Cache both same-origin (basic) and CDN (opaque) successful responses
          if (response && (response.status === 200 || response.type === 'opaque')) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
    })
  );
});

// ── Price Alerts / Push Notifications ─────────────────
let currentAlerts = {};

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'UPDATE_ALERTS') {
    currentAlerts = event.data.alerts;
    // NOTE: Real price-threshold notifications require a push backend.
    // The previous demo that fired after 5 seconds has been intentionally removed.
  }
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      const client = windowClients.find(c => c.visibilityState === 'visible') || windowClients[0];
      if (client) {
        return client.focus();
      } else {
        return clients.openWindow('/');
      }
    })
  );
});
