function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let cols;
let rows;
let resolution = 10;
let run = false;

function setup() {
  createCanvas(800, 600);
  cols = width / resolution;
  rows = height / resolution;
  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      // grid[i][j] = floor(random(2));
      grid[i][j] = 0;
    }
  }
}

function draw() {
  background(255);

  if (mouseIsPressed && mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    let x = floor(map(mouseX, 0, width, 0, width / resolution));
    let y = floor(map(mouseY, 0, height, 0, height / resolution));
    grid[x][y] = 1;
  } else if (mouseIsPressed && keyIsPressed === true && mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    let x = floor(map(mouseX, 0, width, 0, width / resolution));
    let y = floor(map(mouseY, 0, height, 0, height / resolution));
    grid[x][y] = 0;
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;

      if (grid[i][j] == 1) {
        fill(0);
        stroke(255);
        rect(x, y, resolution - 1, resolution - 1);
      }
    }
  }

  if (run) {
    let next = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let state = grid[i][j];
        let sum = 0;
        let neighbors = countNeighbors(grid, i, j);

        if (state == 0 && neighbors == 3) {
          next[i][j] = 1;
        } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
          next[i][j] = 0;
        } else {
          next[i][j] = state;
        }
      }
    }
    grid = next;
  } else {
    textSize(40);
    fill(0, 255, 0);
    text('Pause', 50, 50);
    textSize(20);
    fill(0, 255, 0);
    text('Press ENTER to Start', 50, 75);
  }
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {

      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;

      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}

function keyPressed() {
  if (keyCode === ENTER) {
    if (run == true) {
      run = false;
    } else {
      run = true;
    }
  }
  return false;
}
