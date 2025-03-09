class Ship {
  constructor(x, y, length, rotation) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.rotation = rotation;
    this.hits = 0;
  }

  isSunk() {
    return this.hits >= this.length;
  }

  hit() {
    if (this.isSunk()) throw new Error("Can not hit ship that has been sunk");
    this.hits += 1;
  }
}

module.exports = Ship;
