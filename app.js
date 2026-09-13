const USER_KEY = "nexgram_user_v7";
const SETTINGS_KEY = "nexgram_settings_v1";
const CAPSULES_KEY = "nexgram_capsules_v1";

const defaultSettings = {
    theme: "sky",
    font: "normal",

    animations: true,
    glass: true,

    language: "Русский",

    notifications: true,
    sounds: true,
    vibration: true,

    readReceipts: true,
    onlineStatus: true,

    visibility: "Все пользователи"
};


let settings = loadSettings();
let capsules = loadCapsules();
let currentUser = loadUser();

let installPrompt = null;


/* =========================================================
   HELPERS
========================================================= */

function $(id) {
    return document.getElementById(id);
}


function loadUser() {

    try {
        return JSON.parse(
            localStorage.getItem(USER_KEY)
        );
    } catch {
        return null;
    }
}


function saveUser(user) {

    currentUser = user;

    localStorage.setItem(
        USER_KEY,
        JSON.stringify(user)
    );
}


function loadSettings() {

    try {

        const saved =
            JSON.parse(
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


function saveSettings() {

    localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify(settings)
    );
}


function loadCapsules() {

    try {

        const saved =
            JSON.parse(
                localStorage.getItem(CAPSULES_KEY)
            );

        return Array.isArray(saved)
            ? saved
            : [];

    } catch {

        return [];
    }
}


function saveCapsules() {

    localStorage.setItem(
        CAPSULES_KEY,
        JSON.stringify(capsules)
    );
}


function toast(message) {

    const el = $("toast");

    el.querySelector("p").textContent =
        message;

    el.classList.add("show");

    clearTimeout(
        toast.timer
    );

    toast.timer = setTimeout(() => {

        el.classList.remove("show");

    }, 2600);
}


function show(id) {

    $(id).classList.remove("hidden");
}


function hide(id) {

    $(id).classList.add("hidden");
}


/* =========================================================
   SETTINGS
========================================================= */

function applySettings() {

    document.body.dataset.theme =
        settings.theme;

    document.documentElement.style
        .setProperty(
            "--font-scale",
            getFontScale(settings.font)
        );

    document.body.classList.toggle(
        "no-animations",
        !settings.animations
    );

    document.body.classList.toggle(
        "no-glass",
        !settings.glass
    );

    updateSettingsUI();

    saveSettings();
}


function getFontScale(font) {

    const values = {
        small: .90,
        normal: 1,
        large: 1.10,
        xl: 1.22
    };

    return values[font] || 1;
}


function themeName(theme) {

    const names = {
        sky: "Небо",
        ocean: "Океан",
        night: "Ночь",
        graphite: "Графит",
        purple: "Фиолет",
        green: "Изумруд",
        sunset: "Закат",
        ice: "Лёд"
    };

    return names[theme] || "Небо";
}


function fontName(font) {

    const names = {
        small: "Маленький",
        normal: "Обычный",
        large: "Большой",
        xl: "Очень большой"
    };

    return names[font] || "Обычный";
}


function updateSettingsUI() {

    $("currentThemeText").textContent =
        themeName(settings.theme);

    $("currentFontText").textContent =
        fontName(settings.font);

    $("currentLanguageText").textContent =
        settings.language;

    $("visibilityText").textContent =
        settings.visibility;


    const animationToggle =
        $("animationsToggle");

    animationToggle.classList.toggle(
        "on",
        settings.animations
    );


    const glassToggle =
        $("glassToggle");

    glassToggle.classList.toggle(
        "on",
        settings.glass
    );


    document.querySelectorAll(
        "[data-toggle]"
    ).forEach(toggle => {

        const key =
            toggle.dataset.toggle;

        toggle.classList.toggle(
            "on",
            Boolean(settings[key])
        );

    });


    document.querySelectorAll(
        "[data-theme]"
    ).forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.theme ===
            settings.theme
        );

    });


    document.querySelectorAll(
        "[data-font]"
    ).forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.font ===
            settings.font
        );

    });
}


/* =========================================================
   AUTH
========================================================= */

function openAuthScreen(id) {

    [
        "authScreen",
        "registerScreen",
        "loginScreen"
    ].forEach(screen => {

        $(screen).classList.add("hidden");

    });

    $(id).classList.remove("hidden");
}


$("registerOpen").addEventListener(
    "click",
    () => openAuthScreen("registerScreen")
);


$("loginOpen").addEventListener(
    "click",
    () => openAuthScreen("loginScreen")
);


document.querySelectorAll(
    "[data-back-auth]"
).forEach(button => {

    button.addEventListener(
        "click",
        () => openAuthScreen("authScreen")
    );

});


$("registerForm").addEventListener(
    "submit",
    event => {

        event.preventDefault();

        const name =
            $("registerName")
                .value
                .trim();

        const email =
            $("registerEmail")
                .value
                .trim()
                .toLowerCase();

        const password =
            $("registerPassword")
                .value;

        if (!name || !email || password.length < 6) {

            toast(
                "Заполни все поля правильно"
            );

            return;
        }


        const user = {

            name,

            username:
                makeUsername(name),

            bio:
                "В Nexgram с нуля.",

            email,

            password,

            avatar: "",

            anonymous: false,

            createdAt:
                new Date().toISOString(),

            entered: true

        };


        saveUser(user);

        enterMessenger();

        toast(
            "Аккаунт Nexgram создан"
        );
    }
);


$("loginForm").addEventListener(
    "submit",
    event => {

        event.preventDefault();

        const email =
            $("loginEmail")
                .value
                .trim()
                .toLowerCase();

        const password =
            $("loginPassword")
                .value;


        const saved =
            loadUser();


        if (
            saved &&
            saved.email === email &&
            saved.password === password
        ) {

            saved.entered = true;

            saveUser(saved);

            enterMessenger();

            toast(
                "С возвращением в Nexgram"
            );

            return;
        }


        toast(
            "Аккаунт с такими данными не найден"
        );
    }
);


function makeUsername(name) {

    const clean =
        name
            .toLowerCase()
            .replace(
                /[^a-zа-яё0-9]/gi,
                ""
            )
            .slice(0, 14);

    const number =
        Math.floor(
            1000 + Math.random() * 9000
        );

    return (
        clean || "nexuser"
    ) + number;
}


$("forgotPassword").addEventListener(
    "click",
    () => {

        toast(
            "Восстановление подключим вместе с сервером"
        );

    }
);


/* =========================================================
   ANONYMOUS
========================================================= */

$("anonymousOpen").addEventListener(
    "click",
    () => {

        show("anonymousModal");

    }
);


$("anonymousContinue").addEventListener(
    "click",
    () => {

        const user = {

            name: "Аноним",

            username: "anonymous" +
                Math.floor(
                    1000 + Math.random() * 9000
                ),

            bio:
                "Анонимный режим Nexgram.",

            email: "",

            password: "",

            avatar: "",

            anonymous: true,

            createdAt:
                new Date().toISOString(),

            entered: true

        };


        saveUser(user);

        hide("anonymousModal");

        enterMessenger();

        toast(
            "Ты вошёл в ограниченный режим"
        );
    }
);


/* =========================================================
   ENTER APP
========================================================= */

function enterMessenger() {

    hide("authScreen");
    hide("registerScreen");
    hide("loginScreen");

    show("appScreen");
    show("bottomNav");
    show("rocketButton");

    renderProfile();

    renderCapsules();

    showPage("chatsPage");
}


function logout() {

    localStorage.removeItem(
        USER_KEY
    );

    currentUser = null;

    hide("appScreen");
    hide("bottomNav");
    hide("rocketButton");

    openAuthScreen("authScreen");

    toast(
        "Ты вышел из Nexgram"
    );
}


$("logoutBtn").addEventListener(
    "click",
    () => {

        if (
            confirm(
                "Выйти из аккаунта Nexgram?"
            )
        ) {

            logout();

        }

    }
);


/* =========================================================
   NAVIGATION
========================================================= */

function showPage(pageId) {

    document.querySelectorAll(
        ".app-page"
    ).forEach(page => {

        page.classList.remove(
            "active-page"
        );

    });


    $(pageId).classList.add(
        "active-page"
    );


    document.querySelectorAll(
        ".nav-item"
    ).forEach(item => {

        item.classList.toggle(
            "active",
            item.dataset.page === pageId
        );

    });


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


document.querySelectorAll(
    ".nav-item"
).forEach(button => {

    button.addEventListener(
        "click",
        () => {

            showPage(
                button.dataset.page
            );

        }
    );

});


function openSettingsPage() {

    showPage("settingsPage");

}


function openProfilePage() {

    showPage("profilePage");

}


function openOrbitPage() {

    showPage("orbitPage");

}


function openCapsulesPage() {

    showPage("capsulesPage");

}


$("openOrbitFromChats")
    .addEventListener(
        "click",
        openOrbitPage
    );


$("openProfileFromOrbit")
    .addEventListener(
        "click",
        openProfilePage
    );


$("openCapsulesFromOrbit")
    .addEventListener(
        "click",
        openCapsulesPage
    );


$("openSettingsFromOrbit")
    .addEventListener(
        "click",
        openSettingsPage
    );


$("openNavigatorFromOrbit")
    .addEventListener(
        "click",
        openNavigator
    );


$("openCapsulesFromChats")
    .addEventListener(
        "click",
        openCapsulesPage
    );


$("openNavigatorFromChats")
    .addEventListener(
        "click",
        openNavigator
    );


$("orbitSettings")
    .addEventListener(
        "click",
        openSettingsPage
    );


/* =========================================================
   PROFILE
========================================================= */

function renderProfile() {

    if (!currentUser) {
        return;
    }


    $("profileName").textContent =
        currentUser.name;


    $("profileUsername").textContent =
        "@" +
        (
            currentUser.username ||
            "nexuser"
        );


    $("profileBio").textContent =
        currentUser.bio ||
        "В Nexgram с нуля.";


    const letter =
        (
            currentUser.name ||
            "N"
        )
        .charAt(0)
        .toUpperCase();


    $("avatarLetter").textContent =
        letter;


    $("navAvatar").textContent =
        letter;


    const avatar =
        $("profileAvatar");


    if (currentUser.avatar) {

        avatar.src =
            currentUser.avatar;

        $("avatarButton")
            .classList.add(
                "has-image"
            );

        $("navAvatar").innerHTML =
            `<img
                src="${currentUser.avatar}"
                style="
                    width:100%;
                    height:100%;
                    object-fit:cover;
                "
            >`;

    } else {

        avatar.removeAttribute(
            "src"
        );

        $("avatarButton")
            .classList.remove(
                "has-image"
            );

        $("navAvatar").textContent =
            letter;
    }


    $("profileCapsuleCount")
        .textContent =
        capsules.length;
}


$("avatarButton")
    .addEventListener(
        "click",
        chooseAvatar
    );


$("changeAvatarBtn")
    .addEventListener(
        "click",
        chooseAvatar
    );


function chooseAvatar() {

    $("avatarInput").click();

}


$("avatarInput").addEventListener(
    "change",
    event => {

        const file =
            event.target.files[0];

        if (!file) {
            return;
        }


        if (
            !file.type.startsWith(
                "image/"
            )
        ) {

            toast(
                "Можно выбрать только изображение"
            );

            return;
        }


        if (
            file.size >
            5 * 1024 * 1024
        ) {

            toast(
                "Изображение должно быть меньше 5 МБ"
            );

            return;
        }


        const reader =
            new FileReader();


        reader.onload = () => {

            currentUser.avatar =
                reader.result;

            saveUser(currentUser);

            renderProfile();

            toast(
                "Аватар изменён"
            );
        };


        reader.readAsDataURL(file);

    }
);


/* =========================================================
   EDIT PROFILE
========================================================= */

function openProfileEditor() {

    $("editNameInput").value =
        currentUser.name || "";

    $("editUsernameInput").value =
        currentUser.username || "";

    $("editBioInput").value =
        currentUser.bio || "";

    show("profileEditModal");
}


$("editProfileBtn")
    .addEventListener(
        "click",
        openProfileEditor
    );


$("profileEditTop")
    .addEventListener(
        "click",
        openProfileEditor
    );


$("openProfileFromOrbit")
    .addEventListener(
        "click",
        openProfilePage
    );


$("saveProfileBtn")
    .addEventListener(
        "click",
        () => {

            const name =
                $("editNameInput")
                    .value
                    .trim();

            let username =
                $("editUsernameInput")
                    .value
                    .trim()
                    .replace(
                        /^@/,
                        ""
                    );


            const bio =
                $("editBioInput")
                    .value
                    .trim();


            if (!name) {

                toast(
                    "Имя не может быть пустым"
                );

                return;
            }


            if (!username) {

                username =
                    makeUsername(name);
            }


            currentUser.name =
                name;

            currentUser.username =
                username;

            currentUser.bio =
                bio ||
                "В Nexgram с нуля.";


            saveUser(currentUser);

            renderProfile();

            hide("profileEditModal");

            toast(
                "Профиль сохранён"
            );

        }
    );


/* =========================================================
   THEME
========================================================= */

$("themeSetting")
    .addEventListener(
        "click",
        () => show("themeModal")
    );


document.querySelectorAll(
    "[data-theme]"
).forEach(button => {

    button.addEventListener(
        "click",
        () => {

            settings.theme =
                button.dataset.theme;

            applySettings();

            toast(
                "Тема: " +
                themeName(settings.theme)
            );

        }
    );

});


/* =========================================================
   FONT
========================================================= */

$("fontSetting")
    .addEventListener(
        "click",
        () => show("fontModal")
    );


document.querySelectorAll(
    "[data-font]"
).forEach(button => {

    button.addEventListener(
        "click",
        () => {

            settings.font =
                button.dataset.font;

            applySettings();

            toast(
                "Размер: " +
                fontName(settings.font)
            );

        }
    );

});


/* =========================================================
   TOGGLES
========================================================= */

$("animationsSetting")
    .addEventListener(
        "click",
        () => {

            settings.animations =
                !settings.animations;

            applySettings();

            toast(
                settings.animations
                    ? "Анимации включены"
                    : "Анимации выключены"
            );

        }
    );


$("glassSetting")
    .addEventListener(
        "click",
        () => {

            settings.glass =
                !settings.glass;

            applySettings();

            toast(
                settings.glass
                    ? "Стеклянный интерфейс включён"
                    : "Стеклянный интерфейс выключен"
            );

        }
    );


document.querySelectorAll(
    "[data-toggle-setting]"
).forEach(row => {

    row.addEventListener(
        "click",
        () => {

            const key =
                row.dataset.toggleSetting;

            settings[key] =
                !settings[key];

            applySettings();

            toast(
                settings[key]
                    ? "Настройка включена"
                    : "Настройка выключена"
            );

        }
    );

});


/* =========================================================
   LANGUAGE
========================================================= */

$("languageSetting")
    .addEventListener(
        "click",
        () => show("languageModal")
    );


document.querySelectorAll(
    "[data-language]"
).forEach(button => {

    button.addEventListener(
        "click",
        () => {

            settings.language =
                button.dataset.language;

            applySettings();

            hide("languageModal");

            toast(
                "Язык выбран: " +
                settings.language
            );

        }
    );

});


/* =========================================================
   PRIVACY
========================================================= */

$("profileVisibilitySetting")
    .addEventListener(
        "click",
        () => {

            const values = [
                "Все пользователи",
                "Только контакты",
                "Никто"
            ];

            const current =
                values.indexOf(
                    settings.visibility
                );

            const next =
                values[
                    (current + 1) %
                    values.length
                ];

            settings.visibility =
                next;

            applySettings();

            toast(
                "Видимость: " +
                next
            );

        }
    );


/* =========================================================
   CAPSULES
========================================================= */

$("addCapsuleBtn")
    .addEventListener(
        "click",
        () => show("capsuleModal")
    );


function saveCapsule() {

    const title =
        $("capsuleTitle")
            .value
            .trim();

    const text =
        $("capsuleText")
            .value
            .trim();


    if (!title && !text) {

        toast(
            "Напиши что-нибудь в капсуле"
        );

        return;
    }


    const capsule = {

        id:
            Date.now(),

        title:
            title ||
            "Без названия",

        text:
            text,

        createdAt:
            new Date().toISOString()

    };


    capsules.unshift(
        capsule
    );


    saveCapsules();

    renderCapsules();

    renderProfile();

    $("capsuleTitle").value =
        "";

    $("capsuleText").value =
        "";

    hide("capsuleModal");

    toast(
        "Капсула запечатана ◈"
    );
}


$("saveCapsuleBtn")
    .addEventListener(
        "click",
        saveCapsule
    );


function renderCapsules() {

    const list =
        $("capsulesList");


    if (!capsules.length) {

        list.innerHTML = `

            <div class="empty-chat-card">

                <div class="capsule-icon"
                     style="margin:0 auto 15px">
                    ◈
                </div>

                <h2>
                    Пока пусто
                </h2>

                <p>
                    Создай первую капсулу —
                    сохрани мысль, идею или план.
                </p>

                <button
                    class="primary-btn"
                    id="emptyAddCapsule"
                >
                    Создать капсулу
                    <b>+</b>
                </button>

            </div>

        `;


        $("emptyAddCapsule")
            .addEventListener(
                "click",
                () => show("capsuleModal")
            );


        return;
    }


    list.innerHTML =
        capsules
            .map(capsule => {

                const date =
                    new Date(
                        capsule.createdAt
                    );


                const formatted =
                    date.toLocaleString(
                        settings.language === "Русский"
                            ? "ru-RU"
                            : "en-US",
                        {
                            day: "2-digit",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit"
                        }
                    );


                return `

                    <article
                        class="capsule-card"
                        data-id="${capsule.id}"
                    >

                        <button
                            class="capsule-delete"
                            data-delete-capsule="${capsule.id}"
                        >
                            ×
                        </button>

                        <h3>
                            ${escapeHtml(
                                capsule.title
                            )}
                        </h3>

                        <p>
                            ${escapeHtml(
                                capsule.text
                            )}
                        </p>

                        <div class="capsule-date">
                            ${formatted}
                        </div>

                    </article>

                `;

            })
            .join("");


    list.querySelectorAll(
        "[data-delete-capsule]"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const id =
                    Number(
                        button.dataset
                            .deleteCapsule
                    );


                capsules =
                    capsules.filter(
                        capsule =>
                            capsule.id !== id
                    );


                saveCapsules();

                renderCapsules();

                renderProfile();

                toast(
                    "Капсула удалена"
                );

            }
        );

    });
}


function escapeHtml(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/* =========================================================
   CLEAR DATA
========================================================= */

$("clearCapsulesBtn")
    .addEventListener(
        "click",
        () => {

            if (!capsules.length) {

                toast(
                    "Капсул пока нет"
                );

                return;
            }


            if (
                confirm(
                    "Удалить все локальные капсулы?"
                )
            ) {

                capsules = [];

                saveCapsules();

                renderCapsules();

                renderProfile();

                toast(
                    "Капсулы очищены"
                );

            }

        }
    );


$("resetSettingsBtn")
    .addEventListener(
        "click",
        () => {

            if (
                confirm(
                    "Сбросить все настройки Nexgram?"
                )
            ) {

                settings = {
                    ...defaultSettings
                };

                applySettings();

                toast(
                    "Настройки сброшены"
                );

            }

        }
    );


/* =========================================================
   LAB
========================================================= */

$("labButton")
    .addEventListener(
        "click",
        () => show("labModal")
    );


/* =========================================================
   NAVIGATOR
========================================================= */

$("rocketButton")
    .addEventListener(
        "click",
        openNavigator
    );


function openNavigator() {

    show("navigatorModal");

    setTimeout(
        () => $("navigatorInput").focus(),
        100
    );

}


$("navigatorInput")
    .addEventListener(
        "input",
        filterNavigator
    );


function filterNavigator() {

    const query =
        $("navigatorInput")
            .value
            .toLowerCase()
            .trim();


    const results =
        document.querySelectorAll(
            ".navigator-result"
        );


    results.forEach(result => {

        const text =
            result.innerText
                .toLowerCase();


        result.style.display =
            !query ||
            text.includes(query)
                ? "flex"
                : "none";

    });


    if (query) {

        const aliases = {

            "аватар": "profile",
            "фото": "profile",
            "имя": "profile",
            "юзер": "profile",
            "username": "profile",

            "тема": "theme",
            "цвет": "theme",
            "фон": "theme",

            "текст": "font",
            "шрифт": "font",
            "размер": "font",

            "язык": "language",

            "заметка": "capsules",
            "заметки": "capsules",
            "идея": "capsules",
            "капсула": "capsules",

            "настройки": "settings"

        };


        let matched =
            null;


        for (
            const key in aliases
        ) {

            if (
                query.includes(key)
            ) {

                matched =
                    aliases[key];

                break;
            }

        }


        if (matched) {

            results.forEach(result => {

                const action =
                    result.dataset.navAction;

                result.style.display =
                    action === matched
                        ? "flex"
                        : "none";

            });

        }

    }

}


document.querySelectorAll(
    "[data-nav-action]"
).forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const action =
                button.dataset.navAction;


            hide("navigatorModal");


            switch (action) {

                case "profile":
                    openProfilePage();
                    break;

                case "theme":
                    openSettingsPage();
                    setTimeout(
                        () => show("themeModal"),
                        200
                    );
                    break;

                case "font":
                    openSettingsPage();
                    setTimeout(
                        () => show("fontModal"),
                        200
                    );
                    break;

                case "language":
                    openSettingsPage();
                    setTimeout(
                        () => show("languageModal"),
                        200
                    );
                    break;

                case "capsules":
                    openCapsulesPage();
                    break;

                case "settings":
                    openSettingsPage();
                    break;

            }

        }
    );

});


/* =========================================================
   MODAL CLOSES
========================================================= */

document.querySelectorAll(
    "[data-close-modal]"
).forEach(button => {

    button.addEventListener(
        "click",
        () => hide("anonymousModal")
    );

});


document.querySelectorAll(
    "[data-close-theme]"
).forEach(button => {

    button.addEventListener(
        "click",
        () => hide("themeModal")
    );

});


document.querySelectorAll(
    "[data-close-font]"
).forEach(button => {

    button.addEventListener(
        "click",
        () => hide("fontModal")
    );

});


document.querySelectorAll(
    "[data-close-language]"
).forEach(button => {

    button.addEventListener(
        "click",
        () => hide("languageModal")
    );

});


document.querySelectorAll(
    "[data-close-profile]"
).forEach(button => {

    button.addEventListener(
        "click",
        () => hide("profileEditModal")
    );

});


document.querySelectorAll(
    "[data-close-capsule]"
).forEach(button => {

    button.addEventListener(
        "click",
        () => hide("capsuleModal")
    );

});


document.querySelectorAll(
    "[data-close-lab]"
).forEach(button => {

    button.addEventListener(
        "click",
        () => hide("labModal")
    );

});


document.querySelectorAll(
    "[data-close-navigator]"
).forEach(button => {

    button.addEventListener(
        "click",
        () => hide("navigatorModal")
    );

});


document.querySelectorAll(
    ".modal-overlay"
).forEach(overlay => {

    overlay.addEventListener(
        "click",
        event => {

            if (
                event.target === overlay
            ) {

                overlay.classList.add(
                    "hidden"
                );

            }

        }
    );

});


/* =========================================================
   SEARCH BUTTON
========================================================= */

$("chatSearchBtn")
    .addEventListener(
        "click",
        () => {

            toast(
                "Поиск чатов появится вместе с сервером"
            );

        }
    );


/* =========================================================
   INSTALL PWA
========================================================= */

window.addEventListener(
    "beforeinstallprompt",
    event => {

        event.preventDefault();

        installPrompt =
            event;

        show("installBtn");

    }
);


$("installBtn")
    .addEventListener(
        "click",
        async () => {

            if (!installPrompt) {

                toast(
                    "Открой меню браузера и выбери «Установить приложение»"
                );

                return;
            }


            installPrompt.prompt();

            await installPrompt.userChoice;

            installPrompt =
                null;

        }
    );


/* =========================================================
   SERVICE WORKER
========================================================= */

if (
    "serviceWorker" in navigator
) {

    window.addEventListener(
        "load",
        () => {

            navigator.serviceWorker
                .register(
                    "./sw.js?v=8"
                )
                .catch(
                    error =>
                        console.log(
                            "SW error:",
                            error
                        )
                );

        }
    );

}


/* =========================================================
   START
========================================================= */

applySettings();

renderCapsules();


if (
    currentUser &&
    currentUser.entered
) {

    enterMessenger();

} else {

    openAuthScreen(
        "authScreen"
    );

}