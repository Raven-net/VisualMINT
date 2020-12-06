let cam;
let points = [];

function setup() {
  let canvas = createCanvas(600, 600, WEBGL);
  canvas.elt.oncontextmenu = () => false;
  cam = createEasyCam({ distance: 300 });
  // var gl = document.getElementById('defaultCanvas0').getContext('webgl');
  // gl.getParameter(gl.DEPTH_FUNC);
  for (let i = 0; i < 4; i++) {
    let v = p5.Vector.random3D();
    v.setMag(100);
    points.push(v);
  }
  for (let i = 0; i < 4; i++) {
    let v = points[i].copy();
    points.push(v);
  }
}

function draw() {
  background(0);
  for (let i = 0; i < points.length; i++) {
    push();
    translate(points[i].x, points[i].y, points[i].z);
    noStroke();
    fill(0, 255, 0);
    sphere(2);
    pop();
  }

  stroke(0, 255, 0);
  fill(0, 255, 0, 50);
  beginShape();
  for (let i = 0; i < 4; i++) {
    vertex(points[i].x, points[i].y, points[i].z);
  }
  endShape(CLOSE);
  beginShape();
  for (let i = 1; i < 4 + 1; i++) {
    vertex(points[i].x, points[i].y, points[i].z);
  }
  endShape(CLOSE);
  beginShape();
  for (let i = 2; i < 4 + 2; i++) {
    vertex(points[i].x, points[i].y, points[i].z);
  }
  endShape(CLOSE);
  beginShape();
  for (let i = 3; i < 4 + 3; i++) {
    vertex(points[i].x, points[i].y, points[i].z);
  }
  endShape(CLOSE);
  beginShape();
  for (let i = 0; i < 8; i += 2) {
    vertex(points[i].x, points[i].y, points[i].z);
  }
  endShape(CLOSE);
  beginShape();
  for (let i = 0; i < 8; i += 3) {
    vertex(points[i].x, points[i].y, points[i].z);
  }
  endShape(CLOSE);

  noStroke();
  fill(255, 0, 0);
  sphere(3);
  strokeWeight(1);
  stroke(100);
  fill(100, 5);
  let s = sphere(100);
}
