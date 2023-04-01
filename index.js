const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

const createTimerAnimator = () => {
  let timerId;
  let endTime;

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds - hours * 3600) / 60);
    const seconds = Math.floor(timeInSeconds - hours * 3600 - minutes * 60);

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  const updateTimer = () => {
    const remainingTime = Math.max(Math.ceil((endTime - Date.now()) / 1000), 0);
    const formattedTime = formatTime(remainingTime);
    timerEl.textContent = formattedTime;
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
