const UI = require("../utility/ui.js");

class GameViewUI {
  static createPlayerBoard(boardData) {
    const board = UI.createElement({
      tag: "div",
      attributes: ["class", "board"],
      styles: {
        display: "grid",
        backgroundColor: "red",
        width: "auto",
        height: "100%",
        gridTemplateColumns: "repeat(10, 1fr)",
        gridTemplateRows: "repeat(10, 1fr)",
      },
    });

    return board;
  }

  createEnemyBoard() {}
}

module.exports = GameViewUI;
