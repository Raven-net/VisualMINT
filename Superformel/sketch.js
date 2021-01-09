let settings;

let n1 = 1;
let n2 = 1;
let n3 = 1;
let m = 5;
let a = 200;
let b = 200;

function setup() {
  createCanvas(640, 640);

  settings = QuickSettings.create(20, 20, "Superformel");
  settings.setDraggable(true);
  settings.addHTML("Einstellungen", "m, n1, n2, n3");
  settings.addRange("m", 0, 100, m, 1, function(value) { m = value; });
  settings.addRange("n1", 0, 5, n1, 0.01, function(value) { n1 = value; });
  settings.addRange("n2", 0, 10, n2, 0.01, function(value) { n2 = value; });
  settings.addRange("n3", 0, 10, n3, 0.01, function(value) { n3 = value; });
}

function superformel(phi) {

  let summand1 = pow(abs((1 / a) * cos(m / 4 * phi)), n2);
  let summand2 = pow(abs((1 / b) * sin(m / 4 * phi)), n3);
  let r = 1 / (pow(summand1 + summand2, 1 / n1));

  return r;
}

function draw() {
  background(220);
  translate(width / 2, height / 2);

  stroke(0);
  fill(0, 255, 100);
  beginShape();
  for (let phi = 0; phi < TWO_PI; phi += 0.001) {
    let r = superformel(phi);
    let x = r * cos(phi);
    let y = r * sin(phi);

    vertex(x, y);
  }
  endShape(CLOSE);
}
