const sclX = 10,
      sclY = 10;

let distX;
let distY;
let a, b;
let input;
let funk = 'sin(x)';

function setup() {
  createCanvas(windowWidth, windowHeight);
  input = createInput('sin(x)');
  input.position(30, 30);
  button = createButton('Funktion');
  button.position(input.x + input.width, 30);
  button.mousePressed(defFunk);
  distX = width / sclX;
  distY = height / sclY;
  a = new Point(0, 0);
  b = new Point(width / 4, 0);
}

function draw() {
  background(0);
  fill(0, 102, 153);
  stroke(0);
  translate(width / 2, height / 2);
  stroke(255);
  graphAxis();
  graphIntegral();
  graphFunc();
  a.show();
  a.move();
  b.show();
  b.move();

}

function graphFunc() {
  push();
  noFill();
  // scale(1, -1);
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

function graphIntegral() {
  let dist = b.x - a.x;
  let x = a.x;
  push();
  fill(0, 102, 153, 100);
  scale(1, -1);
  strokeWeight(2);
  stroke(0, 102, 153);
  beginShape();
  for (i = map(a.x, -sclX / 2, sclX / 2, -width / 2, width / 2); i < map(b.x, -sclX / 2, sclX / 2, -width / 2, width / 2); i++) {
    let x = map(i, -width / 2, width / 2, -sclX / 2, sclX / 2);
    let y = funk1(x);
    vertex(i, map(y, -sclY / 2, sclY / 2, -height / 2, height / 2));
    vertex(i, 0);
  }
  endShape();
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
  if (mouseX > 0 && mouseX < 10 && mouseY > 0 && mouseY < 10) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}

function mouseReleased() {
  a.notPressed();
  b.notPressed();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  distX = width / sclX;
  distY = height / sclY;
  a = new Point(- width / 4, 0);
  b = new Point(width / 4, 0);
}

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
  }

  notPressed() {
    this.dragging = false;
  }
}
