let slider;
function setup() {
  createCanvas(800, 600);
  slider = createSlider(0, 100, 0);
  slider.position(50, 25);
  slider.style('width', '700px');
}

function draw() {
  let val = slider.value();
  background(0);
  rectMode(CENTER);

  // Ursprungsbild
  fill(255);
  triangle(140, 240, 140, 300, 220, 300);
  fill(255, 0, 0);
  rect(110, 270, 60, 60);
  fill(0, 0, 255);
  rect(180, 340, 80, 80);
  push();
    fill(0, 255, 0);
    translate(210, 230);
    rotate(PI / 4.9);
    rect(0, 0, 100, 100);
  pop();

  // Puzzle kleine Quadrate
  push();
    translate(map(val, 0, 100, 0, 420), map(val, 0, 100, 0, 120));
    fill(255, 0, 0, 100);
    rect(110, 270, 60, 60);
    fill(0, 0, 255, 100);
    rect(180, 340, 80, 80);
    push();
      fill(255, 100);
      translate(180, 210);
      rotate(map(val, 0, 100, 0, TWO_PI));
      triangle(-40, 30, -40, 90, 40, 90);
    pop();
  pop();
  push();
    fill(255, 100);
    translate(map(val, 0, 100, 0, 420), map(val, 0, 100, 0, 240));
    translate(180, 210);
    rotate(map(val, 0, 100, 0, PI));
    triangle(-40, 30, -40, 90, 40, 90);
  pop();
  push();
    fill(255, 100);
    translate(map(val, 0, 100, 0, 410), map(val, 0, 100, 0, 250));
    translate(180, 210);
    rotate(map(val, 0, 100, 0, HALF_PI));
    triangle(-40, 30, -40, 90, 40, 90);
  pop();
  push();
    fill(255, 100);
    translate(map(val, 0, 100, 0, 290), map(val, 0, 100, 0, 250));
    translate(180, 210);
    rotate(map(val, 0, 100, 0, -HALF_PI));
    triangle(-40, 30, -40, 90, 40, 90);
  pop();

  // Puzzle großes Quadrat
  push();
    translate(map(val, 0, 100, 0, 360), map(val, 0, 100, 0, -80));
    fill(0, 255, 0, 100);
    translate(210, 230);
    rotate(PI / 4.9);
    rect(0, 0, 100, 100);
  pop();

  push();
    fill(255, 100);
    translate(180, 210);
    translate(map(val, 0, 100, 0, 360), map(val, 0, 100, 0, -80));
    rotate(map(val, 0, 100, 0, -TWO_PI));
    triangle(-40, 30, -40, 90, 40, 90);
  pop();
  push();
    fill(255, 100);
    translate(180, 210);
    translate(map(val, 0, 100, 0, 410), map(val, 0, 100, 0, -90));
    rotate(map(val, 0, 100, 0, HALF_PI));
    triangle(-40, 30, -40, 90, 40, 90);
  pop();
  push();
    fill(255, 100);
    translate(180, 210);
    translate(map(val, 0, 100, 0, 370), map(val, 0, 100, 0, -30));
    rotate(map(val, 0, 100, 0, -HALF_PI));
    triangle(-40, 30, -40, 90, 40, 90);
  pop();
  push();
    fill(255, 100);
    translate(180, 210);
    translate(map(val, 0, 100, 0, 420), map(val, 0, 100, 0, -40));
    rotate(map(val, 0, 100, 0, -PI));
    triangle(-40, 30, -40, 90, 40, 90);
  pop();

if (val == 100) {
    // Ergebnis großes Quadrat
    translate(360, -80);
    rectMode(CENTER);
    fill(255);
    triangle(140, 240, 140, 300, 220, 300);
    triangle(140, 240, 140, 160, 200, 160);
    triangle(200, 160, 280, 160, 280, 220);
    triangle(280, 220, 280, 300, 220, 300);
    push();
      fill(0, 255, 0);
      translate(210, 230);
      rotate(PI / 4.9);
      rect(0, 0, 100, 100);
    pop();

    // Ergebnis kleine Quadrate
    translate(60, 200);
    rectMode(CENTER);
    fill(255, 0, 0);
    rect(110, 270, 60, 60);
    fill(0, 0, 255);
    rect(180, 340, 80, 80);
    fill(255);
    triangle(140, 240, 140, 300, 220, 300);
    triangle(140, 240, 220, 240, 220, 300);
    triangle(140, 300, 140, 380, 80, 380);
    triangle(140, 300, 80, 300, 80, 380);
  }
}
