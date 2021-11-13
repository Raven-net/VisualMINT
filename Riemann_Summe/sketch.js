const sclX = 10,
      sclY = 10;

let distX;
let distY;
let riemann_on = false;
// let button;
let a, b;
let n;
let sliderN;
let input;
let sel;
let area = 0;
let funk = '-0.3 * x ** 2 + 4';

function setup() {
  createCanvas(windowWidth, windowHeight);
  input = createInput('-0.3 * x ** 2 + 4');
  input.position(30, 30);
  button = createButton('Funktion');
  button.position(input.x + input.width, 30);
  button.mousePressed(defFunk);
  sliderN = createSlider(0, 60, 0);
  sliderN.position(30, 60);
  sliderN.style('width', '200px');
  sel = createSelect();
  sel.position(input.x + input.width + button.width + 10, 30);
  sel.option('Links');
  sel.option('Rechts');
  sel.selected('Links');
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
  textSize(22);
  fill(0, 102, 153);
  stroke(0);
  text('Fläche = ' + area, 50, height - 100);
  translate(width / 2, height / 2);
  stroke(255);
  graphAxis();
  graphFunc();
  if (n > 0) {
    graphRiemann();
  }
  a.show();
  a.move();
  b.show();
  b.move();

}

function graphFunc() {
  push();
  noFill();
  scale(1, -1);
  strokeWeight(3);
  stroke(255, 103, 2);
  beginShape();
  for (i = -width / 2; i < width / 2; i++) {
    let x = map(i, -width / 2, width / 2, -sclX / 2, sclX / 2);
    let y = funk1(x);
    vertex(i, map(y, -sclY / 2, sclY / 2, -height / 2, height / 2));
  }
  endShape();
  pop();
}

function graphRiemann() {
  let dist = b.x - a.x;
  let x = a.x;
  area = 0;
  push();
  fill(0, 102, 153, 100);
  scale(1, -1);
  strokeWeight(2);
  stroke(0, 102, 153);
  for (i = 0; i < n; i++) {
    let y = funk1(x);
    if (sel.value() == 'Links') {
      rect(x * distX, 0, map(dist / n, -sclX / 2, sclX / 2, -width / 2, width / 2), map(y, -sclY / 2, sclY / 2, -height / 2, height / 2));
      area += dist / n * y;
    } else if (sel.value() == 'Rechts') {
      rect(x * distX, 0, map(dist / n, -sclX / 2, sclX / 2, -width / 2, width / 2), map(funk1(x + dist / n), -sclY / 2, sclY / 2, -height / 2, height / 2));
      area += dist / n * funk1(x + dist / n);
    }
    x += dist / n;
  }
}

function graphAxis() {
  strokeWeight(1);
  line(-width / 2, 0, width / 2, 0);
  line(0, -height / 2, 0, height / 2);
  for (i = -sclX; i < sclX; i++) {
    line(i * distX, -4, i * distX, 4);
  }
  for (i = -sclY; i < sclY; i++) {
    line(-4, i * distY, 4, i * distY);
  }
}

function funk1(x) {
  return eval(funk);
}

function defFunk() {
  // funk = input.value().replace(/^/gi, "**");
  funk = input.value();
}

function mousePressed() {
  a.pressed(mouseX, mouseY);
  b.pressed(mouseX, mouseY);
}

function mouseReleased() {
  a.notPressed();
  b.notPressed();
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

  move() {
    if (this.dragging) {
      this.x = map(mouseX, 0, width, -sclX / 2, sclX / 2);
    }
  }

  show() {
    push();
    strokeWeight(2);
    stroke(255);
    fill (255);
    circle(map(this.x, -sclX / 2, sclX / 2, -width / 2, width / 2), 0, 8);
    pop();
  }

  pressed(x, y) {
    if (this.x < map(x, 0, width, -sclX / 2, sclX / 2) + 0.2 && this.x > map(x, 0, width, -sclX / 2, sclX / 2) - 0.2 && this.y < map(y, -height / 2, height / 2, -sclY / 2, sclY / 2) + 0.2 && this.y < map(y, -height / 2, height / 2, -sclY / 2, sclY / 2) - 0.2) {
      this.dragging = true;
    }
    // this.dragging = true;
  }

  notPressed() {
    this.dragging = false;
  }
}
