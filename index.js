const express = require('express');
const socketio = require('socket.io');

let app = express();
const PORT = 8080;

app.use(express.static('static'));

let server = app.listen(PORT, () => {
    console.log(`Server listen ${PORT}`)
});

let io = socketio(server);

io.on('connection', function(client) {
    console.log('a user connected')
    client.on('disconnect', function() {
        console.log('user disconnected');
    });
});
