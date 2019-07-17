let socket = io('/jeu-de-loie', { transports: ['websocket'], upgrade: false });

let rollDices = document.getElementById('rollDices');
let diceResult1 = document.getElementById('diceResult1');
let diceResult2 = document.getElementById('diceResult2');
var player1 = document.getElementById('player1');
var player2 = document.getElementById('player2');
var position;
var dicesTotal;
var currentSquare;

//SOCKET EVENTS
socket.on('welcome', (data) => {
    console.log(data)
    getPlayer();
});

socket.on('player', (player) => {
    console.log(player);
});

// SEND CLIENT ALERTS ON START EVENTS
socket.on('start game', (data) => {
    if (data.isOk == false) {
        alert('En attente d un adversaire');
        rollDices.style.display = "none"
    } else {
        let oneTime = true;
        if (oneTime) {
            alert('La partie peut commencer');
            this.oneTime = false;
        }
        rollDices.style.display = "block"
    }
});

// GET DICES SCORES FROM BACKEND
socket.on('dice score', (data) => {
    console.log('Server rolled dices')
    if (data) {
        let dices = data.diceScore;
        diceResult1.innerText = dices[0];
        diceResult2.innerText = dices[1];
        dicesTotal = dices[0] + dices[1];
        addScores(dicesTotal);
    }
})

// ADD URL PARAMETERS
function getPlayer() {
    let urlParams = new URLSearchParams(window.location.search);

    playerInfo = { id: urlParams.get('id'), name: urlParams.get('name') }
    displayName(playerInfo)
}

// DISPLAY PLAYERS NAMES 
function displayName(player) {
    document.getElementById(`player${player.id}Name`).innerHTML = player.name;
}
//SEND EVENT ON CLICK
rollDices.addEventListener('click', () => {
    socket.emit('roll dices');
});

// SUM UP SCORES WITH CURRENT SQUARE
function addScores(dicesResult) {
    currentSquare += dicesResult;
    getPosition(player1, currentSquare);
}

// CALCULATE NEW PAWN POSITION
function getPosition(player, dest) {
    player.style.opacity = 1;
    destination = document.getElementById(`case-${dest}`);
    position = destination.getBoundingClientRect();
    if (player === player1) {
        player.style.top = position.top + 20 + "px";
        player.style.left = position.left + 20 + "px";
    } else if (player === player2) {
        player.style.top = position.bottom - 20 + "px";
        player.style.left = position.right - 20 + "px";
    }
}

// PUT PAWNS IN SQUARE 1 ON LOAD
function startState() {
    currentSquare = 1;
    getPosition(player1, currentSquare);
    getPosition(player2, currentSquare);
}
window.addEventListener('load', startState(), false);