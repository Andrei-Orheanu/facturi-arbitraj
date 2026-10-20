const CACHE_NAME = 'facturi-arbitraj-v3';
const APP_SHELL = [
  './',
  './index.html',
  './istoric.html',
  './admin.html',
  './admin-istoric.html',
  './profil.html',
  './manifest.json',
  './supabase-config.js',
  './assets/sidewalk-shade.mp3',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  const isAppPage = event.request.mode === 'navigate' || /\.(html|js|json)$/i.test(new URL(event.request.url).pathname);
  if (isAppPage) {
    event.respondWith(fetch(event.request).then((response) => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match(event.request)));
    return;
  }
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
