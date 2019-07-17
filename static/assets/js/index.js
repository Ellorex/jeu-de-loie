let socket = io();

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
    socket.emit('new player', {player});
});

socket.on('sign up', (data) => {
    if (data.code == 202) {
        console.log(data);
        window.location.href = '/jeu-de-loie';
    } else if (data.code == 401) {
        alert('Le nombre de joueur maximal a été atteint');
    }
});

