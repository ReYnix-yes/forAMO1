const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

const createTimerAnimator = () => {
  let timerId;
  let endTime;

  const updateTimer = () => {
    const remainingTime = Math.max(Math.ceil((endTime - Date.now()) / 1000), 0);
    timerEl.textContent = remainingTime;
    if (remainingTime === 0) {
      clearInterval(timerId);
    }
  };

  return (seconds) => {
    if (timerId) {
      clearInterval(timerId);
    }
    endTime = Date.now() + seconds * 1000;
    updateTimer();
    timerId = setInterval(updateTimer, 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  inputEl.value = inputEl.value.replace(/\D/g, '');
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);
  animateTimer(seconds);
  inputEl.value = '';
});
