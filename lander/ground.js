class Ground {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.leftGround = [];
    this.rightGround = [];

    let xoff = random(0, 100);
    for (let i = 0; i < this.pos.x - 20; i++) {
      let xval = i;
      let yval = noise(xoff) * 300 + 300;
      // this.leftGround.push({x: xval, y: yval});
      this.leftGround.push(createVector(xval, yval));
      xoff = xoff + 0.005;
    }
    this.pos.y = noise(xoff) * 300 + 295;
    for (let i = 0; i < width - (this.pos.x + 20); i++) {
      xoff = xoff + 0.005;
      let xval = this.pos.x + 20 + i;
      let yval = noise(xoff) * 300 + 300;
      // this.rightGround.push({x: xval, y: yval});
      this.rightGround.push(createVector(xval, yval));
    }
  }
  show() {
    noStroke();
    fill(200);
    beginShape();
    for (let pos of this.leftGround) {
      vertex(pos.x, pos.y);
    }
    vertex(this.leftGround[this.leftGround.length - 1].x + 20, this.leftGround[this.leftGround.length - 1].y);
    vertex(this.leftGround[this.leftGround.length - 1].x + 20, height);
    vertex(0, height);
    endShape(CLOSE);
    beginShape();
    for (let pos of this.rightGround) {
      vertex(pos.x, pos.y);
    }
    vertex(width, this.rightGround[this.rightGround.length - 1].y);
    vertex(width, height);
    vertex(this.rightGround[0].x - 25, height);
    vertex(this.rightGround[0].x - 25, this.rightGround[0].y);
    endShape(CLOSE);
    stroke(0);
    fill(200);
    rect(this.pos.x - 20, this.pos.y, 40, 10);
  }
}
