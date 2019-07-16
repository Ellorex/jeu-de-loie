let rollDices = document.getElementById('rollDices');
let diceResult1 = document.getElementById('diceResult1');
let diceResult2 = document.getElementById('diceResult2');
var player1 = document.getElementById('player1');
var player2 = document.getElementById('player2');
var position;

rollDices.addEventListener('click', () => {
    console.log('Lancer de dé');
    socket.emit('rool dices');
    socket.on('dice score', (data) => {
        let dices = data.diceScore;
        diceResult1.innerText = dices[0];
        diceResult2.innerText = dices[1];
    })
})

function getNewPosition(dest) {
    destination = document.getElementById(`case-${dest}`);
    position = destination.getBoundingClientRect();

    player1.style.top = position.top+"px";
    player1.style.left = position.left+"px";
}

console.log(getNewPosition(57));
