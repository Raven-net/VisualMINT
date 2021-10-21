let time = 0;
let imgX = [];
let imgY = [];
let increment = 500;
let circlestatus = false;

let slider1;
let slider2;
let slider3;
let slider4;
let button;

function onoffcircel() {
  if (circlestatus) {
    circlestatus = false;
  } else {
    circlestatus = true;
  }
}

function setup() {
  createCanvas(800, 600);
  colorMode(HSB);
  slider1 = createSlider(-5, 5, 1);
  slider1.position(100, 550);
  slider1.style('width', '80px');
  slider2 = createSlider(-5, 5, -1);
  slider2.position(200, 550);
  slider2.style('width', '80px');
  slider3 = createSlider(-5, 5, 5);
  slider3.position(300, 550);
  slider3.style('width', '80px');
  slider4 = createSlider(-5, 5, 3);
  slider4.position(400, 550);
  slider4.style('width', '80px');
  button = createButton('circle');
  button.position(19, 550);
  button.mousePressed(onoffcircel);

}

function draw() {
  let slinks = [
    {phi: 0, r: 100, omega: slider1.value()}, {phi: PI, r: 30, omega: slider2.value()}, {phi: 0, r: 25, omega: slider3.value()}, {phi: 0, r: 12, omega: slider4.value()}, {phi: 0, r: 6, omega: 24}, {phi: 0, r: 3, omega: 12}
  ]
  background(0);
  translate(400, 300);
// Startpunkt im Koordinatenursprung Ursprung = 0 + 0*i
  let x = 0;
  let y = 0;

// Iteration über die Anzahl der Fourierreihenglieder
  for (let i = 0; i < map(mouseY, 0, 600, 1, 5); i++) {
  // for (let i = 0; i < slider.value(); i++) {

    // vorheriger Ort ist Ursprung des naechsten Reihengliedes
    let prevx = x;
    let prevy = y;
    let n = i + 1;

    // aktuelles Reihenglied wird berechnet:

    // Radius und Phasenverschiebung
    let cphi = slinks[i].phi;
    let cr = slinks[i].r;
    let cnx = cr * cos(cphi);
    let cny = cr * sin(cphi);

    // Phase vn in kartesischen Koordinaten: vnx + vny*i
    let vnx = cos(slinks[i].omega * time);
    let vny = sin(slinks[i].omega * time);

    // aktuelles Reihenglied in kartesischen Koordinaten: (cnx + cny*i) * (vnx + vny*i)
    let xn = cnx * vnx - cny * vny;
    let yn = cnx * vny + vnx * cny;

    // aktuelles Reihenglied in Polarkoordinaten:
    let r = sqrt(xn**2 + yn**2);
    let phi = atan2(xn, yn);

    // Werte des aktuellen Reihengliedes werden zur bisherigen Position addiert
    x += r * cos(phi);
    y += r * sin(phi);

    // Kreis und Zeiger des aktuellen Reihengliedes werden gezeichnet
    if (circlestatus) {
      stroke(255, 50);
      noFill();
      ellipse(prevx, prevy, r * 2);
    }

    stroke(255, 50);
    line(prevx, prevy, x, y);
    ellipse(x, y, 2);

  }
  imgX.unshift(x);
  imgY.unshift(y);

  noFill();

  strokeWeight(3);

  let hu = 0;
  beginShape(POINTS);
  for (i = 0; i < imgX.length; i++) {
    vertex(imgX[i], imgY[i]);
    stroke(hu, 255, 255);
    hu += 0.2;
    if (hu >= 255) {
      hu = 0;
    }
  }
  endShape();
  strokeWeight(1);

  time += TWO_PI / increment;

  if (imgX.length > increment) {
    imgX.pop();
    imgY.pop();
  }
}
