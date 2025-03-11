const Board = require("../models/board.js");

describe("placeShip()", () => {
  test("Standard case", () => {
    const board = new Board(10);
    board.placeShip(0, 0, 3, "vertical");
    expect(board.ships).toEqual([
      {
        x: 0,
        y: 0,
        length: 3,
        rotation: "vertical",
        hits: 0,
      },
    ]);
  });

  test("Place multiple ships", () => {
    const board = new Board(10);
    board.placeShip(0, 0, 3, "vertical");
    board.placeShip(9, 9, 1, "vertical");
    expect(board.ships).toEqual([
      {
        x: 0,
        y: 0,
        length: 3,
        rotation: "vertical",
        hits: 0,
      },
      {
        x: 9,
        y: 9,
        length: 1,
        rotation: "vertical",
        hits: 0,
      },
    ]);
  });

  test("Out of bounds case", () => {
    const board = new Board(10);
    expect(board.placeShip(9, 9, 2, "vertical")).toBe("outOfBounds");
    expect(board.placeShip(-1, -1, 2, "vertical")).toBe("outOfBounds");
  });

  test("Overlapping case 1", () => {
    const board = new Board(10);
    board.placeShip(0, 0, 1, "vertical");
    expect(board.placeShip(0, 0, 1, "vertical")).toBe("overlap");
  });

  test("Overlapping case 2", () => {
    const board = new Board(10);
    board.placeShip(9, 9, 0, "horizontal");
    board.placeShip(0, 1, 2, "horizontal");
    expect(board.placeShip(1, 0, 2, "vertical")).toBe("overlap");
  });

  test("Not overlapping case", () => {
    const board = new Board(10);
    board.placeShip(0, 1, 1, "vertical");
    expect(board.placeShip(0, 0, 1, "vertical")).not.toBe("overlap");
  });
});

describe("receiveAttack()", () => {
  test("Hit case 1", () => {
    const board = new Board(10);
    board.placeShip(0, 0, 1, "vertical");
    board.receiveAttack(0, 0);
    expect(board.ships[0].hits).toBe(1);
    expect(board.attacks[0]).toEqual({ x: 0, y: 0, result: "hit" });
  });

  test("Hit case 2", () => {
    const board = new Board(10);
    board.placeShip(0, 0, 2, "vertical");
    board.receiveAttack(0, 1);
    expect(board.ships[0].hits).toBe(1);
    expect(board.attacks[0]).toEqual({ x: 0, y: 1, result: "hit" });
  });

  test("Miss case", () => {
    const board = new Board(10);
    board.placeShip(0, 0, 1, "vertical");
    board.receiveAttack(0, 1);
    expect(board.ships[0].hits).toBe(0);
    expect(board.attacks[0]).toEqual({ x: 0, y: 1, result: "miss" });
  });

  test("Overlapping case", () => {
    const board = new Board(10);
    board.placeShip(0, 0, 1, "vertical");
    board.receiveAttack(0, 1);
    board.receiveAttack(0, 0);
    expect(board.receiveAttack(0, 1)).toBe("overlap");
    expect(board.receiveAttack(0, 0)).toBe("overlap");
    expect(board.attacks).toEqual([
      {
        x: 0,
        y: 1,
        result: "miss",
      },
      {
        x: 0,
        y: 0,
        result: "hit",
      },
    ]);
  });

  test("Out of bounds case", () => {
    const board = new Board(10);
    expect(board.receiveAttack(-1, -1)).toBe("outOfBounds");
    expect(board.receiveAttack(10, 10)).toBe("outOfBounds");
  });

  test("Returns correct results", () => {
    const board = new Board(10);
    board.placeShip(0, 0, 1, "vertical");
    board.placeShip(0, 9, 2, "horizontal");
    expect(board.receiveAttack(0, 1)).toEqual({
      result: "miss",
      isSunk: false,
      allSunk: false,
    });
    expect(board.receiveAttack(0, 0)).toEqual({
      result: "hit",
      isSunk: true,
      allSunk: false,
    });
    expect(board.receiveAttack(1, 9)).toEqual({
      result: "hit",
      isSunk: false,
      allSunk: false,
    });
    expect(board.receiveAttack(0, 9)).toEqual({
      result: "hit",
      isSunk: true,
      allSunk: true,
    });
  });
});
