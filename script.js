// Keeps track of signed in players
function PlayerManager() {
	let players = { playerOne: null, playerTwo: null };

	return {
		storePlayer: function (player, formId) {
			if (formId === "player1") {
				players.playerOne = player;
			} else if (formId === "player2") {
				players.playerTwo = player;
			}

			console.log(players);

			if (players.playerOne && players.playerTwo) {
				console.log("Both players are set:", players);
				game(players);
			}
		},
		getPlayers: function () {
			return players;
		},
	};
}

const playerManager = PlayerManager();

// Creates player
function createPlayer(name, symbol) {
	return { name, symbol, score: 0, isTurn: false };
}

//Keeps track of current player move
function createTurnManager() {
	let currentPlayer = null;

	return {
		setPlayer(player) {
			currentPlayer = player;
			player.isTurn = true;
		},
		switchPlayer(playerOne, playerTwo) {
			currentPlayer.isTurn = false;
			currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
			currentPlayer.isTurn = true;
		},
		getCurrentPlayer() {
			return currentPlayer;
		},
	};
}

// player creation
function handleCreatePlayer(e) {
	e.preventDefault();

	//determine which player is being created
	const playerBeingCreated = e.target.id;
	console.log("This is form ID", playerBeingCreated);
	//retrieve form values
	const username = document.getElementById(
		`username${playerBeingCreated.charAt(playerBeingCreated.length - 1)}`
	).value;

	const symbol = document.querySelector(
		`input[name="symbol${playerBeingCreated.charAt(
			playerBeingCreated.length - 1
		)}"]:checked`
	).value;

	let player = createPlayer(username, symbol);
	playerManager.storePlayer(player, playerBeingCreated);

	console.log(player);

	//hide form
	document.getElementById(playerBeingCreated).classList.add("d-none");

	//show player info
	const currentPlayerInfo =
		document.getElementById(playerBeingCreated).nextElementSibling;
	currentPlayerInfo.classList.remove("d-none");

	//add player name
	const currentUsername = document.createElement("p");
	currentUsername.className = "name";
	currentUsername.textContent = `name: ${player.name}`;
	currentPlayerInfo.appendChild(currentUsername);

	//add player symbol
	const currentPlayerSymbol = document.createElement("p");
	currentPlayerSymbol.className = "symbol";
	currentPlayerSymbol.textContent = `symbol: ${player.symbol}`;
	currentPlayerInfo.appendChild(currentPlayerSymbol);

	//add player score
	const currentPlayerScore = document.createElement("p");
	currentPlayerScore.className = "score";
	currentPlayerScore.textContent = `score: ${player.score}`;
	currentPlayerInfo.appendChild(currentPlayerScore);
}

document
	.getElementById("player1")
	.addEventListener("submit", handleCreatePlayer);
document
	.getElementById("player2")
	.addEventListener("submit", handleCreatePlayer);

//Tic Tac Toe
/*
[[],[],[]]
[[],[],[]]
[[],[],[]]
*/
// 9 X 9 grid to create board
function createGameBoard(turnManager, playerOne, playerTwo) {
	const gameContainer = document.getElementById("game-container");
	const rows = 4;
	const columns = 4;

	//creates board should be a 3 * 3 square
	for (let i = 1; i < rows; i++) {
		const row = document.createElement("div");
		row.classList.add("row");
		gameContainer.appendChild(row);
		for (let j = 1; j < columns; j++) {
			const cell = document.createElement("p");
			cell.classList.add("column");
			cell.textContent = "";
			cell.id = `row${i}col${j}`;
			//add event listener to each cell
			cell.addEventListener("click", function () {
				handlePlayerMove(cell, turnManager, playerOne, playerTwo);
			});

			row.appendChild(cell);
		}
	}
}

//Allow player to move
function handlePlayerMove(cell, turnManager, playerOne, playerTwo) {
	let currentPlayer = turnManager.getCurrentPlayer();

	if (cell.textContent === "") {
		cell.textContent = currentPlayer.symbol;
		turnManager.switchPlayer(playerOne, playerTwo);
	} else {
		console.log("Cell has already been filled.");
	}
}

function game() {
	const { playerOne, playerTwo } = playerManager.getPlayers();

	let turnManager = createTurnManager();

	turnManager.setPlayer(playerOne); // set initial player
	createGameBoard(turnManager, playerOne, playerTwo);
}
