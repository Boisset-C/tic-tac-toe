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
			board[i].push([]);
		}
	}

	return board;
}

console.log(createGameBoard());

// player one { name: john smith, score: score, move: X }
// player two { name: anne smith, score: score, move: O }

//logic to keep track of turn and player move
// moves will involve a 0 and X
//turn based keep track of player and turn
//Winning condition when three X's or rows
