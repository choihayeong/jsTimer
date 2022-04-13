const inputs = document.querySelectorAll('.ipt-time');
const iptHours = document.querySelector('#iptHours');
const iptMinutes = document.querySelector('#iptMinutes');
const iptSeconds = document.querySelector('#iptSeconds');

// initialize
function initializedTimer() {
    iptHours.value = String(0).padStart(2,'0');
    iptMinutes.value = String(0).padStart(2,'0');
    iptSeconds.value = String(0).padStart(2,'0');
}

initializedTimer();

let timerArr = [0, 0, 0];
let timer = false;

const btnStart = document.querySelector('.btn--start');
const btnPause = document.querySelector('.btn--pause');
const btnReset = document.querySelector('.btn--reset');

// input Change
inputs.forEach((input, index) => {
    function inputChangeEvent(event) {
        timerArr[index] = Number(event.target.value);

        btnStart.removeAttribute('disabled');
        timingFunc(timerArr);
    }

    input.addEventListener('change', inputChangeEvent);
});

function timingFunc(arr) {
    let hours = arr[0];
    let minutes = arr[1];
    let seconds = arr[2];

    console.log(arr);

    if (timer) {
        timer = setInterval(function() {
            if ((hours === 0) && (minutes === 0) && (seconds === 0)) {
                btnPause.setAttribute('disabled', 'true');
                inputs.forEach(input => input.removeAttribute('disabled'));
                timerArr.fill(0);
                clearInterval(timer);
                timer = false;
            } else {
                if (hours === 0) {
                    if ((minutes !== 0) && (seconds === 0)) {
                        minutes = minutes - 1;
                        seconds = 60;
                    }
                }
                if (minutes === 0) {
                    if ((hours !== 0) && (seconds === 0)) {
                        hours = hours - 1;
                        minutes = 59;
                        seconds = 60;
                    }
                }
                if (seconds === 0) {
                    if ((hours !== 0) && (minutes !== 0)) {
                        minutes = minutes - 1;
                        seconds = 60;
                    }
                }

                seconds = seconds - 1;
            }

            iptHours.value = String(hours).padStart(2,'0');
            iptMinutes.value = String(minutes).padStart(2,'0');
            iptSeconds.value = String(seconds).padStart(2,'0');
        }, 1000);
    }
}

function startClickEvent() {
    this.setAttribute('disabled', 'true');
    btnPause.removeAttribute('disabled');
    inputs.forEach(input => input.setAttribute('disabled', 'true'));

    timer = true;
    timingFunc(timerArr);
}
function pauseClickEvent() {
    this.setAttribute('disabled', 'true');
    inputs.forEach(input => input.removeAttribute('disabled'));
    btnStart.removeAttribute('disabled');
    clearInterval(timer);

    timer = false;

    timerArr[0] = Number(iptHours.value);
    timerArr[1] = Number(iptMinutes.value);
    timerArr[2] = Number(iptSeconds.value);
}
function resetClickEvent() {
    clearInterval(timer);

    timer = false;
    timerArr.fill(0);

    initializedTimer();
    inputs.forEach(input => input.removeAttribute('disabled'));
    btnPause.setAttribute('disabled', 'true');
    btnStart.setAttribute('disabled', 'true');
}

btnStart.addEventListener('click', startClickEvent);
btnPause.addEventListener('click', pauseClickEvent);
btnReset.addEventListener('click', resetClickEvent);