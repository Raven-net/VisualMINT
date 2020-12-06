class Lander {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.bottom = createVector(x, y + 30);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
  }
  show() {
    fill(200);
    triangle(this.pos.x, this.pos.y, this.pos.x - 10, this.pos.y + 30, this.pos.x + 10, this.pos.y + 30);
    if (keyIsDown(LEFT_ARROW)) {
      line(this.bottom.x + 5, this.bottom.y - 10, this.bottom.x + 25, this.bottom.y - 10);
      line(this.bottom.x + 5, this.bottom.y - 15, this.bottom.x + 20, this.bottom.y - 15);
      line(this.bottom.x + 5, this.bottom.y - 5, this.bottom.x + 20, this.bottom.y - 5);
    }
    if (keyIsDown(RIGHT_ARROW)) {
      line(this.bottom.x - 5, this.bottom.y - 10, this.bottom.x - 25, this.bottom.y - 10);
      line(this.bottom.x - 5, this.bottom.y - 15, this.bottom.x - 20, this.bottom.y - 15);
      line(this.bottom.x - 5, this.bottom.y - 5, this.bottom.x - 20, this.bottom.y - 5);
    }
    if (keyIsDown(UP_ARROW)) {
      line(this.bottom.x, this.bottom.y, this.bottom.x, this.bottom.y + 20);
      line(this.bottom.x + 5, this.bottom.y, this.bottom.x + 5, this.bottom.y + 15);
      line(this.bottom.x - 5, this.bottom.y, this.bottom.x - 5, this.bottom.y + 15);
    }
  }
  values() {
    textSize(15);
    fill(0);
    text(`Geschindigkeit: ${this.vel.mag().toFixed(2)}`, 600, 30);
    text(`Höhe: ${Math.round((ground.pos.y - this.bottom.y) * 100) / 100}`, 600, 50);
    text(`Leben: ${lifes}`, 600, 70);
  }
  applyForce(force) {
    this.acc.add(force);
  }
  move() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
    this.bottom.set(this.pos.x, this.pos.y + 30);
  }
  edges() {
    if (this.pos.y >= 600) {
      this.pos.y = 300;
      this.pos.x = 400;
      this.vel.set(0, 0);
      lostLife = true;
    }
    if (this.pos.x >= 800 || this.pos.x <= 0) {
      this.pos.y = 300;
      this.pos.x = 400;
      this.vel.set(0, 0);
      lostLife = true;
    }
  }
}
