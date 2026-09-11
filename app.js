let deferredPrompt = null;

const installBtn =
    document.getElementById("installBtn");


/*
    Получаем настоящий запрос установки
    от Chrome.
*/

window.addEventListener(
    "beforeinstallprompt",
    function (event) {

        event.preventDefault();

        deferredPrompt = event;

        installBtn.textContent =
            "Установить приложение";

        console.log(
            "Nexgram готов к установке"
        );
    }
);


/*
    Нажатие кнопки.
*/

installBtn.addEventListener(
    "click",
    async function () {

        /*
            Chrome разрешил установку.
        */

        if (deferredPrompt) {

            deferredPrompt.prompt();

            const result =
                await deferredPrompt.userChoice;

            console.log(
                "Установка:",
                result.outcome
            );

            deferredPrompt = null;

            return;
        }


        /*
            Если Chrome пока не дал
            автоматический prompt.
        */

        alert(
            "Открой меню Chrome ⋮ и выбери «Установить приложение»."
        );
    }
);


/*
    Приложение установлено.
*/

window.addEventListener(
    "appinstalled",
    function () {

        installBtn.style.display =
            "none";

        console.log(
            "Nexgram установлен"
        );
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
                .register("./sw.js", {
                    scope: "./"
                })
                .then(function () {

                    console.log(
                        "Nexgram Service Worker работает"
                    );

                })
                .catch(function (error) {

                    console.error(
                        "Service Worker error:",
                        error
                    );

                });

        }
    );
}