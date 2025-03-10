const Board = require("./board.js");

class Player {
  constructor(name, type, size) {
    this.name = name;
    this.type = type;
    this.board = new Board(size);
  }
}

module.exports = Player;
