const SUITS = ["♥", "♦", "♠", "♣"];
const VALUES = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

// Deck class
export default class Deck {
  constructor(cards = freshDeck()) {
    this.cards = cards;
  }

  // No of cards in deck
  get numberOfCards() {
    return this.cards.length;
  }

  // Remove top card
  pop() {
    return this.cards.shift();
  }

  // Put card at the end of deck
  push(card) {
    this.cards.push(card);
  }

  // Shuffle cards in deck
  shuffle() {
    for (let i = this.numberOfCards - 1; i > 0; i--) {
      // Generate new random index
      const newIndex = Math.floor(Math.random() * (i + 1));
      // Get the value of card at index
      const oldValue = this.cards[newIndex];
      // Card at new index is card at i
      this.cards[newIndex] = this.cards[i];
      // Card at is i becomes card at new index
      this.cards[i] = oldValue;
    }
  }
}

// Card class
class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }

  // Color of card
  get color() {
    return this.suit === "♠" || this.suit === "♣" ? "black" : "red";
  }

  // Generate card dynamically
  getHTML(xOffset) {
    const cardDiv = document.createElement("div");
    cardDiv.innerText = this.suit;
    cardDiv.classList.add("card", this.color);
    cardDiv.style.left = `${xOffset}rem`;
    cardDiv.dataset.value = `${this.value} ${this.suit}`;
    return cardDiv;
  }
}

// Generate a fresh deck of cards
function freshDeck() {
  return SUITS.flatMap((suit) => {
    return VALUES.map((value) => {
      return new Card(suit, value);
    });
  });
}
