let img;
let cx;
let cy;

function preload(){
  img = loadImage('mandelbrot.jpg');
}

function setup() {
  createCanvas(1920, 1440);
  image(img, 0, 0);
}

// maping
// x: 0,25 == pixel 1554
// x: -0,75 == pixel 928
// x: 0 == pixel 1398
// -> 1 == 626 pixel
// y: 0 == pixel 719
// y: 0,8 == 219
// -> 1 == 625

function draw() {
  image(img, 0, 0);
  let green = color(0, 255, 0);
  stroke(255);
  translate(1398, 719);
  line(-1398, 0, 1920 - 1398, 0);
  line(0, -719, 0, 721);
  line(-170, -5, -170, 5);
  line(156, -5, 156, 5);
  noStroke();
  fill(green);
  ellipse(mouseX, mouseY, 8);

  cx = map(mouseX, 0, width, -2.23323, 0.83387);
  cy = map(mouseY, 0, height, -1.14856, 1.15176);

  text('x =' + cx, 20, 20);
  text('y =' + cy, 20, 20);   
}
