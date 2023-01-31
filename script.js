'use strict';

// selected elements

const Player0 = document.querySelector('.player--0');
const Player1 = document.querySelector('.player--1');
const Score1 = document.getElementById('score--0');
const Score2 = document.getElementById('score--1');
const currentSocreP1 = document.getElementById('current--0');
const currentScoreP2 = document.getElementById('current--1');

const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting Conditions
Score1.textContent = 0;
Score2.textContent = 0;
dice.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

let playing = true;

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  Player0.classList.toggle('player--active');
  Player1.classList.toggle('player--active');
};

// Rolling dice Functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. generating a random dice roll
    const RandomNumber = Math.trunc(Math.random() * 6) + 1;

    //   2.Display nice
    dice.classList.remove('hidden');
    // console.log(RandomNumber);
    dice.src = `dice-${RandomNumber}.png`;

    // 3.check for rolled 1: if true, switch to next player
    if (RandomNumber !== 1) {
      // Add dice to currnet score
      currentScore += RandomNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to another player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. add currnt score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. check if players score is >=100
    if (scores[activePlayer] >= 10) {
      // finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      dice.classList.add('hidden');
    } else {
      // switchPlayer
      switchPlayer();
    }
  }
});
