class Plinko {
  constructor(x, y, r) {
    let options = {
      friction: 0,
      // restitution: 1,
      isStatic: true,
    }
    this.body = Bodies.circle(x, y, r, options);
    World.add(world, this.body);
    this.r = r;
  }
  show() {
    let pos = this.body.position;
    fill(0, 255, 0);
    push();
    translate(pos.x, pos.y);
    ellipse(0, 0, this.r * 2);
    pop();
  }
}
