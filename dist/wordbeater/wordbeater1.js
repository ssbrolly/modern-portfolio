const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const seconds = document.querySelector("#seconds");
const message = document.querySelector("#message");
const startButton = document.querySelector("button[data-btn-start=true]");
const difficultyRadios = document.querySelectorAll("input[name='difficulty']");

const levels = {
    easy: 5,
    medium: 2,
    hard: 1,
};


let currentLevel = levels.easy;
let time = currentLevel;
let score = 0;
let isPlaying;

const words =[
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
    addEventListeners();
    showMenuUI();
};

function addEventListeners() {
    startButton.addEventListener('click', () => {
        let selected = document.queryselector('input[name="difficulty"]:checked');
        if (!selected) alert('Please select a difficulty');
        else {
            currentLevel = levels[selected.value];
            score = 0;
            startGame();
        };
    });
    difficultyRadios.forEach((radio) => {
        radio.addEventListener('change', (e) => {
            currentLevel = levels[e.target.value];
            seconds.innerHTML = currentLevel;
        });
    });
};

function startGame() {
    reset();
    seconds.innerHTML = currentLevel;
    timeDisplay.innerHTML = currentLevel;
    time = currentLevel;
    wordInput.focus();
    scoreDisplay.innerHTML = score;

    showWords(words);
    timeoutInterval = setInterval(countDown, 1000);
    wordInput.addEventListener('input', compareWords);
};

function compareWords() {
    if(matchWords() && isPlaying) {
        time = currentLevel + 1;
        showWords(words);
        wordInput.value = '';
        score++;

        stopTimer();
        startGame();
    };
};

function matchWord() {
    if (wordInput.value === currentWord.innerHTML) {
        return true;
    } else {
        return false;
    };
};

function stopTimer() {
    clearInterval(timeoutInterval);
    timeoutInterval = null;
}

function countDown() {
    if (time > 0) {
        time--;
    } else {
        endGame();
    };
    timeDisplay.innerHTML = time;
};

function endGame() {
    message.innerHTML = 'Game Over';
    isPlaying = false;
    stopTimer();
    showMenuUI();
};

function reset() {
    wordInput.value = '';
    message.innerHTML = '';
    stopTimer();
    showGameplayUI();
};

function showWords() {
    randIndex = Math.floor(Math.random() * words.length);
    currentWord.innerHTML = words[randIndex]; 
};

function showMenuUI() {
    document.queryselector('.startMenu').style.opacity = 1;
    document.queryselector('.gameUI').style.opacity = 0.5;
    startButton.disable = false;
    wordInput.disable = true;
};

function showGameplayUI() {
    document.queryselector('.startMenu').style.opacity = 0.5;
    document.queryselector('.gameUI').style.opacity = 1;
    startButton.disable = true;
    wordInput.disable = false;
};


