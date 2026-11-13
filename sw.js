/* Service worker tanpa cache: app tetap berjalan online dan selalu memuat versi terbaru.
   Fungsinya hanya agar app bisa dipasang di layar utama. */
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (k) { return Promise.all(k.map(function (x) { return caches.delete(x); })); }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) { e.respondWith(fetch(e.request)); });
