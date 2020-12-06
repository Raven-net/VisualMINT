
let world;
let particles = [];
let surface;
let mJoint;

function setup() {
  createCanvas(640, 360);

  // Initialize box2d physics and create the world
  world = createWorld();

  // Create the surface
  surface = new Surface();

  // Create Particles
  particles.push(new Particle(width / 2, 30, 10, 10, true));
  for (let i = 1; i < 17; i++) {
    particles.push(new Particle(width / 2 + i * 20, 30, 25, 7, false));
  }

  // Create Joints
  let prev = particles[1].body;
  for (let i = 2; i < 17; i++) {
    let jd = new box2d.b2RevoluteJointDef();
    jd.collideConnected = false;
    let anchor = new box2d.b2Vec2(scaleToWorld(width / 2 + i * 20 - 10), scaleToWorld(30));
    jd.Initialize(prev, particles[i].body, anchor);
    world.CreateJoint(jd);
    prev = particles[i].body;
  }
  let jd = new box2d.b2RevoluteJointDef();
  jd.collideConnected = false;
  let anchor = new box2d.b2Vec2(scaleToWorld(width / 2), scaleToWorld(30));
  jd.Initialize(particles[0].body, particles[1].body, anchor);
  world.CreateJoint(jd);

  mJoint = new MJoint();
}

function draw() {
  background(51);

  // m_joint.SetLinearOffset(linearOffset);
  // m_joint.SetAngularOffset(angularOffset);

  // We must always step through time!
  let timeStep = 1.0 / 30;
  // 2nd and 3rd arguments are velocity and position iterations
  world.Step(timeStep, 10, 10);

  mJoint.update(mouseX, mouseY);
  mJoint.display();
  // Draw the surface
  surface.display();

  // Display all the particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].display();
    if (particles[i].done()) {
      particles.splice(i, 1);
    }
  }
}

function mouseReleased() {
  mJoint.destroy();
}

function mousePressed() {
  for (let i = 0; i < particles.length; i++){
    if (particles[i].contains(mouseX, mouseY)) {
      mJoint.bind(mouseX, mouseY, particles[i]);
    }
  }

}
