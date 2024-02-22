const bigbox = document.querySelector('.bigbox');
let row = 1;
let count = 0;
let homepage = document.querySelector('.homepage');
let playGame = document.querySelector('.play-game');
let startGame = document.querySelector('.start-game');
let waitGame = document.querySelector('.wait-game');
let continueGame = document.querySelector('.continue-game');
let stopGame = document.querySelector('.stop-game');
let demoCounter = document.getElementById('demo-counter');
let showCounter = document.getElementById('show-counter');
let stopShowCounter = document.getElementById('stop-show-counter');
let counterInterval;
const totalTime = 3
let counter = totalTime;


const randomColor = () => {
    return '#' + Math.random().toString(16).slice(2, 8);
}

const innerbox = () => {
    bigbox.innerHTML = '';
    let size = 100 / row;
    let smBox = row * row;
    let answerBoxIndex = Math.floor(Math.random() * smBox);
    let color = randomColor();
    for (let i = 0; i < smBox; i++) {
        if (i === answerBoxIndex) {
            opacity = 0.5
        } else {
            opacity = 1
        }
        bigbox.innerHTML += `<div class="box" style="width:${size}%; height:${size}%;background-color:${color}; opacity:${opacity}"></div>`;
    }
    return answerBoxIndex;
}

const answerBox = () => {
    let answerIndex = innerbox();
    let boxes = document.querySelectorAll('.box');
    boxes[answerIndex].classList.add('answer');
    boxes[answerIndex].addEventListener('click', () => {
        row++;
        answerBox();
    });
}

answerBox();

myStarGame();
MyWaitGame();
MyContinueGame();
MyStopGame();

function myStarGame() {
    startGame.addEventListener('click', () => {
        // 先清空時間
        counter = totalTime;
        demoCounter.innerHTML = counter;
        homepage.classList.add('hidden');
        playGame.classList.add('show');

        // 開始計時
        console.log('start counter = ', counter);
        counterInterval = setInterval(counterTimer, 1000);
        game();
    })
}

// 暫停計時
function MyWaitGame() {
    waitGame.addEventListener('click', () => {
        homepage.classList.remove('hidden');
        playGame.classList.remove('show');
        continueGame.classList.add('show');
        counterStop();
    })
}

// 開始計時
function MyContinueGame() {
    continueGame.addEventListener('click', () => {
        homepage.classList.add('hidden');
        playGame.classList.add('show');
        counterInterval = setInterval(counterTimer, 1000)
    })
}

// 停止計時
function MyStopGame() {
    stopGame.addEventListener('click', () => {
        homepage.classList.remove('hidden');
        playGame.classList.remove('show');
        continueGame.classList.remove('show');
        counterStop();
    })
}

function counterTimer() {
    if (counter >= 0) {
        console.log('show counter = ', counter);
        demoCounter.innerHTML = counter--;
    } else {
        alert('時間到');
        counterStop();
        console.log('alert counter = ', counter);
        homepage.classList.remove('hidden');
        playGame.classList.remove('show');
        continueGame.classList.remove('show');
        row = 1
        answerBox();
    }
}

// 停止計時
function counterStop() {
    clearInterval(counterInterval);
}

function game() {
}
