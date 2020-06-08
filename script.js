const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const restartMessageTextElement = document.querySelector('[data-restart-message-text]');
const restartMessageElement = document.getElementById('restartMessage');
const restartButton = document.getElementById('restartButton');
let circleTurn;
const combinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
  circleTurn = false;
  restartMessageElement.classList.remove('show');
  setBoardHoverClass();
  cells.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener('click', cellClickedHandler);
    cell.addEventListener('click', cellClickedHandler, { once: true });
  });
}

function cellClickedHandler(e) {
  //place mark
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  e.target.classList.add(currentClass);

  if(checkWinner(currentClass)) {   //Check Winner
    endGame(false);
  } else if(checkDraw()) {   //Check Draw
    endGame(true);
  } else {   //switch turn
    circleTurn = !circleTurn;
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if(draw) {
    restartMessageTextElement.innerText = 'Draw!';
  } else {
    restartMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }

  restartMessageElement.classList.add('show');
}

function checkWinner(currentClass) {
  return combinations.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
};

function checkDraw() {
  return [...cells].every(cell => {
    return cell.className.includes(X_CLASS) || cell.className.includes(CIRCLE_CLASS);
  });
};

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);

  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  board.classList.add(currentClass);
};