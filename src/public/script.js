var socket = io();

var form = document.getElementById("form");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    var input = document.getElementById("msg");

    console.log(input.value);

    if (input.value) {
        socket.emit('msg_from_user', input.value);

        // socket.on('from_client', () => {
        //     var div = document.createElement("div");
        //     div.innerText = "All the best";
        //     div.classList.add("message");
        //     div.classList.add("right");

        //     var chat_box = document.getElementById("chat-box");

        //     chat_box.appendChild(div);
        // });

        input.value = "";
    }
});

socket.on('msg_recieved', (data) => {
    console.log("Hi");
    var div = document.createElement("div");
    div.innerText = data.msg;
    div.classList.add("message");
    div.classList.add(data.position);

    var chat_box = document.getElementById("chat-box");

    chat_box.appendChild(div);
});