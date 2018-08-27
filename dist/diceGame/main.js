/*
GAME RULES:

- The game has 2 players, playing in rounds
- The game's default final score is 100 points, but players can input any final score in the final score input field. 
- In each turn, a player rolls two dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, on any one of his dice, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
- The player will loose all GLOBAL AND ROUNDPOINTS if 6 is rolled twice consecutively on any dice.

*/

let scores, roundScore, activePlayer, gamePlaying, lastRoll, lastRoll1;
init();



document.querySelector(".btn-roll").addEventListener("click", function() {
    if (gamePlaying) {
        let dice = Math.floor(Math.random() * 6) + 1; 
        let dice1 = Math.floor(Math.random() * 6) + 1; 
        let diceDom = document.querySelector(".dice");
        diceDom.style.display = "block";
        diceDom.src= "dice-" + dice + ".png"
        let diceDom1 = document.querySelector(".dice1");
        diceDom1.style.display = "block";
        diceDom1.src= "dice-" + dice1 + ".png"
        if (dice === 6 && lastRoll === 6 || dice1 === 6 && lastRoll1 === 6) {
            scores[activePlayer] = 0;
            document.getElementById("score-" + activePlayer).innerHTML = scores[activePlayer];
            document.getElementById("name-" + activePlayer ).innerHTML = "Double 6";
            nextPlayer()
        } else if (dice > 1 && dice1 > 1) {
            roundScore += dice + dice1;
            document.querySelector("#current-" + activePlayer).innerHTML = roundScore ;
        } else if (dice === 1 || dice1 === 1) {
            document.getElementById("name-" + activePlayer ).innerHTML = "Rolled 1";
            nextPlayer()
        }
        lastRoll = dice;
        lastRoll1 = dice1;
    }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;
        document.querySelector("#score-" + activePlayer).innerHTML = scores[activePlayer];
        let input = document.querySelector(".final-score").value;
        let winningScore;
        if (input) {
            winningScore = input; 
        } else {
            winningScore = 100;
        }
        if (scores[activePlayer] >= winningScore) {
            document.getElementById("name-" + activePlayer).innerHTML = "Winner"
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".dice1").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;
        } else {
            lastRoll = 0; 
            lastRoll1 = 0;
            console.log(lastRoll, lastRoll1);
            nextPlayer();
        };
    };
});

// activePlayer initiator and indicator 
function nextPlayer () {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    if (activePlayer === 0){
        document.getElementById("name-" + activePlayer ).innerHTML = "Player 1";
    } else {
        document.getElementById("name-" + activePlayer ).innerHTML = "Player 2";

    }
    document.getElementById("current-0").innerHTML = "0";
    document.getElementById("current-1").innerHTML = "0";
    
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    document.querySelector(".dice").style.display = "none";
    document.querySelector(".dice1").style.display = "none";

}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    
    document.querySelector(".dice").style.display = "none";
    document.querySelector(".dice1").style.display = "none";
    document.querySelector(".final-score").value = "";


    document.getElementById("score-0").innerHTML = "0"; 
    document.getElementById("score-1").innerHTML = "0"; 
    document.getElementById("current-0").innerHTML = "0"; 
    document.getElementById("current-1").innerHTML = "0"; 
    document.getElementById("name-0").innerHTML = "Player 1";
    document.getElementById("name-1").innerHTML = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");



};
































