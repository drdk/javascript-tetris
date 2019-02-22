/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_Tetris__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/Tetris */ "./src/Tetris.js");

new _src_Tetris__WEBPACK_IMPORTED_MODULE_0__["default"](document.getElementById('tetris'));

/***/ }),

/***/ "./src/Piece.js":
/*!**********************!*\
  !*** ./src/Piece.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Piece {
  constructor(tetromino, colour) {
    this.tetromino = tetromino;
    this.tetrominoRotation = 0;
    this.activeTetromino = this.tetromino[this.tetrominoRotation];
    this.colour = colour; // starts the piece above the board

    this.rowValue = -this.activeTetromino.length - 1; // centers it horizontally when created

    this.colValue = 3;
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
    if (this.tetrominoRotation === 4) {
      this.tetrominoRotation = 0;
    } else {
      this.tetrominoRotation++;
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Piece);

/***/ }),

/***/ "./src/Tetris.js":
/*!***********************!*\
  !*** ./src/Tetris.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/config.js");
/* harmony import */ var _tetrominoes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tetrominoes */ "./src/tetrominoes.js");
/* harmony import */ var _Piece__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Piece */ "./src/Piece.js");



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
    for (let row = 0; row < _config__WEBPACK_IMPORTED_MODULE_0__["ROWS"]; row++) {
      board[row] = [];

      for (let col = 0; col < _config__WEBPACK_IMPORTED_MODULE_0__["COLUMNS"]; col++) {
        board[row][col] = _config__WEBPACK_IMPORTED_MODULE_0__["EMPTY"];
      }
    }
  }

  drawSquares() {
    for (let row = 0; row < _config__WEBPACK_IMPORTED_MODULE_0__["ROWS"]; row++) {
      for (let col = 0; col < _config__WEBPACK_IMPORTED_MODULE_0__["COLUMNS"]; col++) {
        // board[row][col] in drawSquare takes the 'white' from the
        // internal array and renders it in the canvas
        board[row][col] = this.drawSquare(col, row, board[row][col]);
      }
    }
  }

  drawSquare(x, y, colour) {
    this.context.fillStyle = colour;
    this.context.fillRect(x * _config__WEBPACK_IMPORTED_MODULE_0__["SQUARE"], y * _config__WEBPACK_IMPORTED_MODULE_0__["SQUARE"], _config__WEBPACK_IMPORTED_MODULE_0__["SQUARE"], _config__WEBPACK_IMPORTED_MODULE_0__["SQUARE"]);
    this.context.strokeStyle = '#888';
    this.context.strokeRect(x * _config__WEBPACK_IMPORTED_MODULE_0__["SQUARE"], y * _config__WEBPACK_IMPORTED_MODULE_0__["SQUARE"], _config__WEBPACK_IMPORTED_MODULE_0__["SQUARE"], _config__WEBPACK_IMPORTED_MODULE_0__["SQUARE"]);
  }

  drawPiece(remove = false) {
    const colour = remove ? _config__WEBPACK_IMPORTED_MODULE_0__["EMPTY"] : piece.colour;

    for (let row = 0; row < piece.activeTetromino.length; row++) {
      for (let col = 0; col < piece.activeTetromino.length; col++) {
        if (piece.activeTetromino[row][col]) {
          this.drawSquare(piece.colValue + col, piece.rowValue + row, colour);
        }
      }
    }
  }

  generateRandomPiece() {
    const randomNum = Math.floor(Math.random() * _tetrominoes__WEBPACK_IMPORTED_MODULE_1__["PIECE_COLOR_MAPPING"].length);
    return new _Piece__WEBPACK_IMPORTED_MODULE_2__["default"](_tetrominoes__WEBPACK_IMPORTED_MODULE_1__["PIECE_COLOR_MAPPING"][randomNum][0], _tetrominoes__WEBPACK_IMPORTED_MODULE_1__["PIECE_COLOR_MAPPING"][randomNum][1]);
  }

  play() {
    piece = this.generateRandomPiece();
    this.drawPiece(piece);
    this.drop(piece);
  }

  placePiece() {
    for (let row = 0; row < piece.activeTetromino.length; row++) {
      for (let col = 0; col < piece.activeTetromino.length; col++) {
        // skips the squares that are blank in the active tetromino
        if (!piece.activeTetromino[row][col]) {
          continue;
        } // if the row value is less than 0 then you are above the board
        // and you have lost...loser. 


        if (piece.rowValue + row < 0) {
          gameOver = true;
          break;
        } // colour in the board


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
        piece.moveDown();
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
      console.log(board); //@TODO add a fancy modal here asking to play again
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
        } // adjusts the coordinate of the pieces square based on movement 
        // that is about to happen


        let newColValue = piece.colValue + col + xAdjustment;
        let newRowValue = piece.rowValue + row + yAdjustment; // skip values in which y is not 0 yet (as the piece starts above the
        // grid, so y is initially negative)

        if (newRowValue < 0) {
          continue;
        } // check if it will collide with board edges if this movement occurs


        if (newColValue < 0 || newColValue >= _config__WEBPACK_IMPORTED_MODULE_0__["COLUMNS"] || newRowValue >= _config__WEBPACK_IMPORTED_MODULE_0__["ROWS"]) {
          return true;
        } // check if there is a placed piece on that square of the board


        if (board[newRowValue][newColValue] !== undefined) {
          return true;
        }
      }
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Tetris);

/***/ }),

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/*! exports provided: ROWS, COLUMNS, SQUARE, EMPTY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROWS", function() { return ROWS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLUMNS", function() { return COLUMNS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SQUARE", function() { return SQUARE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EMPTY", function() { return EMPTY; });
const ROWS = 20;
const COLUMNS = 10;
const SQUARE = 20;
const EMPTY = 'white';


/***/ }),

/***/ "./src/tetrominoes.js":
/*!****************************!*\
  !*** ./src/tetrominoes.js ***!
  \****************************/
/*! exports provided: I, J, L, O, S, T, Z, PIECE_COLOR_MAPPING */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "I", function() { return I; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "J", function() { return J; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "L", function() { return L; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "O", function() { return O; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "S", function() { return S; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "T", function() { return T; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Z", function() { return Z; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PIECE_COLOR_MAPPING", function() { return PIECE_COLOR_MAPPING; });
const I = [[[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]], [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]], [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]]];
const J = [[[1, 0, 0], [1, 1, 1], [0, 0, 0]], [[0, 1, 1], [0, 1, 0], [0, 1, 0]], [[0, 0, 0], [1, 1, 1], [0, 0, 1]], [[0, 1, 0], [0, 1, 0], [1, 1, 0]]];
const L = [[[0, 0, 1], [1, 1, 1], [0, 0, 0]], [[0, 1, 0], [0, 1, 0], [0, 1, 1]], [[0, 0, 0], [1, 1, 1], [1, 0, 0]], [[1, 1, 0], [0, 1, 0], [0, 1, 0]]];
const O = [[[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]]];
const S = [[[0, 1, 1], [1, 1, 0], [0, 0, 0]], [[0, 1, 0], [0, 1, 1], [0, 0, 1]], [[0, 0, 0], [0, 1, 1], [1, 1, 0]], [[1, 0, 0], [1, 1, 0], [0, 1, 0]]];
const T = [[[0, 1, 0], [1, 1, 1], [0, 0, 0]], [[0, 1, 0], [0, 1, 1], [0, 1, 0]], [[0, 0, 0], [1, 1, 1], [0, 1, 0]], [[0, 1, 0], [1, 1, 0], [0, 1, 0]]];
const Z = [[[1, 1, 0], [0, 1, 1], [0, 0, 0]], [[0, 0, 1], [0, 1, 1], [0, 1, 0]], [[0, 0, 0], [1, 1, 0], [0, 1, 1]], [[0, 1, 0], [1, 1, 0], [1, 0, 0]]];
const PIECE_COLOR_MAPPING = [[I, 'cyan'], [J, 'orange'], [L, 'purple'], [O, 'blue'], [S, 'green'], [T, 'yellow'], [Z, 'red']];


/***/ })

/******/ });
//# sourceMappingURL=index.js.map