const savedTimer = document.querySelector('#savedTimer');
const savedTimerForm = savedTimer.querySelector('#savedTimerForm');
const iptTimerName = savedTimer.querySelector('#iptTimerName');
const delBtnComponent = document.querySelector('.btn--delete');

let timerItems = [];

const INDEXED_KEY = "timerName";

function saveTimerName() {
    localStorage.setItem(INDEXED_KEY, JSON.stringify(timerItems));
}
function deleteTimerItem(event) {
    console.log(event);
}

function createTimerButton(newObj) {
    const timerList = document.querySelector('.savedtimer__list');
    const listItem = document.createElement('div');
    const mainBtn = document.createElement('button');
    const delBtn = delBtnComponent.cloneNode(true);     // cloneNode() 안에 true를 입력하면 자식 노드 까지 가져옴

    listItem.classList.add('savedtimer__item');
    listItem.appendChild(mainBtn);
    listItem.appendChild(delBtn);
    listItem.id = newObj.id;

    mainBtn.classList.add('savedtimer__button');
    mainBtn.textContent = newObj.name;
    mainBtn.setAttribute('data-hours', newObj.hours);
    mainBtn.setAttribute('data-minutes', newObj.minutes);
    mainBtn.setAttribute('data-seconds', newObj.seconds);

    timerList.appendChild(listItem);
}
function savedTimerSubmit(event) {
    event.preventDefault();
    const timerName = iptTimerName.value;
    const timerObj = {
        name : timerName,
        id : Date.now(),
        hours : Number(iptHours.value),
        minutes : Number(iptMinutes.value),
        seconds : Number(iptSeconds.value)
    };

    if ((timerObj.hours === 0) && (timerObj.minutes === 0) && (timerObj.seconds === 0)) {
        alert('시간을 입력하세여!');
        return;
    }

    timerItems.push(timerObj);

    createTimerButton(timerObj);
    saveTimerName();
    buttonClickEvent();
}

savedTimerForm.addEventListener('submit', savedTimerSubmit);

const getTimerName = localStorage.getItem(INDEXED_KEY);

if (getTimerName) {
    const parsedTimerName = JSON.parse(getTimerName);
    timerItems = parsedTimerName;
    timerItems.forEach(ele => createTimerButton(ele));
}

// 저장된 타이머 버튼 클릭
function buttonClickEvent() {
    const savedTimerBtns = savedTimer.querySelectorAll('.savedtimer__button');

    savedTimerBtns.forEach(ele => {
        function eleClickEvent(event) {
            const targetObj = event.target.dataset;

            iptHours.value = targetObj.hours.padStart(2,'0');
            iptMinutes.value = targetObj.minutes.padStart(2,'0');
            iptSeconds.value = targetObj.seconds.padStart(2,'0');

            timerArr[0] = Number(targetObj.hours);
            timerArr[1] = Number(targetObj.minutes);
            timerArr[2] = Number(targetObj.seconds);

            btnStart.removeAttribute('disabled');
            timingFunc(timerArr);
        }

        ele.addEventListener('click', eleClickEvent);
    });
}

buttonClickEvent();