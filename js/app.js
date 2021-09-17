import Blackjack from "./blackjack.js";
import War from "./war.js";

// Initialize War
document.getElementById("war-btn").addEventListener("click", () => {
  document.querySelector(".title").innerText = "War";
  document.querySelector(".war").style.display = "grid";
  document.querySelector(".blackjack").style.display = "none";

  const war = new War();
  war.startGame();
});

// Initialize Blackjack
document.getElementById("blackjack-btn").addEventListener("click", () => {
  document.querySelector(".title").innerText = "Blackjack";
  document.querySelector(".war").style.display = "none";
  document.querySelector(".blackjack").style.display = "grid";

  const blackjack = new Blackjack();
  blackjack.startGame();
});
