//A function that takes player_name and player_marker (X or O), returns it as a player Object. 
function createPlayer (name, marker) {
    function greet() {
        console.log(`Hello ${name}, your marker is ${marker}. Good luck!`);
    }
    return {
        name: name,
        marker: marker,
        greet
    };
}

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

    return {
        displayBoard,
        placeMark
    }

})();

const gameController = (function () {
    //Setup: create two players
    const playerOne = createPlayer("Tom", "X");
    const playerTwo = createPlayer("Stacey", "O");

    //Track current player
    let currentPlayer = playerOne;

    function playRound(index) {
        //Checks if the board cell at index is empty
        //If yes, place the currentPlayer' s marker
        //Switch to the other player.
        //Display the board
        if (Gameboard.placeMark(index, currentPlayer.marker)){
            Gameboard.displayBoard();
            switchPlayer();
        } else {
            console.log("Cell is already taken!");
        }
        }
        
        //Function to switch currentPlayer between playerOne and playerTwo
        function switchPlayer() {
            currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
        }

    return {
        playRound
    }
})();

gameController.playRound(2);