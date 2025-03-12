const UI = require("../utility/ui.js");
const crossImg = require("../assets/images/cross.svg");
const dotImg = require("../assets/images/dot.svg");
const transparentImg = require("../assets/images/transparent.png");

class Board1Dict {
  static 0 = { backgroundColor: "white", icon: transparentImg };
  static 1 = { backgroundColor: "grey", icon: transparentImg };
  static miss = { backgroundColor: "white", icon: dotImg };
  static hit = { backgroundColor: "grey", icon: crossImg };
  static sunk = { backgroundColor: "red", icon: transparentImg };
}

class Board2Dict {
  static 0 = { backgroundColor: "white", icon: transparentImg };
  static 1 = { backgroundColor: "white", icon: transparentImg };
  static miss = { backgroundColor: "white", icon: dotImg };
  static hit = { backgroundColor: "grey", icon: crossImg };
  static sunk = { backgroundColor: "red", icon: transparentImg };
}

class GameView {
  constructor(board1, board2, checklist, status) {
    this.board1 = board1;
    this.board2 = board2;
    this.checklist = checklist;
    this.status = status;
  }

  static boardToTable(boardData) {
    const rows = [];
    for (let i = 0; i < boardData.size; i++) {
      const row = [];
      for (let i = 0; i < boardData.size; i++) {
        row.push(0);
      }
      rows.push(row);
    }
    boardData.ships.forEach((ship) => {
      if (ship.rotation === "vertical") {
        for (let i = 0; i < ship.length; i++) {
          rows[ship.y + i][ship.x] = 1;
        }
      }
      if (ship.rotation === "horizontal") {
        for (let i = 0; i < ship.length; i++) {
          rows[ship.y][ship.x + i] = 1;
        }
      }
    });
    boardData.attacks.forEach((attack) => {
      rows[attack.y][attack.x] = attack.result;
    });
    boardData.ships.forEach((ship) => {
      if (ship.isSunk()) {
        if (ship.rotation === "vertical") {
          for (let i = 0; i < ship.length; i++) {
            rows[ship.y + i][ship.x] = "sunk";
          }
        }
        if (ship.rotation === "horizontal") {
          for (let i = 0; i < ship.length; i++) {
            rows[ship.y][ship.x + i] = "sunk";
          }
        }
      }
    });
    return rows;
  }

  updatePlayerBoard(boardData) {
    UI.removeChildElements(this.board1);
    const grid = UI.createElement({
      tag: "div",
      attributes: ["class", "grid1"],
      styles: {
        height: "100%",
        display: "grid",
        gridTemplateColumns: `repeat(${boardData.size}, 1fr)`,
        gridTemplateRows: `repeat(${boardData.size}, 1fr)`,
      },
      parent: this.board1,
    });
    const boardTable = GameView.boardToTable(boardData);
    for (let rowI = boardTable.length - 1; rowI >= 0; rowI--) {
      const row = boardTable[rowI];
      row.forEach((cell, columnI) => {
        UI.createElement({
          tag: "img",
          attributes: [
            "class",
            "cell1",
            "data-x",
            columnI,
            "data-y",
            rowI,
            "src",
            Board1Dict[cell].icon,
          ],
          parent: grid,
          styles: {
            width: "100%",
            height: "100%",
            border: "1px solid black",
            backgroundColor: Board1Dict[cell].backgroundColor,
          },
        });
      });
    }
  }

  updateComputerBoard(boardData) {
    UI.removeChildElements(this.board2);
    const grid = UI.createElement({
      tag: "div",
      attributes: ["class", "grid2"],
      styles: {
        height: "100%",
        display: "grid",
        gridTemplateColumns: `repeat(${boardData.size}, 1fr)`,
        gridTemplateRows: `repeat(${boardData.size}, 1fr)`,
      },
      parent: this.board2,
    });
    const boardTable = GameView.boardToTable(boardData);
    for (let rowI = boardTable.length - 1; rowI >= 0; rowI--) {
      const row = boardTable[rowI];
      row.forEach((cell, columnI) => {
        UI.createElement({
          tag: "img",
          attributes: [
            "class",
            "cell2",
            "data-x",
            columnI,
            "data-y",
            rowI,
            "src",
            Board2Dict[cell].icon,
          ],
          parent: grid,
          styles: {
            width: "100%",
            height: "100%",
            border: "1px solid black",
            backgroundColor: Board2Dict[cell].backgroundColor,
          },
        });
      });
    }
  }

  updateChecklist() {}
}

module.exports = GameView;
