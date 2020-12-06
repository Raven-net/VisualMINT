// module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

var engine;
var world;
var links = [];
var bounderies = [];
var mConstraint;

function setup() {
  var canvas = createCanvas(800, 600);
  engine = Engine.create();
  world = engine.world;
  bounderies.push(new Boundery(400, height, width, 40, 0));
  let prev = null;
  for (let x = 400; x < 800; x += 20) {
    let fixed = false;
    if (!prev) {
      fixed = true;
    }
    let p = new Circle(x, 50, 10, fixed);
    links.push(p);
    if (prev) {
      let constraintOptions = {
        bodyA: p.body,
        bodyB: prev.body,
        length: 20,
        stiffness: 0.2,
      }
      let constraint = Constraint.create(constraintOptions);
      World.add(world, constraint);
    }
    prev = p;
  }
  let canvasmouse = Mouse.create(canvas.elt);
  canvasmouse.pixelRatio = pixelDensity();
  let mouseOptions = {
    mouse: canvasmouse,
  }

  mConstraint = MouseConstraint.create(engine, mouseOptions);
  World.add(world, mConstraint);
}

function draw() {
  background(220);
  Engine.update(engine);
  for (let boundery of bounderies) {
    boundery.show();
  }
  for (let i = links.length - 1; i >= 0; i--) {
    links[i].show();
  }
  if (mConstraint.body) {
    let pos = mConstraint.body.position;
    let m = mConstraint.mouse.position;
    let offset = mConstraint.constraint.pointB;
    stroke(0, 255, 0);
    line(pos.x + offset.x, pos.y + offset.y, m.x, m.y);
  }
}
