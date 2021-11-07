class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(0, 20), random(0, 20));
    this.acc = createVector(0, 0);
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
    stroke(0);
    circle(this.pos.x,this.pos.y, 20);

  }

  edges() {
    if (this.pos.x > width - 20) this.life = false;
    if (this.pos.x < 20) this.life = false;
    if (this.pos.y < 20) this.life = false;
    if (this.pos.y > height - 20) this.life = false;

    // if (this.pos.x > width - 20) this.pos.x = 20;
    // if (this.pos.x < 20) this.pos.x = width - 20;
    // if (this.pos.y < 20) this.pos.y = height - 20;
    // if (this.pos.y > height - 20) this.pos.y = 20;
  }//keep the particles inside the canvas

  follow(vectors) {
    var x = floor(this.pos.x / scl);//position in relationship to scale "vectr unit or grid"
    var y = floor(this.pos.y / scl);
    var force = vectors[y][x];
    this.applyForce(force);
  }
}
