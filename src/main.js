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
  // console.log(Math.min(parent.clientWidth, parent.clientHeight) * 0.8);
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      const cell = document.getElementById(String(i) + String(j));
      // console.log(cell);
      const piece = document.getElementById(String(i) + String(j) + 'p');
      if (piece != null) {
        piece.style.height = Math.min(parent.clientWidth, parent.clientHeight) * 0.8 * 0.125 + 'px';
        piece.style.width = Math.min(parent.clientWidth, parent.clientHeight) * 0.8 * 0.125 + 'px';
        // console.log(Math.min(parent.clientWidth, parent.clientHeight));
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
    cell.classList.add('.droppable');

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
      currentPiece.ondragstart = function() {
        return false;
      };

      currentPiece.onmousedown = function(event) {
        currentPiece.style.position = 'absolute';
        currentPiece.style.zIndex = 1000;
        board.append(currentPiece);
        setBoardSize();
        function moveAt(pageX, pageY) {
          currentPiece.hidden = true;
          let elemBelow = document.elementFromPoint(pageX, pageY);
          currentPiece.hidden = false;
          if (elemBelow.classList.contains('chess_cell') || elemBelow.classList.contains('piece')) {
            currentPiece.style.left = pageX - currentPiece.offsetWidth / 2 + 'px';
            currentPiece.style.top = pageY - currentPiece.offsetHeight / 2 + 'px';
          }
        }
        moveAt(event.pageX, event.pageY);
        currentPiece.hidden = true;
        let currentCell = document.elementFromPoint(event.clientX, event.clientY);
        let start = currentCell;
        currentPiece.hidden = false;

        function enterDiv(container) {
          if (container.classList.contains('chess_cell') || container.classList.contains('piece')) {
            currentCell.classList.add('highlight');
          }
        }
        function leaveDiv(container) {
          if (container.classList.contains('chess_cell') || container.classList.contains('piece')) {
            currentCell.classList.remove('highlight');
          }
        }

        enterDiv(currentCell);
        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
          console.log(event.clientX, event.clientY);
          console.log(event.pageX, event.pageY);
          currentPiece.hidden = true;
          let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
          currentPiece.hidden = false;
          if (!elemBelow) return;
          if (elemBelow != currentCell) {
            if (currentCell) {
              leaveDiv(currentCell);
            }
            currentCell = elemBelow;
            if (currentCell) {
              enterDiv(currentCell);
            }
          }
        }
        document.addEventListener('mousemove', onMouseMove);
        currentPiece.onmouseup = function() {
          document.removeEventListener('mousemove', onMouseMove);
          currentPiece.onmouseup = null;
          console.log(currentCell);
          if (currentCell) {
            currentCell.append(currentPiece);
            leaveDiv(currentCell);
          }
          currentPiece.style.position = currentPiece.style.zIndex = currentPiece.style.left = currentPiece.style.top = null;
          setBoardSize();
        };
      };

      const cell = document.getElementById(String(i) + String(j));
      cell.appendChild(currentPiece);
    }
  }
}

const piece = document.getElementById('00p');
// console.log("==" + piece.width);
setBoardSize();
// console.log("==" + piece.width);

window.addEventListener('resize', function() {
  setBoardSize();
});
