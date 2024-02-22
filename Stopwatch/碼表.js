'use strict';
const startBtn = document.getElementsByClassName('start')[0];
const stopBtn = document.getElementsByClassName('stop')[0];
const clearBtn = document.getElementsByClassName('clear')[0];
const timemSeconds = document.getElementsByClassName('msec')[0];
const timeSeconds = document.getElementsByClassName('sec')[0];
const timeMinutes = document.getElementsByClassName('min')[0];
let myInterval;

let msec = 0;
let sec = 0;
let min = 0;

startBtn.addEventListener('click', () => {
    myInterval = setInterval(timer, 10)
});

clearBtn.onclick = () => {
    clearInterval(myInterval)
    msec = 0;
    sec = 0;
    min = 0;
    timemSeconds.innerHTML = `0${msec}`
    timeSeconds.innerHTML = `0${sec}`
}

stopBtn.addEventListener('click', () => {

    clearInterval(myInterval)
})

const timer = () => {
    msec++;
    timemSeconds.innerHTML = `${msec}`
    if (msec > 99) {
        sec++;
        timeSeconds.innerHTML = `${sec}`
        msec = 0;
    }
    if (sec > 60) {
        min++;
        timeMinutes.innerHTML = `${min}`
        sec = 0;
    }
}