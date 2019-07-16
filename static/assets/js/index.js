let startGame = document.getElementById('startGame');
let playerName = document.getElementById('playerName');

playerName.addEventListener("keyup", () => {
    if (playerName.value.length < 3) {
        startGame.setAttribute('disabled', '');
    } else {
        startGame.removeAttribute('disabled');
    }
});

startGame.addEventListener('click', () => {
    let player = playerName.value;
    if (player != '') {
        socket.emit('new player', {player})
    }
    window.location.href = '/board.html';
});

/*
startGame.addEventListener('click', () => {

});
*/
