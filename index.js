const express = require('express');
const socketio = require('socket.io');
const { rollADice } = require('./utils/rollDice');
const { redisClient } = require('./db/redis/redis');
let app = express();
const PORT = 8080;

app.use(express.static('static'));

let server = app.listen(PORT, () => {
    console.log(`Server listen ${PORT}`);
});

let io = socketio(server);

io.on('connection', function(client) {
    console.log('a user connected : '+ client.id);

    //Rool Dices
    client.on('rool dices', () => {
        let diceScore = rollADice();
        io.emit('dice score', { diceScore })
    });

    //Player
    client.on('new player', (data) => {
        console.log(data.player);
        redisClient.hmset('players', `player-${data.player}`, data.player, redisClient.print);
        redisClient.hgetall('players', (err, result) => {
            console.log(result);
        });
    });

    client.on('disconnect', function() {
        console.log('user disconnected');
    });
});
