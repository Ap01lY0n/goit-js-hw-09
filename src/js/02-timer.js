import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

// Функція для форматування чисел з передачею ведучих нулів
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

const dateTimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');

// Опції для flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

// Ініціалізуємо flatpickr на полі вводу дати та часу
const flatpickrInstance = flatpickr(dateTimePicker, options);

const timerFields = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let countdownInterval;

function updateTimerDisplay(days, hours, minutes, seconds) {
  timerFields.days.textContent = addLeadingZero(days);
  timerFields.hours.textContent = addLeadingZero(hours);
  timerFields.minutes.textContent = addLeadingZero(minutes);
  timerFields.seconds.textContent = addLeadingZero(seconds);
}

function startCountdown() {
  const selectedDate = flatpickrInstance.selectedDates[0];
  const currentDate = new Date();
  const timeRemaining = selectedDate - currentDate;

  if (timeRemaining <= 0) {
    clearInterval(countdownInterval);
    Notiflix.Notify.success('Countdown completed!');
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeRemaining);
  updateTimerDisplay(days, hours, minutes, seconds);
}

startButton.addEventListener('click', () => {
  const selectedDate = flatpickrInstance.selectedDates[0];
  const currentDate = new Date();

  if (selectedDate <= currentDate) {
    Notiflix.Notify.failure('Please choose a date in the future');
    return;
  }

  countdownInterval = setInterval(startCountdown, 1000);
  startButton.disabled = true;
});

// Функція для конвертації мілісекунд у дні, години, хвилини і секунди
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}
