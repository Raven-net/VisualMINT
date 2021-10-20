let cols, rows;
let size = 10;
let grid = [];
let current;
let stack = [];

function setup() {
  let canvas = createCanvas(640, 640);
  canvas.position(0, 0);
  // frameRate(20);
  cols = floor(width / size);
  rows = floor(height / size);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  current = grid[0];
}

function draw() {
  background(0);
  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  current.visited = true;
  current.highlight();
  let next = current.checkNeighbors();
  if (next) {
    // Step 1
    next.visited = true;

    // Step 2
    stack.push(current);

    // Step 3
    removeWalls(current, next);

    // Step 4
    current = next;

  } else if (stack.length > 0) {
    current = stack.pop();

  }

}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }

  return i + j * cols;
}

class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    this.visited = false;
  }

  checkNeighbors() {
    let neighbors = [];

    let top    = grid[index(this.i    , this.j - 1)];
    let right  = grid[index(this.i + 1, this.j    )];
    let bottom = grid[index(this.i    , this.j + 1)];
    let left   = grid[index(this.i - 1, this.j    )];

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      let r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }
  }

  highlight() {
    let x = this.i * size;
    let y = this.j * size;
    noStroke();
    fill(0, 255, 0);
    rect(x, y, size, size);
  }

  show() {
    let x = this.i * size;
    let y = this.j * size;
    stroke(255);
    if (this.walls[0]) {
      line(x       , y       , x + size, y       );
    }
    if (this.walls[1]) {
      line(x + size, y       , x + size, y + size);
    }
    if (this.walls[2]) {
      line(x + size, y + size, x       , y + size);
    }
    if (this.walls[3]) {
      line(x       , y + size, x       , y       );
    }

    if (this.visited) {
      noStroke();
      fill(0, 255, 0, 100);
      rect(x, y, size, size);
    }
  }
}

function removeWalls(a, b) {
  let x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }

  let y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }

}