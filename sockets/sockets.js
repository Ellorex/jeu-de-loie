const { rollADice } = require('../utils/rollDice');
let listPlayer = [];
let jeuDeLoieNamespace = (socket) => {
    socket.emit('welcome',  'bienvenue');
    console.log('a user connected : ' + socket.id);

    let totalPlayer = socket.server.engine.clientsCount;

    if(totalPlayer != 2) {
        socket.emit('start game', { isOk: false } )
    } else {
        socket.broadcast.emit('start game', { isOk: true } )
    }

    socket.on('roll dices', () => {
       let diceScore = rollADice();
       socket.emit('dice score', { diceScore });
    });

    socket.on('send dice score', data => {
        //console.log(data);
        socket.broadcast.emit('player move score', { dices: data.dices, player: data.player });
        socket.emit('player move score', { dices: data.dices, player: data.player });
    });

    socket.on('list player', player => {
        listPlayer.push(player);

    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

};

module.exports = {
    jeuDeLoieNamespace,
};
