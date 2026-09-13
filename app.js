/* =========================================================
   NEXGRAM MESSENGER
   Local prototype with Premium / Rockets / Gifts / Orbit
   ========================================================= */


/* CHANGE THIS TO YOUR EMAIL */
const ADMIN_EMAIL = "MeowlDevCat@gmail.com";


const USER_KEY = "nexgram_user_v8";
const USERS_KEY = "nexgram_users_v8";
const TASKS_KEY = "nexgram_tasks_v8";
const SETTINGS_KEY = "nexgram_settings_v8";


/* =========================================================
   DATA
   ========================================================= */

const TASKS = [

    {
        id: "daily_open",
        title: "Открыть Nexgram",
        description: "Зайди в приложение сегодня.",
        reward: 5,
        icon: "✦",
        type: "daily"
    },

    {
        id: "profile",
        title: "Настроить профиль",
        description: "Установи своё имя и профиль.",
        reward: 20,
        icon: "◉",
        type: "once"
    },

    {
        id: "avatar",
        title: "Установить аватар",
        description: "Добавь изображение профиля.",
        reward: 15,
        icon: "▣",
        type: "once"
    },

    {
        id: "settings",
        title: "Настроить Nexgram",
        description: "Открой настройки и измени параметры.",
        reward: 10,
        icon: "⚙",
        type: "once"
    },

    {
        id: "premium",
        title: "Исследовать Premium",
        description: "Открой раздел Premium.",
        reward: 5,
        icon: "🚀",
        type: "once"
    },

    {
        id: "orbit",
        title: "Запустить Orbit",
        description: "Используй уникальный навигатор Nexgram.",
        reward: 10,
        icon: "✧",
        type: "once"
    },

    {
        id: "gift",
        title: "Открыть подарок",
        description: "Открой любой Premium-подарок.",
        reward: 25,
        icon: "🎁",
        type: "once"
    },

    {
        id: "collector",
        title: "Стать коллекционером",
        description: "Собери 3 уникальных предмета.",
        reward: 50,
        icon: "◇",
        type: "achievement"
    },

    {
        id: "rockets_100",
        title: "Первые 100 ракет",
        description: "Накопи минимум 100 🚀.",
        reward: 35,
        icon: "🚀",
        type: "achievement"
    },

    {
        id: "return",
        title: "Вернуться завтра",
        description: "Открой Nexgram в другой день.",
        reward: 15,
        icon: "↻",
        type: "daily"
    }

];


const GIFTS = [

    {
        id: "sky",
        name: "Небесная капсула",
        rarity: "Обычный",
        cost: 30,
        icon: "🎁",
        rewards: [
            "sticker_star",
            "sticker_blue",
            "rockets_15"
        ]
    },

    {
        id: "moon",
        name: "Лунный подарок",
        rarity: "Редкий",
        cost: 75,
        icon: "🌙",
        rewards: [
            "sticker_moon",
            "frame_sky",
            "rockets_40"
        ]
    },

    {
        id: "quantum",
        name: "Квантовый подарок",
        rarity: "Эпический",
        cost: 150,
        icon: "💠",
        rewards: [
            "sticker_quantum",
            "frame_quantum",
            "badge_quantum",
            "rockets_90"
        ]
    },

    {
        id: "supernova",
        name: "Сверхновая",
        rarity: "Легендарный",
        cost: 300,
        icon: "🌟",
        rewards: [
            "sticker_nova",
            "frame_nova",
            "badge_nova",
            "rockets_180"
        ]
    },

    {
        id: "nexus",
        name: "Нексус",
        rarity: "Мифический",
        cost: 600,
        icon: "♾️",
        rewards: [
            "sticker_nexus",
            "frame_nexus",
            "badge_nexus",
            "rockets_400"
        ]
    }

];


const STICKERS = [

    {
        id: "sticker_star",
        name: "✦ Star",
        symbol: "✦"
    },

    {
        id: "sticker_blue",
        name: "◆ Blue",
        symbol: "◆"
    },

    {
        id: "sticker_moon",
        name: "☾ Moon",
        symbol: "☾"
    },

    {
        id: "sticker_quantum",
        name: "◈ Quantum",
        symbol: "◈"
    },

    {
        id: "sticker_nova",
        name: "☄ Nova",
        symbol: "☄"
    },

    {
        id: "sticker_nexus",
        name: "∞ Nexus",
        symbol: "∞"
    }

];


const REWARD_NAMES = {

    frame_sky: {
        name: "Небесная рамка",
        icon: "▣",
        type: "frame"
    },

    frame_quantum: {
        name: "Квантовая рамка",
        icon: "◇",
        type: "frame"
    },

    frame_nova: {
        name: "Рамка Сверхновой",
        icon: "🌟",
        type: "frame"
    },

    frame_nexus: {
        name: "Рамка Нексуса",
        icon: "♾️",
        type: "frame"
    },

    badge_quantum: {
        name: "Квантовый значок",
        icon: "💠",
        type: "badge"
    },

    badge_nova: {
        name: "Значок Сверхновой",
        icon: "🌟",
        type: "badge"
    },

    badge_nexus: {
        name: "Значок Нексуса",
        icon: "♾️",
        type: "badge"
    }

};


/* =========================================================
   STATE
   ========================================================= */

let currentUser = null;

let users = {};

let taskState = {};

let settings = {

    animations: true,
    sounds: false,
    notifications: true,
    showPremium: true,
    fontSize: "normal"

};


let deferredInstallPrompt = null;


/* =========================================================
   DOM
   ========================================================= */

const $ = id => document.getElementById(id);


const screens = [

    "authScreen",
    "registerScreen",
    "loginScreen",
    "notReadyScreen",
    "appScreen"

];


const views = [

    "chatsView",
    "premiumView",
    "profileView",
    "settingsView"

];


/* =========================================================
   STORAGE
   ========================================================= */

function loadStorage() {

    try {

        currentUser =
            JSON.parse(
                localStorage.getItem(USER_KEY)
            ) || null;

    } catch {

        currentUser = null;

    }


    try {

        users =
            JSON.parse(
                localStorage.getItem(USERS_KEY)
            ) || {};

    } catch {

        users = {};

    }


    try {

        taskState =
            JSON.parse(
                localStorage.getItem(TASKS_KEY)
            ) || {};

    } catch {

        taskState = {};

    }


    try {

        settings = {
            ...settings,
            ...(JSON.parse(
                localStorage.getItem(SETTINGS_KEY)
            ) || {})
        };

    } catch {}

}


function saveCurrentUser() {

    if (!currentUser) return;

    localStorage.setItem(
        USER_KEY,
        JSON.stringify(currentUser)
    );

    if (currentUser.email) {

        users[
            normalizeEmail(currentUser.email)
        ] = currentUser;

    }

    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );

}


function saveTasks() {

    localStorage.setItem(
        TASKS_KEY,
        JSON.stringify(taskState)
    );

}


function saveSettings() {

    localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify(settings)
    );

}


/* =========================================================
   HELPERS
   ========================================================= */

function normalizeEmail(email) {

    return String(email || "")
        .trim()
        .toLowerCase();

}


function todayKey() {

    const date = new Date();

    return [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0")
    ].join("-");

}


function ensureUserDefaults(user) {

    if (!user) return null;

    user.name ||= "Пользователь Nexgram";
    user.email ||= "";
    user.rockets ||= 0;
    user.gifts ||= [];
    user.stickers ||= [];
    user.badges ||= [];
    user.frames ||= [];
    user.nickSticker ||= "";
    user.equippedFrame ||= "";
    user.premium = Boolean(user.premium);
    user.anonymous = Boolean(user.anonymous);
    user.admin =
        normalizeEmail(user.email) ===
        normalizeEmail(ADMIN_EMAIL);

    user.stats ||= {
        tasks: 0,
        gifts: 0,
        orbit: 0
    };

    return user;

}


function getTaskState() {

    const email =
        normalizeEmail(
            currentUser?.email || "anonymous"
        );

    if (!taskState[email]) {

        taskState[email] = {};

    }

    return taskState[email];

}


function isTaskCompleted(task) {

    const state = getTaskState();

    const value = state[task.id];

    if (!value) return false;

    if (task.type === "daily") {

        return value === todayKey();

    }

    return Boolean(value);

}


function markTask(taskId) {

    const task = TASKS.find(
        item => item.id === taskId
    );

    if (!task) return;

    if (isTaskCompleted(task)) return;

    const state = getTaskState();

    state[taskId] =
        task.type === "daily"
            ? todayKey()
            : true;

    currentUser.rockets += task.reward;

    currentUser.stats.tasks++;

    saveTasks();
    saveCurrentUser();

    renderAll();

    showToast(
        `+${task.reward} 🚀 — ${task.title}`
    );

}


/* =========================================================
   SCREENS
   ========================================================= */

function showScreen(id) {

    screens.forEach(screen => {

        $(screen)?.classList.add("hidden");

    });

    $(id)?.classList.remove("hidden");

}


function openAuth() {

    showScreen("authScreen");

    $("orbitButton")?.classList.add("hidden");

}


function openApp() {

    showScreen("appScreen");

    $("orbitButton")?.classList.remove("hidden");

    showView("chatsView");

    renderAll();

}


/* =========================================================
   VIEWS
   ========================================================= */

function showView(viewId) {

    views.forEach(view => {

        $(view)?.classList.add("hidden");

    });

    $(viewId)?.classList.remove("hidden");


    document
        .querySelectorAll(".nav-item")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.view === viewId
            );

        });


    if (viewId === "premiumView") {

        markTask("premium");

    }


    if (viewId === "settingsView") {

        markTask("settings");

    }


    if (viewId === "profileView") {

        renderProfile();

    }

}


/* =========================================================
   AUTH
   ========================================================= */

$("openRegister")?.addEventListener(
    "click",
    () => showScreen("registerScreen")
);


$("openLogin")?.addEventListener(
    "click",
    () => showScreen("loginScreen")
);


document
    .querySelectorAll("[data-back-auth]")
    .forEach(button => {

        button.addEventListener(
            "click",
            openAuth
        );

    });


$("registerForm")?.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        const name =
            $("registerName").value.trim();

        const email =
            normalizeEmail(
                $("registerEmail").value
            );

        const password =
            $("registerPassword").value;

        if (name.length < 2) {

            showToast("Введи имя");

            return;

        }


        if (password.length < 6) {

            showToast(
                "Пароль должен содержать минимум 6 символов"
            );

            return;

        }


        if (users[email]) {

            showToast(
                "Такой аккаунт уже существует"
            );

            return;

        }


        currentUser =
            ensureUserDefaults({

                name,
                email,
                entered: true,
                anonymous: false,
                premium: false,
                rockets: 20,
                gifts: [],
                stickers: [],
                badges: [],
                frames: [],
                nickSticker: "",
                equippedFrame: "",

                stats: {
                    tasks: 0,
                    gifts: 0,
                    orbit: 0
                }

            });


        saveCurrentUser();

        markTask("profile");

        $("registerForm").reset();

        showScreen("notReadyScreen");

        showToast(
            "Аккаунт создан"
        );

    }
);


$("loginForm")?.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        const email =
            normalizeEmail(
                $("loginEmail").value
            );

        const user = users[email];


        if (!user) {

            showToast(
                "Аккаунт с таким email не найден"
            );

            return;

        }


        currentUser =
            ensureUserDefaults(user);

        saveCurrentUser();

        $("loginForm").reset();

        showScreen("notReadyScreen");

        showToast(
            "Вход выполнен"
        );

    }
);


$("forgotPassword")?.addEventListener(
    "click",
    () => {

        showToast(
            "В прототипе восстановление пароля ещё не подключено"
        );

    }
);


/* =========================================================
   ANONYMOUS
   ========================================================= */

$("anonymousBtn")?.addEventListener(
    "click",
    () => {

        openModal("anonymousModal");

    }
);


$("continueAnonymous")?.addEventListener(
    "click",
    () => {

        currentUser =
            ensureUserDefaults({

                name: "Аноним",
                email: "",
                entered: true,
                anonymous: true,
                premium: false,
                rockets: 0,
                gifts: [],
                stickers: [],
                badges: [],
                frames: [],
                nickSticker: "",

                stats: {
                    tasks: 0,
                    gifts: 0,
                    orbit: 0
                }

            });


        closeAllModals();

        saveCurrentUser();

        showScreen("notReadyScreen");

        showToast(
            "Анонимный режим включён"
        );

    }
);


$("continueBtn")?.addEventListener(
    "click",
    openApp
);


/* =========================================================
   NAV
   ========================================================= */

document
    .querySelectorAll(".nav-item")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                showView(
                    button.dataset.view
                );

            }
        );

    });


$("goPremiumFromChats")?.addEventListener(
    "click",
    () => showView("premiumView")
);


$("newChatBtn")?.addEventListener(
    "click",
    () => {

        showToast(
            "Чаты ещё находятся в разработке"
        );

    }
);


/* =========================================================
   PREMIUM TASKS
   ========================================================= */

function renderTasks() {

    const container =
        $("tasksList");

    if (!container) return;

    container.innerHTML = "";


    const completed =
        TASKS.filter(isTaskCompleted).length;


    $("tasksCounter").textContent =
        `${completed} выполнено`;


    TASKS.forEach(task => {

        const done =
            isTaskCompleted(task);


        let progress = 0;


        if (done) {

            progress = 100;

        } else if (
            task.id === "rockets_100"
        ) {

            progress =
                Math.min(
                    100,
                    Math.round(
                        (currentUser.rockets / 100) * 100
                    )
                );

        } else if (
            task.id === "collector"
        ) {

            const count =
                getCollectionCount();

            progress =
                Math.min(
                    100,
                    Math.round(
                        (count / 3) * 100
                    )
                );

        }


        const card =
            document.createElement("div");

        card.className =
            `task-card ${done ? "completed" : ""}`;


        card.innerHTML = `

            <div class="task-icon">
                ${task.icon}
            </div>

            <div class="task-info">

                <strong>
                    ${escapeHTML(task.title)}
                </strong>

                <p>
                    ${escapeHTML(task.description)}
                </p>

                ${
                    progress > 0 && !done
                    ? `
                        <div class="task-progress">

                            <div class="task-progress-track">

                                <div
                                    class="task-progress-fill"
                                    style="width:${progress}%"
                                ></div>

                            </div>

                        </div>
                    `
                    : ""
                }

            </div>

            ${
                done
                ? `
                    <div class="task-check">
                        ✓
                    </div>
                `
                : `
                    <div class="task-reward">
                        +${task.reward} 🚀
                    </div>
                `
            }

        `;


        if (!done) {

            card.addEventListener(
                "click",
                () => {

                    if (
                        task.id === "avatar" &&
                        !currentUser.avatar
                    ) {

                        $("avatarInput")?.click();

                        return;

                    }


                    if (
                        task.id === "collector" &&
                        getCollectionCount() < 3
                    ) {

                        showToast(
                            "Сначала собери 3 предмета"
                        );

                        return;

                    }


                    if (
                        task.id === "rockets_100" &&
                        currentUser.rockets < 100
                    ) {

                        showToast(
                            `Нужно ещё ${
                                100 - currentUser.rockets
                            } 🚀`
                        );

                        return;

                    }


                    markTask(task.id);

                }
            );

        }


        container.appendChild(card);

    });

}


/* =========================================================
   GIFTS
   ========================================================= */

function renderGifts() {

    const container =
        $("giftsGrid");

    if (!container) return;

    container.innerHTML = "";


    GIFTS.forEach(gift => {

        const card =
            document.createElement("div");

        card.className = "gift-card";


        const owned =
            currentUser.gifts
                .filter(item => item.giftId === gift.id)
                .length;


        card.innerHTML = `

            <div class="gift-icon">
                ${gift.icon}
            </div>

            <div>

                <strong>
                    ${escapeHTML(gift.name)}
                </strong>

                <span class="gift-rarity">
                    ${escapeHTML(gift.rarity)}
                </span>

            </div>

            <button
                class="gift-buy"
                ${currentUser.rockets < gift.cost ? "disabled" : ""}
            >
                🚀 ${gift.cost}
            </button>

        `;


        card
            .querySelector(".gift-buy")
            .addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    buyGift(gift);

                }
            );


        if (owned > 0) {

            const ownedText =
                document.createElement("small");

            ownedText.style.cssText = `
                position:absolute;
                top:9px;
                right:9px;
                color:#1680d5;
                font-size:8px;
                font-weight:900;
            `;

            ownedText.textContent =
                `×${owned}`;

            card.appendChild(ownedText);

        }


        container.appendChild(card);

    });

}


function buyGift(gift) {

    if (
        currentUser.rockets <
        gift.cost
    ) {

        showToast(
            "Недостаточно ракет"
        );

        return;

    }


    currentUser.rockets -=
        gift.cost;


    const reward =
        gift.rewards[
            Math.floor(
                Math.random() *
                gift.rewards.length
            )
        ];


    const rewardResult =
        applyReward(reward);


    currentUser.gifts.push({

        id:
            `${Date.now()}_${Math.random()}`,

        giftId:
            gift.id,

        giftName:
            gift.name,

        rarity:
            gift.rarity,

        reward,

        openedAt:
            new Date().toISOString()

    });


    currentUser.stats.gifts++;


    saveCurrentUser();

    renderAll();

    openGiftModal(
        gift,
        rewardResult
    );


    markTask("gift");

}


/* =========================================================
   REWARDS
   ========================================================= */

function applyReward(rewardId) {

    if (
        rewardId.startsWith("rockets_")
    ) {

        const amount =
            Number(
                rewardId.split("_")[1]
            );

        currentUser.rockets += amount;

        return {
            title: `+${amount} 🚀`,
            description:
                `Ты получил ${amount} ракет.`
        };

    }


    const sticker =
        STICKERS.find(
            item => item.id === rewardId
        );


    if (sticker) {

        if (
            currentUser.stickers
                .includes(sticker.id)
        ) {

            currentUser.rockets += 10;

            return {
                title: "Дубликат ✦",
                description:
                    "Такой стикер уже есть. Дубликат превращён в +10 🚀."
            };

        }


        currentUser.stickers.push(
            sticker.id
        );


        return {
            title:
                `${sticker.symbol} ${sticker.name}`,

            description:
                "Новый уникальный стикер для ника."
        };

    }


    const reward =
        REWARD_NAMES[rewardId];


    if (reward) {

        if (reward.type === "frame") {

            if (
                currentUser.frames
                    .includes(rewardId)
            ) {

                currentUser.rockets += 20;

                return {
                    title: "Дубликат рамки",
                    description:
                        "Дубликат превращён в +20 🚀."
                };

            }

            currentUser.frames.push(
                rewardId
            );

        }


        if (reward.type === "badge") {

            if (
                currentUser.badges
                    .includes(rewardId)
            ) {

                currentUser.rockets += 20;

                return {
                    title: "Дубликат значка",
                    description:
                        "Дубликат превращён в +20 🚀."
                };

            }

            currentUser.badges.push(
                rewardId
            );

        }


        return {
            title:
                `${reward.icon} ${reward.name}`,

            description:
                "Новый предмет добавлен в коллекцию."
        };

    }


    return {
        title: "Новый предмет",
        description:
            "Предмет добавлен в коллекцию."
    };

}


/* =========================================================
   GIFT MODAL
   ========================================================= */

function openGiftModal(
    gift,
    reward
) {

    $("giftOpening").textContent =
        gift.icon;

    $("giftRarity").textContent =
        gift.rarity;

    $("giftTitle").textContent =
        gift.name;

    $("giftDescription").textContent =
        "Подарок открыт. Твоя награда:";

    $("giftReward").textContent =
        `${reward.title} — ${reward.description}`;

    $("giftReward").classList.remove(
        "hidden"
    );

    openModal("giftModal");

}


$("giftCloseBtn")?.addEventListener(
    "click",
    () => closeModal("giftModal")
);


/* =========================================================
   COLLECTION
   ========================================================= */

function getCollectionCount() {

    return (
        currentUser.stickers.length +
        currentUser.frames.length +
        currentUser.badges.length
    );

}


function renderCollection() {

    const container =
        $("collectionList");

    if (!container) return;

    container.innerHTML = "";


    const items = [];


    currentUser.stickers
        .forEach(id => {

            const sticker =
                STICKERS.find(
                    item => item.id === id
                );

            if (sticker) {

                items.push({

                    icon:
                        sticker.symbol,

                    name:
                        sticker.name,

                    description:
                        "Стикер для ника"

                });

            }

        });


    currentUser.frames
        .forEach(id => {

            const reward =
                REWARD_NAMES[id];

            if (reward) {

                items.push({

                    icon:
                        reward.icon,

                    name:
                        reward.name,

                    description:
                        "Профильная рамка"

                });

            }

        });


    currentUser.badges
        .forEach(id => {

            const reward =
                REWARD_NAMES[id];

            if (reward) {

                items.push({

                    icon:
                        reward.icon,

                    name:
                        reward.name,

                    description:
                        "Уникальный значок"

                });

            }

        });


    if (!items.length) {

        container.innerHTML = `
            <div class="collection-item">
                <div class="collection-item-icon">
                    ✦
                </div>

                <div class="collection-item-info">
                    <strong>
                        Коллекция пока пуста
                    </strong>

                    <small>
                        Открывай подарки в Premium.
                    </small>
                </div>
            </div>
        `;

        return;

    }


    items.forEach(item => {

        const element =
            document.createElement("div");

        element.className =
            "collection-item";

        element.innerHTML = `

            <div class="collection-item-icon">
                ${item.icon}
            </div>

            <div class="collection-item-info">

                <strong>
                    ${escapeHTML(item.name)}
                </strong>

                <small>
                    ${escapeHTML(item.description)}
                </small>

            </div>

        `;

        container.appendChild(element);

    });

}


$("openCollectionBtn")?.addEventListener(
    "click",
    () => {

        renderCollection();

        openModal("collectionModal");

    }
);


/* =========================================================
   PROFILE
   ========================================================= */

function renderProfile() {

    if (!currentUser) return;


    $("profileName").textContent =
        currentUser.name;


    $("profileEmail").textContent =
        currentUser.email ||
        "Анонимный режим";


    $("profileRocketCount").textContent =
        currentUser.rockets;


    $("profileGiftCount").textContent =
        currentUser.gifts.length;


    $("profileTaskCount").textContent =
        currentUser.stats.tasks;


    $("profileOrbitCount").textContent =
        currentUser.stats.orbit;


    const premiumVisible =
        currentUser.premium &&
        settings.showPremium;


    $("profilePremium")
        .classList.toggle(
            "hidden",
            !premiumVisible
        );


    const sticker =
        STICKERS.find(
            item =>
                item.id ===
                currentUser.nickSticker
        );


    $("profileNickSticker").textContent =
        sticker
            ? sticker.name
            : "";


    const avatar =
        $("profileAvatar");


    if (currentUser.avatar) {

        avatar.innerHTML = `
            <img
                src="${currentUser.avatar}"
                alt=""
            >
        `;

    } else {

        avatar.textContent =
            (
                currentUser.name ||
                "N"
            )
                .trim()
                .charAt(0)
                .toUpperCase();

    }


    renderStatusCard();
    renderStickers();

}


function renderStatusCard() {

    const container =
        $("profileStatusCard");

    if (!container) return;


    if (currentUser.premium) {

        container.innerHTML = `

            <div class="status-premium">

                <div class="status-icon">
                    ✓
                </div>

                <div>

                    <strong>
                        Nexgram Premium
                    </strong>

                    <small>
                        Premium выдан разработчиком.
                    </small>

                </div>

            </div>

        `;

        return;

    }


    container.innerHTML = `

        <div class="status-premium">

            <div class="status-icon">
                🚀
            </div>

            <div>

                <strong>
                    Обычный аккаунт
                </strong>

                <small>
                    Выполняй задания и собирай ракеты.
                </small>

            </div>

        </div>

    `;

}


function renderStickers() {

    const container =
        $("nickStickerList");

    if (!container) return;

    container.innerHTML = "";


    if (!currentUser.stickers.length) {

        container.innerHTML = `
            <div class="collection-item">
                <div class="collection-item-info">
                    <strong>
                        Уникальных стикеров пока нет
                    </strong>
                    <small>
                        Они выпадают из Premium-подарков.
                    </small>
                </div>
            </div>
        `;

        return;

    }


    currentUser.stickers
        .forEach(id => {

            const sticker =
                STICKERS.find(
                    item => item.id === id
                );

            if (!sticker) return;


            const button =
                document.createElement("button");

            button.className =
                "sticker-item";


            if (
                currentUser.nickSticker ===
                sticker.id
            ) {

                button.classList.add(
                    "active"
                );

            }


            button.textContent =
                sticker.name;


            button.addEventListener(
                "click",
                () => {

                    currentUser.nickSticker =
                        currentUser.nickSticker ===
                        sticker.id
                            ? ""
                            : sticker.id;

                    saveCurrentUser();

                    renderProfile();

                    showToast(
                        currentUser.nickSticker
                            ? "Стикер установлен"
                            : "Стикер снят"
                    );

                }
            );


            container.appendChild(button);

        });

}


/* =========================================================
   AVATAR
   ========================================================= */

$("avatarInput")?.addEventListener(
    "change",
    event => {

        const file =
            event.target.files?.[0];

        if (!file) return;


        if (
            !file.type.startsWith("image/")
        ) {

            showToast(
                "Выбери изображение"
            );

            return;

        }


        const reader =
            new FileReader();


        reader.onload = () => {

            currentUser.avatar =
                reader.result;

            saveCurrentUser();

            markTask("avatar");

            renderProfile();

            showToast(
                "Аватар обновлён"
            );

        };


        reader.readAsDataURL(file);

    }
);


/* =========================================================
   EDIT PROFILE
   ========================================================= */

$("editProfileBtn")?.addEventListener(
    "click",
    () => {

        $("editNameInput").value =
            currentUser.name;

        openModal(
            "editProfileModal"
        );

    }
);


$("saveProfileBtn")?.addEventListener(
    "click",
    () => {

        const name =
            $("editNameInput")
                .value
                .trim();


        if (name.length < 2) {

            showToast("Слишком короткое имя");

            return;

        }


        currentUser.name =
            name;

        saveCurrentUser();

        closeModal(
            "editProfileModal"
        );

        renderProfile();

        showToast(
            "Профиль сохранён"
        );

    }
);


/* =========================================================
   SETTINGS
   ========================================================= */

function initSettings() {

    $("animationsSetting").checked =
        settings.animations;

    $("soundsSetting").checked =
        settings.sounds;

    $("notificationsSetting").checked =
        settings.notifications;

    $("showPremiumSetting").checked =
        settings.showPremium;


    document
        .querySelectorAll(
            "[data-font]"
        )
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.font ===
                settings.fontSize
            );

        });


    applySettings();

}


function applySettings() {

    document.body.classList.toggle(
        "no-animations",
        !settings.animations
    );


    document.body.dataset.fontSize =
        settings.fontSize;

}


$("animationsSetting")?.addEventListener(
    "change",
    event => {

        settings.animations =
            event.target.checked;

        saveSettings();
        applySettings();

    }
);


$("soundsSetting")?.addEventListener(
    "change",
    event => {

        settings.sounds =
            event.target.checked;

        saveSettings();

    }
);


$("notificationsSetting")?.addEventListener(
    "change",
    event => {

        settings.notifications =
            event.target.checked;

        saveSettings();

    }
);


$("showPremiumSetting")?.addEventListener(
    "change",
    event => {

        settings.showPremium =
            event.target.checked;

        saveSettings();

        renderProfile();

    }
);


document
    .querySelectorAll(
        "[data-font]"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                settings.fontSize =
                    button.dataset.font;

                saveSettings();

                initSettings();

            }
        );

    });


$("logoutBtn")?.addEventListener(
    "click",
    () => {

        currentUser = null;

        localStorage.removeItem(
            USER_KEY
        );

        openAuth();

        showToast(
            "Вы вышли из аккаунта"
        );

    }
);


/* =========================================================
   ADMIN
   ========================================================= */

function checkAdmin() {

    if (!currentUser) return false;

    return (
        normalizeEmail(
            currentUser.email
        ) ===
        normalizeEmail(
            ADMIN_EMAIL
        )
    );

}


function renderAdminButton() {

    const button =
        $("adminPanelBtn");

    if (!button) return;

    button.classList.toggle(
        "hidden",
        !checkAdmin()
    );

}


$("adminPanelBtn")?.addEventListener(
    "click",
    () => {

        if (!checkAdmin()) {

            showToast(
                "Доступ запрещён"
            );

            return;

        }

        renderAdminUsers();

        openModal(
            "adminModal"
        );

    }
);


function getAdminTarget() {

    const email =
        normalizeEmail(
            $("adminTargetEmail").value
        );


    if (!email) {

        showToast(
            "Укажи email пользователя"
        );

        return null;

    }


    if (!users[email]) {

        showToast(
            "Пользователь не найден локально"
        );

        return null;

    }


    return users[email];

}


function updateAdminTarget(callback) {

    const target =
        getAdminTarget();

    if (!target) return;


    callback(target);


    ensureUserDefaults(target);


    users[
        normalizeEmail(target.email)
    ] = target;


    if (
        normalizeEmail(
            currentUser.email
        ) ===
        normalizeEmail(
            target.email
        )
    ) {

        currentUser =
            target;

        saveCurrentUser();

    } else {

        localStorage.setItem(
            USERS_KEY,
            JSON.stringify(users)
        );

    }


    renderAdminUsers();
    renderAll();

    showToast(
        "Изменения применены"
    );

}


$("adminPremiumBtn")?.addEventListener(
    "click",
    () => {

        updateAdminTarget(
            target => {

                target.premium = true;

            }
        );

    }
);


$("adminRemovePremiumBtn")?.addEventListener(
    "click",
    () => {

        updateAdminTarget(
            target => {

                target.premium = false;

            }
        );

    }
);


$("adminRocketsBtn")?.addEventListener(
    "click",
    () => {

        updateAdminTarget(
            target => {

                target.rockets =
                    (target.rockets || 0) +
                    100;

            }
        );

    }
);


$("adminGiftBtn")?.addEventListener(
    "click",
    () => {

        updateAdminTarget(
            target => {

                const gift =
                    GIFTS[
                        Math.floor(
                            Math.random() *
                            GIFTS.length
                        )
                    ];


                target.gifts ||= [];


                target.gifts.push({

                    id:
                        `${Date.now()}_${Math.random()}`,

                    giftId:
                        gift.id,

                    giftName:
                        gift.name,

                    rarity:
                        gift.rarity,

                    reward:
                        gift.rewards[0],

                    openedAt:
                        new Date().toISOString()

                });


                target.stats ||= {
                    tasks: 0,
                    gifts: 0,
                    orbit: 0
                };


                target.stats.gifts++;

            }
        );

    }
);


$("adminStickerBtn")?.addEventListener(
    "click",
    () => {

        updateAdminTarget(
            target => {

                target.stickers ||= [];


                const available =
                    STICKERS.filter(
                        sticker =>
                            !target.stickers
                                .includes(
                                    sticker.id
                                )
                    );


                if (!available.length) {

                    showToast(
                        "У пользователя уже есть все стикеры"
                    );

                    return;

                }


                const sticker =
                    available[
                        Math.floor(
                            Math.random() *
                            available.length
                        )
                    ];


                target.stickers.push(
                    sticker.id
                );

            }
        );

    }
);


function renderAdminUsers() {

    const container =
        $("adminUsersList");

    if (!container) return;

    container.innerHTML = "";


    const list =
        Object.values(users);


    if (!list.length) {

        container.innerHTML = `
            <div class="admin-user">
                <div class="admin-user-info">
                    <strong>
                        Пользователей пока нет
                    </strong>
                </div>
            </div>
        `;

        return;

    }


    list.forEach(user => {

        const item =
            document.createElement("div");

        item.className =
            "admin-user";


        item.innerHTML = `

            <div class="admin-user-avatar">
                ${
                    (
                        user.name ||
                        "N"
                    )
                        .charAt(0)
                        .toUpperCase()
                }
            </div>

            <div class="admin-user-info">

                <strong>
                    ${escapeHTML(
                        user.name ||
                        "Пользователь"
                    )}
                    ${
                        user.premium
                            ? " ✓"
                            : ""
                    }
                </strong>

                <small>
                    ${escapeHTML(
                        user.email ||
                        "Аноним"
                    )}
                    ·
                    🚀 ${user.rockets || 0}
                </small>

            </div>

        `;


        item.addEventListener(
            "click",
            () => {

                $("adminTargetEmail").value =
                    user.email;

            }
        );


        container.appendChild(item);

    });

}


/* =========================================================
   ORBIT
   ========================================================= */

$("orbitButton")?.addEventListener(
    "click",
    () => {

        openModal(
            "orbitModal"
        );

    }
);


document
    .querySelectorAll(
        "[data-orbit]"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                routeOrbit(
                    button.dataset.orbit
                );

            }
        );

    });


function routeOrbit(command) {

    closeModal(
        "orbitModal"
    );


    currentUser.stats.orbit++;

    saveCurrentUser();


    if (
        command === "tasks" ||
        command === "premium"
    ) {

        showView("premiumView");

        setTimeout(
            () => {

                if (command === "tasks") {

                    $("tasksList")
                        ?.scrollIntoView({
                            behavior: "smooth"
                        });

                } else {

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                }

            },
            100
        );

        markTask("orbit");

        return;

    }


    if (command === "gifts") {

        showView("premiumView");

        setTimeout(
            () => {

                $("giftsGrid")
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });

            },
            100
        );

        markTask("orbit");

        return;

    }


    if (command === "profile") {

        showView("profileView");

        markTask("orbit");

        return;

    }


    if (command === "settings") {

        showView("settingsView");

        markTask("orbit");

        return;

    }


    showView("chatsView");

}


$("orbitSearchBtn")?.addEventListener(
    "click",
    searchOrbit
);


$("orbitInput")?.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            searchOrbit();

        }

    }
);


function searchOrbit() {

    const text =
        $("orbitInput")
            .value
            .trim()
            .toLowerCase();


    if (!text) {

        showToast(
            "Напиши, куда тебя отправить"
        );

        return;

    }


    if (
        text.includes("прем") ||
        text.includes("ракет")
    ) {

        routeOrbit("premium");

    } else if (
        text.includes("подар")
    ) {

        routeOrbit("gifts");

    } else if (
        text.includes("задан")
    ) {

        routeOrbit("tasks");

    } else if (
        text.includes("проф")
    ) {

        routeOrbit("profile");

    } else if (
        text.includes("настр")
    ) {

        routeOrbit("settings");

    } else if (
        text.includes("чат")
    ) {

        routeOrbit("chats");

    } else {

        showToast(
            "Orbit пока не знает этот маршрут"
        );

    }

}


/* =========================================================
   ORBIT PROGRESS
   ========================================================= */

function renderOrbitProgress() {

    const total =
        TASKS.length;

    const completed =
        TASKS.filter(
            isTaskCompleted
        ).length;


    const percent =
        total
            ? Math.round(
                (completed / total) *
                100
            )
            : 0;


    if ($("orbitProgressText")) {

        $("orbitProgressText")
            .textContent =
            `${percent}%`;

    }


    if ($("orbitProgressBar")) {

        $("orbitProgressBar")
            .style.width =
            `${percent}%`;

    }

}


/* =========================================================
   MODALS
   ========================================================= */

function openModal(id) {

    $(id)?.classList.remove(
        "hidden"
    );

}


function closeModal(id) {

    $(id)?.classList.add(
        "hidden"
    );

}


function closeAllModals() {

    document
        .querySelectorAll(".modal-overlay")
        .forEach(modal => {

            modal.classList.add(
                "hidden"
            );

        });

}


document
    .querySelectorAll(
        "[data-close-modal]"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            closeAllModals
        );

    });


document
    .querySelectorAll(".modal-overlay")
    .forEach(overlay => {

        overlay.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    overlay
                ) {

                    overlay.classList.add(
                        "hidden"
                    );

                }

            }
        );

    });


document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeAllModals();

        }

    }
);


/* =========================================================
   PWA
   ========================================================= */

$("installBtn")?.addEventListener(
    "click",
    async () => {

        if (!deferredInstallPrompt) {

            showToast(
                "Если приложение уже установлено, эта кнопка недоступна"
            );

            return;

        }


        deferredInstallPrompt.prompt();


        const result =
            await deferredInstallPrompt.userChoice;


        if (
            result.outcome === "accepted"
        ) {

            showToast(
                "Установка запущена"
            );

        }


        deferredInstallPrompt = null;

        $("installBtn").classList.add(
            "hidden"
        );

    }
);


window.addEventListener(
    "beforeinstallprompt",
    event => {

        event.preventDefault();

        deferredInstallPrompt =
            event;

        $("installBtn")
            ?.classList.remove(
                "hidden"
            );

    }
);


window.addEventListener(
    "appinstalled",
    () => {

        deferredInstallPrompt =
            null;

        $("installBtn")
            ?.classList.add(
                "hidden"
            );

    }
);


if ("serviceWorker" in navigator) {

    window.addEventListener(
        "load",
        () => {

            navigator.serviceWorker
                .register(
                    "./sw.js?v=8"
                )
                .catch(
                    error =>
                        console.warn(
                            "Service worker:",
                            error
                        )
                );

        }
    );

}


/* =========================================================
   RENDER
   ========================================================= */

function renderPremiumStats() {

    $("topRocketBalance")
        ?.querySelector("span")
        && (
            $("topRocketBalance")
                .querySelector("span")
                .textContent =
                currentUser.rockets
        );


    $("premiumRocketCount").textContent =
        currentUser.rockets;


    $("premiumGiftCount").textContent =
        currentUser.gifts.length;


    $("premiumTaskCount").textContent =
        currentUser.stats.tasks;


    $("profileRocketCount").textContent =
        currentUser.rockets;

}


function renderAll() {

    if (!currentUser) return;


    ensureUserDefaults(
        currentUser
    );


    renderPremiumStats();

    renderTasks();

    renderGifts();

    renderProfile();

    renderOrbitProgress();

    renderAdminButton();

    initSettings();

}


function escapeHTML(value) {

    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =========================================================
   TOAST
   ========================================================= */

let toastTimer = null;


function showToast(message) {

    const toast =
        $("toast");

    if (!toast) return;


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2600
        );

}


/* =========================================================
   STARTUP
   ========================================================= */

loadStorage();


currentUser =
    ensureUserDefaults(
        currentUser
    );


if (currentUser?.entered) {

    saveCurrentUser();

    openApp();

} else {

    openAuth();

}


if (currentUser) {

    markTask("daily_open");

}


$("brandBtn")?.addEventListener(
    "click",
    () => {

        if (currentUser) {

            showView("chatsView");

        } else {

            openAuth();

        }

    }
);


/* Developer shortcut:
   Ctrl + Shift + A opens admin only for ADMIN_EMAIL.
*/

document.addEventListener(
    "keydown",
    event => {

        if (
            event.ctrlKey &&
            event.shiftKey &&
            event.key.toLowerCase() === "a"
        ) {

            if (checkAdmin()) {

                renderAdminUsers();

                openModal(
                    "adminModal"
                );

            }

        }

    }
);