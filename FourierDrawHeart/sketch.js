let x = [];
let fourierX;

let y = [];
let fourierY;

let time = 0;
let path = [];

let slider1;

function epicycles(x, y, rotation, fourier) {
  let val = slider1.value();
  for (let i = 0; i < val; i++) {
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

    //fill(255);
    stroke(255);
    line(prevx, prevy, x, y);
    ellipse(x, y, 2);

  }
  return createVector(x, y);
}

function setup() {
  createCanvas(800, 600);
  // colorMode(HSB);
  for (let i = 0; i < 100; i++) {
    let t = map(i, 0, 99, -1, 1);
    x[i] = 400 * sin(t) * cos(t) * log(abs(t));
    y[i] = -500 * sqrt(abs(t)) * cos(t);
  }
  fourierY = dft(y);
  fourierX = dft(x);

  fourierX.sort((a,b) => b.amp - a.amp);
  fourierY.sort((a,b) => b.amp - a.amp);

  slider1 = createSlider(1, fourierX.length, 2);
  slider1.position(100, 570);
  slider1.style('width', '600px');
}

function draw() {
  background(0);

  let vx = epicycles(500, 100, 0, fourierX);
  let vy = epicycles(100, 550, HALF_PI, fourierY);
  let v = createVector(vx.x, vy.y);

  path.unshift(v);
  line(vx.x, vx.y, v.x, v.y);
  line(vy.x, vy.y, v.x, v.y);
  noFill();
  // let hu = 0;
  beginShape();
  for (i = 0; i < path.length; i++) {
    stroke(255, 0, 0);
    vertex(path[i].x, path[i].y);
    // hu += 2;
    // if (hu >= 360) {
    //   hu = 0;
    // }
  }
  endShape();

  const dt = TWO_PI / fourierY.length;
  time += dt;

  if (path.length > fourierX.length) {
    path.pop();
  }
}
