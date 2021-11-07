var inc = 0.1;
var scl;
var cols;
var rows;
var zoff = 0;
var particles = [];
var flowField;

function setup() {
  createCanvas(windowWidth, windowHeight);
  if (width > height) {
    scl = width / 50;
  } else {
    scl = height / 50;
  }
  flowField = new Vectorfield(scl);
  flowField.initField();
  for (let i = 0; i < 2; i++){
    particles[i] = new Particle(random(width - 20), random(height - 20));
  }
}

function draw() {
  background(0);
  flowField.show();
  for(let i = 0; i < particles.length; i++){
    particles[i].follow(flowField.forcefield);
    particles[i].show();
    particles[i].update();
    particles[i].edges();
    if (!particles[i].life) {
      particles.splice(i, 1);
    }
  }
}

function mousePressed() {
  particle = new Particle(mouseX, mouseY);
  particles.push(particle);
}
