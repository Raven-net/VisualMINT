let angle = 0;
let sinus = [];
let cosinus = [];
let slider1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  slider1 = createSlider(0, 0.1, 0, 0.005);
  slider1.position(20, 10);
  slider1.style('width', '150px');
}

function draw() {
  let ww = windowWidth;
  let wh = windowHeight;
  let val = slider1.value();
  background(0);
  translate(ww * 3 / 12, wh / 2);
  let radius = ww / 6;
  stroke(255);
  noFill();
  ellipse(0, 0, radius * 2);

  let x = radius * cos(angle);
  let y = radius * sin(angle);
  sinus.unshift(y);
  cosinus.unshift(-x);
  fill(255);
  line(0, 0, x, y);
  ellipse(x, y, 5);
  ellipse(x, 0, 5);

  stroke(255, 0, 0);
  line(x, y, x, 0);
  stroke(255);

  line(x, y, ww * 3 / 12, y);

  // hier fehlen weitere Inhalte

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
