let Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

let engine;
let world;
let particles = [];
let plinkos = [];
let bounderies = [];
let rows = 7;
let cols = 8;

function setup() {
  var canvas = createCanvas(600, 600);
  engine = Engine.create();
  world = engine.world;
  world.gravity.y = 0.5;
  createNewParticle();
  let spacing = width / cols;
  for (j = 0; j < rows; j++) {
    for (i = 0; i < cols + 1; i++) {
      let x = spacing / 2 + i * spacing;
      if (j % 2 == 0) {
        x -= spacing / 2;
      }
      let y = spacing + j * spacing;
      let p = new Plinko(x, y, 5);
      plinkos.push(p);
    }
  }
  for (i = 0; i < cols + 1; i++) {
    let x = i * spacing;
    let y = 570;
    let b = new Boundery(x, y, 10, 60);
    bounderies.push(b);
  }
  bounderies.push(new Boundery(300, 630, 600, 60));
}

function createNewParticle() {
  let p = new Particle(300, 0, 8);
  particles.push(p);
}

function draw() {
  background(220);
  Engine.update(engine);
  if (frameCount % 30 == 0) {
    createNewParticle();
  }
  for (i = particles.length - 1; i >= 0; i--) {
    particles[i].show();
    if (particles[i].offScreen()) {
      particles[i].removeFromWorld();
      particles.splice(i, 1);
    }
  }
  for (i = 0; i < plinkos.length; i++) {
    plinkos[i].show();
  }
  for (i = 0; i < bounderies.length; i++) {
    bounderies[i].show();
  }


}
