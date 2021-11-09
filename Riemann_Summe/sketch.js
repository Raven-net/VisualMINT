const sclX = 10,
      sclY = 10;

let distX;
let distY;
let x_list = [];
let y_list = [];
let riemann_on = false;
// let button;
let a, b;
let n;
let sliderN;

function setup() {
  createCanvas(windowWidth, windowHeight);
  sliderN = createSlider(1, 50, 1);
  sliderN.position(100, 30);
  sliderN.style('width', '150px');
  // button = createButton('Riemann');
  // button.position(40, 40);
  // button.mousePressed(riemannOnOff);
  distX = width / sclX;
  distY = height / sclY;
  a = new Point(- width / 4, 0);
  b = new Point(width / 4, 0);
}

function draw() {
  n = sliderN.value();
  background(0);
  translate(width / 2, height / 2);
  stroke(255);
  graphAxis();
  graphFunc();
  graphRiemann();
}

function graphFunc() {
  push();
  noFill();
  scale(1, -1);
  strokeWeight(2);
  stroke(0, 255, 255);
  beginShape();
  for (i = -width / 2; i < width / 2; i++) {
    let x = map(i, -width / 2, width / 2, -sclX / 2, sclX / 2);
    let y = -0.3 * x ** 2 + 4;
    vertex(i, map(y, -sclY / 2, sclY / 2, -height / 2, height / 2));
  }
  endShape();
  pop();
}

function graphRiemann() {
  let dist = b.x - a.x;
  let x = a.x;
  push();
  fill(0, 255, 255, 100);
  scale(1, -1);
  strokeWeight(2);
  stroke(0, 255, 255);
  for (i = 0; i < n; i++) {
    let y = -0.3 * x ** 2 + 4;
    rect(x * distX, 0, map(dist / n, -sclX / 2, sclX / 2, -width / 2, width / 2), map(y, -sclY / 2, sclY / 2, -height / 2, height / 2));
    x += dist / n;
  }
}

function graphAxis() {
  line(-width / 2, 0, width / 2, 0);
  line(0, -height / 2, 0, height / 2);
  for (i = -sclX; i < sclX; i++) {
    line(i * distX, -4, i * distX, 4);
  }
  for (i = -sclY; i < sclY; i++) {
    line(-4, i * distY, 4, i * distY);
  }
}

function mousePressed() {
  a.pressed(mouseX, mouseY);
}

function mouseReleased() {
  a.notPressed();
}

// function riemannOnOff(){
//   if (riemann_on) {
//     riemann_on = false;
//   } else {
//     riemann_on = true;
//   }
// }

class Point {
  constructor(x, y) {
    this.x = map(x, -width / 2, width / 2, -sclX / 2, sclX / 2);
    this.y = y;
    this.dragging = false;
  }

  newPoints() {
    if (this.dragging) {
      this.x = map(mouseX, 0, width, -2.23323, 0.83387);
      this.y = map(mouseY, 0, height, -1.14856, 1.15176);
    }
  }

  pressed(px, py) {
    // if (this.x < map(mouseX, 0, width, -2.23323, 0.83387) + 0.5 && this.x > map(mouseX, 0, width, -2.23323, 0.83387) - 0.5 && this.y < map(py, 0, height, -1.14856, 1.15176) + 0.5 && this.y < map(mouseY, 0, height, -1.14856, 1.15176) - 0.5) {
    //   this.dragging = true;
    // }
    this.dragging = true;
  }

  notPressed(px, py) {
    this.dragging = false;
  }
}
