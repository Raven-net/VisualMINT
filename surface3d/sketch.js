let size = 20;
let rows, cols;
let h = 1200;
let w = 1600;
let t = 0;
let slider1;
let slider2;
let slider3;

function setup() {
  createCanvas(600, 600, WEBGL);
  colorMode(HSB);
  slider1 = createSlider(0, 360, 100, 5);
  slider1.position(20, 10);
  slider1.style('width', '150px');
  slider2 = createSlider(0, 5, 1, 0.5);
  slider2.position(200, 10);
  slider2.style('width', '150px');
  slider3 = createSlider(-400, 400, 200, 50);
  slider3.position(380, 10);
  slider3.style('width', '150px');

  rows = h / size;
  cols = w / size;
}

function draw() {
  let val1 = slider1.value();
  let val2 = slider2.value();
  let val3 = slider3.value();
  background(0);
  // lights();
  fill(val1, 80, 50, 100);
  stroke(255);
  translate(width / 2, height / 2);
  rotateX(PI / 4);
  translate(-w * 0.7, -h * 0.8);
  for (let y = 0; y < rows; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x * size, y * size, noise(x / 10, (y - t) / 10) * val3);
      vertex(x * size, (y + 1) * size, noise(x / 10, (y + 1 -t) / 10) * val3);
    }
    endShape();
  }
  t += val2;


}
