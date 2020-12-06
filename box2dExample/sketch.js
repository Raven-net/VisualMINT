let world;

let boxes = [];
let particles = [];
let boundaries = [];
let surface;
let dJoint;
let mJoint;

function setup() {
  createCanvas(800, 600);

  world = createWorld();
  surface = new Surface();

  boundaries.push(new Boundary(width / 4, height - 150, width / 2 + 100, 10, HALF_PI / 4));
  boundaries.push(new Boundary(3 * width / 4, height - 350, width / 2 + 100, 10, -HALF_PI / 4));

  particles.push(new Particle(width / 2, 10, random(4, 16)));

  let b = new Box(width / 2, 30, random(4, 16), random(4, 16));
  boxes.push(b);

  dJoint = new DJoint(particles[0], boxes[0], 30, 1, 0.5);

  mJoint = new MJoint();
}

function draw() {
  background(51);

  let timeStep = 1.0 / 30;
  // Step(timestep, velocity iteration, position iteration)
  world.Step(timeStep, 10, 10);

  mJoint.update(mouseX, mouseY);
  mJoint.display();

  surface.display();

  dJoint.display();

  for (let i = 0; i < boundaries.length; i++) {
    boundaries[i].display();
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].display();
    if (particles[i].done()) {
      particles.splice(i, 1);
    }
  }

  for (let i = boxes.length - 1; i >= 0; i--) {
    boxes[i].display();
    if (boxes[i].done()) {
      boxes.splice(i, 1);
    }
  }
}

function mouseReleased() {
  mJoint.destroy();
}

function mousePressed() {
  if (boxes[0].contains(mouseX, mouseY)) {
    mJoint.bind(mouseX, mouseY, boxes[0]);
  }
}
