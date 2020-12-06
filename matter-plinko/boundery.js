class Boundery {
  constructor(x, y, w, h) {
    let options = {
      isStatic: true,
    }
    this.body = Bodies.rectangle(x, y, w, h, options);
    World.add(world, this.body);
    this.w = w;
    this.h = h;
  }

  show() {
    this.pos = this.body.position;
    push();
    fill(255);
    stroke(0);
    translate(this.pos.x, this.pos.y);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
  }
}
