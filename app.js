const USER_KEY = "nexgram_user_v10";
const SETTINGS_KEY = "nexgram_settings_v10";

let deferredPrompt = null;


/* =========================
   HELPERS
========================= */

const $ = id => document.getElementById(id);


function toast(message) {

    const el = $("toast");

    el.textContent = message;

    el.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {

        el.classList.remove("show");

    }, 2500);
}


function showScreen(id) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove("active");

        });


    const target = $(id);

    if (target) {
        target.classList.add("active");
    }

}


function showModal(id) {

    const modal = $(id);

    if (modal) {
        modal.classList.add("show");
    }

}


function closeModal(id) {

    const modal = $(id);

    if (modal) {
        modal.classList.remove("show");
    }

}


/* =========================
   USER
========================= */

function getUser() {

    try {

        return JSON.parse(
            localStorage.getItem(USER_KEY)
        );

    } catch {

        return null;

    }

}


function saveUser(user) {

    localStorage.setItem(
        USER_KEY,
        JSON.stringify(user)
    );

}


/* =========================
   SETTINGS
========================= */

const defaultSettings = {

    theme: "light",

    fontSize: 16,

    font:
        "system",

    notifications: true,

    vibration: true,

    animations: true,

    language: "ru"

};


function getSettings() {

    try {

        const saved = JSON.parse(
            localStorage.getItem(SETTINGS_KEY)
        );

        return {
            ...defaultSettings,
            ...(saved || {})
        };

    } catch {

        return {
            ...defaultSettings
        };

    }

}


let settings = getSettings();


function saveSettings() {

    localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify(settings)
    );

}


/* =========================
   FONT
========================= */

const fonts = {

    system:
        `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,

    rounded:
        `"Trebuchet MS", Arial, sans-serif`,

    mono:
        `"Courier New", monospace`,

    serif:
        `Georgia, "Times New Roman", serif`

};


function fontName(font) {

    const names = {

        system: "Системный",

        rounded: "Rounded",

        mono: "Mono",

        serif: "Serif"

    };

    return names[font] || "Системный";

}


function fontSizeName(size) {

    if (size <= 14) {
        return "Маленький";
    }

    if (size >= 20) {
        return "Очень большой";
    }

    if (size >= 18) {
        return "Большой";
    }

    return "Средний";

}


/* =========================
   THEME NAMES
========================= */

const themeNames = {

    light: "Светлая",

    dark: "Тёмная",

    ocean: "Океан",

    midnight: "Midnight",

    purple: "Фиолетовая",

    sunset: "Sunset",

    forest: "Forest",

    rose: "Rose"

};


/* =========================
   APPLY SETTINGS
========================= */

function applySettings() {

    document.body.dataset.theme =
        settings.theme;


    document.documentElement
        .style
        .setProperty(
            "--font-size",
            `${settings.fontSize}px`
        );


    document.documentElement
        .style
        .setProperty(
            "--font-family",
            fonts[settings.font] ||
            fonts.system
        );


    document.body.classList.toggle(
        "no-animations",
        !settings.animations
    );


    $("notificationsToggle").checked =
        settings.notifications;


    $("vibrationToggle").checked =
        settings.vibration;


    $("animationsToggle").checked =
        settings.animations;


    $("currentThemeText").textContent =
        themeNames[settings.theme] ||
        "Светлая";


    $("currentFontText").textContent =
        `${fontSizeName(settings.fontSize)} · ${fontName(settings.font)}`;


    $("languageValue").textContent =
        languageNames[settings.language] ||
        "Русский";


    updateThemeButtons();
    updateFontButtons();
    updateLanguageButtons();

}


/* =========================
   AUTH
========================= */

$("registerOpen").onclick = () => {

    showScreen("registerScreen");

};


$("loginOpen").onclick = () => {

    showScreen("loginScreen");

};


document
    .querySelectorAll("[data-back]")
    .forEach(button => {

        button.onclick = () => {

            showScreen(
                button.dataset.back
            );

        };

    });


/* REGISTER */

$("registerBtn").onclick = () => {

    const name =
        $("registerName")
            .value
            .trim();

    const email =
        $("registerEmail")
            .value
            .trim();

    const password =
        $("registerPassword")
            .value;


    if (!name) {

        toast("Введите имя");

        return;

    }


    if (
        !email ||
        !email.includes("@")
    ) {

        toast("Введите корректный email");

        return;

    }


    if (password.length < 6) {

        toast(
            "Пароль должен быть минимум 6 символов"
        );

        return;

    }


    saveUser({

        name,

        email,

        anonymous: false,

        entered: true

    });


    toast("Аккаунт создан");


    setTimeout(() => {

        showScreen("notReadyScreen");

    }, 500);

};


/* LOGIN */

$("loginBtn").onclick = () => {

    const email =
        $("loginEmail")
            .value
            .trim();

    const password =
        $("loginPassword")
            .value;


    if (
        !email ||
        !email.includes("@")
    ) {

        toast("Введите email");

        return;

    }


    if (!password) {

        toast("Введите пароль");

        return;

    }


    saveUser({

        name:
            "Пользователь Nexgram",

        email,

        anonymous: false,

        entered: true

    });


    toast("Вход выполнен");


    setTimeout(() => {

        showScreen("notReadyScreen");

    }, 500);

};


/* PASSWORD */

$("forgotPassword").onclick = () => {

    showInfo(
        "Восстановление",
        "Восстановление пароля появится после подключения настоящей системы аккаунтов."
    );

};


/* =========================
   ANONYMOUS
========================= */

$("anonymousOpen").onclick = () => {

    showModal("anonymousModal");

};


$("anonymousBack").onclick = () => {

    closeModal("anonymousModal");

};


$("anonymousContinue").onclick = () => {

    closeModal("anonymousModal");


    saveUser({

        name: "Аноним",

        email: "",

        anonymous: true,

        entered: true

    });


    toast("Анонимный режим включён");


    setTimeout(() => {

        showScreen("notReadyScreen");

    }, 500);

};


/* =========================
   APP
========================= */

$("continueBtn").onclick = () => {

    openApp();

};


function openApp() {

    showScreen("appScreen");

    updateProfile();

    switchPage("chatsPage");

}


/* =========================
   NAVIGATION
========================= */

document
    .querySelectorAll(".nav-item")
    .forEach(item => {

        item.onclick = () => {

            switchPage(
                item.dataset.page
            );

        };

    });


function switchPage(pageId) {

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove(
                "active-page"
            );

        });


    document
        .querySelectorAll(".nav-item")
        .forEach(item => {

            item.classList.remove("active");

        });


    const page = $(pageId);

    if (page) {
        page.classList.add("active-page");
    }


    const nav =
        document.querySelector(
            `.nav-item[data-page="${pageId}"]`
        );


    if (nav) {
        nav.classList.add("active");
    }

}


/* =========================
   THEMES
========================= */

$("themesSetting").onclick = () => {

    showModal("themesModal");

};


document
    .querySelectorAll(".theme-choice")
    .forEach(button => {

        button.onclick = () => {

            settings.theme =
                button.dataset.theme;

            saveSettings();

            applySettings();

            toast(
                `Тема: ${themeNames[settings.theme]}`
            );

        };

    });


function updateThemeButtons() {

    document
        .querySelectorAll(".theme-choice")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.theme ===
                settings.theme
            );

        });

}


/* =========================
   FONT
========================= */

$("fontSetting").onclick = () => {

    showModal("fontModal");

};


document
    .querySelectorAll("[data-size]")
    .forEach(button => {

        button.onclick = () => {

            settings.fontSize =
                Number(
                    button.dataset.size
                );

            saveSettings();

            applySettings();

            toast("Размер текста изменён");

        };

    });


document
    .querySelectorAll("[data-font]")
    .forEach(button => {

        button.onclick = () => {

            settings.font =
                button.dataset.font;

            saveSettings();

            applySettings();

            toast("Шрифт изменён");

        };

    });


function updateFontButtons() {

    document
        .querySelectorAll("[data-size]")
        .forEach(button => {

            button.classList.toggle(
                "active",
                Number(button.dataset.size) ===
                settings.fontSize
            );

        });


    document
        .querySelectorAll("[data-font]")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.font ===
                settings.font
            );

        });

}


/* =========================
   LANGUAGES
========================= */

const languageNames = {

    ru: "Русский",

    en: "English",

    uk: "Українська",

    de: "Deutsch",

    fr: "Français",

    es: "Español",

    it: "Italiano",

    pt: "Português",

    pl: "Polski",

    tr: "Türkçe",

    ar: "العربية",

    hi: "हिन्दी",

    zh: "中文",

    ja: "日本語",

    ko: "한국어"

};


$("languageSetting").onclick = () => {

    showModal("languageModal");

};


document
    .querySelectorAll("[data-lang]")
    .forEach(button => {

        button.onclick = () => {

            settings.language =
                button.dataset.lang;

            saveSettings();

            applySettings();

            toast(
                `Язык: ${languageNames[settings.language]}`
            );

        };

    });


function updateLanguageButtons() {

    document
        .querySelectorAll("[data-lang]")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.lang ===
                settings.language
            );

        });

}


/* SEARCH LANGUAGES */

$("languageSearch").addEventListener(
    "input",
    event => {

        const query =
            event.target.value
                .toLowerCase()
                .trim();


        document
            .querySelectorAll(
                "#languageList button"
            )
            .forEach(button => {

                const text =
                    button.textContent
                        .toLowerCase();

                button.style.display =
                    !query ||
                    text.includes(query)
                        ? "flex"
                        : "none";

            });

    }
);


/* =========================
   TOGGLES
========================= */

$("notificationsToggle").onchange =
    event => {

        settings.notifications =
            event.target.checked;

        saveSettings();

        toast(
            settings.notifications
                ? "Уведомления включены"
                : "Уведомления выключены"
        );

    };


$("vibrationToggle").onchange =
    event => {

        settings.vibration =
            event.target.checked;

        saveSettings();


        if (
            settings.vibration &&
            navigator.vibrate
        ) {

            navigator.vibrate(40);

        }


        toast(
            settings.vibration
                ? "Вибрация включена"
                : "Вибрация выключена"
        );

    };


$("animationsToggle").onchange =
    event => {

        settings.animations =
            event.target.checked;

        saveSettings();

        applySettings();

        toast(
            settings.animations
                ? "Анимации включены"
                : "Анимации выключены"
        );

    };


/* =========================
   INFO
========================= */

function showInfo(title, text) {

    $("infoTitle").textContent =
        title;

    $("infoText").textContent =
        text;

    showModal("infoModal");

}


$("aboutBtn").onclick = () => {

    showInfo(
        "О Nexgram",
        "Nexgram — собственный современный мессенджер. Проект находится в активной разработке."
    );

};


$("privacyBtn").onclick = () => {

    showInfo(
        "Приватность",
        "Настройки приватности будут расширяться вместе с серверной частью Nexgram."
    );

};


$("securityBtn").onclick = () => {

    showInfo(
        "Безопасность",
        "Защита аккаунтов, сессий и сообщений будет реализована при подключении backend."
    );

};


$("dataBtn").onclick = () => {

    showInfo(
        "Данные приложения",
        "Текущие настройки интерфейса и локальная сессия сохраняются в памяти браузера."
    );

};


$("editProfileBtn").onclick = () => {

    const user = getUser();

    if (!user) return;


    showInfo(
        "Профиль",
        `Ваше имя: ${user.name || "Пользователь Nexgram"}`
    );

};


/* =========================
   CLOSE MODALS
========================= */

document
    .querySelectorAll("[data-close]")
    .forEach(button => {

        button.onclick = () => {

            closeModal(
                button.dataset.close
            );

        };

    });


document
    .querySelectorAll(".modal")
    .forEach(modal => {

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal
                ) {

                    modal.classList.remove(
                        "show"
                    );

                }

            }
        );

    });


$("infoClose").onclick = () => {

    closeModal("infoModal");

};


/* =========================
   PROFILE
========================= */

function updateProfile() {

    const user = getUser();

    if (!user) return;


    $("profileName").textContent =
        user.name ||
        "Пользователь Nexgram";


    $("profileEmail").textContent =
        user.email ||
        "Анонимный режим";


    $("profileAvatar").textContent =
        (
            user.name ||
            "N"
        )
        .charAt(0)
        .toUpperCase();

}


/* =========================
   LOGOUT
========================= */

$("logoutBtn").onclick = () => {

    localStorage.removeItem(
        USER_KEY
    );

    toast("Вы вышли из аккаунта");


    setTimeout(() => {

        showScreen("authScreen");

    }, 500);

};


/* =========================
   CHAT
========================= */

$("newChatBtn").onclick = () => {

    showInfo(
        "Чаты ещё не готовы",
        "Создание настоящих чатов появится после подключения серверной части Nexgram."
    );

};


$("chatSearch").addEventListener(
    "input",
    event => {

        const value =
            event.target.value
                .trim();


        const title =
            $("chatEmpty")
                .querySelector("h3");


        const text =
            $("chatEmpty")
                .querySelector("p");


        if (value) {

            title.textContent =
                "Ничего не найдено";

            text.textContent =
                "Настоящие чаты появятся после разработки серверной части.";

        } else {

            title.textContent =
                "Пока здесь пусто";

            text.textContent =
                "Когда чаты будут готовы, они появятся здесь.";

        }

    }
);


/* =========================
   PWA
========================= */

window.addEventListener(
    "beforeinstallprompt",
    event => {

        event.preventDefault();

        deferredPrompt = event;

    }
);


$("installBtn").onclick = async () => {

    if (!deferredPrompt) {

        showInfo(
            "Установка Nexgram",
            "Откройте меню браузера и выберите «Установить приложение» или «Добавить на главный экран»."
        );

        return;

    }


    deferredPrompt.prompt();

    await deferredPrompt.userChoice;

    deferredPrompt = null;

};


/* =========================
   SERVICE WORKER
========================= */

if ("serviceWorker" in navigator) {

    window.addEventListener(
        "load",
        () => {

            navigator.serviceWorker
                .register(
                    "./sw.js?v=10"
                )
                .catch(error => {

                    console.log(
                        "SW error:",
                        error
                    );

                });

        }
    );

}


/* =========================
   START
========================= */

applySettings();


const user = getUser();


if (user && user.entered) {

    showScreen("notReadyScreen");

} else {

    showScreen("authScreen");

}