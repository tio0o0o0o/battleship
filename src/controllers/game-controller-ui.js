const GameViewUI = require("../views/game-view-ui.js");
const middle = document.querySelector(".middle");

let board = GameViewUI.createPlayerBoard();
middle.appendChild(board);
