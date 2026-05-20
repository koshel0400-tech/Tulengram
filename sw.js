const CACHE_NAME = 'game-v1';
const ASSETS = [
  'index.html',
  'manifest.json',
  'icon.png'
];

// Установка воркера и кэширование файлов
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Активация и очистка старого кэша
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Сетевые запросы (берем из кэша, если нет сети)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
