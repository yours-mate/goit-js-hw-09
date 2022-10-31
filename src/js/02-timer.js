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

refs.startBtn.addEventListener('click', timerStart);

function timerStart() {
  //   if (!options.onClose()) {
  //     return;
  //   }
  refs.days.textContent = result.days;
  refs.hours.textContent = result.hours;
  refs.minutes.textContent = result.minutes;
  refs.seconds.textContent = result.seconds;
}

let resultInSeconds = 0;
let result = {};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= options.defaultDate.getTime()) {
      return window.alert('Please choose a date in the future');
    }
    resultInSeconds =
      selectedDates[0].getTime() - options.defaultDate.getTime();
    result = convertMs(resultInSeconds);
    console.log(result);
  },
};

flatpickr(refs.calendarInput, options);

console.log(options.defaultDate);

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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
