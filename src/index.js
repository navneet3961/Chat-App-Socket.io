const express = require("express");
const { PORT } = require("../src/config/serverConfig");
const http = require("http");
const app = express();
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

app.use('/', express.static(__dirname + "/public"));

io.on('connection', (socket) => {
    console.log("a user connected", socket.id);

    // setInterval(() => {
    //     socket.emit('from_server');
    // }, 500);

    socket.on('msg_from_user', (msg) => {
        console.log(msg);
        socket.broadcast.emit('msg_recieved', {
            msg, position: "left"
        });

        socket.emit('msg_recieved', {
            msg, position: "right"
        });
    });
})

server.listen(PORT, () => {
    console.log(`Server started at the ${PORT}`);
});