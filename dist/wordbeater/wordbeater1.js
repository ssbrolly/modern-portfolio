const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const seconds = document.querySelector("#seconds");
const message = document.querySelector("#message");
const startButton = document.querySelector("button[data-btn-start=true]");
const difficultyRadios = document.querySelectorAll("input[name='difficulty']");

let levels = {
    easy: 4,
    medium: 3,
    hard: 2,
};

let currentLevel = levels.medium;
let time = currentLevel;
let isPlaying;
let score = 0;

const words = [
    'hat',
    'river',
    'lucky',
    'statue',
    'generate',
    'stubborn',
    'cocktail',
    'runaway',
    'joke',
    'developer',
    'establishment',
    'hero',
    'javascript',
    'nutrition',
    'revolver',
    'echo',
    'siblings',
    'investigate',
    'horrendous',
    'symptom',
    'laughter',
    'magic',
    'master',
    'space',
    'definition',
    'wordbeater',
    'refrigerator',
    'knife',
    'spoon',
    'induction',
    'electricity'
];

init();

let timeoutInterval = null;

function init() {
    showMenuUI();
    addEventListener();
};

function addEventListener() {
    startButton.addEventListener('click', () => {
        let selected = document.querySelector('input[name="difficulty"]:checked');
        if (!selected) alert('Please Select a Difficulty');
        else {
            currentLevel = levels[selected.value];
            score = 0;
            startGame();
        };
    });
    difficutyRadios.forEach((radio) => {
        radio.addEventListener('change', (e) => {
            currentLevel = levels[e.target.value];
        });
    });
};

function startGame() {
    reset();
    isPlaying = true;
    timeDisplay.innerHTML = currentLevel;
    time = currentLevel;
    scoreDisplay.innerHTML = score;
    wordInput.focus();

    showWords(words);
    timeoutInterval = setInterval(countDown, 1000);
    wordInput.addEventListener('input', compareWords);
};

function countDown() {
    if (time > 0) {
        time--;
    } else {
        emdGame();
    };
    timeDisplay.innerHTML = time;
};

function compareWords() {
    if (wordInput.value === currentWord.innerHTML && isPlaying) {
        time = currentLevel + 1;
        score++;
        wordInput.value = '';
        showWords(words);
        startGame();
    };
};

function endGame() {
    message.innerHTML = 'Game Over';
    showMenuUI();
    stopTimer();
};

function stopTimer() {
    clearInterval(timeoutInterval);
    timeoutInterval = null;
};

function reset() {
    message.innerHTML = '';
    wordInput.value = '';
    stopTimer();
    showGameplayUI();
};

function showWords(words) {
    let randIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randIndex];
};

function showMenuUI() {
    document.querySelector('.startMenu').style.opacity = 1;
    document.querySelector('.gameUI').style.opacity = 0.5;
    startButton.disable = false;
    wordInput.disable = true;
};

function showGameplayUI() {
    document.querySelector('.startMenu').style.opacity = 0.5;
    document.querySelector('.gameUI').style.opacity = 1;
    startButton.disable = true;
    wordInput.disable = false;
};