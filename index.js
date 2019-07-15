const express = require('express');
const socketio = require('socket.io');

let app = express();
const PORT = 8080;
let server = app.listen(PORT, () => {
    console.log(`Server listen ${PORT}`)
});

let io = socketio(server);
