class TopoField {
  constructor (size) {
    this.size = size;
    this.index = [];
    this.forcefield = [];
    this.initHeight();
    this.initGravity();
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

// init the topofield height
  initHeight () {
    let txy = 0.04;
    let xoff = 0;
    for (let i = 0; i < this.size; i++) {
      let yoff = 0;
      let indexRow = [];
      for (let j = 0; j < this.size; j++) {
        let c = noise(xoff, yoff) * 255;
        indexRow.push(c);
        yoff += txy;
      }
      this.index.push(indexRow);
      xoff += txy;
    }
  }

// searching for neighbours and filter the smalest for direction
  initGravity () {
    for (let i = 1; i < this.size - 1; i++) {
      let forcefieldRow = [];
      for (let j = 1; j < this.size - 1; j++) {
        let neighbours = [];
        let min;
        let dir;
        let v;
        let v_abs;
        for (let m = i - 1; m <= i + 1; m++) {
          for (let n = j - 1; n <= j + 1; n++) {
            neighbours.push(this.index[m][n]);
          }
        }
        min = Math.min.apply(null, neighbours);
        for (let n of neighbours) {
          if (n == min) {
            dir = neighbours.indexOf(n);
          }
        }
        v_abs = neighbours[4] - neighbours[dir];

        //set force in direction
        switch (dir) {
          case 0:
            v = createVector(-1, -1).normalize().mult(v_abs);
            forcefieldRow.push(v);
            break;
          case 1:
            v = createVector(-1, 0).normalize().mult(v_abs);
            forcefieldRow.push(v);
            break;
          case 2:
            v = createVector(-1, 1).normalize().mult(v_abs);
            forcefieldRow.push(v);
            break;
          case 3:
            v = createVector(0, -1).normalize().mult(v_abs);
            forcefieldRow.push(v);
            break;
          case 4:
            v = createVector(0, 0).normalize().mult(v_abs);
            forcefieldRow.push(v);
            break;
          case 5:
            v = createVector(0, 1).normalize().mult(v_abs);
            forcefieldRow.push(v);
            break;
          case 6:
            v = createVector(1, -1).normalize().mult(v_abs);
            forcefieldRow.push(v);
            break;
          case 7:
            v = createVector(1, 0).normalize().mult(v_abs);
            forcefieldRow.push(v);
            break;
          case 8:
            v = createVector(1, 1).normalize().mult(v_abs);
            forcefieldRow.push(v);
            break;
          default:
            break;
        }
      }
      this.forcefield.push(forcefieldRow);
    }
  }

  show () {
    for (let i = 2; i < this.size - 2; i++) {
      for (let j = 2; j < this.size - 2; j++) {
        let index = this.index[i][j];
        fill(0, index, 0);
        rect(i * width / this.size, j * height / this.size, width / this.size, height / this.size);
      }
    }
  }

  showVectorField (){
    for (let i = 2; i < this.size - 2; i++) {
      for (let j = 2; j < this.size - 2; j++) {
        let dir = this.forcefield[i][j];
        let base = createVector(i * width / this.size + 0.5 * width / this.size, j * height / this.size + 0.5 * height / this.size);
        this.drawArrow(base, dir, 1);
      }
    }
  }
}
