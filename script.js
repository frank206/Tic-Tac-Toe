//variable for X and O
const x = 'x';
const circle = 'circle';

//winning combinations of Tic-Tac-Toe board 
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]


const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('#board');
const resetBtn = document.querySelector(".reset");
const winnerMessage = document.querySelector(".text");
let circleTurn;

start();

resetBtn.addEventListener('click', start);

//starting game with X and switch on/off with O's
function start() {
  circleTurn = false;
  winnerMessage.innerText = "";
  cellElements.forEach(cell => {
    cell.classList.remove(x);
    cell.classList.remove(circle);
    cell.removeEventListener('click', selectCell);
    cell.addEventListener('click', selectCell, { once: true });
  })
  hoverCells();
}

//Main function to select each cell for X's and O's until a winner is drawn. 
//they game will keep playing until there is a winner or if it's a draw once every cell is filled
function selectCell(e) {;
  const cell = e.target;
  const currentClass = circleTurn ? circle : x;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    results(false);
  } else if (draw()) {
    results(true);
  } else {
    swap();
    hoverCells();
  }
}

//once round is over, determines who wins or if it's a draw.
function results(draw) {
  if (draw) {
    winnerMessage.innerHTML = 'This game is a draw!';
  } else {
    winnerMessage.innerHTML = `${circleTurn ? "O is the" : "X is the"} winner!`;
    cellElements.forEach(cell => {cell.removeEventListener('click', selectCell)});
  }
}

//if every cell is filled and no winner is determined > draw
function draw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(x) || cell.classList.contains(circle)
  })
}

//adding X and O's
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

//switch between X's and O's
function swap() {
  circleTurn = !circleTurn;
}

//showcase who's turn by hovering faded X or O's
function hoverCells() {
  board.classList.remove(x)
  board.classList.remove(circle)
  if (circleTurn) {
    board.classList.add(circle)
  } else {
    board.classList.add(x)
  }
}

//based on combos, determines who wins
function checkWin(currentClass) {
  return winCombos.some(combos => { 
    return combos.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}