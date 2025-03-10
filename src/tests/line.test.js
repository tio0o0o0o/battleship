const Line = require("../utility/line.js");

describe("overlaps()", () => {
  test("Overlapping case", () => {
    const line1 = new Line(0, 5, 10, 5);
    const line2 = new Line(5, 0, 5, 10);
    expect(Line.overlaps(line1, line2)).toBe(true);
  });
  test("Not overlapping case", () => {
    const line1 = new Line(0, 0, 10, 0);
    const line2 = new Line(0, 1, 10, 1);
    expect(Line.overlaps(line1, line2)).toBe(false);
  });
});
