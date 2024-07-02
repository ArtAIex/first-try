import { Chess } from '/node_modules/chess.js'

function createPiece(type, color) {
  //       #:(
  const piece = document.createElement('img');
  piece.classList.add('piece');
  piece.draggable = 'true';
  piece.src = 'images/' + color + type + '.png';
  return piece;
}

function setBoardSize() {
  const div = document.getElementById('board');
  const parent = document.getElementById('content');
  div.style.height = Math.min(parent.clientWidth, parent.clientHeight) * 0.8 + 'px';
  console.log(Math.min(parent.clientWidth, parent.clientHeight) * 0.8);
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      const cell = document.getElementById(String(i) + String(j));
      console.log(cell);
      const piece = document.getElementById(String(i) + String(j) + 'p');
      if (piece != null) {
        piece.height = Math.min(parent.clientWidth, parent.clientHeight) * 0.8 * 0.125 + 'px';
        piece.width = Math.min(parent.clientWidth, parent.clientHeight) * 0.8 * 0.125 + 'px';
        console.log(Math.min(parent.clientWidth, parent.clientHeight));
      }
      cell.style.height = Math.min(parent.clientWidth, parent.clientHeight) * 0.8 * 0.125 + 'px';
      cell.style.width = Math.min(parent.clientWidth, parent.clientHeight) * 0.8 * 0.125 + 'px';
    }
  }
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
    cell.addEventListener('dragover', function(event) {
      event.preventDefault();
    });
    cell.addEventListener('dragenter', function(event) {
      event.target.classList.add('highlight');
    });
    cell.addEventListener('dragleave', function(event) {
      event.target.classList.remove('highlight');
    });
    cell.addEventListener('drop', function(event) {
      const id = event.dataTransfer.getData('id');
      const element = document.getElementById(id);
      element.style.opacity = 1;
      console.log(event.target);
      event.target.classList.remove('highlight');
      event.target.append(element);
    });
    cell.addEventListener('dragend', function(event) {
    });
    board.appendChild(cell);
  }
}

const content = document.getElementById('content');
content.appendChild(board);

const chess = new Chess();
for (let i = 0; i < boardSize; i++) {
  for (let j = 0; j < boardSize; j++) {
    let column = String.fromCharCode(97 + j);
    if (chess.get(column + (i + 1))) {
      let currentPiece = createPiece(chess.get(column + (i + 1)).type, chess.get(column + (i + 1)).color);
      currentPiece.id = String(i) + String(j) + 'p';
      currentPiece.addEventListener('dragstart', function(event) {
        console.log(event.target);
        event.dataTransfer.setData('id', event.target.id);
        event.dataTransfer.effectAllowed = "move";
        this.style.opacity = 0;
      });
      currentPiece.addEventListener('drag', function(event) {

      });
      const cell = document.getElementById(String(i) + String(j));
      cell.appendChild(currentPiece);
    }
  }
}

const piece = document.getElementById('00p');
console.log("==" + piece.width);
setBoardSize();
console.log("==" + piece.width);

window.addEventListener('resize', function() {
  setBoardSize();
});
