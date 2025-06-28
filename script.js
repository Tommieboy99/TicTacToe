const Gameboard = (function () {

    //Storing Tic Tac Toe board in an array
    const board = ["", "", "", "", "", "", "", "", ""];

    //A function that takes player_name and player_marker (X or O), returns it as a player Object. 
    function createPlayer (name, marker) {
        return {
            name: name,
            marker: marker
        };
    }

    return {
        createPlayer
    }
})();

const playerOne = createPlayer("Tom", "X");

