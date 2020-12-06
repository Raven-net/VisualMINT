class Boundary {
  constructor(x, y, w, h, a) {
    this.w = w;
    this.h = h;
    this.angle = a;

    let bd = new box2d.b2BodyDef();
    bd.type = box2d.b2BodyType.b2_staticBody;
    bd.position = scaleToWorld(x, y);
    bd.angle = this.angle;

    let fd = new box2d.b2FixtureDef();
    fd.shape = new box2d.b2PolygonShape();
    fd.shape.SetAsBox(scaleToWorld(this.w / 2), scaleToWorld(this.h / 2));

    fd.density = 1.0;
    fd.friction = 0.1;
    fd.restitution = 0.5;

    this.body = world.CreateBody(bd);
    this.body.CreateFixture(fd);

  }

  display() {
    let pos = scaleToPixels(this.body.GetPosition());
    let a = this.body.GetAngleRadians();

    rectMode(CENTER);
    push();
    translate(pos.x, pos.y);
    rotate(a);
    fill(127);
    stroke(200);
    strokeWeight(2);
    rect(0, 0, this.w, this.h);
    pop();
  }
}
