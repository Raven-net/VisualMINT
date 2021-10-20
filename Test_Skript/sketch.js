function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  let ww = windowWidth;
  let wh = windowHeight;
  background(0, 100, 200);
  stroke(255);
  ellipse(ww / 2, wh / 2, wh / 4);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
