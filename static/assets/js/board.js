let rollDices =  document.getElementById('rollDices');

rollDices.addEventListener('click', () => {
    console.log('Lancer de dé');
    socket.emit('rool dices')
})
