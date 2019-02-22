import { ROWS, COLUMNS, SQUARE, EMPTY } from './config';
import { PIECE_COLOR_MAPPING } from './tetrominoes';
import Piece from './Piece';

let board = [];
let timeToDrop = Date.now();
let gameOver = false;
let piece = null;

class Tetris {
  constructor(canvasElement) {
    this.context = canvasElement.getContext('2d');
    this.createBoardArray();
    this.drawSquares();
    this.play();
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

  drawSquare(x, y, colour) {
    this.context.fillStyle = colour;
    this.context.fillRect(x * SQUARE, y * SQUARE, SQUARE, SQUARE)
    this.context.strokeStyle = '#888';
    this.context.strokeRect(x * SQUARE, y * SQUARE, SQUARE, SQUARE)
  }

  drawPiece(remove = false) {
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
    return new Piece(
      PIECE_COLOR_MAPPING[randomNum][0],
      PIECE_COLOR_MAPPING[randomNum][1]
    );
  }

  play() {
    piece = this.generateRandomPiece();
    this.drawPiece(piece);
    this.drop(piece);
  }

  placePiece() {
    for(let row = 0; row < piece.activeTetromino.length; row++) {
      for (let col = 0; col < piece.activeTetromino.length; col++) {
        // skips the squares that are blank in the active tetromino
        if (!piece.activeTetromino[row][col]) {
          continue;
        }

        // if the row value is less than 0 then you are above the board
        // and you have lost...loser. 
        if (piece.rowValue + row < 0) {
          gameOver = true;
          break;
        }

        // colour in the board
        board[piece.rowValue + row][piece.colValue + col] = piece.colour;
      }
    }
  }

  drop() {
    const now = Date.now();
    const delta = now - timeToDrop;
    const timeToNextDrop = 100;

    if (delta > timeToNextDrop) {
      if (!this.willCollideWithPieceOrBoard(0, 1)) {
        this.drawPiece('remove');
        piece.moveDown()
        this.drawPiece();
      } else {
        // colour in the actual board so the area no longer 
        // registers as empty and make a new piece
        this.placePiece();
        piece = this.generateRandomPiece();
      }
      timeToDrop = Date.now();
    }
    if (gameOver) {
      alert('You are such a loser, how do you live like that?');
    } else {
      requestAnimationFrame(() => this.drop());
    }
  }

  willCollideWithPieceOrBoard(xAdjustment, yAdjustment) {
    // loop through each square in the piece's array
    for (let row = 0; row < piece.activeTetromino.length; row++) {
      for (let col = 0; col < piece.activeTetromino.length; col++) {

        // skip empty (0 value) square (see tetrominis.js)
        if (!piece.activeTetromino[row][col]) {
          continue;
        }

        // adjusts the coordinate of the pieces square based on movement 
        // that is about to happen
        let newColValue = piece.colValue + col + xAdjustment;
        let newRowValue = piece.rowValue + row + yAdjustment;

        // skip values in which y is not 0 yet (as the piece starts above the
        // grid, so y is initially negative)
        if (newRowValue < 0) {
          continue;
        }

        // check if it will collide with board edges if this movement occurs
        if (newColValue < 0 || newColValue >= COLUMNS || newRowValue >= ROWS) {
          return true;
        }

        // check if there is a placed piece on that square of the board
        if (board[newRowValue][newColValue] !== undefined) {
          return true;
        }

      }
    }
  }
}

// @TODO
// rotation
// left key
// right key
// down key
// game over div
// remove full rows
// score 

export default Tetris;
