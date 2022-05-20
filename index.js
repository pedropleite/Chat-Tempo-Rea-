const express = require('express');
const app = express();
const path = require('path');
const socketIO = require('socket.io');

app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(3000, () => {
    'Server running with sucess';
});

const messages = [];
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('new connection');
    socket.emit('updateMessage', messages);

    socket.on('newMessage', (data) => {
        messages.push(data);
        io.emit('updateMessage', messages);
    });
});
