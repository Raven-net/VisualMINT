let sun;


function setup() {
  createCanvas(800, 600);
  sun = new Planet(50, 0, 0);
  sun.spawnMoons(5, 1);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  sun.show();
  sun.orbit();
}
