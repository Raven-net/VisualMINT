let img;

function preload(){
  img = loadImage('mandelbrot.jpg');
}

function setup() {
  createCanvas(1920, 1440);
  image(img, 0, 0);
  background(200);
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
  // image(img, 0, 0);
  stroke(255);
  translate(1398, 719);
  line(-1398, 0, 1920 - 1398, 0);
  line(0, -719, 0, 721);
  line(928, -5, 928, 5);
  line(1554, -5, 1554, 5);
  ellipse(0, 0, 5);
}
