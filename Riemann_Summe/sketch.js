let x_list = [];
let y_list = [];
let riemann_on = false;
let button;

function setup() {
  createCanvas(windowWidth, windowHeight);
  button = createButton('Riemann');
  button.position(40, 40);
  button.mousePressed(riemannOnOff);
  c = new Point(0, 0);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  stroke(255);
  // Koordinatensystem
  line(-width / 2, 0, width / 2, 0);
  line(0, -height / 2, 0, height / 2);

  // Funktionsgraph
  noFill();
  beginShape();
  for (i = -width / 2; i < width / 2; i++) {
    vertex(i, -height * 0.3 + 0.002*(i)**2);
  }
  endShape();

  // Integrationsgrenzen

}

function mousePressed() {
  c.pressed(mouseX, mouseY);
}

function mouseReleased() {
  c.notPressed();
}

function riemannOnOff(){
  if (mandel_on) {
    riemann_on = false;
  } else {
    riemann_on = true;
  }
}

class Point {
  constructor(x, y) {
    this.x = map(x, 0, width, -2.23323, 0.83387);
    this.y = map(y, 0, height, -1.14856, 1.15176);
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
