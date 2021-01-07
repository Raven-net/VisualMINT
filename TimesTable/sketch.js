let total;
let r;
let factor;

function setup() {
  createCanvas(640, 640);
  r = width / 2 - 16;
}

function getVector(index) {
  let angle = map(index % total, 0, total, 0, TWO_PI);
  let v = p5.Vector.fromAngle(angle + PI);
  v.mult(r);
  return v;
}

function draw() {
  background(0);
  // let delta = TWO_PI / total;
  total = floor(map(mouseX, 0, width, 0, 200));
  factor = map(mouseY, 0, height, 1, 200);

  translate(width / 2, height / 2);
  stroke(255);
  noFill();
  ellipse(0, 0, r*2);

  for (let i = 0; i < total; i++) {
    let v = getVector(i);
    fill(255);
    ellipse(v.x, v.y, 16, 16);
  }

  for (let i = 0; i < total; i++) {
    let a = getVector(i);
    let b = getVector(i * factor);
    line(a.x, a.y, b.x, b.y);
  }

}
