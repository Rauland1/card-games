import Deck from "./deck.js";

// Initialize War
document.getElementById("war-btn").addEventListener("click", () => {
  document.querySelector(".title").innerText = "War";
  document.querySelector(".war").style.display = "grid";
  document.querySelector(".blackjack").style.display = "none";
  startGame();
});

const CARD_VALUE_MAP = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

const computerDeckElement = document.getElementById("war--computer-deck");
const computerCardSlot = document.getElementById("war--computer-slot");
const text = document.getElementById("war--text");
const playerDeckElement = document.getElementById("war--player-deck");
const playerCardSlot = document.getElementById("war--player-slot");

let playerDeck, computerDeck, inRound, stop;

playerDeckElement.addEventListener("click", () => {
  if (stop) {
    startGame();
    return;
  }

  if (inRound) {
    roundCleanup();
  } else {
    flipCards();
  }
});

function startGame() {
  const deck = new Deck();
  deck.shuffle();

  const deckMidpoint = Math.ceil(deck.numberOfCards / 2);
  playerDeck = new Deck(deck.cards.slice(0, deckMidpoint));
  computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards));
  inRound = false;
  stop = false;

  roundCleanup();
}

function roundCleanup() {
  inRound = false;
  computerCardSlot.innerHTML = "";
  playerCardSlot.innerHTML = "";
  text.innerHTML = "";

  updateDeckCount();
}

function flipCards() {
  inRound = true;

  const playerCard = playerDeck.pop();
  const computerCard = computerDeck.pop();

  playerCardSlot.appendChild(playerCard.getHTML(0));
  computerCardSlot.appendChild(computerCard.getHTML(0));

  updateDeckCount();

  if (isRoundWinnder(playerCard, computerCard)) {
    text.innerText = "Round Won";
    playerDeck.push(playerCard);
    playerDeck.push(computerCard);
  } else if (isRoundWinnder(computerCard, playerCard)) {
    text.innerText = "Round Lost";
    computerDeck.push(computerCard);
    computerDeck.push(playerCard);
  } else {
    text.innerText = "Draw";
    computerDeck.push(computerCard);
    playerDeck.push(playerCard);
  }

  if (isGameOver(playerDeck)) {
    text.innerText = "Game LOST";
    stop = true;
  } else if (isGameOver(computerDeck)) {
    text.innerText = "Game WON";
    stop = true;
  }
}

function updateDeckCount() {
  computerDeckElement.innerText = computerDeck.numberOfCards;
  playerDeckElement.innerText = playerDeck.numberOfCards;
}

function isRoundWinnder(cardOne, cardTwo) {
  return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value];
}

function isGameOver(deck) {
  return deck.numberOfCards === 0;
}
