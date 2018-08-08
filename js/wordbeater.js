window.addEventListener("load", init);

const levels = {
  easy: 4,
  medium: 2,
  hard: 1
}

let currentLevel = levels.medium;

// Global vaiables
let time = currentLevel;
let score = 0;
let isPlaying;

// DOM Elements
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");

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
  'definition'
];

// Initialize Game
function init() {
  seconds.innerHTML = currentLevel;
  showWord(words);
  clearInput();
  wordInput.addEventListener("input", startMatch);
  setInterval(countdown, 1000);
  // setInterval(checkStatus, 1000);
};

// Start Match
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = "";
    score++;
  } 

  if (score === -1) {
    scoreDisplay = 0;
  }
  scoreDisplay.innerHTML = score;
}

// Match currentWord to wordInput
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = "Correct!!!";
    return true;
  } else {
    message.innerHTML = "";
    return false;
  }
}


// Pick & show random word
function showWord(words) {
  const randIndex = Math.floor(Math.random() * words.length);
  currentWord.innerHTML = words[randIndex];
};

// Countdown timer
function countdown() {
  if (time > 0) {
    time--;
  } else if (time === 0) {
    message.innerHTML = "Game Over!!!"
    score = -1;
    scoreDisplay.innerHTML = 0;
    isPlaying = false;
  } 
  timeDisplay.innerHTML = time;
};

function clearInput() {
  if (time === 0) {
    wordInput.value = "";
  };
};


// Check game status
function checkStatus() {
  if (time === 0) {
    message.innerHTML = "Game Over!!!";
  };
};

// Keep score
function keepScore() {
  if (wordInput === wordInput) {
    score++;
    time;
  }
  scoreDisplay.innerHTML = score;
}


