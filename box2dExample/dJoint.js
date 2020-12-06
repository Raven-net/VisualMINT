class DJoint {
  // Pairs A and B with length, frequencyHz and dampingRatio
  constructor(pA, pB, length, freq, damp) {
    this.pA = pA;
    this.pB = pB;
    this.length = length;
    this.freq = freq;
    this.damp = damp;

    let djd = new box2d.b2DistanceJointDef();
    djd.bodyA = this.pA.body;
    djd.bodyB = this.pB.body;
    djd.length = scaleToWorld(this.length);
    djd.frequencyHz = this.freq;
    djd.dampingRatio = this.damp;

    this.dj = world.CreateJoint(djd);
  }

  display() {
    let pos1 = scaleToPixels(this.pA.body.GetPosition());
    let pos2 = scaleToPixels(this.pB.body.GetPosition());

    stroke(200);
    strokeWeight(2);
    line(pos1.x, pos1.y, pos2.x, pos2.y);
  }
}
