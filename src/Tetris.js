import { ROWS, COLUMNS, SQUARE, EMPTY } from './config';
import { PIECE_COLOR_MAPPING } from './tetrominoes';
import Piece from './Piece';

let board = [];
let timeToDrop = Date.now();
let gameOver = false;
let piece = null;
const TIME_TO_NEXT_DROP = 300;
let score = 0;

class Tetris {
  constructor(canvasElement) {
    this.context = canvasElement.getContext('2d');
    this.createBoardArray();
    this.drawSquares();
    this.drawScore();
    this.registerKeyBindings()
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
        this.drawSquare(col, row, board[row][col]);
      }
    }
  }

  drawScore() {
    document.querySelector(".score .score__number").textContent = score;
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
    // const randomNum = Math.floor(Math.random() * PIECE_COLOR_MAPPING.length);
    // return new Piece(
    //   PIECE_COLOR_MAPPING[randomNum][0],
    //   PIECE_COLOR_MAPPING[randomNum][1]
    // );

    return new Piece(
      PIECE_COLOR_MAPPING[3][0],
      PIECE_COLOR_MAPPING[3][1]
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

    if (delta > TIME_TO_NEXT_DROP) {
      if (!this.willCollideWithPieceOrBoard(0, 1)) {
        this.drawPiece('remove');
        piece.moveDown();
        this.drawPiece();
      } else {
        // moving down is the only actions that places the piece on the board
        // colour in the actual board so the area no longer 
        // registers as empty and make a new piece
        this.placePiece();
        this.removeFullRows();
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

  removeFullRows() {
    // check if row full by looping through rows and for each one checking
    // if each column square is filled in or not
    for (let row = 0; row < ROWS; row++) {
      let isRowFull = true;
      
      for(let column = 0; column < COLUMNS; column++) {               
        isRowFull = isRowFull && board[row][column] !== EMPTY
      }

      // if row is full after going through all it's squares
      // move all the squares down by one from row
      if (isRowFull) {
        for (let rowsToMove = row; rowsToMove > 1; rowsToMove--) {
          for (let column = 0; column < COLUMNS; column++) {
            board[rowsToMove][column] = board[rowsToMove - 1][column];
          }
        }
        // now set the top row all to EMPTY
        for (let column = 0; column < COLUMNS; column++) { 
          board[0][column] = EMPTY;
        }
        // update the visual board based on the internal array
        this.drawSquares();
        // do score based things
        this.adjustScore();
        // update score
        this.drawScore();
      }
    }
  }

  adjustScore() {
    score += 10;
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
        if (board[newRowValue][newColValue] !== EMPTY) {
          return true;
        }

      }
    }
  }

  registerKeyBindings() {
    document.addEventListener('keydown', () => {
      if (event.keyCode === 37) {
        // move left if it wont collide
        if (!this.willCollideWithPieceOrBoard(-1, 0)) {
          this.drawPiece('remove');
          piece.moveLeft();
          this.drawPiece();
        }
      }
      if (event.keyCode === 39) {
        // move right if it wont collide
        if (!this.willCollideWithPieceOrBoard(1, 0)) {
          this.drawPiece('remove');
          piece.moveRight();
          this.drawPiece();
        }
      } 
      if (event.keyCode === 40) {
        // move down if it wont collide
        if (!this.willCollideWithPieceOrBoard(0, 1)) {
          this.drawPiece('remove');
          piece.moveDown();
          this.drawPiece();
        } else {
          // moving down is the only actions that places the piece on the board
          // colour in the actual board so the area no longer 
          // registers as empty and make a new piece
          this.placePiece();
          piece = this.generateRandomPiece();
        }
      }
      if (event.keyCode === 38) {
        this.drawPiece('remove');
        piece.rotate();
        this.drawPiece();
      }
    });    
  }
}

// @TODO
// rotation
// game over div
// increase speed based on level 

export default Tetris;
