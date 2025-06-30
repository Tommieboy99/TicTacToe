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

    function init() {
        displayController.selectGamePlayers();
        displayController.handleFormSubmit(startGame);
        displayController.selectBoardCell();
    }

    function startGame(playerOneName, playerTwoName) {
        playerOne = createPlayer(playerOneName, "X");
        playerTwo = createPlayer(playerTwoName, "O");
        currentPlayer = playerOne;
        console.log(playerOne, playerTwo)
    }

    function playRound(index){
        gameBoard.placeMark(index, currentPlayer.marker);
        const result = gameBoard.resultCheck();

        if (result === "draw") {
            console.log("draw!");
        } else if (result === "X" || result === "O") {
            console.log(`${currentPlayer.name} wins!`);
        } else {
            switchPlayer();
        }

        return currentPlayer.marker
    }

    function switchPlayer() {
        if (currentPlayer === playerOne) {
          currentPlayer = playerTwo;
        } else {
          currentPlayer = playerOne;
        }
    }

    return {
        startGame,
        init,
        playRound
    }

})();

const displayController = (function () {
    const startButton = document.querySelector(".startGameBtn");
    const dialog = document.querySelector(".playerForm");
    const form = document.querySelector("#startGameForm");
    const container = document.querySelector(".container");
    const displayGame = document.querySelector(".displayGame");
    const playerScore = document.querySelector(".playerScore");
    const gridCell = document.querySelectorAll('.gridCell');

    function selectGamePlayers() {
        startButton.addEventListener('click', () => {
            container.style.display = "none";
            dialog.showModal();
        })
    }

    function handleFormSubmit(callback) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const playerOneName = document.getElementById("player1Name").value;
            const playerTwoName = document.getElementById("player2Name").value;

            if (!playerOneName || !playerTwoName) {
                alert("Fill in both player names");
                return;
            }

            dialog.close();
            displayGame.style.display = "flex";
            playerScore.textContent = `${playerOneName} 0 - 0 ${playerTwoName}`;


            callback(playerOneName, playerTwoName);

        })
    }

    function selectBoardCell() {
        gridCell.forEach((cell, index) => {
            cell.addEventListener("click", () => {
                console.log(index);
                const mark = gameController.playRound(index);
                if (mark){
                    cell.textContent = mark;
                }
            })
        })
    }

    return {
        selectGamePlayers,
        handleFormSubmit,
        selectBoardCell
    }

})();

gameController.init();
