const { rollADice } = require('../utils/rollDice');

let jeuDeLoieNamespace = (socket) => {
    socket.emit('welcome',  'bienvenue' );
    console.log('a user connected : ' + socket.id);

    socket.on('roll dices', (data) => {
       console.log(data);
       let diceScore = rollADice();
       socket.emit('dice score', { diceScore })
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

}

module.exports = {
    jeuDeLoieNamespace,
}
