const moment = require("moment");

const roomUsers = [];


exports.formateMessage = (username, text) => {
    return {
        username, 
        text,
        time: moment().format('h:mm a')
    }
}

exports.newUsers = (id, username, room) => {
    const user = {id, username, room};
    roomUsers.push(user);
    return user;
}

exports.getIndividualRoomUsers = (room) => {
    return roomUsers.filter(user => user.room === room);
}

exports.exitRoom = (id) => {
    const index = roomUsers.findIndex(user => user.id === id);
    if(index !== -1){
        return roomUsers.splice(index, 1)[0];
    }
}

exports.getActiveUsers = (id) => {
    return roomUsers.filter(user => user.id === id);
}