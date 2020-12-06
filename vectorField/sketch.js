var inc = 0.1;
var scl = 17;
var cols;
var rows;
var zoff = 0;
var particles = [];
var flowField;

function setup() {
  createCanvas(800, 600);
  flowField = new Vectorfield(scl);
  flowField.initField();
  for (let i = 0; i < 100; i++){
    particles[i] = new Particle(random(width - 20), random(height - 20));//start object
  }
}

function draw() {
  background(255);
  flowField.show();
  //addParticles();
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
