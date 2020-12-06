let topoField;
let size = 60;
let particles = [];

function setup() {
  createCanvas(600, 600);
  topoField = new TopoField(size);
}

function draw() {
  background(255);
  topoField.show();
  //topoField.showVectorField();
  for (let particle of particles) {
    let i = floor(particle.pos.x * size / width);
    let j = floor(particle.pos.y * size / height);
    let gravity = p5.Vector.mult(topoField.forcefield[i][j], 0.1);
    let friction = p5.Vector.mult(particle.vel, -0.04);
    particle.applyForce(gravity);
    particle.applyForce(friction);
    particle.show();
    particle.update();
    if (particle.isDead()) {
      particles.splice(particles.indexOf(particle), 1);
    }
  }
}

function mousePressed() {
  particle = new Particle(mouseX, mouseY, 1);
  particles.push(particle);
}

function keyTyped() {
  if (key === 'c') {
    particles.pop();
  }
   return false;
}
