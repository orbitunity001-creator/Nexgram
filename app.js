let deferredPrompt = null;

const installButton = document.getElementById("installButton");

/*
    Сначала кнопка видна.
    Если браузер не поддерживает установку,
    она будет скрыта после загрузки.
*/

installButton.style.display = "none";

/*
    Chrome сообщает сайту,
    что приложение можно установить.
*/

window.addEventListener("beforeinstallprompt", (event) => {

    event.preventDefault();

    deferredPrompt = event;

    installButton.style.display = "block";
});

/*
    Нажатие на кнопку установки
*/

installButton.addEventListener("click", async () => {

    if (!deferredPrompt) {
        return;
    }

    deferredPrompt.prompt();

    const result = await deferredPrompt.userChoice;

    if (result.outcome === "accepted") {
        console.log("Nexgram установлен");
    } else {
        console.log("Установка отменена");
    }

    deferredPrompt = null;

    installButton.style.display = "none";
});

/*
    Если приложение уже установлено,
    кнопку установки не показываем.
*/

window.addEventListener("appinstalled", () => {

    deferredPrompt = null;

    installButton.style.display = "none";

    console.log("Nexgram успешно установлен");
});

/*
    Регистрируем Service Worker
*/

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker
            .register("./sw.js")
            .then(() => {
                console.log("Service Worker запущен");
            })
            .catch((error) => {
                console.error(
                    "Ошибка Service Worker:",
                    error
                );
            });

    });

}