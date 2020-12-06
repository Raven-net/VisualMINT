let angle = 0;
let sinus = [];
let cosinus = [];
let slider1;

function setup() {
  createCanvas(800, 600);
  slider1 = createSlider(0, 0.1, 0, 0.005);
  slider1.position(20, 10);
  slider1.style('width', '150px');
}

function draw() {
  let val = slider1.value();
  background(0);
  translate(200, 300);
  let radius = 150;
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

  line(x, y, 200, y);

  line(-200, 0, 200, 0);
  line(0, -200, 0, 200);

  stroke(0, 255, 0);
  line(x, 0, 0, 0);
  stroke(255);

  noFill();
  translate(200, 0);

  beginShape();
  stroke(255, 0, 0);
  for (i = 0; i < sinus.length; i++) {
    vertex(i, sinus[i]);
  }
  endShape();
  beginShape();
  stroke(0, 255, 0);
  for (i = 0; i < cosinus.length; i++) {
    vertex(i, cosinus[i]);
  }
  endShape();
  stroke(255);
  line(0, 0, 400, 0);
  line(0, -200, 0, 200);

  fill(255);
  stroke(255, 0, 0);
  line(1, y, 1, 0);
  line(0, y, 0, 0);
  stroke(255);
  ellipse(0, y, 5);

  stroke(0, 255, 0);
  line(-1, -x, -1, 0);
  line(0, -x, 0, 0);
  stroke(255);
  ellipse(0, -x, 5);


  angle -= val;

  if (sinus.length > 400) {
    sinus.pop();
    cosinus.pop();
  }
}
