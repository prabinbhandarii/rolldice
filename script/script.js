"use strict";
// Declaring variable for Reset, Roll, and Hold buttons
const newGameBtn = document.querySelector(".new-game-btn");
const rollBtn = document.querySelector(".roll-btn");
const holdBtn = document.querySelector(".hold-btn");
const diceImg = document.querySelector(".dice-img");
const leftBox = document.querySelector(".left-box");
const rightBox = document.querySelector(".right-box");

let canPlay, totalScore, currentScore, activePlayer;

// creating function for game in initial state
const startingGame = function () {
  canPlay = true;
  totalScore = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  document.querySelector(".total-score-0").textContent = 0;
  document.querySelector(".total-score-1").textContent = 0;
  document.querySelector(".current-score-0").textContent = 0;
  document.querySelector(".current-score-1").textContent = 0;
  document.querySelector(".player-0").textContent = "Player 1";
  document.querySelector(".player-1").textContent = "Player 2";
  if (!leftBox.classList.contains("player-active")) {
    leftBox.classList.add("player-active");
    leftBox.classList.remove("winner");
    rightBox.classList.remove("winner");
    rightBox.classList.remove("player-active");
  }
};
// Calling Immediately
startingGame();

// Creating function for switch player with white background
const switchingToNextPlayer = function () {
  document.querySelector(`.current-score-${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // removing and adding white background
  // Toggle methods = it will remove that class if it contains if not than simply add that class
  leftBox.classList.toggle("player-active");
  rightBox.classList.toggle("player-active");
};

// Add EvenListener for Roll Button
rollBtn.addEventListener("click", function () {
  if (canPlay) {
    const random = Math.trunc(Math.random() * 6) + 1;
    diceImg.classList.remove("dice-hidden");
    diceImg.src = `image/dice-${random}.png`;

    if (random !== 1) {
      currentScore += random;
      document.querySelector(`.current-score-${activePlayer}`).textContent =
        currentScore;
    } else {
      // switching to new player
      switchingToNextPlayer();
    }
  }
});

// Add EvenListener for Hold Button

holdBtn.addEventListener("click", function () {
  if (canPlay) {
    // holding the total score
    totalScore[activePlayer] += currentScore;
    document.querySelector(`.total-score-${activePlayer}`).textContent =
      totalScore[activePlayer];

    // condition if anyone wins the game
    if (totalScore[activePlayer] >= 100) {
      canPlay = false;
      document.querySelector(`.player-${activePlayer}`).textContent =
        "Winner!!!";
      diceImg.classList.add("dice-hidden");
      leftBox.classList.remove("player-active");
      rightBox.classList.remove("player-active");
      if (activePlayer === 0) {
        //   activePlayer === 0 (It means leftBox is in active state)
        leftBox.classList.add("winner");
      } else {
        // activePlayer !== 0 (It means rightBox is in active state)
        rightBox.classList.add("winner");
      }
    } else {
      // switching to next player
      switchingToNextPlayer();
    }
  }
});

// Add EvenListener for New Game Button

// Game reset button by calling to (startingGame) function
newGameBtn.addEventListener("click", function () {
  canPlay = true;
  totalScore = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  document.querySelector(".total-score-0").textContent = 0;
  document.querySelector(".total-score-1").textContent = 0;
  document.querySelector(".current-score-0").textContent = 0;
  document.querySelector(".current-score-1").textContent = 0;
  document.querySelector(".player-0").textContent = "Player 1";
  document.querySelector(".player-1").textContent = "Player 2";
  if (!leftBox.classList.contains("player-active")) {
    leftBox.classList.add("player-active");
    leftBox.classList.remove("winner");
    rightBox.classList.remove("winner");
    rightBox.classList.remove("player-active");
  }
});
