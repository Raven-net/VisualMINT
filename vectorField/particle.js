class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-6 * speed, 6 * speed), random(-6 * speed, 6 * speed));
    this.acc = createVector(0, 0);
    this.imgX = [];
    this.imgY = [];
    this.life = true;
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);//Reset acceleration
    // this.vel.limit(1);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  show() {

// Bahnkurve
    this.imgX.unshift(this.pos.x);
    this.imgY.unshift(this.pos.y);
    if (this.imgX.length > 100) {
      this.imgX.pop();
      this.imgY.pop();
    }

    noFill();
    strokeWeight(3);
    let alpha = 255;
    beginShape(POINTS);
    let i;
    for (i = 0; i < this.imgX.length; i++) {
      vertex(this.imgX[i], this.imgY[i]);
      stroke(255, 255, 255, alpha);
      alpha -= 2;
      if (alpha < 1) {
        alpha = 255;
      }
    }
    endShape();
    strokeWeight(1);
    fill(255);

    stroke(0);
    circle(this.pos.x,this.pos.y, 20);

  }

  edges() {
    if (this.pos.x > width - 20) this.life = false;
    if (this.pos.x < 20) this.life = false;
    if (this.pos.y < 20) this.life = false;
    if (this.pos.y > height - 30) this.life = false;

    // if (this.pos.x > width - 20) this.pos.x = 20;
    // if (this.pos.x < 20) this.pos.x = width - 20;
    // if (this.pos.y < 20) this.pos.y = height - 20;
    // if (this.pos.y > height - 20) this.pos.y = 20;
  }

  follow(vectors) {
    var x = floor(this.pos.x / scl);//position in relationship to scale "vectr unit or grid"
    var y = floor(this.pos.y / scl);
    var force = vectors[y][x];
    this.applyForce(force);
  }


}
