const screens = document.querySelectorAll('.screen');
const startBtn = document.querySelector('#start');
const timeList = document.querySelector('#time-list');
const timeElement = document.querySelector('#time');
const board = document.querySelector('#board');

let time = 0;
let score = 0;
const colors = ['red', 'green', 'blue', 'yellow', 'pink', 'white'];
const emojis = ['🤡', '🤑', '😋', '😬', '🤓', '👻', '👽', '🎃', '🏆', '⚽', '💩', '🐼', '🦝', '😵', '🙃', '😎'];

startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', (e) => {
    if (e.target.classList.contains('time-btn')) {
        time = e.target.dataset.time;
        screens[1].classList.add('up');
        if (time < 10) {
            time = `0${time}`;
        }
        timeElement.innerText = `00:${time}`;
        startGame();
    }
});

function startGame() {
    setInterval(decreaseTime, 1000);
    createRandomEmoji();
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`
        }
        setTimer(current);
    }
}

function finishGame() {
    timeElement.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Game over</h1><p>Score: ${score}</p>`;
    
    const restartBtn = document.createElement('button');
    restartBtn.textContent = 'Play again';
    restartBtn.classList.add('restart-btn');

    board.appendChild(restartBtn);

    restartBtn.addEventListener('click', () => {
        window.location.reload();
    });
}

function setTimer(value) {
    timeElement.innerText = `00:${value}`;
}

function createRandomEmoji() {
    const emoji = document.createElement('div');
    const size = getRnd(25, 75);
    const {width, height} = board.getBoundingClientRect();
    const x = getRnd(size, width - 1.5 * size);
    const y = getRnd(size, height - 1.5 * size);

    emoji.classList.add('emoji');
    emoji.textContent = emojis[getRnd(0, emojis.length)];
    emoji.style.fontSize = `${size}px`;
    emoji.style.left = `${x}px`;
    emoji.style.top = `${y}px`;

    board.append(emoji);
}

function getRnd(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

board.addEventListener('click', (e) => {
    if (e.target.classList.contains('emoji')) {
        score++;
        e.target.remove();
        createRandomEmoji();
    }
});