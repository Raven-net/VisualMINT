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
}
