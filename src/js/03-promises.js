import { Notify } from 'notiflix/build/notiflix-notify-aio';

document.querySelector('.form').addEventListener('submit', onFormSubmit);
const firstDelay = document.querySelector('[name="delay"]');
const step = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');

function onFormSubmit(evt) {
  evt.preventDefault();
  const firstDelayValue = Number(firstDelay.value);
  const stepValue = Number(step.value);
  const amountValue = Number(amount.value);
  checkAmount(firstDelayValue, stepValue, amountValue);
}

function checkAmount(firstDelay, step, amount) {
  for (let i = 0; i < amount; i += 1) {
    const currentDelay = firstDelay + i * step;
    createPromise(i + 1, currentDelay)
      .then(success => Notify.success(success))
      .catch(error => Notify.failure(error));
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve)
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      else reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }, delay);
  });
}
