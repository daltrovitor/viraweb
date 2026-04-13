// Empty service worker to resolve 404 errors from stale browser registrations
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  self.clients.claim();
});
