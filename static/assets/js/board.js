let rollDices = document.getElementById('rollDices');
let diceResult1 = document.getElementById('diceResult1');
let diceResult2 = document.getElementById('diceResult2');
rollDices.addEventListener('click', () => {
    console.log('Lancer de dé');
    socket.emit('rool dices');
    socket.on('dice score', (data) => {
        let dices = data.diceScore;
        diceResult1.innerText = dices[0];
        diceResult2.innerText = dices[1];
    })
})
