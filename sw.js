const CACHE_NAME = "nexgram-2026-01";

const FILES = [
    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./manifest.json",
    "./icon.svg"
];


self.addEventListener(
    "install",
    function (event) {

        event.waitUntil(
            caches
                .open(CACHE_NAME)
                .then(function (cache) {
                    return cache.addAll(FILES);
                })
        );

        self.skipWaiting();
    }
);


self.addEventListener(
    "activate",
    function (event) {

        event.waitUntil(

            caches.keys().then(function (keys) {

                return Promise.all(

                    keys.map(function (key) {

                        if (key !== CACHE_NAME) {
                            return caches.delete(key);
                        }

                    })

                );

            })

        );

        self.clients.claim();
    }
);


self.addEventListener(
    "fetch",
    function (event) {

        event.respondWith(

            fetch(event.request)
                .then(function (response) {

                    return response;

                })
                .catch(function () {

                    return caches.match(
                        event.request
                    );

                })

        );
    }
);