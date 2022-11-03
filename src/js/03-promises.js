import Notiflix from 'notiflix';

const refs = {
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  submitFormBtn: document.querySelector('[type="submit"]'),
};

let order = 0;

function onSubmitForm(evt) {
  evt.preventDefault();
  const step = Number(refs.step.value);
  const delayInit = Number(refs.delay.value);
  for (i = 0; i < refs.amount.value; i += 1) {
    order += 1;
    createPromise(order, delayInit + i * step)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

refs.submitFormBtn.addEventListener('click', onSubmitForm);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
