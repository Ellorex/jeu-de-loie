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
        socket.broadcast.emit('player move score 1', { dices: data.dices, player: data.player });
        socket.emit('player move score 2', { dices: data.dices, player: data.player });
    });

    socket.on('is your turn', player => {
        if(player.id == 1) {
            player.isYourTurn = true;

            if(player.isYourTurn === true) {
                console.log(1)
                console.log(false);
                return player.isYourTurn = false;
            } else if (player.isYourTurn === false) {
                console.log(1)
                console.log('')
                return player.isYourTurn = true;
            }

        } else if (player.id == 2) {
            player.isYourTurn = false;

            if(player.isYourTurn === true) {
                console.log(1)
                console.log(false)
                player.isYourTurn = false;
            } else {
                console.log(2)
                console.log(true)
                player.isYourTurn = true;
            }
        }

        socket.emit('your turn', player);
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

};

module.exports = {
    jeuDeLoieNamespace,
};
