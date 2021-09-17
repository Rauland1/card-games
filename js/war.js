import Deck from "./deck.js";

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

const computerCardSlot = document.querySelector(".computer-card-slot");
const playerCardSlot = document.querySelector(".player-card-slot");
const computerDeckElement = document.querySelector(".computer-deck");
const playerDeckElement = document.querySelector(".player-deck");
const text = document.querySelector(".text");

let playerDeck, computerDeck, inRound, stop;

export default class War {
  startGame() {
    const deck = new Deck();
    deck.shuffle();

    const deckMidpoint = Math.ceil(deck.numberOfCards / 2);
    playerDeck = new Deck(deck.cards.slice(0, deckMidpoint));
    computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards));
    inRound = false;
    stop = false;

    roundCleanup();
  }
}

document.querySelector(".war").addEventListener("click", () => {
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

  playerCardSlot.appendChild(playerCard.getHTML());
  computerCardSlot.appendChild(computerCard.getHTML());

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
