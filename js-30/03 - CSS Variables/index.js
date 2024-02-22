const spacing = document.getElementById('spacing');
const blur = document.getElementById('blur');
const base = document.getElementById('base');
const img = document.querySelector('.img');

spacing.addEventListener('input', zoom);
blur.addEventListener('input', Vague);
base.addEventListener('input', color);

function zoom() {
    let zoomValue = spacing.value;
    img.style.padding = `${zoomValue}px`;
};

function Vague() {
    let blurValue = blur.value;
    img.style.filter = `blur(${blurValue}px)`;
};

function color() {
    let baseValue = base.value;
    img.style.backgroundColor = `${baseValue}`;
};


