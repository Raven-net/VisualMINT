let angle = 0;
let wave = [];

let slider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  slider = createSlider(1, 30, 1);
  slider.position(20, 10);
  slider.style('width', '100px');
}

function draw() {
  let ww = windowWidth;
  let wh = windowHeight;

  background(0);
  translate(ww / 4, wh / 2);

  let x = 0;
  let y = 0;

  // for (let i = 0; i < map(mouseX, 0, 800, 1, 20); i++) {
  for (let i = 0; i < slider.value(); i++) {
    let prevx = x;
    let prevy = y;

    let n = i * 2 + 1;
    let radius = wh / 9 * (4 / (n * PI));

    x += radius * cos(n * angle);
    y += radius * sin(n * angle);

    stroke(255, 100);
    noFill();
    ellipse(prevx, prevy, radius * 2);

    //fill(255);
    stroke(255);
    line(prevx, prevy, x, y);
    ellipse(x, y, 2);

  }
  wave.unshift(y);
  line(x, y, ww / 4, y);
  noFill();
  translate(ww / 4, 0);
  beginShape();
  for (i = 0; i < wave.length; i++) {
    vertex(i, wave[i]);
  }
  endShape();
  line(0, 0, ww / 2, 0);
  line(0, -wh / 4, 0, wh / 4);

  angle += 0.02;

  if (wave.length > ww / 2) {
    wave.pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  sinus = [];
  cosinus = [];
  angle = 0
}
