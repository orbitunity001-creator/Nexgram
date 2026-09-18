const talkButton = document.getElementById("talkButton");
const stopButton = document.getElementById("stopButton");

const speechBox = document.getElementById("speech");
const statusText = document.getElementById("status");

const robotFace = document.getElementById("robotFace");

let recognition = null;

const SpeechRecognition =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition;

if (SpeechRecognition) {

  recognition = new SpeechRecognition();

  recognition.lang = "ru-RU";

  recognition.continuous = false;

  recognition.interimResults = false;

  recognition.maxAlternatives = 1;

  recognition.onstart = () => {

    statusText.textContent = "Слушаю тебя...";

    document
      .querySelector(".robot-card")
      .classList.add("listening");

    setFace("surprised");
  };

  recognition.onresult = (event) => {

    const text =
      event.results[0][0].transcript
        .toLowerCase()
        .trim();

    console.log("Ты сказал:", text);

    answer(text);
  };

  recognition.onerror = (event) => {

    console.log("Ошибка:", event.error);

    statusText.textContent =
      "Не получилось услышать";

    setFace("sad");

    speechBox.textContent =
      "Я не расслышал. Попробуй ещё раз.";

  };

  recognition.onend = () => {

    document
      .querySelector(".robot-card")
      .classList.remove("listening");

    if (
      statusText.textContent ===
      "Слушаю тебя..."
    ) {
      statusText.textContent =
        "Готов к разговору";
    }
  };

} else {

  talkButton.disabled = true;

  statusText.textContent =
    "Браузер не поддерживает микрофон";
}


/*
    НАСТРОЕНИЯ РОБОТА
*/

function setFace(mood) {

  robotFace.className = "face " + mood;
}


/*
    ОТВЕТЫ
*/

function answer(text) {

  let response = "";
  let mood = "happy";

  if (
    text.includes("привет") ||
    text.includes("здравствуй")
  ) {

    response =
      "Привет! Рад тебя видеть.";

    mood = "happy";

  } else if (
    text.includes("как дела") ||
    text.includes("как ты")
  ) {

    response =
      "У меня всё отлично! Я готов разговаривать.";

    mood = "happy";

  } else if (
    text.includes("грустно") ||
    text.includes("грусть")
  ) {

    response =
      "Не грусти. Я рядом и могу с тобой поговорить.";

    mood = "sad";

  } else if (
    text.includes("злой") ||
    text.includes("сердит")
  ) {

    response =
      "Ого! Кажется, кто-то сегодня сердится.";

    mood = "angry";

  } else if (
    text.includes("вау") ||
    text.includes("удив")
  ) {

    response =
      "Вау! Это действительно неожиданно!";

    mood = "surprised";

  } else if (
    text.includes("пока") ||
    text.includes("до свидания")
  ) {

    response =
      "Пока! Ещё увидимся.";

    mood = "happy";

  } else {

    response =
      "Ты сказал: " + text;

    mood = "happy";
  }

  showAnswer(response, mood);
}


/*
    ПОКАЗЫВАЕМ ОТВЕТ
*/

function showAnswer(text, mood) {

  speechBox.textContent = text;

  statusText.textContent =
    "Говорю...";

  setFace(mood);

  speak(text, mood);
}


/*
    ГОЛОС
*/

function speak(text, mood) {

  if (!("speechSynthesis" in window)) {

    statusText.textContent =
      "Голос не поддерживается";

    return;
  }

  window.speechSynthesis.cancel();

  const utterance =
    new SpeechSynthesisUtterance(text);

  utterance.lang = "ru-RU";

  utterance.rate = 0.95;

  utterance.pitch = 1.05;

  utterance.volume = 1;

  /*
     Немного меняем голос
     в зависимости от настроения
  */

  if (mood === "happy") {
    utterance.pitch = 1.2;
    utterance.rate = 1.0;
  }

  if (mood === "sad") {
    utterance.pitch = 0.8;
    utterance.rate = 0.85;
  }

  if (mood === "angry") {
    utterance.pitch = 0.7;
    utterance.rate = 1.05;
  }

  if (mood === "surprised") {
    utterance.pitch = 1.35;
    utterance.rate = 1.1;
  }

  utterance.onend = () => {

    statusText.textContent =
      "Готов к разговору";
  };

  window.speechSynthesis.speak(
    utterance
  );
}


/*
    КНОПКИ
*/

talkButton.addEventListener(
  "click",
  () => {

    if (!recognition) {
      return;
    }

    window.speechSynthesis.cancel();

    recognition.start();
  }
);


stopButton.addEventListener(
  "click",
  () => {

    if (recognition) {
      recognition.stop();
    }

    window.speechSynthesis.cancel();

    statusText.textContent =
      "Готов к разговору";

    setFace("happy");
  }
);