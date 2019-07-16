const express = require('express');
const socketio = require('socket.io');
const router = require('./routes');
const sockets = require('./sockets/sockets');
const { redisClient } = require('./db/redis/redis');
let app = express();
const PORT = 8080;

app.use('/', router);
app.use(express.static('static'));

let server = app.listen(PORT, () => {
    console.log(`Server listen ${PORT}`);
});

let io = socketio(server);

io.on('connection', function(client) {
    console.log('a user connected : '+ client.id);

    //Player
    client.on('new player', (data) => {
        let multi = redisClient.multi();

        /*
         redisClient.hmset('players', `player-${data.player}`, data.player, redisClient.print);
        redisClient.hgetall('players', (err, result) => {
            console.log(result);
        });
         */


        //redisClient.flushall();
    });

    client.on('disconnect', function() {
        console.log('user disconnected');
    });
});

let jeuDeLoie = io.of('/jeu-de-loie');
jeuDeLoie.on('connection', sockets.jeuDeLoieNamespace);
