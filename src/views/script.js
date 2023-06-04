let socket = io();

let form = document.getElementById("form");
const roomId = document.getElementById("roomId").value;
const chat_box = document.getElementById("chat-box");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    let input = document.getElementById("msg");

    if (input.value) {
        socket.emit('msg_from_user', {
            name: "Navneet",
            roomId,
            msg: input.value,
        });
        input.value = "";
    }
});

socket.emit('join_room', { name: "Navneet", roomId });

socket.on('new_user_joined', (data) => {
    let div = document.createElement("div");
    div.innerText = `${data.msg} joined the chat`;
    div.classList.add("message");
    div.classList.add(data.position);

    chat_box.appendChild(div);
})

socket.on('msg_recieved', ({ data, position }) => {
    let div = document.createElement("div");
    div.innerText = `${data.name}: ${data.msg}`;
    div.classList.add("message");
    div.classList.add(position);

    chat_box.appendChild(div);
});