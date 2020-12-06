class Particle {
  constructor(x, y, r) {
    let options = {
      friction: 0.001,
      // restitution: 0.5,
    }
    x += random(-1, 1);
    this.body = Bodies.circle(x, y, r, options);
    World.add(world, this.body);
    this.r = r;
  }

  offScreen() {
    let x = this.body.position.x;
    let y = this.body.position.y;
    return (x < -50 || x > width + 50 || y > height + 50);
  }

  removeFromWorld() {
    World.remove(world, this.body);
  }

  show() {
    let pos = this.body.position;
    fill(255);
    push();
    translate(pos.x, pos.y);
    ellipse(0, 0, this.r * 2);
    pop();
  }
}
