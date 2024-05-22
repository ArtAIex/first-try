import { Chess } from '/node_modules/chess.js'

function createPiece(type, color) {
  //       #:(
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(color + type);
  const pieceImage = document.createElement('img');
  pieceImage.style.height = '100%';
  pieceImage.style.width = '100%';
  pieceImage.style.margin = 0;
  pieceImage.style.padding = 0;
  pieceImage.src = 'images/' + color + type + '.png';
  piece.appendChild(pieceImage);
  return piece;
}

function setBoardSize() {
  const div = document.getElementById('board');
  const parent = document.getElementById('content');
  div.style.height = Math.min(parent.clientWidth, parent.clientHeight) * 0.8 + 'px';
}

const boardSize = 8;
const board = document.createElement('div');
board.classList.add('chess_board');
board.id = 'board';

for (let i = 0; i < boardSize; i++) {
  for (let j = 0; j < boardSize; j++) {
    const cell = document.createElement('div');
    cell.classList.add('chess_cell');
    cell.id = String(i) + String(j);
    if ((i + j)%2 == 0) cell.classList.add('white_cell');
    else cell.classList.add('black_cell');
    cell.dataset.row = i;
    cell.dataset.col = j;
    board.appendChild(cell);
  }
}

const content = document.getElementById('content');
content.appendChild(board);

setBoardSize();

window.addEventListener('resize', function() {
  setBoardSize();
});

const chess = new Chess();
for (let i = 0; i < boardSize; i++) {
  for (let j = 0; j < boardSize; j++) {
    let column = String.fromCharCode(97 + j);
    if (chess.get(column + (i + 1))) {
      console.log(i, j);
      let currentPiece = createPiece(chess.get(column + (i + 1)).type, chess.get(column + (i + 1)).color);
      const cell = document.getElementById(String(i) + String(j));
      cell.appendChild(currentPiece);
    }
  }
}
