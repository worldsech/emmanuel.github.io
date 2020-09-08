const cacheName = "v1";

const cacheAssets = [
    'index.html',
    'style.css',
    'app.js'
]


// Call install event
self.addEventListener('install', e => {
    console.log('Service Worker: Installed');

    e.waitUntil(
        caches
          .open(cacheName)
          .then(cache => {
              console.log('service Worker: Caching Files');
              cache.addAll(cacheAssets);
          })
          .then(() => self.skipWaiting())
    );
});

// Call Activate Event
self.addEventListener('activate', e => {
    console.log('Service Worker: Activated');
    // Remove unwanted caches
     e.waitUntil(
         caches.keys().then(cacheNames => {
             return Promise.all(
                 cacheNames.map(cache => {
                     if (cache !== cacheName){
                         console.log('Service Worker: Clear Old Cache');
                         return caches.delete(cache);
                     }
                 })
             );
         })
     );
});

// Call Fetch Event
self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    );
});