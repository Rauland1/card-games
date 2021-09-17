import Deck from "./deck.js";

// Initialize Blackjack
document.getElementById("blackjack-btn").addEventListener("click", () => {
  document.querySelector(".title").innerText = "Blackjack";
  document.querySelector(".war").style.display = "none";
  document.querySelector(".blackjack").style.display = "grid";
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
  J: 10,
  Q: 10,
  K: 10,
  A: 11,
};

const computerDeckElement = document.getElementById("bj--computer-deck");
const dealerCardSlot = document.getElementById("bj--computer-slot");
const playerCardSlot = document.getElementById("bj--player-slot");

const hitButton = document.getElementById("hit");
const stayButton = document.getElementById("stay");

let deck, playerOffset, dealerOffset, playerTotal, dealerTotal;
let canHit = true;

function startGame() {
  deck = new Deck();
  deck.shuffle();
  canHit = true;
  playerOffset = 0;
  dealerOffset = 0;
  playerTotal = 0;
  dealerTotal = 0;

  cleanUp();

  dealToDealer();
  dealToPlayer();
  dealToDealer();
  dealToPlayer();
}

hitButton.addEventListener("click", () => {
  if (canHit) dealToPlayer();
});

stayButton.addEventListener("click", () => {
  canHit = false;
  beginDealerTurn();
});

function dealToPlayer() {
  const playerCard = deck.pop();
  playerCardSlot.appendChild(playerCard.getHTML(playerOffset));

  if (playerCard.value === "A" && playerTotal + 11 <= 21) playerTotal += 11;
  else if (playerCard.value === "A" && playerTotal + 11 > 21) playerTotal += 1;
  else playerTotal += CARD_VALUE_MAP[playerCard.value];

  playerOffset += 2.5;
  console.log("Player score: " + playerTotal);

  if (playerTotal === 21) {
    if (confirm("You WON")) startGame();
    else startGame();
  } else if (playerTotal > 21) {
    if (confirm("You LOST")) startGame();
    else startGame();
  }
}

function beginDealerTurn() {
  if (dealerTotal == 21) {
    if (confirm("Dealer WON")) startGame();
    else startGame();
  } else if (dealerTotal < 16) {
    dealToDealer();
  } else if (dealerTotal > 21) {
    if (confirm("You WON")) startGame();
    else startGame();
  } else {
    dealToDealer();
  }
}

function dealToDealer() {
  const dealerCard = deck.pop();
  dealerCardSlot.appendChild(dealerCard.getHTML(dealerOffset));
  dealerTotal += CARD_VALUE_MAP[dealerCard.value];

  dealerOffset += 2.5;
  console.log("Dealer score: " + dealerTotal);
}

function cleanUp() {
  playerCardSlot.innerHTML = "";
  dealerCardSlot.innerHTML = "";
}
