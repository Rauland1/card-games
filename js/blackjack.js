import Deck from "./deck.js";

// Initialize Blackjack
document.getElementById("blackjack-btn").addEventListener("click", () => {
  document.querySelector(".title").innerText = "Blackjack";
  document.querySelector(".war").style.display = "none";
  document.querySelector(".blackjack").style.display = "grid";
  hitButton.disabled = true;
  stayButton.disabled = true;
  // bank.innerText = 1000;
  // bet.innerText = 0;
  messageDiv.style.display = "block";
  cleanUp();
});

// Card Values
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
};

// Get DOM elements
const playerScoreText = document.querySelector(".player-score");
const computerScoreText = document.querySelector(".computer-score");
// const betButtonsDiv = document.querySelector(".bet-buttons");
const messageDiv = document.querySelector(".message");

// const bet = document.getElementById("bet");
// const bank = document.getElementById("bank");

const text = document.getElementById("bj--text");
const hitButton = document.getElementById("hit");
const stayButton = document.getElementById("stay");
const startButton = document.getElementById("start-game");
const dealerCardSlot = document.getElementById("bj--computer-slot");
const playerCardSlot = document.getElementById("bj--player-slot");

// Initialize variables
let deck, playerOffset, dealerOffset, playerTotal, dealerTotal, hiddenCardDiv;
let canHit = true;

// Arrays to hold card values
let playerHand = [];
let dealerHand = [];

// Start Game
function startGame() {
  console.clear();

  // betButtonsDiv.style.display = "none";
  messageDiv.style.display = "none";

  // New Deck
  deck = new Deck();

  // Shuffle two times just cause
  deck.shuffle();
  deck.shuffle();

  // Clear the board
  cleanUp();

  computerScoreText.innerText = "?";

  // Deal cards
  dealToPlayer();
  dealToDealer();
  dealToPlayer();
  dealToDealer();

  hitButton.disabled = false;
  stayButton.disabled = false;

  if (playerTotal === 21) {
    gameOver("You won on initial hand!");
  } else if (dealerTotal === 21) {
    revealCard();
    computerScoreText.innerText = dealerTotal;
    gameOver("Dealer won on initial hand!");
  }
}

// Listen for click events
startButton.addEventListener("click", () => {
  startGame();
});

hitButton.addEventListener("click", () => {
  if (canHit) dealToPlayer();

  if (playerTotal === 21) victory();
  else if (playerTotal > 21) bust();
});

stayButton.addEventListener("click", function dealerLoop() {
  canHit = false;

  revealCard();

  dealToDealer();
  computerScoreText.innerText = dealerTotal;

  if (dealerTotal >= 17 && dealerTotal <= 21) {
    if (playerTotal > dealerTotal) return victory();
    else if (playerTotal < dealerTotal) return bust();
    else return tie();
  } else if (dealerTotal < 17) {
    if (playerTotal < dealerTotal) {
      return bust();
    } else {
      setTimeout(dealerLoop, 1000);
    }
  } else {
    // If dealer hand > 21
    return victory();
  }
});

function revealCard() {
  if (!dealerCardSlot.contains(hiddenCardDiv))
    dealerCardSlot.replaceChild(hiddenCardDiv, dealerCardSlot.childNodes[1]);
}

// Deal cards to player
function dealToPlayer() {
  const playerCard = deck.pop();
  playerCardSlot.appendChild(playerCard.getHTML(playerOffset));
  playerHand.push(playerCard.value);

  playerTotal = calculateHand(playerHand);
  playerScoreText.innerText = playerTotal;
  playerOffset += 2.5;
}

// Deal cards to computer
function dealToDealer() {
  const dealerCard = deck.pop();

  dealerHand.push(dealerCard.value);
  dealerTotal = calculateHand(dealerHand);

  if (dealerHand.length === 2) {
    dealerCardSlot.appendChild(hiddenCard(dealerOffset));
    hiddenCardDiv = dealerCard.getHTML(dealerOffset);
  } else {
    dealerCardSlot.appendChild(dealerCard.getHTML(dealerOffset));
  }

  dealerOffset += 2.5;
}

// Create hidden card
function hiddenCard(offset) {
  const hiddenCard = document.createElement("div");
  hiddenCard.classList.add("card");
  hiddenCard.style.backgroundImage = "url('assets/deck_back.png')";
  hiddenCard.style.backgroundSize = "cover";
  hiddenCard.style.left = `${offset}rem`;
  hiddenCard.style.top = `${offset}rem`;
  return hiddenCard;
}

// Calculate the score of given hand
function calculateHand(hand) {
  let total,
    aces = 0;

  total = hand.reduce((acc, curr) => {
    if (curr !== "A") {
      return acc + CARD_VALUE_MAP[curr];
    } else {
      aces++;
      return acc;
    }
  }, 0);

  for (let i = 0; i < aces; i++) {
    if (total + 11 > 21) total += 1;
    else total += 11;
  }

  return total;
}

function victory() {
  gameOver("You won!");
}

function bust() {
  gameOver("You lost!");
}

function tie() {
  gameOver("It's a tie!");
}

function gameOver(msg) {
  hitButton.disabled = true;
  stayButton.disabled = true;
  text.innerText = msg;
  messageDiv.style.display = "block";
  // betButtonsDiv.style.display = "flex";
}

// Clean up the game
function cleanUp() {
  // Remove cards from slots
  playerCardSlot.innerHTML = "";
  dealerCardSlot.innerHTML = "";

  // Reset text
  computerScoreText.innerText = "";
  playerScoreText.innerText = "";
  text.innerText = "";

  // Reset variables
  canHit = true;
  playerOffset = 0;
  dealerOffset = 0;
  playerTotal = 0;
  dealerTotal = 0;
  playerHand = [];
  dealerHand = [];
}
