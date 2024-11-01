let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timerRef = document.querySelector('.timerDisplay');
let clockRef = document.querySelector('.clockDisplay');
let int = null;

document.getElementById('startTimer').addEventListener('click', () => {
    if (int !== null) {
        clearInterval(int);
    }
    int = setInterval(displayTimer, 10);
});

document.getElementById('pauseTimer').addEventListener('click', () => {
    clearInterval(int);
});

document.getElementById('resetTimer').addEventListener('click', () => {
    clearInterval(int);
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    timerRef.innerHTML = '00 : 00 : 00 : 000';
});

function displayTimer() {
    milliseconds += 10;

    if (milliseconds === 1000) {
        milliseconds = 0;
        seconds++;

        if (seconds === 60) {
            seconds = 0;
            minutes++;

            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
        }
    }

    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;

    timerRef.innerHTML = `${h} : ${m} : ${s} : ${ms}`;
}

function updateClock() {
    const now = new Date();
    let h = now.getHours().toString().padStart(2, '0');
    let m = now.getMinutes().toString().padStart(2, '0');
    let s = now.getSeconds().toString().padStart(2, '0');

    clockRef.innerHTML = `Current Time: ${h}:${m}:${s}`;
}

setInterval(updateClock, 1000);


let countdownInt = null;
let countdownTime = 0; 
const countdownRef = document.querySelector('.countdownDisplay');

document.getElementById('startCountdown').addEventListener('click', () => {
    clearInterval(countdownInt);
    const input = document.getElementById('countdownInput').value;
    const timeParts = input.split(':');

    if (timeParts.length === 4) {
        const hours = parseInt(timeParts[0]) || 0;
        const minutes = parseInt(timeParts[1]) || 0;
        const seconds = parseInt(timeParts[2]) || 0;
        const milliseconds = parseInt(timeParts[3]) || 0;

        countdownTime = (hours * 3600000) + (minutes * 60000) + (seconds * 1000) + milliseconds;

        if (countdownTime > 0) {
            countdownInt = setInterval(displayCountdown, 20); 
        } else {
            alert("enter a valid time");
        }
    } else {
        alert("enter time in HH:MM:SS:MS format.");
    }
});

function displayCountdown() {
    if (countdownTime <= 0) {
        clearInterval(countdownInt);
        countdownRef.innerHTML = "Countdown: 00 : 00 : 00 : 000";
        alert("Times up");
        return;
    }

    countdownTime -= 10; 

    let hours = Math.floor(countdownTime / 3600000);
    let minutes = Math.floor((countdownTime % 3600000) / 60000);
    let seconds = Math.floor((countdownTime % 60000) / 1000);
    let milliseconds = countdownTime % 1000;

    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;

    countdownRef.innerHTML = `Countdown: ${h} : ${m} : ${s} : ${ms}`;
}

