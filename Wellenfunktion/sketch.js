let size = 20;
let rows, cols;
//mesh dimension
let h = 1200;
let w = 1800;
//Translation for x, y
let r = -40;
let s = -50;
//Animation parameter for time
let t = 1;
//Wellenparameter
let a = 200;
let tbig = 1;
let lambda = 1;

let slider1;
let slider2;
let slider3;


function setup() {
  createCanvas(600, 600, WEBGL);
  rows = h / size;
  cols = w / size;
  slider1 = createSlider(100, 300, 200, 20);
  slider1.position(20, 10);
  slider1.style('width', '100px');
  slider2 = createSlider(0, 1, 0.2, 0.1);
  slider2.position(170, 10);
  slider2.style('width', '100px');
  slider3 = createSlider(0, 0.1, 0.04, 0.01);
  slider3.position(320, 10);
  slider3.style('width', '100px');
}

function draw() {
  a = slider1.value();
  let val2 = slider2.value();
  let val3 = slider3.value();

  if (keyIsDown(RIGHT_ARROW)) {
    s += 1;
  }
  if (keyIsDown(LEFT_ARROW)) {
    s -= 1;
  }
  if (keyIsDown(UP_ARROW)) {
    r -= 1;
  }
  if (keyIsDown(DOWN_ARROW)) {
    r += 1;
  }

  background(0);
  lights();
  fill(30, 144, 255, 100);
  // noFill();
  stroke(255);
  //center the mesh
  translate(width / 2, height / 2);
  rotateX(PI / 4);
  translate(-w * 0.65, -h * 1);

  for (let ry = 0; ry < rows; ry++) {
    beginShape(TRIANGLE_STRIP);
    for (let rx = 0; rx < cols; rx++) {
      let x = rx + s;
      let y = ry + r;
      if (sqrt(x**2 + y**2) <= t) {
        vertex(rx * size, ry * size, a * 2**(-0.1 * sqrt(x**2 + y**2)) * 2**(-val3 * t) * sin(sqrt(x**2 + y**2) - t));
        vertex(rx * size, (ry + 1) * size, a * 2**(-0.1 * sqrt(x**2 + (y + 1)**2)) * 2**(-val3 * t) * sin(sqrt(x**2 + (y + 1)**2) - t));
      } else {
        vertex(rx * size, ry * size, 0);
        vertex(rx * size, (ry + 1) * size, 0);

      }
    }
    endShape();
  }
  t += val2;
}

function mousePressed() {
  t = 1;
  r = map(mouseY, 0, width, 0, -70, true);
  s = map(mouseX, 0, width, -10, -80, true);
}
