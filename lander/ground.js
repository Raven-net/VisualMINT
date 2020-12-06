class Ground {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.r1 = random(300, 600);
    this.r2 = random(300, 600);
    this.r3 = random(300, 600);
    this.r4 = random(300, 600);
    this.r5 = random(300, 600);
    this.r6 = random(300, 600);
  }
  show() {
    fill(200);
    rect(this.pos.x, this.pos.y, 50, 10);
    let stepL = this.pos.x / 3;
    let stepR = (width - (this.pos.x + 50)) / 3;

    noFill();
    beginShape();
    curveVertex(0, this.r1);
    curveVertex(0, this.r1);
    curveVertex(stepL, this.r2);
    curveVertex(stepL * 2, this.r3);
    curveVertex(this.pos.x, this.pos.y + 10);
    curveVertex(this.pos.x + 50, this.pos.y + 10);
    endShape();
    noFill();
    beginShape();
    curveVertex(this.pos.x, this.pos.y + 10);
    curveVertex(this.pos.x + 50, this.pos.y + 10);
    curveVertex(this.pos.x + 50 + stepR, this.r4);
    curveVertex(this.pos.x + 50 + stepR * 2, this.r5);
    curveVertex(width, this.r6);
    curveVertex(width, this.r6);
    endShape();
  }
}
