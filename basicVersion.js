const CANVAS_SIZE = 600;
const CELL_WIDTH = CANVAS_SIZE / 3;

let shouldDraw = false;
let gameEnd = false;
let shape = 'x';

let cellOffset = 22;

function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  background(220);
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      line(row * CELL_WIDTH, col * CELL_WIDTH, CELL_WIDTH, col * CELL_WIDTH);
      line(row * CELL_WIDTH, col * CELL_WIDTH, row * CELL_WIDTH, CELL_WIDTH);
      fill(255, 255, 255);
    }
  }
}

function draw() {
  if (shouldDraw) {
    const xPosition = calculateXPosition(mouseX);
    const yPosition = calculateYPosition(mouseY);
    drawShape(xPosition, yPosition);
    if (shape === 'x') {
      shape = 'o';
    } else {
      shape = 'x';
    }
    shouldDraw = false;
  }
}

function calculateXPosition(x) {
  const xPosition = Math.floor(x / CELL_WIDTH) * CELL_WIDTH + cellOffset;
  return xPosition;
}

function calculateYPosition(y) {
  const yPosition = (Math.floor(y / CELL_WIDTH) + 1) * CELL_WIDTH - cellOffset;
  return yPosition;
}

function drawShape(x, y) {
  textSize(300);
  if (shape === 'x') {
    fill(0, 0, 255);
    text('x', x, y);
  }
  if (shape === 'o') {
    fill(255, 0, 0);
    text('o', x, y);
  }
}

function mouseClicked() {
  shouldDraw = true;
}
