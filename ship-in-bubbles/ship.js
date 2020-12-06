class Ship {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.dir = createVector(0, -1).normalize();
    this.mass = 1;
    this.fuelColor = color(0, 0, 0);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
    this.vel.limit(3);
  }

  applyForce(force) {
    let newAcc = p5.Vector.div(force, this.mass);
    this.acc.add(newAcc);
  }

  edges() {
    if (this.pos.y >= height) {
      this.pos.y = 0;
    } else if (this.pos.y <= 0) {
      this.pos.y = height;
    } else if (this.pos.x <= 0) {
      this.pos.x = width;
    } else if (this.pos.x >= width) {
      this.pos.x = 0;
    }
  }

  rotate(direction) {
    let angle = PI / 60;
    if (direction == 'r') {
      this.dir.x = this.dir.x * cos(angle) - this.dir.y * sin(angle);
      this.dir.y = this.dir.x * sin(angle) + this.dir.y * cos(angle);
      this.dir.normalize();
    } else if (direction == 'l') {
      this.dir.x = this.dir.x * cos(angle * -1) - this.dir.y * sin(angle * -1);
      this.dir.y = this.dir.x * sin(angle * -1) + this.dir.y * cos(angle * -1);
      this.dir.normalize();
    }
  }

  show() {
    let left = createVector(this.dir.y * -1, this.dir.x);
    let right = createVector(this.dir.y, this.dir.x * -1);
    let nose = p5.Vector.add(this.pos, p5.Vector.mult(this.dir, 15));
    let bottom = p5.Vector.sub(this.pos, p5.Vector.mult(this.dir, 15));
    let fuel = p5.Vector.sub(bottom, p5.Vector.mult(this.dir, this.acc.mag() * 100));
    let leftWing = p5.Vector.add(bottom, p5.Vector.mult(left, 10));
    let rightWing = p5.Vector.add(bottom, p5.Vector.mult(right, 10));
    triangle(nose.x, nose.y, leftWing.x, leftWing.y, rightWing.x, rightWing.y);
    fill(color(255, 0, 0));
    triangle(fuel.x, fuel.y, leftWing.x, leftWing.y, rightWing.x, rightWing.y);
    noFill();
  }
}
