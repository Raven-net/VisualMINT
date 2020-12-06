class Circle {
  constructor(x, y, r, fixed) {
  let options = {
    // torque: 0.3,
    friction: 0,
    restitution: 0.2,
    isStatic: fixed,
  }
  this.body = Bodies.circle(x, y, r, options);
  this.pos = createVector(this.body.position.x, this.body.position.y);
  this.r = r;
  World.add(world, this.body);
  }

  isOffScreen() {
    let pos = this.body.position;
    // return pos.y >= 600;
    if (pos.y <= 0 || pos.y >= 600) {
      return true;
    } else if (pos.x <= 0 || pos.x >= 800) {
      return true;
    } else {
      return false;
    }
  }

  removeFromWorld() {
    World.remove(world, this.body);
  }

  show() {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    strokeWeight(2);
    stroke(255);
    fill(125);
    ellipse(0, 0, this.r * 2);
    // line(0, 0, this.r, 0);
    pop();

  }
}
