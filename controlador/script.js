const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

const targetDate = new Date('September 21, 2025 10:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    hoursEl.innerHTML = hours < 10 ? '0' + hours : hours;
    minutesEl.innerHTML = minutes < 10 ? '0' + minutes : minutes;
    secondsEl.innerHTML = seconds < 10 ? '0' + seconds : seconds;

    if (timeLeft < 0) {
    clearInterval(countdownInterval);
    document.getElementById('countdown').innerHTML = '<h2>¡Ya llegaron tus flores amarillas!</h2>';
    
    document.getElementById('libro-btn').style.display = 'inline-block';
}

}

const countdownInterval = setInterval(updateCountdown, 1000);

updateCountdown();