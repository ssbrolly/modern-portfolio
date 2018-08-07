window.addEventListener("load", init);

// Global vaiables
let time = 3;
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
  showWord(words);
  wordInput.addEventListener("input", startMatch)
  setInterval(countdown, 1000);
  // setInterval(checkStatus, 50);
};

// Start Match
function startMatch() {
  if (matchWords()) {
    score++;
    scoreDisplay.innerHTML = score;
  } else {
    isPlaying = false
  }
}

// Match currentWord to wordInput
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = "Correct";
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
    isPlaying = false;
  };
  timeDisplay.innerHTML = time;
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


