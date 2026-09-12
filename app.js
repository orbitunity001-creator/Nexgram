const USER_KEY = "nexgram_user_v8";
const SETTINGS_KEY = "nexgram_settings_v8";

let deferredPrompt = null;


/* -------------------------
   HELPERS
------------------------- */

const $ = id => document.getElementById(id);


function showScreen(id) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    const screen = $(id);

    if (screen) {
        screen.classList.add("active");
    }
}


function toast(message) {

    const element = $("toast");

    element.textContent = message;
    element.classList.add("show");

    setTimeout(() => {
        element.classList.remove("show");
    }, 2500);
}


function getUser() {

    try {
        return JSON.parse(localStorage.getItem(USER_KEY));
    } catch {
        return null;
    }
}


function saveUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}


function getSettings() {

    const defaults = {
        theme: "light",
        fontSize: 16,
        notifications: true,
        vibration: true,
        animations: true,
        language: "ru"
    };

    try {

        const saved = JSON.parse(
            localStorage.getItem(SETTINGS_KEY)
        );

        return {
            ...defaults,
            ...(saved || {})
        };

    } catch {

        return defaults;
    }
}


function saveSettings(settings) {
    localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify(settings)
    );
}


/* -------------------------
   AUTH
------------------------- */

$("registerOpen").onclick = () => {
    showScreen("registerScreen");
};


$("loginOpen").onclick = () => {
    showScreen("loginScreen");
};


document.querySelectorAll("[data-back]").forEach(button => {

    button.onclick = () => {
        showScreen(button.dataset.back);
    };

});


/* REGISTER */

$("registerBtn").onclick = () => {

    const name = $("registerName").value.trim();
    const email = $("registerEmail").value.trim();
    const password = $("registerPassword").value;

    if (!name) {
        toast("Введите имя");
        return;
    }

    if (!email || !email.includes("@")) {
        toast("Введите корректный email");
        return;
    }

    if (password.length < 6) {
        toast("Пароль должен быть минимум 6 символов");
        return;
    }

    const user = {
        name,
        email,
        anonymous: false,
        entered: true
    };

    saveUser(user);

    toast("Аккаунт создан");

    setTimeout(() => {
        openNotReady();
    }, 500);
};


/* LOGIN */

$("loginBtn").onclick = () => {

    const email = $("loginEmail").value.trim();
    const password = $("loginPassword").value;

    if (!email || !email.includes("@")) {
        toast("Введите email");
        return;
    }

    if (!password) {
        toast("Введите пароль");
        return;
    }

    const user = {
        name: "Пользователь Nexgram",
        email,
        anonymous: false,
        entered: true
    };

    saveUser(user);

    toast("Вход выполнен");

    setTimeout(() => {
        openNotReady();
    }, 500);
};


/* FORGOT */

$("forgotPassword").onclick = () => {

    showInfo(
        "Восстановление пароля",
        "Эта функция появится после подключения настоящей системы аккаунтов."
    );
};


/* -------------------------
   ANONYMOUS
------------------------- */

$("anonymousOpen").onclick = () => {
    $("anonymousModal").classList.add("show");
};


$("anonymousBack").onclick = () => {
    $("anonymousModal").classList.remove("show");
};


$("anonymousContinue").onclick = () => {

    $("anonymousModal").classList.remove("show");

    saveUser({
        name: "Аноним",
        email: "",
        anonymous: true,
        entered: true
    });

    toast("Анонимный режим включён");

    setTimeout(() => {
        openNotReady();
    }, 500);
};


/* -------------------------
   NOT READY
------------------------- */

function openNotReady() {
    showScreen("notReadyScreen");
}


$("continueBtn").onclick = () => {

    openApp();

};


function openApp() {

    showScreen("appScreen");

    updateProfile();

    switchPage("chatsPage");

}


/* -------------------------
   NAVIGATION
------------------------- */

document.querySelectorAll(".nav-item").forEach(item => {

    item.addEventListener("click", () => {

        switchPage(item.dataset.page);

    });

});


function switchPage(pageId) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active-page");
    });

    document.querySelectorAll(".nav-item").forEach(item => {
        item.classList.remove("active");
    });

    const page = $(pageId);

    if (page) {
        page.classList.add("active-page");
    }

    const nav = document.querySelector(
        `.nav-item[data-page="${pageId}"]`
    );

    if (nav) {
        nav.classList.add("active");
    }

}


/* -------------------------
   SETTINGS
------------------------- */

let settings = getSettings();


function applySettings() {

    document.body.dataset.theme = settings.theme;

    document.documentElement.style.setProperty(
        "--font-size",
        `${settings.fontSize}px`
    );

    document.body.classList.toggle(
        "no-animations",
        !settings.animations
    );


    $("fontSizeRange").value =
        settings.fontSize;

    updateFontSizeLabel();


    $("notificationsToggle").checked =
        settings.notifications;

    $("vibrationToggle").checked =
        settings.vibration;

    $("animationsToggle").checked =
        settings.animations;


    document.querySelectorAll(".theme-option")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.theme === settings.theme
            );

        });


    $("languageValue").textContent =
        settings.language === "ru"
            ? "Русский"
            : "English";
}


function updateFontSizeLabel() {

    let label = "Средний";

    if (settings.fontSize <= 15) {
        label = "Маленький";
    }

    if (settings.fontSize >= 18) {
        label = "Большой";
    }

    $("fontSizeText").textContent = label;
}


/* THEME */

document.querySelectorAll(".theme-option")
    .forEach(button => {

        button.addEventListener("click", () => {

            settings.theme =
                button.dataset.theme;

            saveSettings(settings);
            applySettings();

            toast("Тема изменена");

        });

    });


/* FONT SIZE */

$("fontSizeRange").addEventListener("input", event => {

    settings.fontSize =
        Number(event.target.value);

    saveSettings(settings);
    applySettings();

});


/* NOTIFICATIONS */

$("notificationsToggle").addEventListener(
    "change",
    event => {

        settings.notifications =
            event.target.checked;

        saveSettings(settings);

        toast(
            settings.notifications
                ? "Уведомления включены"
                : "Уведомления выключены"
        );

    }
);


/* VIBRATION */

$("vibrationToggle").addEventListener(
    "change",
    event => {

        settings.vibration =
            event.target.checked;

        saveSettings(settings);

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

    }
);


/* ANIMATIONS */

$("animationsToggle").addEventListener(
    "change",
    event => {

        settings.animations =
            event.target.checked;

        saveSettings(settings);
        applySettings();

        toast(
            settings.animations
                ? "Анимации включены"
                : "Анимации выключены"
        );

    }
);


/* LANGUAGE */

$("languageSetting").onclick = () => {

    if (settings.language === "ru") {
        settings.language = "en";
    } else {
        settings.language = "ru";
    }

    saveSettings(settings);
    applySettings();

    toast(
        settings.language === "ru"
            ? "Русский язык"
            : "English language"
    );
};


/* -------------------------
   INFO
------------------------- */

function showInfo(title, text) {

    $("infoTitle").textContent = title;
    $("infoText").textContent = text;

    $("infoModal").classList.add("show");
}


$("infoClose").onclick = () => {

    $("infoModal").classList.remove("show");

};


$("aboutBtn").onclick = () => {

    showInfo(
        "О Nexgram",
        "Nexgram — собственный современный мессенджер. Сейчас проект находится в разработке."
    );

};


$("privacyBtn").onclick = () => {

    showInfo(
        "Приватность",
        "Настоящая система безопасности и серверного хранения данных будет добавлена вместе с backend."
    );

};


$("editProfileBtn").onclick = () => {

    const user = getUser();

    if (!user) return;

    showInfo(
        "Профиль",
        `Ваш профиль: ${user.name || "Пользователь Nexgram"}`
    );

};


/* -------------------------
   PROFILE
------------------------- */

function updateProfile() {

    const user = getUser();

    if (!user) return;

    $("profileName").textContent =
        user.name || "Пользователь Nexgram";

    $("profileEmail").textContent =
        user.email || "Анонимный режим";

    const firstLetter =
        (user.name || "N")
            .charAt(0)
            .toUpperCase();

    $("profileAvatar").textContent =
        firstLetter;
}


/* -------------------------
   LOGOUT
------------------------- */

$("logoutBtn").onclick = () => {

    localStorage.removeItem(USER_KEY);

    toast("Вы вышли из аккаунта");

    setTimeout(() => {

        showScreen("authScreen");

    }, 500);

};


/* -------------------------
   NEW CHAT
------------------------- */

$("newChatBtn").onclick = () => {

    showInfo(
        "Чаты ещё не готовы",
        "Создание настоящих чатов появится после подключения серверной части Nexgram."
    );

};


/* -------------------------
   SEARCH
------------------------- */

$("chatSearch").addEventListener(
    "input",
    event => {

        const value =
            event.target.value.trim();

        if (value) {

            $("chatEmpty").querySelector("h3")
                .textContent = "Ничего не найдено";

            $("chatEmpty").querySelector("p")
                .textContent =
                "Чаты появятся здесь после добавления функции сообщений.";

        } else {

            $("chatEmpty").querySelector("h3")
                .textContent = "Пока здесь пусто";

            $("chatEmpty").querySelector("p")
                .textContent =
                "Когда чаты будут готовы, они появятся здесь.";

        }

    }
);


/* -------------------------
   PWA INSTALL
------------------------- */

window.addEventListener(
    "beforeinstallprompt",
    event => {

        event.preventDefault();

        deferredPrompt = event;

        $("installBtn").style.display =
            "block";

    }
);


$("installBtn").onclick = async () => {

    if (!deferredPrompt) {

        showInfo(
            "Установка Nexgram",
            "Если кнопка установки недоступна, откройте меню браузера и выберите «Добавить на главный экран» или «Установить приложение»."
        );

        return;
    }

    deferredPrompt.prompt();

    await deferredPrompt.userChoice;

    deferredPrompt = null;

};


/* -------------------------
   SERVICE WORKER
------------------------- */

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker
            .register("./sw.js?v=8")
            .catch(error => {
                console.log(
                    "Service Worker error:",
                    error
                );
            });

    });

}


/* -------------------------
   START
------------------------- */

applySettings();

const user = getUser();

if (user && user.entered) {

    openNotReady();

} else {

    showScreen("authScreen");

}