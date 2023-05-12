const WIDTH = 600;
const HEIGHT = 600;
const CELL_WIDTH = WIDTH / 3;

const SHAPE_OFFSET = 25;

let shouldDraw = false;
let shape = 'x';

let winningShape = null;

let gameEnd = false;

let gameState = [
  ['-', '-', '-'],
  ['-', '-', '-'],
  ['-', '-', '-'],
];

function setup() {
  frameRate(5);
  createCanvas(WIDTH, HEIGHT);
  background(220);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      line(i * CELL_WIDTH, j * CELL_WIDTH, width, j * CELL_WIDTH);
      line(i * CELL_WIDTH, j * CELL_WIDTH, i * CELL_WIDTH, height);
      fill(255, 255, 255);
    }
  }
}

function draw() {
  // GAME END
  if (gameEnd) {
    background(220);
    fill(0);
    textSize(100);
    if (winningShape === 'x') {
      text('X WON', 140, 330);
    } else if (winningShape === 'o') {
      text('O WON', 140, 330);
    } else if (winningShape === null) {
      text('DRAW', 140, 330);
    }
  }

  // GAME LOOP
  if (shouldDraw && !gameEnd) {
    const moveResult = makeMove(mouseX, mouseY);
    if (moveResult === null) return;
    const { xPosition, yPosition } = moveResult;
    drawShape(xPosition, yPosition);
    if (shape === 'x') {
      shape = 'o';
    } else {
      shape = 'x';
    }
    shouldDraw = false;
  }

  checkWinner();
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

function makeMove(x, y) {
  const xCell = Math.floor(x / CELL_WIDTH);
  const yCell = Math.floor(y / CELL_WIDTH);

  if (gameState[xCell][yCell] !== '-') return null;

  gameState[xCell][yCell] = shape;

  const xPosition = xCell * CELL_WIDTH + SHAPE_OFFSET;
  const yPosition = (yCell + 1) * CELL_WIDTH - SHAPE_OFFSET;

  return { xPosition, yPosition };
}

function mouseClicked() {
  shouldDraw = true;
}

function checkForDraw() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (gameState[i][j] === '-') return;
    }
  }

  gameEnd = true;
}

function checkWinner() {
  // Check if game is drawn
  checkForDraw();

  // Check rows and columns
  for (let i = 0; i < 3; i++) {
    if (
      gameState[i][0] !== '-' &&
      gameState[i][0] === gameState[i][1] &&
      gameState[i][1] === gameState[i][2]
    ) {
      winningShape = gameState[i][0];
      gameEnd = true;
    }
    if (
      gameState[0][i] !== '-' &&
      gameState[0][i] === gameState[1][i] &&
      gameState[1][i] === gameState[2][i]
    ) {
      winningShape = gameState[0][i];
      gameEnd = true;
    }
  }

  // Check main diagonal
  if (
    gameState[0][0] !== '-' &&
    gameState[0][0] === gameState[1][1] &&
    gameState[1][1] === gameState[2][2]
  ) {
    winningShape = gameState[0][0];
    gameEnd = true;
  }

  // Check anti-diagonal
  if (
    gameState[0][2] !== '-' &&
    gameState[0][2] === gameState[1][1] &&
    gameState[1][1] === gameState[2][0]
  ) {
    winningShape = gameState[0][2];
    gameEnd = true;
  }
}
