const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const {newUsers, getIndividualRoomUsers, formateMessage, getActiveUsers, exitRoom} = require('./utils/helpers/helper');
const io = require('socket.io')(server);
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => { 
    socket.on('joinRoom', ({username, room}) => {
        const user = newUsers(socket.id, username, room);
        
        socket.join(user.room);

        socket.emit('message', formateMessage('Airtribe', "Messages are limited to this room"));

        socket.broadcast.to(user.room).emit('message', formateMessage('Airtribe', `${user.username} has joined the room`))

        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getIndividualRoomUsers(user.room)
        })
    })

    socket.on('chatMessages', msg => {
       const user = getActiveUsers(socket.id);
       console.log('Server has created a new user', user, msg); 
       io.to(user[0].room).emit('message', formateMessage(user[0].username, msg))
    })

    socket.on('disconnect', () => {
        const user = exitRoom(socket.id);
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getIndividualRoomUsers(user.room)
        });
        io.to(user.room).emit('message', formateMessage('Airtribe', `${user.username} has left the room`))
     })
});

// app.get('/', (req, res) => {
//     res.send('<h1>Hello world</h1>');
// });

server.listen(PORT, () => console.log(`server is running on PORT -> ${PORT}`));