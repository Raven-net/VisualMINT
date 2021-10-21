let img;

function preload(){
  img = loadImage('mandelbrot.jpg');
}

function setup() {
  createCanvas(1920, 1440);
  image(img, 0, 0);
}

function draw() {
  image(img, 0, 0);
  stroke(255);
  translate(width / 2, height / 2);
  line(-width / 2, 0, width / 2, 0);
  ellipse(0, 0, 5);
}
