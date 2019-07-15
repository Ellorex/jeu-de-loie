const express = require('express');
const socketio = require('socket.io');
const { rollDice } = require('./utils/rollDice')
let app = express();
const PORT = 8080;

app.use(express.static('static'));

let server = app.listen(PORT, () => {
    console.log(`Server listen ${PORT}`)
});

let io = socketio(server);

io.on('connection', function(client) {
    console.log('a user connected');

    client.on('rool dices', () => {

    });

    client.on('disconnect', function() {
        console.log('user disconnected');
    });
});
