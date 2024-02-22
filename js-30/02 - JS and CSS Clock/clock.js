let clock = () => {
    const now = new Date();
    console.log(now);

    let secondHand = document.querySelector(".second-hand");
    let minHand = document.querySelector(".min-hand");
    let hourHand = document.querySelector(".hour-hand");

    let hours = now.getHours();
    let mins = now.getMinutes();
    let seconds = now.getSeconds();

    let hour = (hours % 12 + mins / 60) * 360 / 12;
    let min = (mins + seconds / 60) * 360 / 60;
    let second = (seconds * 360) / 60;

    hourHand.style.transform = `rotate(${hour}deg)`;
    minHand.style.transform = `rotate(${min}deg)`;
    secondHand.style.transform = `rotate(${second}deg)`;
};
let i = 1;

if (i = 1) {
    setInterval(clock, 1000);
}

clock();