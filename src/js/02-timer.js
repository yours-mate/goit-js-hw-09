import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

refs = {
  calendarInput: document.querySelector('#datetime-picker'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
  startBtn: document.querySelector('button[data-start]'),
};

let resultInSeconds = 0;
let result = {};

refs.startBtn.disabled = true;

// Updates timer on the screen
function updateTimer(result) {
  refs.days.textContent = result.days;
  refs.hours.textContent = result.hours;
  refs.minutes.textContent = result.minutes;
  refs.seconds.textContent = result.seconds;
}

refs.startBtn.addEventListener('click', timerStart);

// Starts the timer
function timerStart() {
  refs.startBtn.disabled = true;
  setInterval(() => {
    const currentTime = Date.now();
    resultInSeconds = calendar.selectedDates[0].getTime() - currentTime;
    if (resultInSeconds <= 0) {
      return;
    }
    result = convertMs(resultInSeconds);
    updateTimer(result);
  }, 1000);
}

// Options for flatpckr initialization
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= options.defaultDate) {
      return window.alert('Please choose a date in the future');
    }
    refs.startBtn.disabled = false;
  },
};

const calendar = flatpickr(refs.calendarInput, options);

// Converts ms into object with days, hours, minutes and seconds
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

// Adds '0' before single number
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
