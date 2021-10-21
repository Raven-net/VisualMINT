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
let rand = false;
let button;
let button2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  button = createButton('Start/Stop');
  button.position(20, 30);
  button.mousePressed(StartStop);
  button2 = createButton('Random');
  button2.position(20, 60);
  button2.mousePressed(randomCells);
  frameRate(10);
  cols = floor(width / resolution);
  rows = floor(height / resolution);
  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
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

  if (rand){
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = floor(random(2));
      }
    }
    rand = false;
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
    fill(255);
    stroke(0);
    rect(100, 10, 270, 80);
    noStroke();
    textSize(40);
    fill(255, 0, 0);
    text('Game of Life', 120, 50);
    textSize(20);
    fill(255, 0, 0);
    text('Setze aktive Zellen', 120, 75);
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

function StartStop(){
  if (run) {
    run = false;
  } else {
    run = true;
  }
}

function randomCells(){
  rand = true;
}

// function keyPressed() {
//   if (keyCode === ENTER) {
//     if (run == true) {
//       run = false;
//     } else {
//       run = true;
//     }
//   }
//   return false;
// }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  cols = floor(width / resolution);
  rows = floor(height / resolution);
  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = 0;
    }
  }
}
