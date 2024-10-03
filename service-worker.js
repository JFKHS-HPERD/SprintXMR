const CACHE_NAME = 'sprint-timing-app-v1.05';
const urlsToCache = [
  '/SprintXMR/',
  '/SprintXMR/index.html',
  '/SprintXMR/icon-192.png',
  '/SprintXMR/icon-512.png'
  'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js'
];

// Install the new service worker and cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();  // Force the new SW to take control immediately
});

// Activate the new service worker and remove old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];  // List of caches to keep (only the current one)
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            // Delete old cache that is not the current version
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  return self.clients.claim();  // Take control of all pages
});
