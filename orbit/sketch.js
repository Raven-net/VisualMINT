let mover;
let sun;
let pos;
let vel;
let acc;

class Sun {
  constructor (x, y) {
    this.pos = createVector(x, y);
  }
  show () {
    fill(color(200, 200, 0));
    ellipse(this.pos.x, this.pos.y, 50);
  }
  move () {
    if (mouseIsPressed) {
      this.pos.set(mouseX, mouseY);
    }
  }
}

class Mover {
  constructor (x, y, r, g, b, m) {
    this.pos = createVector(x, y);
    this.color = color(r, g, b);
    this.mass = m;
    this.vel = p5.Vector.random2D().setMag(3);
  }
  show () {
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.mass * 10);
  }
  update () {
    this.acc = p5.Vector.sub(sun.pos, this.pos);
    this.acc.setMag(0.1);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }
}

function drawArrow(base, vec, length) {
  let arrowVec = p5.Vector.mult(vec.normalize(), length);
  push();
  stroke(0);
  strokeWeight(2);
  fill(0);
  translate(base.x, base.y);
  line(0, 0, arrowVec.x, arrowVec.y);
  rotate(vec.heading());
  let arrowSize = 2;
  translate(arrowVec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("myp5");
// Create  Mover(x, y, red, green, blue, mass)
  mover1 = new Mover(4 * width / 10, 4 * height / 10, 0, 200, 200, 2);
  mover2 = new Mover(6 * width / 10, 6 * height / 10, 200, 0, 200, 3);
// Create  Sun(x, y)
  sun = new Sun(width / 2, height / 2);
}

function draw() {
  background(255);
  mover1.show();
  mover1.update();
  mover2.show();
  mover2.update();
  drawArrow(mover1.pos, mover1.acc, 15);
  drawArrow(mover2.pos, mover2.acc, 15);
  sun.show();
  sun.move();
}