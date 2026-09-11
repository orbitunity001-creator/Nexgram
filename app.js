let installPrompt = null;

const installButton =
    document.getElementById("installButton");

const installMessage =
    document.getElementById("installMessage");

const closeMessage =
    document.getElementById("closeMessage");


/*
    Показываем кнопку сразу.
*/

installButton.style.display = "block";


/*
    Chrome сообщает,
    что PWA можно установить.
*/

window.addEventListener(
    "beforeinstallprompt",
    function (event) {

        event.preventDefault();

        installPrompt = event;

        console.log(
            "Nexgram можно установить"
        );
    }
);


/*
    Нажатие «Установить».
*/

installButton.addEventListener(
    "click",
    async function () {

        /*
            Если Chrome дал настоящий
            системный запрос установки.
        */

        if (installPrompt) {

            installPrompt.prompt();

            const result =
                await installPrompt.userChoice;

            console.log(
                "Результат установки:",
                result.outcome
            );

            installPrompt = null;

            return;
        }


        /*
            Если Chrome не передал
            beforeinstallprompt.
        */

        installMessage.style.display =
            "block";
    }
);


/*
    Закрытие подсказки.
*/

closeMessage.addEventListener(
    "click",
    function () {

        installMessage.style.display =
            "none";
    }
);


/*
    Приложение установлено.
*/

window.addEventListener(
    "appinstalled",
    function () {

        console.log(
            "Nexgram установлен"
        );

        installButton.style.display =
            "none";
    }
);


/*
    Service Worker.
*/

if ("serviceWorker" in navigator) {

    window.addEventListener(
        "load",
        function () {

            navigator.serviceWorker
                .register("./sw.js")
                .then(function () {

                    console.log(
                        "Service Worker работает"
                    );

                })
                .catch(function (error) {

                    console.error(
                        "Ошибка Service Worker:",
                        error
                    );

                });

        }
    );
}