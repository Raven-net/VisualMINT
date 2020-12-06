class Boundery {
  constructor(x, y, w, h, a) {
    let options = {
      isStatic: true,
      angle: a,
      friction: 0.1,
    }
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    World.add(world, this.body);
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
    fill(0);
    rect(0, 0, this.w, this.h);
    pop();

  }
}
