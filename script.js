//Tic Tac Toe
/*
[[],[],[]]
[[],[],[]]
[[],[],[]]
*/
// 9 X 9 grid to create board
function createGameBoard() {
	const rows = 3;
	const columns = 3;
	let board = [];

	//creates board should be a 3 * 3 square
	for (let i = 0; i < rows; i++) {
		board[i] = [];
		for (let j = 0; j < columns; j++) {
			board[i][j] = "";
		}
	}

	return board;
}

let gameBoard = createGameBoard();
console.log(gameBoard);

// player one { name: john smith, score: score, move: X }
// player two { name: anne smith, score: score, move: O }
function createPlayer(name, symbol) {
	return { name, symbol };
}

let john = createPlayer("John", "X");
let anne = createPlayer("Anne", "0");

function makeMove(board, row, column, symbol) {
	if (board[row][column] === "") {
		board[row][column] = symbol;
	} else {
		return "Please pick another square";
	}
}

function game(board, playerOne, playerTwo) {
	const newBoard = board;
	const firstPlayer = playerOne;
	const secondPlayer = playerTwo;

	makeMove(newBoard, 1, 2, firstPlayer.symbol);
	makeMove(newBoard, 1, 1, secondPlayer.symbol);

	return newBoard;
}

console.log("This is game board after one move", game(gameBoard, john, anne));

//logic to keep track of turn and player move
// moves will involve a 0 and X
//turn based keep track of player and turn
//Winning condition when three X's or rows
