const GameView = require("../views/game-view.js");
const Board = require("../models/board.js");

describe("boardToTable()", () => {
  test("Standard case", () => {
    const board = new Board(4);
    board.placeShip(0, 0, 2, "horizontal");
    board.receiveAttack(0, 0);
    expect(GameView.boardToTable(board)).toEqual([
      ["hit", 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
  });
});
