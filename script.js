const app =
  document.querySelector(".app");

const face =
  document.getElementById("face");

const status =
  document.getElementById("robotStatus");

const startButton =
  document.getElementById("startButton");


/*
========================================
ЛИЦА РОБОТА
========================================
*/

const faces = [

  "^_^",
  ":-)",
  ":-D",
  "^o^",
  "(^o^)",
  "8-)",
  "B-)",
  ":-P",
  ";-)",
  "O:-)",
  ":-|",
  ":-/",
  ":-\\"

];


/*
========================================
АНИМАЦИЯ МОРГАНИЯ
========================================
*/

function blink() {

  if (!app.classList.contains("running")) {
    return;
  }

  face.classList.add("blink");

  setTimeout(() => {

    face.classList.remove("blink");

  }, 130);

}


/*
========================================
СЛУЧАЙНОЕ ЛИЦО
========================================
*/

function changeFace() {

  const current =
    face.textContent;

  let next;

  do {

    next =
      faces[
        Math.floor(
          Math.random() *
          faces.length
        )
      ];

  } while (
    next === current &&
    faces.length > 1
  );

  face.classList.add("wake");

  setTimeout(() => {

    face.textContent = next;

  }, 120);

  setTimeout(() => {

    face.classList.remove("wake");

  }, 800);

}


/*
========================================
ЗАПУСК
========================================
*/

let started = false;


startButton.addEventListener(
  "click",
  () => {

    if (started) {
      return;
    }

    started = true;

    app.classList.add("running");

    status.textContent =
      "Система запущена";

    startButton.innerHTML = `
      <span class="button-icon">●</span>
      <span class="button-text">РОБОТ ЗАПУЩЕН</span>
    `;

    face.textContent = "^_^";

    /*
      Через небольшое время
      робот начинает менять эмоции
    */

    setTimeout(() => {

      status.textContent =
        "Готов к работе";

    }, 1200);

  }
);


/*
========================================
АВТОМАТИЧЕСКОЕ МОРГАНИЕ
========================================
*/

setInterval(() => {

  if (
    started &&
    Math.random() > 0.35
  ) {

    blink();

  }

}, 3200);


/*
========================================
ПЕРИОДИЧЕСКАЯ СМЕНА ЭМОЦИИ
========================================
*/

setInterval(() => {

  if (!started) {
    return;
  }

  changeFace();

}, 6500);