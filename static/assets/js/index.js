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
    socket.emit('new player', {player})

    // window.location.href = '/jeu-de-loie';
});
