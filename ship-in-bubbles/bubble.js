class Bubble {
  constructor (x, y, r, b) {
    this.x = x;
    this.y = y;
    this.pos = createVector(this.x, this.y);
    this.r = r;
    this.color = color(b, 50);
  }

  move () {
    this.x += random(-5, 5);
    this.y += random(-5, 5);
  }

  delete (i) {
    if (dist(mouseX, mouseY, this.x, this.y) < this.r) {
      bubbles.splice(i, 1);
    }
  }

  rollover (i) {
    if (dist(ship.pos.x, ship.pos.y, this.x, this.y) < this.r) {
      bubbles.splice(i, 1);
    }
  }

  intersects(bubb) {
    let d = dist(this.x, this.y, bubb.x, bubb.y)
    if (d < this.r / 2 + bubb.r / 2) {
      return true;
    } else {
      return false;
    }
  }

  show () {
    stroke(255);
    strokeWeight(1);
    fill(this.color);
    ellipse(this.x, this.y, this.r);
  }
}
