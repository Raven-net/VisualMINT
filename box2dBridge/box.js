class Box {
  constructor(x, y, w, h) {
    this.w = w;
    this.h = h;

    let bd = new box2d.b2BodyDef();
    bd.type = box2d.b2BodyType.b2_dynamicBody;
    bd.position = scaleToWorld(x, y);

    let fd = new box2d.b2FixtureDef();
    fd.shape = new box2d.b2PolygonShape();
    fd.shape.SetAsBox(scaleToWorld(this.w / 2), scaleToWorld(this.h / 2));

    fd.density = 1.0;
    fd.friction = 0.1;
    fd.restitution = 0.5;

    this.body = world.CreateBody(bd);
    this.body.CreateFixture(fd);


    this.body.SetLinearVelocity(new box2d.b2Vec2(random(-5, 5), random(2, 5)));
    this.body.SetAngularVelocity(random(-5, 5));
  }

  killBody() {
    world.DestroyBody(this.body);
  }

  done() {
    let pos = scaleToPixels(this.body.GetPosition());
    if (pos.y > height + this.w * this.h) {
      this.killBody();
      return true;
    }
    return false;
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
