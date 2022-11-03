const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

let btnStartIsActive = false;
let intervalId = null;

refs.btnStart.addEventListener('click', onBtnStartClick);

function onBtnStartClick() {
  if (btnStartIsActive) {
    return;
  }
  intervalId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnStartIsActive = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.btnStop.addEventListener('click', onBtnStopClick);

function onBtnStopClick() {
  clearInterval(intervalId);
  btnStartIsActive = false;
}
