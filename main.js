'use strict';

const grid = document.querySelector(`.game__grid`);
const startButton = document.querySelector(`.game__start`);
const scoreDisplay = document.querySelector(`.game__score-number`);
let score = 0;
let squares = [];
let currentSnake = [2, 1, 0];
const width = 10;
let direction = 1;
let timeInterval = 1000;
let appleIndex = 0;
let speed = 0.9;
let timerId = 0;

function createGrid() {
  for (let i = 0; i < width * width; i++) {
    let square = document.createElement(`div`);
    square.classList.add(`square`);
    grid.appendChild(square);
    squares.push(square);
  }
}

createGrid();

currentSnake.forEach((index) => {
  squares[index].classList.add(`snake`);
});

function startGame() {
  currentSnake.forEach((index) => {
    squares[index].classList.remove(`snake`);
  });
  squares[appleIndex].classList.remove(`apple`);
  currentSnake = [2, 1, 0];
  score = 0;
  scoreDisplay.textContent = score;
  direction = 1;
  timeInterval = 1000;
  generateApple();
  currentSnake.forEach((index) => {
    squares[index].classList.add(`snake`);
  });
  timerId = setInterval(move, timeInterval);
}


function move() {
  if ((currentSnake[0] % width === 9 && direction === 1) ||
      (currentSnake[0] - width < 0 && direction === -width) ||
      (currentSnake[0] + width >= width * width && direction === width) ||
      (currentSnake[0] % width === 0 && direction === -1) ||
      (squares[currentSnake[0] + direction].classList.contains(`snake`))
  ) {
    grid.classList.add(`game__grid--game-over`);
    return clearInterval(timerId);
  }


  let tail = currentSnake.pop();
  squares[tail].classList.remove(`snake`);
  currentSnake.unshift(currentSnake[0] + direction);

  if (squares[currentSnake[0]].classList.contains(`apple`)) {
    squares[currentSnake[0]].classList.remove(`apple`);
    squares[tail].classList.add(`snake`);
    currentSnake.push(tail);
    generateApple();
    score++;
    scoreDisplay.textContent = score;
    clearInterval(timerId);
    timeInterval *= speed;
    timerId = setInterval(move, timeInterval);
  }

  squares[currentSnake[0]].classList.add(`snake`);
}

function generateApple() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains(`snake`));
  squares[appleIndex].classList.add(`apple`);
}

generateApple();

function control(e) {
  if (e.keyCode === 39) {
    e.preventDefault();
    direction = 1;
  } else if (e.keyCode === 38) {
    e.preventDefault();
    direction = -width;
  } else if (e.keyCode === 37) {
    e.preventDefault();
    direction = -1;
  } else if (e.keyCode === 40) {
    e.preventDefault();
    direction = +width;
  }
}

document.addEventListener(`keydown`, control);
startButton.addEventListener(`click`, startGame);
