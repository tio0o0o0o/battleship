class Line {
  constructor(vertex1X, vertex1Y, vertex2X, vertex2Y) {
    this.vertex1X = vertex1X;
    this.vertex1Y = vertex1Y;
    this.vertex2X = vertex2X;
    this.vertex2Y = vertex2Y;
  }

  static overlaps(line1, line2) {
    return (
      this.overlapsVertical(line1, line2) &&
      this.overlapsHorizontal(line1, line2)
    );
  }

  static overlapsVertical(line1, line2) {
    const hasOverlapLine1 =
      (line1.vertex1Y >= line2.vertex1Y && line1.vertex1Y <= line2.vertex1Y) ||
      (line1.vertex2Y >= line2.vertex1Y && line1.vertex2Y <= line2.vertex2Y);

    const hasOverlapLine2 =
      (line2.vertex1Y >= line1.vertex1Y && line2.vertex1Y <= line1.vertex1Y) ||
      (line2.vertex2Y >= line1.vertex1Y && line2.vertex2Y <= line1.vertex2Y);

    return hasOverlapLine1 || hasOverlapLine2;
  }

  static overlapsHorizontal(line1, line2) {
    const hasOverlapLine1 =
      (line1.vertex1X >= line2.vertex1X && line1.vertex1X <= line2.vertex1X) ||
      (line1.vertex2X >= line2.vertex1X && line1.vertex2X <= line2.vertex2X);

    const hasOverlapLine2 =
      (line2.vertex1X >= line1.vertex1X && line2.vertex1X <= line1.vertex1X) ||
      (line2.vertex2X >= line1.vertex1X && line2.vertex2X <= line1.vertex2X);

    return hasOverlapLine1 || hasOverlapLine2;
  }
}

module.exports = Line;
