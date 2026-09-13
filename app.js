const API_URL = "https://nexgram-api.onrender.com";

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const openRegister = document.getElementById("openRegister");
const openLogin = document.getElementById("openLogin");

const anonymousBtn = document.getElementById("anonymousBtn");

const authTitle = document.getElementById("authTitle");
const authSubtitle = document.getElementById("authSubtitle");

const authMessage = document.getElementById("authMessage");

const notReadyScreen =
    document.getElementById("notReadyScreen");

const accountInfo =
    document.getElementById("accountInfo");

const logoutBtn =
    document.getElementById("logoutBtn");

const installBtn =
    document.getElementById("installBtn");


/* ========================= */
/* СООБЩЕНИЯ */
/* ========================= */

function showMessage(text, type = "error") {

    authMessage.textContent = text;

    authMessage.className =
        "auth-message " + type;
}


function clearMessage() {

    authMessage.textContent = "";

    authMessage.className =
        "auth-message";
}


/* ========================= */
/* ПЕРЕКЛЮЧЕНИЕ ВХОД / РЕГИСТРАЦИЯ */
/* ========================= */

openRegister.addEventListener("click", () => {

    clearMessage();

    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");

    authTitle.textContent =
        "Создать аккаунт";

    authSubtitle.textContent =
        "Получите свой уникальный NEX ID";
});


openLogin.addEventListener("click", () => {

    clearMessage();

    registerForm.classList.add("hidden");
    loginForm.classList.remove("hidden");

    authTitle.textContent =
        "Добро пожаловать";

    authSubtitle.textContent =
        "Войдите в свой NEX аккаунт";
});


/* ========================= */
/* РЕГИСТРАЦИЯ */
/* ========================= */

registerForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    clearMessage();

    const nickname =
        document.getElementById("registerNickname")
            .value
            .trim();

    const password =
        document.getElementById("registerPassword")
            .value;

    const password2 =
        document.getElementById("registerPassword2")
            .value;


    if (password.length < 6) {

        showMessage(
            "Пароль должен содержать минимум 6 символов."
        );

        return;
    }


    if (password !== password2) {

        showMessage(
            "Пароли не совпадают."
        );

        return;
    }


    const submitButton =
        registerForm.querySelector(
            'button[type="submit"]'
        );

    submitButton.disabled = true;
    submitButton.textContent =
        "Создание аккаунта...";


    try {

        const response =
            await fetch(
                `${API_URL}/api/auth/register`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        nickname,
                        password
                    })
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.error ||
                "Не удалось создать аккаунт."
            );
        }


        localStorage.setItem(
            "nex_token",
            data.token
        );


        localStorage.setItem(
            "nex_user",
            JSON.stringify(data.user)
        );


        showNotReady(data.user);


    } catch (error) {

        showMessage(
            error.message
        );

    } finally {

        submitButton.disabled = false;
        submitButton.textContent =
            "Зарегистрироваться";
    }
});


/* ========================= */
/* ВХОД */
/* ========================= */

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    clearMessage();

    const nexId =
        document.getElementById("loginId")
            .value
            .trim()
            .toUpperCase();

    const password =
        document.getElementById("loginPassword")
            .value;


    if (!nexId) {

        showMessage(
            "Введите NEX ID."
        );

        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/api/auth/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        nexId,
                        password
                    })
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.error ||
                "Неверный NEX ID или пароль."
            );
        }


        localStorage.setItem(
            "nex_token",
            data.token
        );


        localStorage.setItem(
            "nex_user",
            JSON.stringify(data.user)
        );


        showNotReady(data.user);


    } catch (error) {

        showMessage(
            error.message
        );
    }
});


/* ========================= */
/* АНОНИМ */
/* ========================= */

anonymousBtn.addEventListener(
    "click",
    () => {

        const anonymousUser = {
            nexId: null,
            nickname: "Аноним",
            anonymous: true
        };


        showNotReady(
            anonymousUser
        );
    }
);


/* ========================= */
/* ЭКРАН ЧАТОВ */
/* ========================= */

function showNotReady(user) {

    document.querySelector(".auth-page")
        .classList.add("hidden");

    notReadyScreen
        .classList.remove("hidden");


    if (user.anonymous) {

        accountInfo.innerHTML = `
            <div class="account-name">
                Аноним
            </div>

            <div class="account-id">
                Без NEX ID
            </div>
        `;

        return;
    }


    accountInfo.innerHTML = `
        <div class="account-name">
            ${escapeHTML(
                user.nickname || "Аноним"
            )}
        </div>

        <div class="account-id">
            ${escapeHTML(user.nexId)}
        </div>
    `;
}


/* ========================= */
/* ВЫХОД */
/* ========================= */

logoutBtn.addEventListener(
    "click",
    () => {

        localStorage.removeItem(
            "nex_token"
        );

        localStorage.removeItem(
            "nex_user"
        );


        notReadyScreen
            .classList.add("hidden");

        document.querySelector(".auth-page")
            .classList.remove("hidden");


        loginForm
            .classList.remove("hidden");

        registerForm
            .classList.add("hidden");


        authTitle.textContent =
            "Добро пожаловать";

        authSubtitle.textContent =
            "Войдите в свой NEX аккаунт";


        document.getElementById("loginId")
            .value = "";

        document.getElementById("loginPassword")
            .value = "";

        clearMessage();
    }
);


/* ========================= */
/* HTML БЕЗОПАСНОСТЬ */
/* ========================= */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/* ========================= */
/* ВОССТАНОВЛЕНИЕ СЕССИИ */
/* ========================= */

function restoreSession() {

    const token =
        localStorage.getItem(
            "nex_token"
        );

    const user =
        localStorage.getItem(
            "nex_user"
        );


    if (!token || !user) {
        return;
    }


    try {

        const parsed =
            JSON.parse(user);

        showNotReady(parsed);

    } catch {

        localStorage.removeItem(
            "nex_token"
        );

        localStorage.removeItem(
            "nex_user"
        );
    }
}


restoreSession();


/* ========================= */
/* PWA */
/* ========================= */

let deferredPrompt = null;


window.addEventListener(
    "beforeinstallprompt",
    (event) => {

        event.preventDefault();

        deferredPrompt = event;

        installBtn.hidden = false;
    }
);


installBtn.addEventListener(
    "click",
    async () => {

        if (!deferredPrompt) {
            return;
        }

        deferredPrompt.prompt();

        await deferredPrompt.userChoice;

        deferredPrompt = null;

        installBtn.hidden = true;
    }
);


/* ========================= */
/* SERVICE WORKER */
/* ========================= */

if ("serviceWorker" in navigator) {

    navigator.serviceWorker.register(
        "./sw.js?v=10"
    ).catch(() => {});
}