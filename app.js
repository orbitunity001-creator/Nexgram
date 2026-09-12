const USER_KEY = "nexgram_user_v7";

const screens = [
    "authScreen",
    "registerScreen",
    "loginScreen",
    "chatsScreen",
    "homeScreen"
];


/* =========================
   ЭКРАНЫ
========================= */

function showScreen(id) {

    screens.forEach(screenId => {

        const screen =
            document.getElementById(screenId);

        if (!screen) return;

        screen.classList.toggle(
            "active",
            screenId === id
        );

    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================
   TOAST
========================= */

function toast(message) {

    const element =
        document.getElementById("toast");

    element.textContent = message;

    element.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {

        element.classList.remove("show");

    }, 2800);
}


/* =========================
   ГЛАВНЫЕ КНОПКИ
========================= */

document
    .getElementById("registerBtn")
    .addEventListener("click", () => {

        showScreen("registerScreen");

    });


document
    .getElementById("loginBtn")
    .addEventListener("click", () => {

        showScreen("loginScreen");

    });


/* =========================
   НАЗАД
========================= */

document
    .querySelectorAll("[data-back]")
    .forEach(button => {

        button.addEventListener("click", () => {

            showScreen(
                button.dataset.back
            );

        });

    });


/* =========================
   РЕГИСТРАЦИЯ
========================= */

document
    .getElementById("registerSubmit")
    .addEventListener("click", () => {

        const name =
            document
                .getElementById("registerName")
                .value
                .trim();


        const email =
            document
                .getElementById("registerEmail")
                .value
                .trim();


        const password =
            document
                .getElementById("registerPassword")
                .value
                .trim();


        if (!name) {

            toast("Введите ваше имя");

            return;
        }


        if (!email || !email.includes("@")) {

            toast("Введите корректную почту");

            return;
        }


        if (password.length < 6) {

            toast(
                "Пароль должен содержать минимум 6 символов"
            );

            return;
        }


        const user = {

            name: name,

            email: email,

            entered: true,

            anonymous: false

        };


        localStorage.setItem(
            USER_KEY,
            JSON.stringify(user)
        );


        toast("Аккаунт Nexgram создан ✦");


        setTimeout(() => {

            showScreen("chatsScreen");

        }, 500);

    });


/* =========================
   ВХОД
========================= */

document
    .getElementById("loginSubmit")
    .addEventListener("click", () => {

        const email =
            document
                .getElementById("loginEmail")
                .value
                .trim();


        const password =
            document
                .getElementById("loginPassword")
                .value
                .trim();


        if (!email || !email.includes("@")) {

            toast("Введите корректную почту");

            return;
        }


        if (!password) {

            toast("Введите пароль");

            return;
        }


        const user = {

            name: "Пользователь Nexgram",

            email: email,

            entered: true,

            anonymous: false

        };


        localStorage.setItem(
            USER_KEY,
            JSON.stringify(user)
        );


        toast("Вы вошли в Nexgram");


        setTimeout(() => {

            showScreen("chatsScreen");

        }, 500);

    });


/* =========================
   АНОНИМНЫЙ РЕЖИМ
========================= */

const anonymousModal =
    document.getElementById(
        "anonymousModal"
    );


document
    .getElementById("anonymousBtn")
    .addEventListener("click", () => {

        anonymousModal.classList.add("active");

    });


document
    .getElementById("anonymousBack")
    .addEventListener("click", () => {

        anonymousModal.classList.remove("active");

    });


document
    .getElementById("anonymousContinue")
    .addEventListener("click", () => {

        anonymousModal.classList.remove("active");


        const user = {

            name: "Аноним",

            email: "",

            entered: true,

            anonymous: true

        };


        localStorage.setItem(
            USER_KEY,
            JSON.stringify(user)
        );


        toast("Анонимный режим включён");


        setTimeout(() => {

            showScreen("chatsScreen");

        }, 500);

    });


/* =========================
   ПРОДОЛЖИТЬ
========================= */

document
    .getElementById("continueBtn")
    .addEventListener("click", () => {

        showScreen("homeScreen");

    });


/* =========================
   ВОССТАНОВЛЕНИЕ
========================= */

document
    .getElementById("forgotPassword")
    .addEventListener("click", () => {

        toast(
            "Восстановление пароля появится позже"
        );

    });


/* =========================
   PWA INSTALL
========================= */

let deferredPrompt = null;

const installBtn =
    document.getElementById(
        "installBtn"
    );


window.addEventListener(
    "beforeinstallprompt",
    event => {

        event.preventDefault();

        deferredPrompt = event;

    }
);


installBtn.addEventListener(
    "click",
    async () => {

        if (!deferredPrompt) {

            toast(
                "Откройте меню браузера и выберите «Установить приложение»"
            );

            return;
        }


        deferredPrompt.prompt();

        await deferredPrompt.userChoice;

        deferredPrompt = null;

    }
);


/* =========================
   SERVICE WORKER
========================= */

if ("serviceWorker" in navigator) {

    window.addEventListener(
        "load",
        () => {

            navigator.serviceWorker
                .register("./sw.js?v=7")
                .catch(error => {

                    console.log(
                        "Service Worker error:",
                        error
                    );

                });

        }
    );

}


/* =========================
   ВОССТАНОВЛЕНИЕ СЕССИИ
========================= */

try {

    const saved =
        localStorage.getItem(USER_KEY);


    if (saved) {

        const user =
            JSON.parse(saved);


        if (
            user &&
            user.entered
        ) {

            showScreen(
                "chatsScreen"
            );

        }

    }

} catch (error) {

    localStorage.removeItem(
        USER_KEY
    );

}