let img;
let x = 0;
let y = 0;
let slider;
let c;

function preload(){
  img = loadImage('mandelbrot.jpg');
}

function setup() {
  createCanvas(1920, 1440);

  c = new Startpoint(x, y, 10);

  // slider = createSlider(1, 50, 10);
  // slider.position(20, 20);
  // slider.style('width', '200px');
}

// maping Infos:
// x: 0,25 == pixel 1554
// x: -0,75 == pixel 928
// x: 0 == pixel 1398
// -> 1 == 626 pixel
// y: 0 == pixel 719
// y: 0,8 == 219
// -> 1 == 625

function draw() {
  let green = 255;
  let blue = 0;
  image(img, 0, 0);
  stroke(255);
  translate(1398, 719);
  line(-1398, 0, 1920 - 1398, 0);
  line(0, -719, 0, 721);
  line(-470, -5, -470, 5);
  line(156, -5, 156, 5);
  noStroke();
  fill(0, green, 0);
  ellipse(map(x, -2.23323, 0.83387, 0, width) - 1398, map(y, -1.14856, 1.15176, 0, height) - 719, 10);

  // Startpunkt im Koordinatenursprung Ursprung = 0 + 0*i
  let cx = x;
  let cy = y;

  // Iteration über die Anzahl der Fourierreihenglieder
  // for (let i = 0; i < slider.value(); i++) {
  for (let i = 0; i < 50; i++) {

    // vorheriger Ort ist Ursprung des naechsten Reihengliedes
    let prevx = cx;
    let prevy = cy;
    let n = i + 1;

    cx = prevx * prevx - prevy * prevy + x;
    cy = prevx * prevy + prevx * prevy + y;

    fill(0, green, blue);
    ellipse(map(cx, -2.23323, 0.83387, 0, width) - 1398, map(cy, -1.14856, 1.15176, 0, height) - 719, 10);

    if (green > 10){
      green -= 5;
    }
    if (blue < 245){
      blue += 5;
    }
  }
}

// function mousePressed() {
//   x = map(mouseX, 0, width, -2.23323, 0.83387);
//   y = map(mouseY, 0, height, -1.14856, 1.15176);
// }

function mousePressed() {
  rectangle.pressed(mouseX, mouseY);
}

function mouseReleased() {
  rectangle.notPressed();
}

class Startpoint {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.offsetX = 0;
    this.offsetY = 0;
    this.dragging = false;
    this.rollover = false;
  }

  show(px, py) {
    if (this.dragging) {
      this.x = px + this.offsetX;
      this.y = py + this.offsetY;
    }

    noStroke();
    fill(0, green, 0);
    ellipse(map(x, -2.23323, 0.83387, 0, width) - 1398, map(y, -1.14856, 1.15176, 0, height) - 719, 10);
  }

  pressed(px, py) {
    if (px > this.x && px < this.x + this.w && py > this.y && py < this.y + this.h) {
      this.dragging = true;
      this.offsetX = this.x - px;
      this.offsetY = this.y - py;
    }
  }

  notPressed(px, py) {
      this.dragging = false;
  }
}
