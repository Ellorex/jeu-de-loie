let startGame = document.getElementById('startGame');
let playerName = document.getElementById('playerName');

startGame.addEventListener('click', () => {
    let player = playerName.value;
    socket.emit('new player', {player})
});

/*
startGame.addEventListener('click', () => {
    window.location.href = '/board.html'
});
*/
