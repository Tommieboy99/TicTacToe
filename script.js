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

    return {
        displayBoard
    }

})();

const gameController = (function () {
    //Setup: create two players
    const playerOne = createPlayer("Tom", "X");
    const playerTwo = createPlayer("Stacey", "O");

    //Track current player
    let currentPlayer = playerOne;
    

    return {
    }
})();

Gameboard.displayBoard();