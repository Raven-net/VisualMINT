let sun;
let cam;
// let camera;

let sunjpg;
let jpgs = [];

function preload() {
  sunjpg = loadImage('img/sun.jpg');
  jpgs[0] = loadImage('img/earth.jpg');
  jpgs[1] = loadImage('img/jupiter.jpg');
  jpgs[2] = loadImage('img/mars.jpg');
  jpgs[3] = loadImage('img/venus.jpg');
  jpgs[4] = loadImage('img/mercury.jpg');
  jpgs[5] = loadImage('img/neptune.jpg');
  jpgs[6] = loadImage('img/pluto.jpg');
  jpgs[7] = loadImage('img/saturn.jpg');
  jpgs[8] = loadImage('img/uranus.jpg');
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  // camera = createCamera();
  // setCamera(camera);
  canvas.elt.oncontextmenu = () => false;
  cam = createEasyCam({ distance: 500 });
  sun = new Planet(50, 0, 0, sunjpg);
  sun.spawnMoons(5, 1);
}

function draw() {
  background(0);
  // lights();
  ambientLight(255, 255, 255);
  pointLight(255, 255, 255, 0, 0, 0);
  // camera.lookAt(0, 0, 0);
  // camera.setPosition(sin(frameCount / 60) * 200 + 300, cos(frameCount / 60) * 200 + 300, 200);
  sun.show();
  sun.orbit();
}
