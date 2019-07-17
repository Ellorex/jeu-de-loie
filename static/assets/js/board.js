let socket = io('/jeu-de-loie', {transports: ['websocket'], upgrade: false });

let rollDices = document.getElementById('rollDices');
let diceResult1 = document.getElementById('diceResult1');
let diceResult2 = document.getElementById('diceResult2');
var player1 = document.getElementById('player1');
var player2 = document.getElementById('player2');
var position;

//SOCKET EVENT
socket.on('welcome', (data) => {
    console.log(data)
});

socket.on('player', (player) => {
    console.log(player);
});

socket.on('dice score', (data) => {
    let dices = data.diceScore;
    diceResult1.innerText = dices[0];
    diceResult2.innerText = dices[1];
});

rollDices.addEventListener('click', () => {
    console.log('Lancer de dé');
    socket.emit('roll dices');
});

function getNewPosition(dest) {
    destination = document.getElementById(`case-${dest}`);
    position = destination.getBoundingClientRect();

    player1.style.top = position.top+"px";
    player1.style.left = position.left+"px";
}

function getPlayer() {
    let urlParams = new URLSearchParams(window.location.search);

    return { id: urlParams.get('id'), name: urlParams.get('name')}
}

console.log(getPlayer());

