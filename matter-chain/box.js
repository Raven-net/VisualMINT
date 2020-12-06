class Box {
  constructor(x, y, w, h) {
  let options = {
    // torque: 0.3,
    friction: 0.1,
    restitution: 0.2,
  }
  this.body = Bodies.rectangle(x, y, w, h, options);
  this.pos = createVector(this.body.position.x, this.body.position.y);
  this.w = w;
  this.h = h;
  World.add(world, this.body);
  }

  clicked() {
    let mouse = createVector(mouseX, mouseY)
    let d = p5.Vector.dist(mouse, this.pos);
    if (d < 20) {
      this.body.position.x = mouseX;
      this.body.position.y = mouseY;
    }
  }

  show() {
    var pos = this.body.position;
    var angle = this.body.angle;


    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    strokeWeight(1);
    stroke(255);
    fill(0, 125, 0);
    rect(0, 0, this.w, this.h);
    pop();

  }
}
