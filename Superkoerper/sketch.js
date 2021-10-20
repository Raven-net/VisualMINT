let cam;
let globe = [];
let r = 200;
let total = 40;

let settings;

let n1 = 0.2;
let n2 = 1.7;
let n3 = 1.7;
let m = 7;
let a = 1;
let b = 1;

function superkoerper(angle, m, n1, n2, n3) {

  let summand1 = pow(abs(1 / a * cos(m * angle / 4)), n2);
  let summand2 = pow(abs(1 / b * sin(m * angle / 4)), n3);
  let r = pow(summand1 + summand2, -1 / n1);

  return r;
}

function setup() {
  let canvas = createCanvas(600, 600, WEBGL);

  canvas.elt.oncontextmenu = () => false;
  cam = createEasyCam({ distance: 500 });

  settings = QuickSettings.create(640, 20, "Superkoerper");
  settings.setDraggable(true);
  settings.addHTML("Einstellungen", "m, n1, n2, n3");
  settings.addRange("m", 0, 100, m, 1, function(value) { m = value; });
  settings.addRange("n1", 0, 5, n1, 0.01, function(value) { n1 = value; });
  settings.addRange("n2", 0, 10, n2, 0.01, function(value) { n2 = value; });
  settings.addRange("n3", 0, 10, n3, 0.01, function(value) { n3 = value; });

  // fill(0, 255, 0);
  // stroke(255);
  //
  // for (let i = 0; i < total + 1; i++) {
  //   globe[i] = [];
  //   let lat = map(i, 0, total, -HALF_PI, HALF_PI);
  //   let r2 = superkoerper(lat, m, n1, n2, n3);
  //   for (let j = 0; j < total + 1; j++) {
  //     let lon = map(j, 0, total, -PI, PI);
  //     let r1 = superkoerper(lon, m, n1, n2, n3);
  //     let x = r * r1 * cos(lon) * r2 * cos(lat);
  //     let y = r * r1 * sin(lon) * r2 * cos(lat);
  //     let z = r * r2 * sin(lat);
  //     globe[i][j] = createVector(x, y, z);
  //   }
  // }
}

function draw() {
  background(0);

  lights();
  // ambientLight(255, 255, 255);
  // pointLight(255, 255, 255, 0, 0, 0);

  // camera.lookAt(0, 0, 0);
  // camera.setPosition(sin(frameCount / 60) * 200 + 300, cos(frameCount / 60) * 200 + 300, 200);

  fill(0, 255, 0);
  stroke(255);

  for (let i = 0; i < total + 1; i++) {
    globe[i] = [];
    let lat = map(i, 0, total, -HALF_PI, HALF_PI);
    let r2 = superkoerper(lat, m, n1, n2, n3);
    for (let j = 0; j < total + 1; j++) {
      let lon = map(j, 0, total, -PI, PI);
      let r1 = superkoerper(lon, m, n1, n2, n3);
      let x = r * r1 * cos(lon) * r2 * cos(lat);
      let y = r * r1 * sin(lon) * r2 * cos(lat);
      let z = r * r2 * sin(lat);
      globe[i][j] = createVector(x, y, z);
    }
  }

  for (let i = 0; i < total; i++) {
    beginShape(TRIANGLE_STRIP);
    for (let j = 0; j < total + 1; j++) {
      let v1 = globe[i][j];
      vertex(v1.x, v1.y, v1.z);
      let v2 = globe[i + 1][j];
      vertex(v2.x, v2.y, v2.z);
    }
    endShape();
  }

}
