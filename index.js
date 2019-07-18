const express = require('express');
const sockets = require('./sockets/sockets');
const socketio = require('socket.io');
const router = require('./routes');
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
        redisClient.incr('id', function(err, id) {
            if(id <= 2) {
                redisClient.zadd('players', id, data.player);
                redisClient.hmset("player", "id", id, "name", data.player, redisClient.print);
                redisClient.hgetall("player", (err, player) => {
                    io.emit('sign up', {code: 202, message: 'ACCEPT', player: player });
                });
            } else {
                console.log('Nombre maximal de joueur atteint');
                io.emit('sign up', {code: 401, message: 'NOT_AUTHORIZE'});
            }

        });

    });

    client.on('disconnect', function() {
        console.log('user disconnected');
    });
});

let jeuDeLoie = io.of('/jeu-de-loie');

jeuDeLoie.on('connection', sockets.jeuDeLoieNamespace);

