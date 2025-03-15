const Ship = require("./ship.js");
const Line = require("../utility/line.js");
const Attack = require("./attack.js");

class Board {
  constructor(size = 10) {
    this.size = size;
    this.ships = [];
    this.attacks = [];
  }

  notAttacked() {
    let notAttacked = [];

    for (let i = 0; i < this.size; i++) {
      for (let ii = 0; ii < this.size; ii++) {
        notAttacked.push({ x: i, y: ii });
      }
    }

    notAttacked = notAttacked.filter((notAttackedElement) => {
      return (
        this.attacks.find((attacksElement) => {
          return (
            attacksElement.x === notAttackedElement.x &&
            attacksElement.y === notAttackedElement.y
          );
        }) === undefined
      );
    });

    return notAttacked;
  }

  placeShip(x, y, length, rotation) {
    // Out of bounds case
    if (x < 0 || y < 0) throw new Error("Out of bounds");
    if (
      rotation === "vertical" &&
      (y + length - 1 > this.size - 1 || x > this.size - 1)
    ) {
      throw new Error("Out of bounds");
    }
    if (
      rotation === "horizontal" &&
      (x + length - 1 > this.size - 1 || y > this.size - 1)
    ) {
      throw new Error("Out of bounds");
    }

    // Overlapping case
    let line1;
    if (rotation === "vertical") line1 = new Line(x, y, x, y + length - 1);
    if (rotation === "horizontal") line1 = new Line(x, y, x + length - 1, y);
    for (const ship of this.ships) {
      let line2;
      if (ship.rotation === "vertical")
        line2 = new Line(ship.x, ship.y, ship.x, ship.y + ship.length - 1);
      if (ship.rotation === "horizontal")
        line2 = new Line(ship.x, ship.y, ship.x + ship.length - 1, ship.y);
      if (Line.overlaps(line1, line2)) {
        throw new Error("Overlap");
      }
    }

    this.ships.push(new Ship(x, y, length, rotation));
  }

  receiveAttack(x, y) {
    // Overlapping case
    for (const attack of this.attacks) {
      if (x === attack.x && y === attack.y) throw new Error("Overlapping");
    }

    // Out of bounds case
    if (x < 0 || x > this.size - 1 || y < 0 || y > this.size - 1) {
      throw new Error("Out of bounds");
    }

    const attackPoint = new Line(x, y, x, y);
    for (const ship of this.ships) {
      let shipLine;
      if (ship.rotation === "vertical") {
        shipLine = new Line(ship.x, ship.y, ship.x, ship.y + ship.length - 1);
      }
      if (ship.rotation === "horizontal") {
        shipLine = new Line(ship.x, ship.y, ship.x + ship.length - 1, ship.y);
      }
      if (Line.overlaps(attackPoint, shipLine)) {
        ship.hit();
        this.attacks.push(new Attack(x, y, "hit"));
        return {
          result: "hit",
          isSunk: ship.isSunk(),
          allSunk: this.allSunk(),
        };
      }
    }
    this.attacks.push(new Attack(x, y, "miss"));
    return { result: "miss", isSunk: false, allSunk: this.allSunk() };
  }

  allSunk() {
    for (const ship of this.ships) {
      if (!ship.isSunk()) return false;
    }
    return true;
  }
}

module.exports = Board;
