const Ship = require("../models/ship.js");

describe("hit()", () => {
  test("Standard case", () => {
    const ship = new Ship(0, 0, 3, "vertical");
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  test("Throw error when ship is hit after it's sunk", () => {
    const ship = new Ship(0, 0, 1, "vertical");
    ship.hit();
    expect(() => ship.hit()).toThrow();
  });
});

describe("isSunk()", () => {
  test("True case", () => {
    const ship = new Ship(0, 0, 3, "vertical");
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });

  test("False case", () => {
    const ship = new Ship(0, 0, 1, "vertical");
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
