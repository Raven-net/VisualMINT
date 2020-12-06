let lander
let lifes = 5;
let lostLife = false;
let gameOver = false;
let game = true;
let ground;

function landing() {
  if (lander.bottom.y >= ground.pos.y && lander.bottom.y <= ground.pos.y + 10) {
    if (lander.bottom.x >= ground.pos.x && lander.bottom.x <= ground.pos.x + 50) {
      if (lander.vel.mag() <= 1 && lander.vel.y >= 0) {
        lander.pos.y = 150;
        lander.pos.x = 400;
        lander.vel.set(0, 0);
        ground = new Ground(random(100, width - 150), random(300, height - 10));
      } else if (lander.vel.mag() > 1) {
        lander.pos.y = 150;
        lander.pos.x = 400;
        lander.vel.set(0, 0);
        ground = new Ground(random(100, width - 150), random(300, height - 10));
        lostLife = true;
      }
    }
  }
}

function forces(item) {
  let gravity = createVector(0, 0.02);
  item.applyForce(gravity);
  let wind = createVector(random(-0.05, 0.05), 0);
  item.applyForce(wind);
  if (keyIsDown(LEFT_ARROW)) {
    let shubL = createVector(-0.05, 0);
    item.applyForce(shubL);
  }
  if (keyIsDown(RIGHT_ARROW)) {
    let shubR = createVector(0.05, 0);
    item.applyForce(shubR);
  }
  if (keyIsDown(UP_ARROW)) {
    let shub = createVector(0, -0.1);
    item.applyForce(shub);
  }
}

function setup() {
  createCanvas(800, 600);
  lander = new Lander(400, 150);
  ground = new Ground(random(100, width - 150), random(300, height - 10));
}

function draw() {
  background(220);
  if (game) {
    forces(lander);
    ground.show();
    lander.show();
    lander.values();
    lander.move();
    lander.edges();
    landing();

    if (lostLife) {
      lifes -= 1;
      lostLife = false;
      if (lifes < 0) {
        gameOver = true;
      }
    }
  }

  if (gameOver) {
    background(220);
    textSize(40);
    fill(0);
    text('Game Over', 300, 280);
  }
}
