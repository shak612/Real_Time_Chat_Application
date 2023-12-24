const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');


const parseQueryString = (queryString) => {
    const params = {};
    const queryStringWithoutPrefix = queryString.replace('?', '');
    
    queryStringWithoutPrefix.split('&').forEach(param => {
        const [key, value] = param.split('=');
        params[key] = decodeURIComponent(value);
    });
    
    return params;
}

const currentQueryString = window.location.search;
const { username, room } = parseQueryString(currentQueryString);

const socket = io();

socket.emit('joinRoom', {username, room});

socket.on('message', (message) => {
    outputMessage(message)
})

socket.on('roomUsers', ({room, users}) => {
    outputRoomName(room);
    outputUsers(users);
})

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let msg = e.target.elements.msg.value;
    socket.emit('chatMessages', msg);
})

document.querySelector('.leave-room-btn').addEventListener('onclick', () => {
    console.log("Leave event is called!!")
    window.location = '../index.html';
})


function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');

    const p = document.createElement('p');
    p.classList.add('meta')
    p.innerText = message.username;
    p.innerHTML += `<span>${message.time}</span>`;
    div.appendChild(p);

    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = message.text;
    div.appendChild(para);

    chatMessages.appendChild(div);
    // To scroll up 
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


function outputRoomName(room){
    roomName.innerText = room;
}

function outputUsers(users){
    userList.innerHTML = '';
    users.forEach((user) => {
        const li = document.createElement('li');
        li.innerText = user.username;
        userList.appendChild(li);
    })
}



