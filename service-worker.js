const CACHE_NAME = 'web-fathur-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/about.html',
    '/contact.html',
    '/style.css',
    '/1.png',
    '/foto saya.png',
    '/Logo Unand PTNBH.png',
    '/offline.html' // Pastikan ini ada
];

// Install Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Cache opened');
            return Promise.all(urlsToCache.map((url) => {
                return fetch(url)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Failed to fetch ${url}: ${response.status}`);
                        }
                        return cache.add(url); // Menambahkan ke cache
                    })
                    .catch(error => {
                        console.error(`Failed to cache ${url}: ${error}`);
                    });
            }));
        })
    );
});

// Fetch event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            // Jika fetch gagal, kembalikan offline.html
            return caches.match('/offline.html');
        })
    );
});
