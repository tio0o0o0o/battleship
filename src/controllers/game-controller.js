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

  async humanTurn() {
    let input;
    let attackResult;
    while (true) {
      console.clear();
      GameView.printBoards(this.player1, this.player2);
      input = await CLI.promptAsync("Enter target [x, y]: ");
      if (input.match(/^\d+, \d+$/)) {
        const [x, y] = input.split(", ");
        attackResult = this.player2.board.receiveAttack(x, y);
        if (attackResult === "overlap") {
          await CLI.promptAsync("You have already attacked there! ");
        } else if (attackResult === "outOfBounds") {
          await CLI.promptAsync("Coordinates are out of bounds! ");
        } else break;
      } else {
        await CLI.promptAsync("Enter valid coordinates! ");
      }
    }
    console.clear();
    GameView.printBoards(this.player1, this.player2);
    if (attackResult.allSunk) {
      await CLI.promptAsync("You won the game! ");
      return "allSunk";
    } else if (attackResult.isSunk) {
      await CLI.promptAsync("You sunk an enemy ship! ");
      return "sunk";
    } else if (attackResult.result === "hit") {
      await CLI.promptAsync("You hit a ship! ");
      return "hit";
    } else if (attackResult.result === "miss") {
      await CLI.promptAsync("You missed! ");
      return "miss";
    }
  }

  async playGame() {
    while (true) {
      await this.humanTurn();
    }
  }
}

module.exports = GameController;
