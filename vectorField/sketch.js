var inc = 0.1;
var scl;
var cols;
var rows;
var zoff = 0;
var particles = [];
var flowField;
var speed = 1;
var delbutton;
var gravbutton;
var centerbutton;
var grav = false;
var center = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  if (width > height) {
    scl = width / 50;
  } else {
    scl = height / 50;
  }
  delbutton = createButton('Reset');
  delbutton.position(30, 60);
  delbutton.mousePressed(delParticles);
  centerbutton = createButton('Center');
  centerbutton.position(30, 30);
  centerbutton.mousePressed(centerF);
  gravbutton = createButton('Grav');
  gravbutton.position(110, 30);
  gravbutton.mousePressed(gravF);

  flowField = new Vectorfield(scl);
  flowField.initField();
  for (let i = 0; i < 1; i++){
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

function delParticles() {
  particles = [];
}

function centerF() {
  center = true;
  grav = false;
  flowField.forcefield = [];
  flowField.initField();
}

function gravF() {
  grav = true;
  center = false;
  flowField.forcefield = [];
  flowField.initField();
}
