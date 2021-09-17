import Deck from "./deck.js";

const CARD_VALUE_MAP = {
  A: 1,
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

export default class Blackjack {
  startGame() {
    const deck = new Deck();
    deck.shuffle();
  }
}
