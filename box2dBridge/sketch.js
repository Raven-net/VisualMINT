let world;

let boxes = [];
let particles = [];
let boundaries = [];
let dJoints = [];

function setup() {
  createCanvas(800, 600);

  world = createWorld();

  for (let i = 0; i < 40; i++) {
    particles.push(new Particle(i * 20, 300, 10));
  }

  let leftFix = new Boundary(0, 300, 10, 10, 0);
  let rightFix = new Boundary(width, 300, 10, 10, 0);

  let fix1 = new DJoint(particles[0], leftFix, 20, 0, 0.9);
  let fix2 = new DJoint(particles[particles.length - 1], rightFix, 20, 0, 0.9);

  let prev = particles[0];
  for (let i = 1; i < 40; i++) {
    dJoints.push(new DJoint(particles[i], prev, 20, 0, 0.9));
    prev = particles[i];
  }
}

function draw() {
  background(51);

  let timeStep = 1.0 / 30;
  // Step(timestep, velocity iteration, position iteration)
  world.Step(timeStep, 10, 10);

  if (mouseIsPressed) {
    let b = new Box(mouseX, mouseY, random(4, 16), random(4, 16));
    boxes.push(b);
  }

  for (let i = 0; i < dJoints.length; i++) {
    dJoints[i].display();
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].display();
  }

  for (let i = boxes.length - 1; i >= 0; i--) {
    boxes[i].display();
    if (boxes[i].done()) {
      boxes.splice(i, 1);
    }
  }
}
