const express = require("express");
const { PORT } = require("../src/config/serverConfig");
const http = require("http");
const app = express();
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.use('/', express.static(__dirname + "/views"));
app.get('/chat/:roomId', (req, res) => {
    res.render('index', {
        name: 'Navneet',
        roomId: req.params.roomId,
    });
});

// Setting the new connection
io.on('connection', (socket) => {

    socket.on('join_room', (data) => {

        socket.join(data.roomId);

        // When a new user joined the chat show all the other users someone joined the chat
        socket.broadcast.to(data.roomId).emit('new_user_joined', {
            msg: data.name,
            position: "center"
        });
    });

    // When a user sent a message
    socket.on('msg_from_user', (data) => {

        // Show msg to all the recievers on the left side
        socket.to(data.roomId).emit('msg_recieved', {
            data, position: "left"
        });

        // Show msg to the sender on right side
        socket.emit('msg_recieved', {
            data, position: "right"
        });
    });
})

server.listen(PORT, () => {
    console.log(`Server started at the ${PORT}`);
});