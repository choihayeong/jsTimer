const inputs = document.querySelectorAll('.ipt');
const vanillaTimer = document.querySelector('#vanillaTimer');

const iptHours = document.querySelector('#iptHours');
const iptMinutes = document.querySelector('#iptMinutes');
const iptSeconds = document.querySelector('#iptSeconds');

// initialize
function initializedTimer() {
    iptHours.value = String(iptHours.value).padStart(2,'0');
    iptMinutes.value = String(iptHours.value).padStart(2,'0');
    iptSeconds.value = String(iptHours.value).padStart(2,'0');
}

initializedTimer();

let timerArr = [0, 0, 0];

// input Change
inputs.forEach((input, index) => {
    function inputChangeEvent(event) {
        console.log('input changed!');

        timerArr[index] = Number(event.target.value);

        let timer = false;

        function timingFunc(hours, minutes, seconds) {
            hours = timerArr[0];
            minutes = timerArr[1];
            seconds = timerArr[2];

            if (timer) {
                timer = setInterval(function() {
                    if ((hours === 0) && (minutes === 0) && (seconds === 0)) {
                        clearInterval(timer);
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

        const btnStart = document.querySelector('.btn--start');
        const btnPause = document.querySelector('.btn--pause');
        const btnReset = document.querySelector('.btn--reset');

        function startClickEvent() {
            this.setAttribute('disabled', 'true');
            btnPause.removeAttribute('disabled');
            inputs.forEach(input => input.setAttribute('disabled', 'true'));

            timer = true;
            timingFunc();
        }
        function pauseClickEvent() {
            inputs.forEach(input => input.removeAttribute('disabled'));
            btnStart.removeAttribute('disabled');
            clearInterval(timer);
        }
        function resetClickEvent() {
            clearInterval(timer);
            initializedTimer();
            inputs.forEach(input => input.removeAttribute('disabled'));
            btnPause.setAttribute('disabled', 'true');
            btnStart.removeAttribute('disabled');
        }

        btnStart.addEventListener('click', startClickEvent);
        btnPause.addEventListener('click', pauseClickEvent);
        btnReset.addEventListener('click', resetClickEvent);
    }

    input.addEventListener('change', inputChangeEvent);
});


// saved Timer
const savedTimer = document.querySelector('#savedTimer');
const savedTimerBtns = savedTimer.querySelectorAll('.savedtimer__button');


savedTimerBtns.forEach(ele => {
    function eleClickEvent(event) {
        const targetObj = event.target.dataset;

        iptHours.value = targetObj.hours.padStart(2,'0');
        iptMinutes.value = targetObj.minutes.padStart(2,'0');
        iptSeconds.value = targetObj.seconds.padStart(2,'0');
    }

    ele.addEventListener('click', eleClickEvent);
});

