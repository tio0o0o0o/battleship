const CLI = require("../utility/cli.js");
const GameView = require("../views/game-view.js");
const Board = require("../models/board.js");
const Player = require("../models/player.js");

class GameController {
  constructor(currentTurn, player1, player2) {
    this.currentTurn = currentTurn;
    this.player1 = player1;
    this.player2 = player2;
  }
}

module.exports = GameController;
