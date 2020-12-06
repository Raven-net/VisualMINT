let angle = 0;
let wave = [];

let slider;

function setup() {
  createCanvas(800, 600);
  slider = createSlider(1, 30, 1);
  slider.position(20, 10);
  slider.style('width', '100px');
}

function draw() {
  background(0);
  translate(200, 300);

  let x = 0;
  let y = 0;

  // for (let i = 0; i < map(mouseX, 0, 800, 1, 20); i++) {
  for (let i = 0; i < slider.value(); i++) {
    let prevx = x;
    let prevy = y;

    let n = i * 2 + 1;
    let radius = 70 * (4 / (n * PI));

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
  line(x, y, 200, y);
  noFill();
  translate(200, 0);
  beginShape();
  for (i = 0; i < wave.length; i++) {
    vertex(i, wave[i]);
  }
  endShape();
  line(0, 0, 400, 0);
  line(0, -150, 0, 150);

  angle += 0.02;

  if (wave.length > 400) {
    wave.pop();
  }
}
