let x_list = [];
let y_list = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  stroke(255);
  line(-width / 2, 0, width / 2, 0);
  line(0, -height / 2, 0, height / 2);

  noFill();
  beginShape();
  for (i = 0; i < width; i++) {
    vertex(i - width / 2, -0.002*(i-width/2)**2);
  }
  endShape();
}
