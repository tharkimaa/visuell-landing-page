const blocks = document.querySelectorAll('.block');
let currentIndex = 0;
const bpm = 90;
const interval = (60 / bpm) * 1000;

function activateBlock(index) {
    blocks.forEach((block, i) => {
        block.classList.toggle('active', i === index);
    });
}

function runSequencer() {
    activateBlock(currentIndex);
    currentIndex = (currentIndex + 1) % blocks.length;
    setTimeout(runSequencer, interval);
}

runSequencer();
