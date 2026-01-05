const CACHE_NAME = 'dev-handbook-v6';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/manifest.json',
    './icons/icon-192.png',
    './icons/icon-512.png'
];

// Install - кешуємо файли
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
    self.skipWaiting();
});

// Activate - видаляємо старі кеші
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch - спочатку з кешу, потім з мережі
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Якщо є в кеші - повертаємо
                if (response) {
                    return response;
                }

                // Якщо немає - завантажуємо з мережі
                return fetch(event.request).then((response) => {
                    // Перевіряємо чи валідна відповідь
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Клонуємо відповідь
                    const responseToCache = response.clone();

                    // Додаємо в кеш
                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                });
            })
            .catch(() => {
                // Якщо офлайн і немає в кеші - показуємо базову сторінку
                return caches.match('/index.html');
            })
    );
});