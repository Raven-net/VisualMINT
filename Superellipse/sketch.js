

let sliderA, sliderB, sliderN;

function setup() {
  createCanvas(640, 640);

  sliderA = createSlider(0, 300, 200);
  sliderA.position(10, 10);
  sliderA.style('width', '80px');

  sliderB = createSlider(0, 300, 200);
  sliderB.position(10, 30);
  sliderB.style('width', '80px');

  sliderN = createSlider(0, 10, 2, 0.1);
  sliderN.position(10, 50);
  sliderN.style('width', '80px');
}

function draw() {
  background(220);
  translate(width / 2, height / 2);

  let a = sliderA.value();
  let b = sliderB.value();
  let n = sliderN.value();

  stroke(0);
  noFill();
  beginShape();
  for (let t = 0; t < TWO_PI; t += 0.1) {
    let x = pow(abs(cos(t)), 2 / n) * a * sgn(cos(t));
    let y = pow(abs(sin(t)), 2 / n) * b * sgn(sin(t));
    vertex(x, y);
  }
  endShape(CLOSE);
}

function sgn(val) {
  if (val > 0) {
    return 1;
  } else if (val < 0) {
    return -1;
  } else {
    return 0;
  }
}
