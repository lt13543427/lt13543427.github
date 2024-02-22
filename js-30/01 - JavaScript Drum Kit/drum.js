const keys = document.querySelectorAll('.key');

keys.forEach((key, index) => {
    console.log(key);
});

window.addEventListener('keydown', (event) => {
    const keyboard = event.key.toLocaleLowerCase();

    const A = document.querySelector(`div[data-key=${keyboard}]`)

    const B = document.querySelector(`audio[data-key=${keyboard}]`)


    if (A && B) {
        console.log('Pressed Key:', keyboard);
        A.classList.add('playing');

        B.play();
        B.currentTime = 0;
    }

});

