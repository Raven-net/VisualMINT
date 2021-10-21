let bubbles = [];
let bubble;
let ship;

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  bubbles.push(new Bubble(random(width), random(height), random(20, 50), 255));
  ship = new Ship(width / 2, height / 2);
  buttonB = createButton('Bubble');
  buttonB.position(30, 30);
  buttonB.mousePressed(newBubble);
}

function draw() {
  background(0);
  for (let i = 0; i < bubbles.length; i++){
    for (let j = 0; j < bubbles.length; j++){
      if (i !== j) {
        if (bubbles[i].intersects(bubbles[j])) {
          bubbles[i].color = 255;
//  Push-Force
          let vi = p5.Vector.sub(bubbles[i].pos, bubbles[j].pos);
          bubbles[i].x += vi.x * 20 / bubbles[i].r;
          bubbles[i].y += vi.y * 20 / bubbles[i].r;
          let vj = p5.Vector.sub(bubbles[j].pos, bubbles[i].pos);
          bubbles[j].x += vj.x * 20 / bubbles[j].r;
          bubbles[j].y += vj.y * 20 / bubbles[j].r;
        }
      } else {
        continue;
      }
    }
    bubbles[i].move();
    bubbles[i].show();
    bubbles[i].color = color(255, 50);
    bubbles[i].rollover(i);
  }

  // STARSHIP
  if (keyIsDown(LEFT_ARROW)) {
    ship.rotate('l');
  }
  if (keyIsDown(RIGHT_ARROW)) {
    ship.rotate('r');
  }
  if (keyIsDown(UP_ARROW)) {
    let force = p5.Vector.mult(ship.dir, 0.05);
    ship.applyForce(force);
  }
  if (keyIsDown(DOWN_ARROW)) {
    let force = p5.Vector.mult(ship.dir, -0.05);
    ship.applyForce(force);
  }
  ship.show();
  ship.update();
  ship.edges();
}

// function mousePressed() {
//   bubble = new Bubble(mouseX, mouseY, random(20, 50), 255);
//   bubbles.push(bubble);
// }

// function keyTyped() {
//   if (key === 'b') {
//     bubble = new Bubble(random(width), random(height), random(20, 50), 255);
//     bubbles.push(bubble);
//   }
//    return false;
// }

function newBubble(){
  bubble = new Bubble(random(width), random(height), random(20, 50), 255);
  bubbles.push(bubble);
}

function goLeft(){
  ship.rotate('l');
}

function goRight(){
  ship.rotate('r');
}

function power(){
  let force = p5.Vector.mult(ship.dir, 0.05);
  ship.applyForce(force);
}

function reverse(){
  let force = p5.Vector.mult(ship.dir, -0.05);
  ship.applyForce(force);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  bubbles = [];
}
