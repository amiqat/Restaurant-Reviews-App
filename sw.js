const Restaurant_CACHE = 'restaurant-review-v6';

const assets = [
    '/',
    '/restaurant.html',
    '/css/styles.css',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js'
];

self.addEventListener('install', (e) => {
    self.skipWaiting();
    e.waitUntil((async () => {
        const cache = await caches.open(Restaurant_CACHE);
        return cache.addAll(assets);
    })());
});

self.addEventListener('activate', (e) => {
    e.waitUntil((async () => {
        const cacheNames = await caches.keys();

        await Promise.all(
            cacheNames.filter(cacheName => cacheName.startsWith('restaurant-review')
                && cacheName != Restaurant_CACHE).map(cacheName => caches.delete(cacheName)));
    })());
});

self.addEventListener('fetch', (e) => {
    const url = e.request.url;
    console.log(url);

    e.respondWith((async () => {
        const result = await caches.match(url, { ignoreSearch: true });
        return result || fetch(url);
    })());
});