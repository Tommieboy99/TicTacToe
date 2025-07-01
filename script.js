//A function that takes player_name and player_marker (X or O), returns it as a player Object. 
function createPlayer (name, marker) {
    return {
        name: name,
        marker: marker,
    };
}

const gameBoard = (function () {

    const board = ["","","","","","","","",""];

    function placeMark(index, marker) {
        if (board[index] === "") {
            board[index] = marker;
            return true;
        } else {
            return false;
        }
    }

    function getBoard() {
        console.log(board);
    }

    function resultCheck() {
        const winningPatterns = [
            [0,1,2], [3,4,5], [6,7,8], //rows
            [0,3,6], [1,4,7], [2,5,8], //columns
            [0,4,8], [2,4,6] //diagonals
        ]

        for (const pattern of winningPatterns) {
            const [a, b, c] = pattern;
            // Check that all three cells are the same and not empty
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
              return board[a];  // This will be "X" or "O"
            }
        }

        if (!board.includes("")) {
            return "draw";
        }

        return null;
    }

    return {
        placeMark,
        getBoard,
        resultCheck
    }
})();

const gameController = (function () {

    let playerOne, playerTwo, currentPlayer;
    let playerOneScore = 0;
    let playerTwoScore = 0;

    function init() {
        displayController.selectGamePlayers();
        displayController.handleFormSubmit(startGame);
        displayController.selectBoardCell();
    }

    function startGame(playerOneName, playerTwoName) {
        playerOne = createPlayer(playerOneName, "X");
        playerTwo = createPlayer(playerTwoName, "O");
        currentPlayer = playerOne;
    }

    function playRound(index){
        const successfull = gameBoard.placeMark(index, currentPlayer.marker);
        if (!successfull) return null;

        const result = gameBoard.resultCheck();
        const placedMarker = currentPlayer.marker;

        if (result === "draw") {

            displayController.resultMessage("It's a draw!");
            displayController.updatePlayerTurn("");

        } else if (result === "X" || result === "O") {

            if (currentPlayer === playerOne) {
                playerOneScore++;
            } else {
                playerTwoScore++;
            }

            displayController.updateScoreboard(playerOne.name, playerOneScore, playerTwo.name, playerTwoScore)
            displayController.updatePlayerTurn("");
            displayController.resultMessage(`${currentPlayer.name} wins!`)

        } else {
            switchPlayer();
        }

        return placedMarker;
    }

    function switchPlayer() {
        if (currentPlayer === playerOne) {
          currentPlayer = playerTwo;
        } else {
          currentPlayer = playerOne;
        }

        displayController.updatePlayerTurn(`${currentPlayer.name}, it's your turn`);
    }

    return {
        startGame,
        init,
        playRound
    }

})();

const displayController = (function () {
    const startButton = document.querySelector(".startGameBtn");
    const dialogStart = document.querySelector(".playerForm");
    const dialogResult = document.querySelector(".resultWindow");
    const resultText = document.querySelector(".resultText");
    const form = document.querySelector("#startGameForm");
    const container = document.querySelector(".container");
    const displayGame = document.querySelector(".displayGame");
    const playerScore = document.querySelector(".playerScore");
    const gridCell = document.querySelectorAll('.gridCell');
    const playerTurn = document.querySelector(".playerTurn")

    function selectGamePlayers() {
        startButton.addEventListener('click', () => {
            container.style.display = "none";
            dialogStart.showModal();
        })
    }

    function handleFormSubmit(callback) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const playerOneName = document.getElementById("player1Name").value;
            const playerTwoName = document.getElementById("player2Name").value;

            dialogStart.close();
            displayGame.style.display = "flex";
            playerScore.textContent = `${playerOneName} 0 - 0 ${playerTwoName}`;
            playerTurn.textContent = `${playerOneName}, it's your turn`;


            callback(playerOneName, playerTwoName);

        })
    }

    function selectBoardCell() {
        gridCell.forEach((cell, index) => {
            cell.addEventListener("click", () => {

                const mark = gameController.playRound(index);

                if (mark) {
                    cell.textContent = mark;
                }
            })
        })
    }

    function resultMessage(message) {

        resultText.textContent = message;
        dialogResult.style.display = "flex";
        dialogResult.showModal();

    }

    function updateScoreboard(nameOne, scoreOne, nameTwo, scoreTwo) {
        playerScore.textContent = `${nameOne} ${scoreOne} - ${scoreTwo} ${nameTwo}`
    }

    function updatePlayerTurn(message) {
        playerTurn.textContent = message;
    }

    return {
        selectGamePlayers,
        handleFormSubmit,
        selectBoardCell,
        updateScoreboard,
        updatePlayerTurn,
        resultMessage
    }

})();

gameController.init();
