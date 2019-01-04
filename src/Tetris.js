import { ROWS, COLUMNS, SQUARE, EMPTY } from './config';
import { I, J, L, O, S, T, Z, PIECE_COLOR_MAPPING } from './tetrominoes';
import Piece from './Piece';

let board = [];
let timeToDrop = Date.now();
let gameOver = false;

class Tetris {
  constructor(canvasElement) {
    this.context = canvasElement.getContext('2d');
    this.createBoardArray();
    this.drawSquares();
    this.play();
  }

  drawSquare(x, y, colour) {
    this.context.fillStyle = colour;
    this.context.fillRect(x * SQUARE, y * SQUARE, SQUARE, SQUARE)
    this.context.strokeStyle = '#888';
    this.context.strokeRect(x * SQUARE, y * SQUARE, SQUARE, SQUARE)
  }

  createBoardArray() {
    for (let row = 0; row < ROWS; row++) {
      board[row] = [];
      for (let col = 0; col < COLUMNS; col++) {
        board[row][col] = EMPTY;
      }
    }
  }

  drawSquares() {
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLUMNS; col++) {
        // board[row][col] in drawSquare takes the 'white' from the
        // internal array and renders it in the canvas
        board[row][col] = this.drawSquare(col, row, board[row][col]);
      }
    }
  }

  drawPiece(piece, remove = false) {
    const colour = remove ? EMPTY : piece.colour;
    
    for (let row = 0; row < piece.activeTetromino.length; row++) {
      for (let col = 0; col < piece.activeTetromino.length; col++) {
        if (piece.activeTetromino[row][col]) {
          this.drawSquare(piece.colValue + col, piece.rowValue + row, colour)
        }
      }
    }
  }

  generateRandomPiece() {
    const randomNum = Math.floor(Math.random() * PIECE_COLOR_MAPPING.length);
    return new Piece(PIECE_COLOR_MAPPING[randomNum][0], PIECE_COLOR_MAPPING[randomNum][1]);
  }

  play() {
    const piece = this.generateRandomPiece();
    this.drawPiece(piece);
    this.drop(piece);
  }

  drop(piece) {
    const now = Date.now();
    const delta = now - timeToDrop;

    if (delta > 1000) {
      this.drawPiece(piece, 'remove');
      piece.moveDown()
      this.drawPiece(piece);
      timeToDrop = Date.now();
    }
    requestAnimationFrame(this.drop.bind(this, piece));
  }
}

export default Tetris;
