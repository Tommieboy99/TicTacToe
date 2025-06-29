//A function that takes player_name and player_marker (X or O), returns it as a player Object. 
function createPlayer (name, marker) {
    return {
        name: name,
        marker: marker,
    };
}
/*
const Gameboard = (function () {

    //Storing Tic Tac Toe board in an array
    const board = ["", "", "", "", "", "", "", "", ""];

    //Function to display the board like a 3x3 "grid" in the console

    function displayBoard() {
        console.log([
            board.slice(0, 3),
            board.slice(3, 6),
            board.slice(6, 9)
        ]);
    }

    //Function to place  mark
    function placeMark(index, marker) {
        if (board[index] === "") {
            board[index] = marker;
            return true
        } else {
            return false
        }
    }

    function gameResult() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
            [0, 4, 8], [2, 4, 6] //diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }

        if (!board.includes("")) {
            return "draw";
        }

        return null;
    }

    function gameReset() {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    }

    return {
        displayBoard,
        placeMark,
        gameResult,
        gameReset
    }

})();

const gameController = (function () {
    //Track current player
    let currentPlayer = playerOne;

    Gameboard.displayBoard();
    getCurrentPlayer();

    function playRound(index) {
        if (index < 0 || index > 8 || isNaN(index)) {
            return console.log("This input isnt valid. Enter a number(0 - 8).")
        }
        //Checks if the board cell at index is empty
        //If yes, place the currentPlayer' s marker
        //Switch to the other player.
        //Display the board
        if (Gameboard.placeMark(index, currentPlayer.marker)){
            Gameboard.displayBoard();
            const result = Gameboard.gameResult();
            if (result) {
                if (result === 'draw') {
                    console.log("It's a draw!");
                } else  {
                    console.log(`${currentPlayer.name} wins!`);
                }
            Gameboard.gameReset();
            console.log("Game reset! Let's play again.")
            currentPlayer = playerOne;
            Gameboard.displayBoard();
            getCurrentPlayer();
            return;
            }
            
            switchPlayer();
            getCurrentPlayer();
        } else {
            console.log("Cell is already taken!");
            }
        }  
        
        //Function to switch currentPlayer between playerOne and playerTwo
        function switchPlayer() {
            currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
        }

        //Function to show the current player's name(whose turn it is)
        function getCurrentPlayer() {
            return console.log(`Its your turn ${currentPlayer.name}. Use the function gameController.playRound(0...8) to place your ${currentPlayer.marker} in the gameboard.`)
        }

    return {
        playRound
    }
})();
*/

const displayController = (function () {
    const startButton = document.querySelector(".startGameBtn");
    const dialog = document.querySelector(".playerForm");
    const form = document.querySelector(".startGameForm");
    const container = document.querySelector(".container");
    const boardGrid = document.querySelector(".boardGrid");

    function selectGamePlayers() {
        startButton.addEventListener('click', () => {
            container.style.display = "none";
            dialog.showModal();
        })
    }

    selectGamePlayers();

    function handleFormSubmit() {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const playerOneName = document.getElementById("#player1Name").value;
            const playerTwoName = document.getElementById("#player2Name").value;

            if (!playerOneName || !playerTwoName) {
                alert("Fill in both player names");
                return;
            }

            const playerOneMarker = "X";
            const playerTwoMarker = "O";

            const playerOne = createPlayer(playerOneName, playerOneMarker);
            const playerTwo = createPlayer(playerTwoName, playerTwoMarker);

            dialog.close();
            boardGrid.style.display = "grid";

        })
    }



    return {
        selectGamePlayers,
        handleFormSubmit
    }

})();
