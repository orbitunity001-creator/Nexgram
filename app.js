const API_URL = "https://nexgram-api.onrender.com";

const TOKEN_KEY = "nex_token";
const USER_KEY = "nex_user";

const DEFAULT_LANGUAGE = "ru";
const DEFAULT_THEME = "system";
const DEFAULT_ACCENT = "blue";



/* ========================= */
/* TRANSLATIONS */
/* ========================= */

const translations = {

    ru: {

        welcome: "Общение. По-новому.",

        authDescription:
            "Современный мессенджер для общения, классов и школьного сообщества.",

        password: "Пароль",

        login: "Войти",

        createAccount: "Создать аккаунт",

        anonymous: "Зайти анонимно",

        nickname: "Никнейм",

        nicknameHint:
            "Если оставить пустым, будет использовано имя «Аноним».",

        repeatPassword: "Повторите пароль",

        register: "Зарегистрироваться",

        backToLogin: "Уже есть аккаунт",

        messenger: "MESSENGER",

        chats: "Чаты",

        settings: "Настройки",

        personalization: "PERSONALIZATION",

        search: "Поиск",

        welcomeToNex:
            "Добро пожаловать в NEX",

        welcomeToNexText:
            "Здесь появятся ваши личные, классные и школьные чаты.",

        noChats:
            "Пока нет чатов",

        noChatsText:
            "Начните общение, когда функция чатов будет подключена.",

        account: "Аккаунт",

        appearance: "Внешний вид",

        theme: "Тема",

        themeDescription:
            "Выберите оформление NEX",

        system: "Системная",

        light: "Светлая",

        dark: "Тёмная",

        accent: "Цвет интерфейса",

        language: "Язык",

        notifications: "Уведомления",

        notificationsDescription:
            "Настройка уведомлений NEX",

        security: "Безопасность",

        securityDescription:
            "Защита аккаунта и данных",

        privacy: "Конфиденциальность",

        privacyDescription:
            "Кто может взаимодействовать с вами",

        about: "О NEX",

        version: "Версия",

        aboutTitle:
            "Что такое NEX?",

        aboutText:
            "NEX — современный школьный мессенджер, созданный для удобного общения между учениками, учителями и школьным сообществом. Наша цель — объединить общение, учебные процессы и школьную жизнь в одном понятном и быстром приложении.",

        missionTitle:
            "Для чего создан NEX?",

        missionText:
            "NEX создан для того, чтобы школьное общение стало проще, безопаснее и современнее. Здесь могут существовать личные сообщения, группы классов, предметные чаты, школьные объявления, файлы, расписание, домашние задания и другие инструменты, которые помогают ученикам и учителям каждый день.",

        principlesTitle:
            "Принципы NEX",

        principlesText:
            "NEX строится вокруг скорости, удобства, безопасности и уважительного общения. Мы хотим создавать продукт, которым приятно пользоваться каждый день, независимо от устройства и выбранного языка.",

        futureTitle:
            "Что дальше?",

        futureText:
            "В будущем NEX может получить полноценные личные и групповые чаты, голосовые сообщения, отправку файлов, школьные каналы, роли учеников и учителей, систему модерации, расписание, домашние задания, уведомления, NEX Orbit, награды, Premium-возможности и многое другое.",

        madeForCommunication:
            "Создан для общения.",

        logout:
            "Выйти из аккаунта",

        footerText:
            "Современный школьный мессенджер для общения, учёбы и школьной жизни."
    },


    en: {

        welcome: "Communication. Reimagined.",

        authDescription:
            "A modern messenger for communication, classes and the school community.",

        password: "Password",

        login: "Log in",

        createAccount: "Create account",

        anonymous: "Continue anonymously",

        nickname: "Nickname",

        nicknameHint:
            "Leave blank to use the name “Anonymous”.",

        repeatPassword: "Repeat password",

        register: "Create account",

        backToLogin: "Already have an account",

        messenger: "MESSENGER",

        chats: "Chats",

        settings: "Settings",

        personalization: "PERSONALIZATION",

        search: "Search",

        welcomeToNex:
            "Welcome to NEX",

        welcomeToNexText:
            "Your personal, class and school chats will appear here.",

        noChats:
            "No chats yet",

        noChatsText:
            "Start communicating when chat functionality is connected.",

        account: "Account",

        appearance: "Appearance",

        theme: "Theme",

        themeDescription:
            "Choose your NEX appearance",

        system: "System",

        light: "Light",

        dark: "Dark",

        accent: "Interface color",

        language: "Language",

        notifications: "Notifications",

        notificationsDescription:
            "Configure NEX notifications",

        security: "Security",

        securityDescription:
            "Protect your account and data",

        privacy: "Privacy",

        privacyDescription:
            "Control who can interact with you",

        about: "About NEX",

        version: "Version",

        aboutTitle:
            "What is NEX?",

        aboutText:
            "NEX is a modern school messenger designed for convenient communication between students, teachers and the school community. Our goal is to bring communication, learning processes and school life together in one simple and fast application.",

        missionTitle:
            "Why was NEX created?",

        missionText:
            "NEX was created to make school communication simpler, safer and more modern. It can bring together personal messages, class groups, subject chats, school announcements, files, schedules, homework and other tools that help students and teachers every day.",

        principlesTitle:
            "NEX principles",

        principlesText:
            "NEX is built around speed, convenience, safety and respectful communication. We want to create a product that feels comfortable to use every day, regardless of the device or selected language.",

        futureTitle:
            "What's next?",

        futureText:
            "In the future, NEX may receive full personal and group chats, voice messages, file sharing, school channels, student and teacher roles, moderation tools, schedules, homework, notifications, NEX Orbit, rewards, Premium features and much more.",

        madeForCommunication:
            "Made for communication.",

        logout:
            "Log out",

        footerText:
            "A modern school messenger for communication, learning and school life."
    },


    de: {

        welcome: "Kommunikation. Neu gedacht.",

        authDescription:
            "Ein moderner Messenger für Kommunikation, Klassen und die Schulgemeinschaft.",

        password: "Passwort",

        login: "Anmelden",

        createAccount: "Konto erstellen",

        anonymous: "Anonym fortfahren",

        nickname: "Spitzname",

        nicknameHint:
            "Leer lassen, um den Namen „Anonym“ zu verwenden.",

        repeatPassword: "Passwort wiederholen",

        register: "Konto erstellen",

        backToLogin: "Ich habe bereits ein Konto",

        messenger: "MESSENGER",

        chats: "Chats",

        settings: "Einstellungen",

        personalization: "PERSONALISIERUNG",

        search: "Suche",

        welcomeToNex: "Willkommen bei NEX",

        welcomeToNexText:
            "Hier erscheinen deine persönlichen, Klassen- und Schulchats.",

        noChats: "Noch keine Chats",

        noChatsText:
            "Die Chats werden hier angezeigt, sobald die Funktion verfügbar ist.",

        account: "Konto",

        appearance: "Darstellung",

        theme: "Design",

        themeDescription:
            "Wähle das Erscheinungsbild von NEX",

        system: "System",

        light: "Hell",

        dark: "Dunkel",

        accent: "Interface-Farbe",

        language: "Sprache",

        notifications: "Benachrichtigungen",

        notificationsDescription:
            "NEX-Benachrichtigungen konfigurieren",

        security: "Sicherheit",

        securityDescription:
            "Schutz deines Kontos und deiner Daten",

        privacy: "Datenschutz",

        privacyDescription:
            "Wer mit dir interagieren kann",

        about: "Über NEX",

        version: "Version",

        aboutTitle: "Was ist NEX?",

        aboutText:
            "NEX ist ein moderner Schul-Messenger für die Kommunikation zwischen Schülern, Lehrern und der Schulgemeinschaft.",

        missionTitle: "Warum wurde NEX entwickelt?",

        missionText:
            "NEX soll die Kommunikation in der Schule einfacher, sicherer und moderner machen.",

        principlesTitle: "NEX-Prinzipien",

        principlesText:
            "NEX steht für Geschwindigkeit, Komfort, Sicherheit und respektvolle Kommunikation.",

        futureTitle: "Was kommt als Nächstes?",

        futureText:
            "In Zukunft kann NEX persönliche und Gruppenchats, Sprachnachrichten, Dateien, Schulkanäle, Rollen, Moderation, Stundenpläne, Hausaufgaben, Benachrichtigungen, NEX Orbit und Premium-Funktionen erhalten.",

        madeForCommunication:
            "Für Kommunikation entwickelt.",

        logout: "Abmelden",

        footerText:
            "Moderner Schul-Messenger für Kommunikation, Lernen und Schulleben."
    },


    fr: {

        welcome: "La communication. Réinventée.",

        authDescription:
            "Une messagerie moderne pour la communication, les classes et la communauté scolaire.",

        password: "Mot de passe",

        login: "Se connecter",

        createAccount: "Créer un compte",

        anonymous: "Continuer anonymement",

        nickname: "Pseudo",

        nicknameHint:
            "Laissez vide pour utiliser le nom « Anonyme ».",

        repeatPassword: "Répéter le mot de passe",

        register: "Créer un compte",

        backToLogin: "J’ai déjà un compte",

        messenger: "MESSAGERIE",

        chats: "Discussions",

        settings: "Paramètres",

        personalization: "PERSONNALISATION",

        search: "Rechercher",

        welcomeToNex: "Bienvenue sur NEX",

        welcomeToNexText:
            "Vos discussions personnelles, de classe et scolaires apparaîtront ici.",

        noChats: "Aucune discussion",

        noChatsText:
            "Les discussions apparaîtront ici lorsque la fonction sera disponible.",

        account: "Compte",

        appearance: "Apparence",

        theme: "Thème",

        themeDescription:
            "Choisissez l’apparence de NEX",

        system: "Système",

        light: "Clair",

        dark: "Sombre",

        accent: "Couleur de l’interface",

        language: "Langue",

        notifications: "Notifications",

        notificationsDescription:
            "Configurer les notifications NEX",

        security: "Sécurité",

        securityDescription:
            "Protéger votre compte et vos données",

        privacy: "Confidentialité",

        privacyDescription:
            "Contrôler qui peut interagir avec vous",

        about: "À propos de NEX",

        version: "Version",

        aboutTitle: "Qu’est-ce que NEX ?",

        aboutText:
            "NEX est une messagerie scolaire moderne conçue pour faciliter la communication entre les élèves, les enseignants et la communauté scolaire.",

        missionTitle: "Pourquoi NEX a-t-il été créé ?",

        missionText:
            "NEX a été créé pour rendre la communication scolaire plus simple, plus sûre et plus moderne.",

        principlesTitle: "Principes de NEX",

        principlesText:
            "NEX repose sur la rapidité, la simplicité, la sécurité et une communication respectueuse.",

        futureTitle: "Et ensuite ?",

        futureText:
            "À l’avenir, NEX pourra proposer des discussions privées et de groupe, des messages vocaux, des fichiers, des canaux scolaires, des rôles, de la modération, des emplois du temps, des devoirs, des notifications, NEX Orbit et des fonctions Premium.",

        madeForCommunication:
            "Créé pour communiquer.",

        logout: "Se déconnecter",

        footerText:
            "Une messagerie scolaire moderne pour communiquer, apprendre et vivre la vie scolaire."
    },


    es: {

        welcome: "Comunicación. De una nueva manera.",

        authDescription:
            "Un mensajero moderno para la comunicación, las clases y la comunidad escolar.",

        password: "Contraseña",

        login: "Iniciar sesión",

        createAccount: "Crear cuenta",

        anonymous: "Continuar anónimamente",

        nickname: "Apodo",

        nicknameHint:
            "Déjalo vacío para usar el nombre «Anónimo».",

        repeatPassword: "Repetir contraseña",

        register: "Crear cuenta",

        backToLogin: "Ya tengo una cuenta",

        messenger: "MENSAJERÍA",

        chats: "Chats",

        settings: "Ajustes",

        personalization: "PERSONALIZACIÓN",

        search: "Buscar",

        welcomeToNex: "Bienvenido a NEX",

        welcomeToNexText:
            "Aquí aparecerán tus chats personales, de clase y escolares.",

        noChats: "Aún no hay chats",

        noChatsText:
            "Los chats aparecerán aquí cuando la función esté disponible.",

        account: "Cuenta",

        appearance: "Apariencia",

        theme: "Tema",

        themeDescription:
            "Elige el aspecto de NEX",

        system: "Sistema",

        light: "Claro",

        dark: "Oscuro",

        accent: "Color de interfaz",

        language: "Idioma",

        notifications: "Notificaciones",

        notificationsDescription:
            "Configura las notificaciones de NEX",

        security: "Seguridad",

        securityDescription:
            "Protege tu cuenta y tus datos",

        privacy: "Privacidad",

        privacyDescription:
            "Controla quién puede interactuar contigo",

        about: "Acerca de NEX",

        version: "Versión",

        aboutTitle: "¿Qué es NEX?",

        aboutText:
            "NEX es un mensajero escolar moderno creado para facilitar la comunicación entre estudiantes, profesores y la comunidad escolar.",

        missionTitle: "¿Para qué se creó NEX?",

        missionText:
            "NEX fue creado para hacer la comunicación escolar más sencilla, segura y moderna.",

        principlesTitle: "Principios de NEX",

        principlesText:
            "NEX se basa en la velocidad, la comodidad, la seguridad y una comunicación respetuosa.",

        futureTitle: "¿Qué viene después?",

        futureText:
            "En el futuro, NEX puede incluir chats privados y grupales, mensajes de voz, archivos, canales escolares, roles, moderación, horarios, tareas, notificaciones, NEX Orbit y funciones Premium.",

        madeForCommunication:
            "Creado para comunicarse.",

        logout: "Cerrar sesión",

        footerText:
            "Un mensajero escolar moderno para comunicarse, aprender y vivir la vida escolar."
    },


    uk: {

        welcome: "Спілкування. По-новому.",

        authDescription:
            "Сучасний месенджер для спілкування, класів і шкільної спільноти.",

        password: "Пароль",

        login: "Увійти",

        createAccount: "Створити акаунт",

        anonymous: "Увійти анонімно",

        nickname: "Нікнейм",

        nicknameHint:
            "Якщо залишити порожнім, буде використано ім’я «Анонім».",

        repeatPassword: "Повторіть пароль",

        register: "Зареєструватися",

        backToLogin: "Вже є акаунт",

        messenger: "МЕСЕНДЖЕР",

        chats: "Чати",

        settings: "Налаштування",

        personalization: "ПЕРСОНАЛІЗАЦІЯ",

        search: "Пошук",

        welcomeToNex: "Ласкаво просимо до NEX",

        welcomeToNexText:
            "Тут з’являться ваші особисті, класні та шкільні чати.",

        noChats: "Поки немає чатів",

        noChatsText:
            "Чати з’являться тут після підключення функції.",

        account: "Акаунт",

        appearance: "Вигляд",

        theme: "Тема",

        themeDescription:
            "Оберіть оформлення NEX",

        system: "Системна",

        light: "Світла",

        dark: "Темна",

        accent: "Колір інтерфейсу",

        language: "Мова",

        notifications: "Сповіщення",

        notificationsDescription:
            "Налаштування сповіщень NEX",

        security: "Безпека",

        securityDescription:
            "Захист акаунта та даних",

        privacy: "Конфіденційність",

        privacyDescription:
            "Хто може взаємодіяти з вами",

        about: "Про NEX",

        version: "Версія",

        aboutTitle: "Що таке NEX?",

        aboutText:
            "NEX — сучасний шкільний месенджер, створений для зручного спілкування між учнями, вчителями та шкільною спільнотою.",

        missionTitle: "Для чого створено NEX?",

        missionText:
            "NEX створено для того, щоб шкільне спілкування стало простішим, безпечнішим і сучаснішим.",

        principlesTitle: "Принципи NEX",

        principlesText:
            "NEX побудований навколо швидкості, зручності, безпеки та поважного спілкування.",

        futureTitle: "Що далі?",

        futureText:
            "У майбутньому NEX може отримати особисті та групові чати, голосові повідомлення, файли, шкільні канали, ролі, модерацію, розклад, домашні завдання, сповіщення, NEX Orbit та Premium-функції.",

        madeForCommunication:
            "Створено для спілкування.",

        logout: "Вийти з акаунта",

        footerText:
            "Сучасний шкільний месенджер для спілкування, навчання та шкільного життя."
    }

};



/* ========================= */
/* DOM */
/* ========================= */

const authScreen =
    document.getElementById("authScreen");

const appScreen =
    document.getElementById("appScreen");

const loginForm =
    document.getElementById("loginForm");

const registerForm =
    document.getElementById("registerForm");

const showRegister =
    document.getElementById("showRegister");

const backToLogin =
    document.getElementById("backToLogin");

const anonymousBtn =
    document.getElementById("anonymousBtn");

const authMessage =
    document.getElementById("authMessage");

const logoutBtn =
    document.getElementById("logoutBtn");



/* ========================= */
/* SETTINGS STATE */
/* ========================= */

let currentLanguage =
    localStorage.getItem("nex_language")
    || DEFAULT_LANGUAGE;

let currentTheme =
    localStorage.getItem("nex_theme")
    || DEFAULT_THEME;

let currentAccent =
    localStorage.getItem("nex_accent")
    || DEFAULT_ACCENT;



/* ========================= */
/* TRANSLATION */
/* ========================= */

function t(key) {

    const language =
        translations[currentLanguage]
        || translations[DEFAULT_LANGUAGE];

    return language[key]
        || translations[DEFAULT_LANGUAGE][key]
        || key;
}


function applyLanguage() {

    document.documentElement.lang =
        currentLanguage;

    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key =
                element.dataset.i18n;

            element.textContent =
                t(key);

        });


    document
        .querySelectorAll("[data-i18n-placeholder]")
        .forEach(element => {

            const key =
                element.dataset.i18nPlaceholder;

            element.placeholder =
                t(key);

        });


    updateLanguageButtons();
}


function updateLanguageButtons() {

    document
        .querySelectorAll(".language-btn")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.language === currentLanguage
            );

        });
}



/* ========================= */
/* THEME */
/* ========================= */

function applyTheme() {

    document.body.classList.remove("dark");

    if (currentTheme === "dark") {

        document.body.classList.add("dark");

    }

    if (currentTheme === "system") {

        const dark =
            window.matchMedia &&
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;

        if (dark) {
            document.body.classList.add("dark");
        }
    }


    document
        .querySelectorAll("[data-theme]")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.theme === currentTheme
            );

        });
}


function applyAccent() {

    document.body.classList.remove(
        "accent-purple",
        "accent-green",
        "accent-orange",
        "accent-pink"
    );


    if (currentAccent !== "blue") {

        document.body.classList.add(
            `accent-${currentAccent}`
        );

    }


    document
        .querySelectorAll("[data-accent]")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.accent === currentAccent
            );

        });
}



/* ========================= */
/* USER */
/* ========================= */

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


function clearSession() {

    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

}



/* ========================= */
/* UI */
/* ========================= */

function showAuth() {

    authScreen.classList.remove("hidden");
    appScreen.classList.add("hidden");

}


function showApp() {

    authScreen.classList.add("hidden");
    appScreen.classList.remove("hidden");

    openPage("chats");

    updateProfile();

}


function setMessage(message) {

    authMessage.textContent =
        message || "";

}



/* ========================= */
/* PROFILE */
/* ========================= */

function updateProfile() {

    const user =
        getUser();

    if (!user) return;


    const name =
        user.nickname
        || user.name
        || "Аноним";


    const nexId =
        user.nexId
        || user.nex_id
        || "NEX";


    document.getElementById(
        "profileName"
    ).textContent = name;


    document.getElementById(
        "profileId"
    ).textContent = nexId;


    document.getElementById(
        "profileAvatar"
    ).textContent =
        name
            .trim()
            .charAt(0)
            .toUpperCase()
            || "A";

}



/* ========================= */
/* AUTH FORMS */
/* ========================= */

showRegister.addEventListener(
    "click",
    () => {

        loginForm.classList.add("hidden");
        registerForm.classList.remove("hidden");

        setMessage("");

    }
);


backToLogin.addEventListener(
    "click",
    () => {

        registerForm.classList.add("hidden");
        loginForm.classList.remove("hidden");

        setMessage("");

    }
);



/* ========================= */
/* REGISTER */
/* ========================= */

registerForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();

        setMessage("");


        const nickname =
            document
                .getElementById("registerNickname")
                .value
                .trim();


        const password =
            document
                .getElementById("registerPassword")
                .value;


        const repeatPassword =
            document
                .getElementById("registerPasswordRepeat")
                .value;


        if (password.length < 6) {

            setMessage(
                currentLanguage === "ru"
                    ? "Пароль должен содержать минимум 6 символов."
                    : "Password must contain at least 6 characters."
            );

            return;
        }


        if (password !== repeatPassword) {

            setMessage(
                currentLanguage === "ru"
                    ? "Пароли не совпадают."
                    : "Passwords do not match."
            );

            return;
        }


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
                    data.message
                    || "Registration failed"
                );

            }


            saveUser(data.user);

            localStorage.setItem(
                TOKEN_KEY,
                data.token
            );


            showApp();


        } catch (error) {

            console.error(error);

            setMessage(
                currentLanguage === "ru"
                    ? "Не удалось создать аккаунт. Проверьте сервер."
                    : "Could not create the account. Check the server."
            );

        }

    }
);



/* ========================= */
/* LOGIN */
/* ========================= */

loginForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();

        setMessage("");


        const nexId =
            document
                .getElementById("loginNexId")
                .value
                .trim()
                .toUpperCase();


        const password =
            document
                .getElementById("loginPassword")
                .value;


        if (!nexId || !password) {

            setMessage(
                currentLanguage === "ru"
                    ? "Введите NEX ID и пароль."
                    : "Enter your NEX ID and password."
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
                    data.message
                    || "Login failed"
                );

            }


            saveUser(data.user);

            localStorage.setItem(
                TOKEN_KEY,
                data.token
            );


            showApp();


        } catch (error) {

            console.error(error);

            setMessage(
                currentLanguage === "ru"
                    ? "Неверный NEX ID или пароль."
                    : "Invalid NEX ID or password."
            );

        }

    }
);



/* ========================= */
/* ANONYMOUS */
/* ========================= */

anonymousBtn.addEventListener(
    "click",
    () => {

        const anonymousUser = {

            nickname: "Аноним",

            nexId: null,

            anonymous: true

        };


        saveUser(anonymousUser);

        showApp();

    }
);



/* ========================= */
/* NAVIGATION */
/* ========================= */

function openPage(page) {

    const chatsPage =
        document.getElementById("chatsPage");

    const settingsPage =
        document.getElementById("settingsPage");


    chatsPage.classList.add("hidden");
    settingsPage.classList.add("hidden");


    if (page === "settings") {

        settingsPage.classList.remove("hidden");

    } else {

        chatsPage.classList.remove("hidden");

    }


    document
        .querySelectorAll(".nav-btn")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.page === page
            );

        });


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


document
    .querySelectorAll(".nav-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                openPage(
                    button.dataset.page
                );

            }
        );

    });



/* ========================= */
/* PROFILE BUTTON */
/* ========================= */

document
    .getElementById("profileQuickBtn")
    .addEventListener(
        "click",
        () => {

            openPage("settings");

        }
    );


document
    .getElementById("profileCard")
    .addEventListener(
        "click",
        () => {

            alert(
                currentLanguage === "ru"
                    ? "Профиль NEX будет доступен в следующем обновлении."
                    : "The NEX profile will be available in a future update."
            );

        }
    );



/* ========================= */
/* THEME SELECTOR */
/* ========================= */

document
    .querySelectorAll("[data-theme]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                currentTheme =
                    button.dataset.theme;

                localStorage.setItem(
                    "nex_theme",
                    currentTheme
                );

                applyTheme();

            }
        );

    });



/* ========================= */
/* ACCENT SELECTOR */
/* ========================= */

document
    .querySelectorAll("[data-accent]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                currentAccent =
                    button.dataset.accent;

                localStorage.setItem(
                    "nex_accent",
                    currentAccent
                );

                applyAccent();

            }
        );

    });



/* ========================= */
/* LANGUAGE SELECTOR */
/* ========================= */

document
    .querySelectorAll("[data-language]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                currentLanguage =
                    button.dataset.language;

                localStorage.setItem(
                    "nex_language",
                    currentLanguage
                );

                applyLanguage();

            }
        );

    });



/* ========================= */
/* NOTIFICATIONS */
/* ========================= */

const notificationsToggle =
    document.getElementById(
        "notificationsToggle"
    );


notificationsToggle.checked =
    localStorage.getItem(
        "nex_notifications"
    ) !== "off";


notificationsToggle.addEventListener(
    "change",
    () => {

        localStorage.setItem(
            "nex_notifications",
            notificationsToggle.checked
                ? "on"
                : "off"
        );

    }
);



/* ========================= */
/* LOGOUT */
/* ========================= */

logoutBtn.addEventListener(
    "click",
    () => {

        clearSession();

        loginForm.reset();
        registerForm.reset();

        registerForm.classList.add("hidden");
        loginForm.classList.remove("hidden");

        setMessage("");

        showAuth();

    }
);



/* ========================= */
/* PWA */
/* ========================= */

let deferredInstallPrompt = null;

const installBtn =
    document.getElementById("installBtn");


window.addEventListener(
    "beforeinstallprompt",
    event => {

        event.preventDefault();

        deferredInstallPrompt =
            event;

        installBtn.classList.remove(
            "hidden"
        );

    }
);


installBtn.addEventListener(
    "click",
    async () => {

        if (!deferredInstallPrompt) {
            return;
        }


        deferredInstallPrompt.prompt();

        await deferredInstallPrompt.userChoice;

        deferredInstallPrompt = null;

        installBtn.classList.add(
            "hidden"
        );

    }
);



/* ========================= */
/* SYSTEM THEME */
/* ========================= */

if (window.matchMedia) {

    window
        .matchMedia(
            "(prefers-color-scheme: dark)"
        )
        .addEventListener(
            "change",
            () => {

                if (
                    currentTheme === "system"
                ) {

                    applyTheme();

                }

            }
        );

}



/* ========================= */
/* INIT */
/* ========================= */

applyLanguage();
applyTheme();
applyAccent();


const existingUser =
    getUser();


if (existingUser) {

    showApp();

} else {

    showAuth();

}


if ("serviceWorker" in navigator) {

    window.addEventListener(
        "load",
        () => {

            navigator
                .serviceWorker
                .register(
                    "./sw.js?v=20"
                )
                .catch(
                    error =>
                        console.error(
                            "Service Worker:",
                            error
                        )
                );

        }
    );

}