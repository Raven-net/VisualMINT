let img;
let c;
let button;
mandel_on = false;
function preload(){
  img = loadImage('mandelbrot.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  button = createButton('Mandel');
  button.position(40, 40);
  button.mousePressed(mandelOnOff);
  c = new Cstart(floor(0.728125 * width), floor(0.499306 * height));
}

// maping Infos:
//  resolution: x = 1920 y = 1440
// x: 0,25 == pixel 1554
// x: -0,75 == pixel 928
// x: 0 == pixel 1398 ist im Verhältnis: 0.728125 von 1920
// -> 1 == 626 pixel
// y: 0 == pixel 719 ist im Verhältnis: 0.499306
// y: 0,8 == 219
// -> 1 == 625

function draw() {
  let green = 255;
  let blue = 0;
  if (mandel_on) {
    image(img, 0, 0, width, height, 0, 0);
  } else {
    background(0);
  }

  // stroke(255);
  translate(1398, 719);
  // line(-1398, 0, 1920 - 1398, 0);
  // line(0, -719, 0, 721);
  // line(-470, -5, -470, 5);
  // line(156, -5, 156, 5);
  // noStroke();
  fill(0, green, 0);

  c.newPoints();
  ellipse(map(c.x, -2.23323, 0.83387, 0, width) - 1398, map(c.y, -1.14856, 1.15176, 0, height) - 719, 15);

  // Startpunkt im Koordinatenursprung Ursprung = 0 + 0*i
  let cx = c.x;
  let cy = c.y;

  // Iteration über die Anzahl der Fourierreihenglieder
  // for (let i = 0; i < slider.value(); i++) {
  for (let i = 0; i < 50; i++) {

    // vorheriger Ort ist Ursprung des naechsten Reihengliedes
    let prevx = cx;
    let prevy = cy;
    // let n = i + 1;

    cx = prevx * prevx - prevy * prevy + c.x;
    cy = prevx * prevy + prevx * prevy + c.y;

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

function mousePressed() {
  c.pressed(mouseX, mouseY);
}

function mouseReleased() {
  c.notPressed();
}

function mandelOnOff(){
  if (mandel_on) {
    mandel_on = false;
  } else {
    mandel_on = true;
  }
}

class Cstart {
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
