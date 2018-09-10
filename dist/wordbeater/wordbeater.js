window.addEventListener("load", init);

// DOM Elements
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
let scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");

const levels = {
    easy: 5,
    medium: 2,
    hard: 1,
}

let currentLevel = levels.medium;

let time = currentLevel;
let score = 0;
let isPlaying;

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

let countDownInterval = null;  

function showWord(words) {
    let randIndex = Math.floor(Math.random() * words.length);
    currentWord.innerHTML = words[randIndex];
}

function init() {
    seconds.innerHTML = currentLevel;
    showWord(words);
    // startCountdown();
    wordInput.addEventListener("input", startMatch);
    setInterval(countDown, 1000);
}

// function startCountdown() {
//     countDownInterval = setInterval(countDown, 1000)
// };

// function stopCountdown() {
//     clearInterval(countDownInterval);
//     countDownInterval = null;
// };

function startMatch() {
    if (matchInput()) {
        isPlaying = true;
        time = currentLevel + 1;
        showWord(words);
        wordInput.value = "";
        score++;
        // startCountdown();
    } 
     if (score === -1) {
        scoreDisplay = 0;
    }
    scoreDisplay.innerHTML = score;
}

function matchInput() {
    if (wordInput.value === currentWord.innerHTML) {
        return true;
    } else {
        return false;
    }
}  

function countDown() {
    if (time > 0) {
        time--;
    } else if (time === 0) {
        message.innerHTML = "Game Over";
        scoreDisplay.innerHTML = 0;
        score = -1;
        isPlaying = false;
        // stopCountdown();
    }
    timeDisplay.innerHTML = time;
};

