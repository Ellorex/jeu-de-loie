let rollDices = document.getElementById('rollDices');
let diceResult1 = document.getElementById('diceResult1');
let diceResult2 = document.getElementById('diceResult2');
var player1 = document.getElementById('player1');
var player2 = document.getElementById('player2');
var position;
var dicesTotal;
var currentSquare;

function startState() {
    currentSquare = 1;
    getPosition(player1, currentSquare);
    getPosition(player2, currentSquare);
    console.log("start")
}
window.addEventListener('load', startState(), false);

rollDices.addEventListener('click', () => {
    console.log('Lancer de dé');
    socket.emit('rool dices');
})

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

function addScores(dicesResult) {
    console.log('currentSquare PRE', currentSquare);
    currentSquare += dicesResult;
    console.log('dicesresult ' + dicesResult)
    console.log('currentSquare POST', currentSquare);
    getPosition(player1, currentSquare);
}
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
