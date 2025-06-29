//A function that takes player_name and player_marker (X or O), returns it as a player Object. 
function createPlayer (name, marker) {
    return {
        name: name,
        marker: marker,
    };
}

const gameController = (function () {

    function init() {
        displayController.selectGamePlayers();
        displayController.handleFormSubmit(startGame);
    }

    function startGame(playerOneName, playerTwoName) {
        let playerOne = createPlayer(playerOneName, "X");
        let playerTwo = createPlayer(playerTwoName, "O");
    }

    return {
        startGame,
        init
    }

})();

const displayController = (function () {
    const startButton = document.querySelector(".startGameBtn");
    const dialog = document.querySelector(".playerForm");
    const form = document.querySelector("#startGameForm");
    const container = document.querySelector(".container");
    const boardGrid = document.querySelector(".boardGrid");

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
            boardGrid.style.display = "grid";

            callback(playerOneName, playerTwoName);

        })
    }
    return {
        selectGamePlayers,
        handleFormSubmit
    }

})();

gameController.init();
