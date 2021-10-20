let angle = 0;
let sinus = [];
let cosinus = [];
let slider1;
let button_sin;
let button_cos;
let s_on = false;
let k_on = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  slider1 = createSlider(0, 0.1, 0.006, 0.002);
  slider1.position(20, 10);
  slider1.style('width', '150px');
  button_sin = createButton('Sinus');
  button_sin.position(40, 35);
  button_sin.mousePressed(SinusOn);
  button_cos = createButton('Kosinus');
  button_cos.position(100, 35);
  button_cos.mousePressed(KosinusOn);
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

  sinus.push(y);
  cosinus.push(-x);

  fill(255);
  line(0, 0, x, y);
  ellipse(x, y, 5);
  ellipse(x, 0, 5);

  stroke(255, 0, 0);
  line(x, y, x, 0);
  stroke(255);

  line(-ww * 3 / 12, 0, ww * 3 / 12, 0);
  line(0, -ww * 3 / 12, 0, ww * 3 / 12);

  stroke(0, 255, 0);
  line(x, 0, 0, 0);
  stroke(255);

  translate(ww * 3 / 12, 0);

  line(0, 0, ww / 2, 0);
  line(0, -ww * 3 / 12, 0, ww * 3 / 12);

  if (s_on) {
    noFill();
    beginShape();
    stroke(255, 0, 0);
    for (i = 0; i < sinus.length; i++) {
      vertex(i, sinus[i]);
    }
    endShape();
    fill(255);
    stroke(255, 0, 0);
    line(2, y, 2, 0);
    line(0, y, 0, 0);
    stroke(255);
    line(0, y, sinus.length, y);
    ellipse(0, y, 5);
  }

  if (k_on) {
    noFill();
    beginShape();
    stroke(0, 255, 0);
    for (i = 0; i < cosinus.length; i++) {
      vertex(i, cosinus[i]);
    }
    endShape();
    fill(255);
    stroke(0, 255, 0);
    line(-2, -x, -2, 0);
    line(0, -x, 0, 0);
    stroke(255);
    line(0, -x, cosinus.length, -x);
    ellipse(0, -x, 5);
  }

  angle -= val;

  if (sinus.length > ww / 2) {
    sinus = [];
    cosinus = [];
    angle = 0
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  sinus = [];
  cosinus = [];
  angle = 0
}

function SinusOn() {
  if (s_on == false) {
    s_on = true;
  } else {
    s_on = false;
  }
}

function KosinusOn() {
  if (k_on == false) {
    k_on = true;
  } else {
    k_on = false;
  }
}
