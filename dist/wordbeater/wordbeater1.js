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
    isPlaying = true;
    seconds.innerHTML = currentLevel;
    timeDisplay.innerHTML = currentLevel;
    time = currentLevel;
    wordInput.focus();

    scoreDisplay.innerHTML = score;
    
    showWords(words);
    timeoutInterval = setInterval(countDown, 1000);
    wordInput.addEventListener('input', compareWords);
};

function showWords(words) {
    randIndex = Math.floor(Math.random() * words.length);
    currentWord.innerHTML = words[randIndex];
};

