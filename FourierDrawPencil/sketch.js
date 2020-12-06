const USER = 0;
const FOURIER = 1;

let x = [];
let fourierX;

let y = [];
let fourierY;

let time = 0;
let path = [];
let drawing = [];
let state = -1;

let slider1;

function mousePressed() {
  state = USER;
  drawing = [];
  x = [];
  y = [];
  path = [];
  time = 0;
}

function mouseReleased() {
  state = FOURIER;
  const skip = 1;
  for (let i = 0; i < drawing.length; i += skip) {
    x.push(drawing[i].x);
    y.push(drawing[i].y);
  }
  fourierY = dft(y);
  fourierX = dft(x);

  fourierX.sort((a,b) => b.amp - a.amp);
  fourierY.sort((a,b) => b.amp - a.amp);
}

function setup() {
  createCanvas(800, 600);
state = -1;

  // slider1 = createSlider(1, fourierX.length, 2);
  // slider1.position(100, 570);
  // slider1.style('width', '600px');
}

function epicycles(x, y, rotation, fourier) {
  // let val = slider1.value();
  // for (let i = 0; i < val; i++) {
  for (let i = 0; i < fourier.length; i++) {
    let prevx = x;
    let prevy = y;

    let freq = fourier[i].freq;
    let radius = fourier[i].amp;
    let phase = fourier[i].phase;

    x += radius * cos(freq * time + phase + rotation);
    y += radius * sin(freq * time + phase + rotation);

    stroke(255, 100);
    noFill();
    ellipse(prevx, prevy, radius * 2);

    stroke(255);
    line(prevx, prevy, x, y);
    ellipse(x, y, 2);

  }
  return createVector(x, y);
}

function draw() {
  background(0);

  if (state == USER) {
    let point = createVector(mouseX - width / 2, mouseY - height / 2);
    drawing.push(point);
    stroke(255);
    noFill();
    beginShape();
    for (let v of drawing) {
      vertex(v.x + width / 2, v.y + height / 2);
    }
    endShape();

  } else if (state == FOURIER) {

    let vx = epicycles(width / 2, 100, 0, fourierX);
    let vy = epicycles(100, height / 2, HALF_PI, fourierY);
    let v = createVector(vx.x, vy.y);

    path.unshift(v);
    stroke(255, 100);
    line(vx.x, vx.y, v.x, v.y);
    line(vy.x, vy.y, v.x, v.y);
    noFill();

    beginShape();
    for (i = 0; i < path.length; i++) {
      stroke(0, 255, 0);
      vertex(path[i].x, path[i].y);
    }
    endShape();

    const dt = TWO_PI / fourierY.length;
    time += dt;

    if (time > TWO_PI) {
      path = [];
      time = 0;
    }

    // if (path.length > fourierX.length) {
    //   path.pop();
    // }
  }
}
