class Particle {
  constructor (x, y, mass) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.mass = mass;
    this.color = color(255);
    this.r = sqrt(this.mass) * 5;
  }

  show () {
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, 2 * this.r);
  }

  offscreen () {
    if (this.pos.y >= 580 || this.pos.y <= 20) {
      return true;
    } else if (this.pos.x >= 580 || this.pos.x <= 20) {
      return true;
    } else {
      return false;
    }
  }

  isDead () {
    if (this.offscreen()) {
      return true;
    } else {
      return false;
    }
  }

  applyForce (force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  update () {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }
}
