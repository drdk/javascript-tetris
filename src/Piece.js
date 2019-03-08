class Piece {
  constructor(tetromino, colour) {
    this.tetromino = tetromino;
    this.tetrominoRotation = 0;
    this.activeTetromino = this.tetromino[this.tetrominoRotation];
    this.colour = colour;

    // starts the piece above the board
    this.rowValue = -this.activeTetromino.length;
    // centers it horizontally when created
    this.colValue = 4;
  }

  moveDown() {
    this.rowValue++;
  }

  moveLeft() {
    this.colValue--;
  }

  moveRight() {
    this.colValue++;
  }

  rotate() {
    if (this.tetrominoRotation === 3) {
      this.tetrominoRotation = 0;
    } else {
      this.tetrominoRotation++;
    }
    console.log('this.tetrominoRotation', this.tetrominoRotation);
    this.activeTetromino = this.tetromino[this.tetrominoRotation];
  }
}

export default Piece;
