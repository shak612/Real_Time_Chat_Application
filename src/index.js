const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => { 
    socket.on('joinRoom', ({username, room}) => {
        
    })
});

// app.get('/', (req, res) => {
//     res.send('<h1>Hello world</h1>');
// });

server.listen(PORT, () => console.log(`server is running on PORT -> ${PORT}`));