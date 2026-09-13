const CACHE_NAME = "nexgram-v8";

const FILES = [
    "./",
    "./index.html",
    "./style.css?v=8",
    "./app.js?v=8",
    "./manifest.json?v=8",
    "./icon.svg?v=8"
];


self.addEventListener(
    "install",
    event => {

        event.waitUntil(

            caches
                .open(CACHE_NAME)
                .then(
                    cache =>
                        cache.addAll(FILES)
                )

        );

        self.skipWaiting();

    }
);


self.addEventListener(
    "activate",
    event => {

        event.waitUntil(

            caches
                .keys()
                .then(
                    keys =>

                        Promise.all(

                            keys.map(
                                key => {

                                    if (
                                        key !==
                                        CACHE_NAME
                                    ) {

                                        return caches
                                            .delete(
                                                key
                                            );

                                    }

                                }
                            )

                        )

                )

        );

        self.clients.claim();

    }
);


self.addEventListener(
    "fetch",
    event => {

        const request =
            event.request;


        if (
            request.method !== "GET"
        ) {

            return;

        }


        if (
            request.url.includes(
                "icon.svg"
            )
        ) {

            event.respondWith(

                fetch(
                    request,
                    {
                        cache:
                            "no-store"
                    }
                )

            );

            return;

        }


        event.respondWith(

            fetch(request)

                .then(
                    response => {

                        if (
                            response &&
                            response.status === 200
                        ) {

                            const copy =
                                response.clone();


                            caches
                                .open(
                                    CACHE_NAME
                                )
                                .then(
                                    cache => {

                                        cache.put(
                                            request,
                                            copy
                                        );

                                    }
                                );

                        }


                        return response;

                    }
                )

                .catch(
                    () =>
                        caches.match(
                            request
                        )
                )

        );

    }
);