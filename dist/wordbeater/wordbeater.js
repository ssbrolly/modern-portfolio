const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const seconds = document.querySelector("#seconds");
const message = document.querySelector("#message");
const startButton = document.querySelector("button[data-btn-start=true]");
const difficultyRadios = document.querySelectorAll("input[name='difficulty']");

const levels = {
    easy: 4,
    medium: 3,
    hard: 2,
};

let currentLevel = levels.easy;
let time = currentLevel;
let score = 0;
let isPlaying;
let timeoutInterval = null;

let words = [
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

function init() {
    addEventListeners();
    showMenuUI();
};

function addEventListeners() {
    startButton.addEventListener("click", () => {
        let selected = document.querySelector("input[name='difficulty']:checked");
        if (!selected) alert("Please Select a Difficulty");
        else {
            //now start game
            currentLevel = levels[selected.value];
            score = 0;
            startGame();
        };
    });
    difficultyRadios.forEach(radio => {
        radio.addEventListener("change", (e) => {
            currentLevel = levels[e.target.value];
            seconds.innerHTML = currentLevel;
        });
    });
};  

function startGame() {
    reset();
    isPlaying = true;
    seconds.innerHTML = currentLevel;
    timeDisplay.innerHTML = currentLevel;
    time = currentLevel;
    wordInput.focus();

    scoreDisplay.innerHTML = score;

    showWords(words);
    timeoutInterval = setInterval(countDown, 1000);
    wordInput.addEventListener("input", compareWords);
};

function endGame() {
    message.innerHTML = "Game Over";
    isPlaying = false;
    stopTimer();
    showMenuUI();
};

function reset() {
    wordInput.value = "";
    stopTimer();
    showGameplayUI();
};

function stopTimer() {
    clearInterval(timeoutInterval);
    timeoutInterval = null;
};

function showWords(words) {
    randIndex = Math.floor(Math.random() * words.length);
    currentWord.innerHTML = words[randIndex];
};

function compareWords() {
    if (wordInput.value === currentWord.innerHTML && isPlaying) {
        time = currentLevel + 1;
        showWords(words);
        wordInput.value = "";
        score++;
        
        startGame();
    };
};



function countDown() {
    if (time > 0) {
        time--;
    } else {
        endGame();
    };
    timeDisplay.innerHTML = time;
};

function showMenuUI() {
    document.querySelector(".startMenu").style.opacity = 1;
    document.querySelector(".gameUI").style.opacity = 0.5;
    startButton.disabled = false;
    wordInput.disabled = true;
};

function showGameplayUI() {
    document.querySelector(".startMenu").style.opacity = 0.5;
    document.querySelector(".gameUI").style.opacity = 1;
    startButton.disabled = true;
    wordInput.disabled = false;
};


