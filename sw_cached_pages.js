const cacheName = 'v3';

const cacheAssets = [
    'index.html',
    'about.html',
    '/css/index.css',
    '/js/index.js'
];

self.addEventListener('install', e => {
    console.log('Server worker installed');

    // e.waitUntil(
    //     caches.open(cacheName)
    //     .then(cache => {
    //         console.log('Server worker: Caching files successfully');
    //         cache.addAll(cacheAssets);
    //     })
    //     .catch(err => {
    //         console.error('Server worker: Caching files failed', err);
    //         self.skipWaiting();
    //     })
    // );
});

self.addEventListener('activate', e => {
    console.log('Server worker activated');
    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Server worker: Clearning old cache');

                        return caches.delete(cache);
                    }
                })
            )
        })
    )
});

self.addEventListener('fetch', e => {
    console.log('Server worker: Fetching');
    e.respondWith(
        fetch(e.request)
        .then(res => {
            const resClone = res.clone();
            caches.open(cacheName)
            .then(cache => {
                cache.put(e.request, resClone);
            });
        })
        .catch(() => caches.match(e.request))
    )
});