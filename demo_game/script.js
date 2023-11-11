import Game from "./sources/classes/Game.js";

const response = await fetch("/data.json");
const data = await response.json();

console.log();

window.game = new Game(data);

[].map((hi) => {
  hi + 10;
});

[].forEach((hi) => {
  return hi + 10;
});