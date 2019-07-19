let socket = io('/jeu-de-loie', { transports: ['websocket'], upgrade: false });

let rollDices = document.getElementById('rollDices');
let diceResult1 = document.getElementById('diceResult1');
let diceResult2 = document.getElementById('diceResult2');
var player1 = document.getElementById('player1');
var player2 = document.getElementById('player2');
var infoGame = document.getElementById('infoGame');
var position;
var dicesTotal;
var currentSquare;
var firstClick = true;

//SOCKET EVENTS
socket.on('welcome', (data) => {
    displayName(getPlayer());
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
    if (data) {
        let dices = data.diceScore;
        diceResult1.innerText = dices[0];
        diceResult2.innerText = dices[1];
        socket.emit('send dice score', { dices: { dice1: dices[0], dice2: dices[1] }, player: getPlayer() });
    }
});

socket.on('player move score', data => {
    infoGame.innerHTML = "";
    player = document.getElementById(`player${data.player.id}`);
    currentSquare = data.player.currentSquare;
    dicesTotal = data.dices.dice1 + data.dices.dice2;
    if (firstClick) {
        firstClick = false;
        if (data.dices.dice1 === 6 && data.dices.dice2 === 3 || data.dices.dice1 === 3 && data.dices.dice2 === 6) {
            currentSquare = 26;
            getPosition(player, currentSquare);
            infoGame.innerHTML = "Vous avez fait 9 avec 6 et 3 au premier tir, vous allez directement en case 26";
        } else if (data.dices.dice1 === 4 && data.dices.dice2 === 5 || data.dices.dice1 === 5 && data.dices.dice2 === 4) {
            currentSquare = 53;
            getPosition(player, currentSquare);
            infoGame.innerHTML = "Vous avez fait 9 avec 4 et 5 au premier tir, vous allez directement en case 53";
        } else {
            dicesResult = data.dices.dice1 + data.dices.dice2;
            currentSquare += dicesResult;
            getPosition(player, currentSquare);
        }
    } else {
        dicesResult = data.dices.dice1 + data.dices.dice2;
        currentSquare += dicesResult;
        getPosition(player, currentSquare);
    }
});


socket.on('your turn', player => {
    console.log(player);
});

// ADD URL PARAMETERS
function getPlayer() {
    let urlParams = new URLSearchParams(window.location.search);
    let playerInfo = { id: urlParams.get('id'), name: urlParams.get('name'), isYourTurn: null, currentSquare: currentSquare };

    return playerInfo;
}

// DISPLAY PLAYERS NAMES
function displayName(player) {
    document.getElementById(`player${player.id}Name`).innerHTML = player.name;
}
//SEND EVENT ON CLICK
rollDices.addEventListener('click', () => {
    socket.emit('roll dices');
    socket.emit('is your turn', getPlayer());
});

function isYourTurn() {
    if (getPlayer().isYourTurn == false) {
        rollDices.setAttribute('disabled', '')
    } else {
        rollDices.removeAttribute('disabled');
    }
}

// CALCULATE NEW PAWN POSITION
function getPosition(player, dest) {
    player.style.opacity = 1;
    switch (dest) {
        case 6:
            dest = 9;
            infoGame.innerHTML = "Allez directement en case 9";
            break;
        case 42:
            dest = 30;
            infoGame.innerHTML = "Retournez en case 30";
            break;
        case 58:
            dest = 1;
            infoGame.innerHTML = "Retour à la case départ";
            break;
        default:
            console.log('default')
    }
    destination = document.getElementById(`case-${dest}`);
    position = destination.getBoundingClientRect();
    if (player === player1) {
        player.style.top = position.top + 20 + "px";
        player.style.left = position.left + 20 + "px";
    } else if (player === player2) {
        player.style.top = position.bottom - 20 + "px";
        player.style.left = position.right - 20 + "px";
    }
    if(dest === 63) {
        alert(`La partie est finie`)
    }
}

// PUT PAWNS IN SQUARE 1 ON LOAD
function startState() {
    currentSquare = 1;
    getPosition(player1, currentSquare);
    getPosition(player2, currentSquare);
}
window.addEventListener('load', startState(), false);
