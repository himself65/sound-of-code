let seconds = 0;
let timerDisplay = document.getElementById('timer');

function updateTimer() {
    seconds++;
    timerDisplay.innerText = seconds + " seconds elapsed";
}

setInterval(updateTimer, 1000);