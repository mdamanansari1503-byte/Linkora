// Linkora — minimal service worker.
// No caching, no offline storage — this app needs a live connection to the
// laptop anyway, so offline mode isn't useful. This file only exists to
// satisfy "Add to Home Screen / Install app" requirements on Android.
// Every request just passes straight through to the network.

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  // wipe any old caches from earlier versions of this app
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  e.respondWith(fetch(e.request));
});
