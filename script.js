// Keeps track of signed in players
function PlayerManager() {
	let players = { playerOne: null, playerTwo: null };

	// player creation
	function handleCreatePlayer(e) {
		e.preventDefault();

		//determine which player is being created
		const playerBeingCreated = e.target.id;
		console.log("This is form ID", playerBeingCreated);
		//retrieve form values
		const username = document.getElementById(
			`username${playerBeingCreated.charAt(
				playerBeingCreated.length - 1
			)}`
		).value;

		const symbol = document.querySelector(
			`input[name="symbol${playerBeingCreated.charAt(
				playerBeingCreated.length - 1
			)}"]:checked`
		).value;

		let player = playerManager.createPlayer(username, symbol);
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
		createPlayer: function (name, symbol) {
			// Check if the symbol is already taken by the other player
			if (
				(players.playerOne && players.playerOne.symbol === symbol) ||
				(players.playerTwo && players.playerTwo.symbol === symbol)
			) {
				if (players.playerOne && players.playerOne.symbol === "X") {
					alert(
						"Two players cant pick the same symbol, it was picked for you!"
					);
					return { name, symbol: "O", score: 0, isTurn: false };
				} else if (
					players.playerOne &&
					players.playerOne.symbol === "O"
				) {
					alert(
						"Two players cant pick the same symbol, it was picked for you!"
					);
					return { name, symbol: "X", score: 0, isTurn: false };
				} else if (
					players.playerTwo &&
					players.playerTwo.symbol === "X"
				) {
					alert(
						"Two players cant pick the same symbol, it was picked for you!"
					);
					return { name, symbol: "O", score: 0, isTurn: false };
				} else if (
					players.playerTwo &&
					players.playerTwo.symbol === "O"
				) {
					alert(
						"Two players cant pick the same symbol, it was picked for you!"
					);
					return { name, symbol: "X", score: 0, isTurn: false };
				}
			} else {
				return { name, symbol, score: 0, isTurn: false };
			}
		},
	};
}

//Keeps track of current player
function CreateTurnManager() {
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

//Player actions and game actions
function Game(playerOne, playerTwo, turnManager) {
	//Game State
	let gameBoard = [
		[null, null, null],
		[null, null, null],
		[null, null, null],
	];

	//Allow player to move
	function handlePlayerMove(cell, i, j) {
		let currentPlayer = turnManager.getCurrentPlayer();

		if (gameBoard[i][j] === null) {
			gameBoard[i][j] = currentPlayer.symbol;
			cell.textContent = currentPlayer.symbol;
			// Add logic to check for win condition here
			turnManager.switchPlayer(playerOne, playerTwo);
		} else {
			console.log("Cell has already been filled.");
		}
	}

	return {
		createGameBoard: function () {
			const gameContainer = document.getElementById("game-container");
			gameContainer.innerHTML = ""; // Clear previous board

			//creates board should be a 3 * 3 square
			for (let i = 0; i < 3; i++) {
				const row = document.createElement("div");
				row.classList.add("row");
				gameContainer.appendChild(row);
				for (let j = 0; j < 3; j++) {
					const cell = document.createElement("p");
					cell.classList.add("column");
					cell.textContent = "";
					cell.id = `row${i}col${j}`;
					//add event listener to each cell
					cell.addEventListener("click", function () {
						handlePlayerMove(cell, i, j);
					});

					row.appendChild(cell);
				}
			}
		},
	};
}

//Game loop
function game(players) {
	let turnManager = CreateTurnManager();
	turnManager.setPlayer(players.playerOne); // Set initial player

	const gameManager = Game(players.playerOne, players.playerTwo, turnManager);
	gameManager.createGameBoard();
}

const playerManager = PlayerManager();
