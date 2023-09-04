import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// =====================================================
let currentTime = new Date(); // Текущее время
let selectedTime; // Selected time
const refs = {
  inputDate: document.querySelector('#datetime-picker'),

  hiden: document.querySelector('#messege-js'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
  btn: document.querySelector('button[data-start]'), //Button
};

// console.log(refs.messageForUser);
// =====================================================
refs.btn.disabled = true; //  disable button
// =====================================================
flatpickr(refs.inputDate, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] <= currentTime) {
      // refs.hiden.classList.remove('none');
      refs.hiden.classList.remove('hidden');
      refs.hiden.classList.add('visible');

      const cansel = setTimeout(() => {
        refs.hiden.classList.add('hidden');
        // refs.hiden.classList.add('none');
      }, 2000);
    } else {
      refs.btn.disabled = false;
    }
    selectedTime = selectedDates[0];
  },
});

refs.btn.addEventListener('click', () => {
  function pad(value) {
    return String(value).padStart(2, '0');
  }
  const timerOff = setInterval(() => {
    let currentTime = new Date();
    const newTimer = selectedTime - currentTime;
    console.log(newTimer);
    const { days, hours, minutes, seconds } = convertMs(newTimer);
    // console.log(refs.seconds.textContent);

    if (newTimer > 0) {
      refs.days.textContent = days;
      refs.hours.textContent = hours;
      refs.minutes.textContent = minutes;
      refs.seconds.textContent = seconds;
    } else {
      clearInterval(timerOff);
    }
  }, 1000);

  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = pad(Math.floor(ms / day));
    // Remaining hours
    const hours = pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
    return { days, hours, minutes, seconds };
  }
});