let slider;
function setup() {
  createCanvas(800, 600);
  slider = createSlider(1, 10, 4);
  slider.position(50, 50);
  slider.style('width', '200px');
}

function draw() {
  let val = slider.value();
  background(0);

  let x = map(val, 1, 10, 150, 270);
  let x_ = map(val, 1, 10, 270, 150);
  let y = map(val, 1, 10, 170, 290);
  let y_ = map(val, 1, 10, 290, 170);
  translate(0, 60);
  rectMode(CENTER);
  fill(255);
  triangle(140, y_, 140, 300, x_, 300);
  triangle(140, y_, 140, 160, x, 160);
  triangle(x, 160, 280, 160, 280, y);
  triangle(280, y, 280, 300, x_, 300);

  fill(0, 255, 0);
  beginShape();
    vertex(140, y_);
    vertex(x_, 300);
    vertex(280, y);
    vertex(x, 160);
  endShape(CLOSE);

  x = map(val, 1, 10, 90, 210);
  y = map(val, 1, 10, 250, 370);
  translate(360, -80);
  rectMode(CORNERS);
  fill(255, 0, 0);
  rect(80, 240, x, y);
  fill(0, 0, 255);
  rect(x, y, 220, 380);
  fill(255);
  triangle(x, y, x, 240, 220, y);
  triangle(x, 240, 220, 240, 220, y);
  triangle(x, y, x, 380, 80, 380);
  triangle(x, y, 80, y, 80, 380);
}
