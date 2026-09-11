"use strict";


/* ================================= */
/* СОСТОЯНИЕ */
/* ================================= */

const STORAGE_KEY = "nexgram_user_v5";


/* ================================= */
/* ЭЛЕМЕНТЫ */
/* ================================= */

const authScreen = document.getElementById("authScreen");

const registerScreen =
    document.getElementById("registerScreen");

const loginScreen =
    document.getElementById("loginScreen");

const chatsScreen =
    document.getElementById("chatsScreen");

const homeScreen =
    document.getElementById("homeScreen");

const registerBtn =
    document.getElementById("registerBtn");

const loginBtn =
    document.getElementById("loginBtn");

const anonymousBtn =
    document.getElementById("anonymousBtn");

const anonymousModal =
    document.getElementById("anonymousModal");

const modalOverlay =
    document.getElementById("modalOverlay");

const closeModal =
    document.getElementById("closeModal");

const anonymousBack =
    document.getElementById("anonymousBack");

const anonymousContinue =
    document.getElementById("anonymousContinue");

const registerForm =
    document.getElementById("registerForm");

const loginForm =
    document.getElementById("loginForm");

const continueChats =
    document.getElementById("continueChats");

const installBtn =
    document.getElementById("installBtn");

const toast =
    document.getElementById("toast");


/* ================================= */
/* INSTALL PWA */
/* ================================= */

let deferredInstallPrompt = null;


window.addEventListener(
    "beforeinstallprompt",
    function(event) {

        event.preventDefault();

        deferredInstallPrompt = event;

        installBtn.style.display = "block";
    }
);


installBtn.addEventListener(
    "click",
    async function() {

        if (deferredInstallPrompt) {

            deferredInstallPrompt.prompt();

            const result =
                await deferredInstallPrompt.userChoice;

            if (result.outcome === "accepted") {

                showToast(
                    "Приложение Nexgram устанавливается"
                );

            }

            deferredInstallPrompt = null;

            return;
        }


        showToast(
            "Откройте меню браузера и выберите «Установить приложение»"
        );
    }
);


window.addEventListener(
    "appinstalled",
    function() {

        deferredInstallPrompt = null;

        showToast(
            "Nexgram установлен"
        );
    }
);


/* ================================= */
/* ЭКРАНЫ */
/* ================================= */

function hideAllScreens() {

    authScreen.classList.add("hidden");
    registerScreen.classList.add("hidden");
    loginScreen.classList.add("hidden");
    chatsScreen.classList.add("hidden");
    homeScreen.classList.add("hidden");
}


function showScreen(screen) {

    hideAllScreens();

    screen.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* ================================= */
/* ПЕРВЫЙ ЗАПУСК */
/* ================================= */

function loadSavedUser() {

    try {

        const saved =
            localStorage.getItem(STORAGE_KEY);

        if (!saved) {

            showScreen(authScreen);

            return;
        }


        const user =
            JSON.parse(saved);


        if (user && user.entered) {

            showScreen(chatsScreen);

            return;
        }


        showScreen(authScreen);

    } catch (error) {

        localStorage.removeItem(STORAGE_KEY);

        showScreen(authScreen);
    }
}


loadSavedUser();


/* ================================= */
/* РЕГИСТРАЦИЯ */
/* ================================= */

registerBtn.addEventListener(
    "click",
    function() {

        showScreen(registerScreen);
    }
);


/* ================================= */
/* ВХОД */
/* ================================= */

loginBtn.addEventListener(
    "click",
    function() {

        showScreen(loginScreen);
    }
);


/* ================================= */
/* НАЗАД */
/* ================================= */

document
    .querySelectorAll("[data-back]")
    .forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                showScreen(authScreen);
            }
        );

    });


/* ================================= */
/* РЕГИСТРАЦИЯ FORM */
/* ================================= */

registerForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


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
                .value;


        if (!name || !email || !password) {

            showToast(
                "Заполните все поля"
            );

            return;
        }


        if (password.length < 6) {

            showToast(
                "Пароль должен быть не короче 6 символов"
            );

            return;
        }


        const user = {

            name: name,

            email: email,

            entered: true,

            anonymous: false,

            createdAt:
                new Date().toISOString()

        };


        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(user)
        );


        showScreen(chatsScreen);

    }
);


/* ================================= */
/* ВХОД */
/* ================================= */

loginForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const email =
            document
                .getElementById("loginEmail")
                .value
                .trim();

        const password =
            document
                .getElementById("loginPassword")
                .value;


        if (!email || !password) {

            showToast(
                "Введите email и пароль"
            );

            return;
        }


        const user = {

            email: email,

            entered: true,

            anonymous: false

        };


        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(user)
        );


        showScreen(chatsScreen);

    }
);


/* ================================= */
/* АНОНИМНЫЙ ВХОД */
/* ================================= */

anonymousBtn.addEventListener(
    "click",
    function() {

        anonymousModal.classList.remove(
            "hidden"
        );
    }
);


/* ================================= */
/* ЗАКРЫТЬ MODAL */
/* ================================= */

function closeAnonymousModal() {

    anonymousModal.classList.add(
        "hidden"
    );
}


closeModal.addEventListener(
    "click",
    closeAnonymousModal
);


modalOverlay.addEventListener(
    "click",
    closeAnonymousModal
);


anonymousBack.addEventListener(
    "click",
    closeAnonymousModal
);


/* ================================= */
/* ПРОДОЛЖИТЬ АНОНИМНО */
/* ================================= */

anonymousContinue.addEventListener(
    "click",
    function() {

        const user = {

            name: "Аноним",

            entered: true,

            anonymous: true

        };


        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(user)
        );


        closeAnonymousModal();

        showScreen(chatsScreen);

    }
);


/* ================================= */
/* ЧАТЫ */
/* ================================= */

continueChats.addEventListener(
    "click",
    function() {

        showScreen(homeScreen);

    }
);


/* ================================= */
/* TOAST */
/* ================================= */

let toastTimer = null;


function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer = setTimeout(
        function() {

            toast.classList.remove("show");

        },
        2800
    );
}


/* ================================= */
/* SERVICE WORKER */
/* ================================= */

if ("serviceWorker" in navigator) {

    window.addEventListener(
        "load",
        function() {

            navigator.serviceWorker
                .register(
                    "./sw.js?v=5"
                )
                .catch(function(error) {

                    console.log(
                        "Service Worker:",
                        error
                    );

                });

        }
    );

}