class Rocket {
  constructor(dna) {
    this.pos = createVector(width / 2, height);
    this.vel = createVector();
    this.acc = createVector();
    this.completed = false;
    this.crashed = false;
    if (dna) {
      this.DNA = dna;
    } else {
      this.DNA = new DNA();
    }
    this.fitness = 0;
  }

  applyforce(force) {
    this.acc.add(force);
  }

  calcFitness() {
    let d = dist(this.pos.x, this.pos.y, target.x, target.y);

    this.fitness = map(d, 0, width, width, 0);
    if (this.completed) {
      this.fitness *= 10;
    }
    if (this.crashed) {
      this.fitness /= 10;
    }
  }

  update() {
    let d = dist(this.pos.x, this.pos.y, target.x, target.y);
    if (d < 10) {
      this.completed = true;
      this.pos = target.copy();
    }

    if (this.pos.x > rx && this.pos.x < rx + rw && this.pos.y > ry && this.pos.y < ry + rh) {
      this.crashed = true;
    }
    if (this.pos.x > width || this.pos.x < 0) {
      this.crashed = true;
    }
    if (this.pos.y > height || this.pos.y < 0) {
      this.crashed = true;
    }

    this.applyforce(this.DNA.genes[count]);
    if (!this.completed && !this.crashed) {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.vel.limit(4);
      this.acc.mult(0);
    }
  }

  show() {
    push();
    noStroke();
    fill(255, 150);
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rectMode(CENTER);
    rect(0, 0, 25, 5);
    pop();
  }
}
