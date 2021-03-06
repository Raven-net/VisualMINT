class Vectorfield {
  constructor(scl){
    this.cols = floor(width/scl);
    this.rows = floor(height/scl);
    this.forcefield = [];
  }

  randomField (x, y) {
    var angle = random(0, TWO_PI);
    var v = p5.Vector.fromAngle(angle);
    v.setMag(random(0, 1)); //normalize this vector
    return v;
  }

  centerField (x, y) {
    let pos = createVector(x, y);
    let center = createVector(this.cols / 2, this.rows / 2);
    let v = p5.Vector.sub(center, pos).mult(0.1);
    return v;
  }

  initField() {
    for(var y = 0; y < this.rows; y++) {
      let forcefieldRow = [];
      for(var x = 0; x < this.cols; x++) {
        let v = this.centerField(x, y);
        forcefieldRow.push(v);
      }
    this.forcefield.push(forcefieldRow);
    }
  }

  drawArrow(base, vec, length) {
  push();
  stroke(255);
  strokeWeight(1);
  fill(255);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
//    let arrowSize = 1;
//    translate(vec.mag() - arrowSize, 0);
//    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}

  show() {
    beginShape();
    for(var y = 0; y < this.rows; y++){
      for(var x = 0; x < this.cols; x++){
        // let dir = this.forcefield[i][j];
        // let base = createVector(i * width / this.size + 0.5 * width / this.size, j * height / this.size + 0.5 * height / this.size);
        // this.drawArrow(base, dir, 1);
        stroke(map(this.forcefield[y][x].mag(), 0, 1, 0, 255), map(this.forcefield[y][x].mag(), 0, 1, 255, 0), 0);
        push();
        translate((x + 0.5) * scl, (y + 0.5) * scl);
        rotate(this.forcefield[y][x].heading());
        strokeWeight(1);
        line(-scl / 2, 0, scl / 2, 0);
        pop();
      }
    }
  }
}
