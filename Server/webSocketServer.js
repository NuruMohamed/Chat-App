const webSocket = require('ws');
const {userConnected, storeMessage} = require('./Database/databaseHandler');

// listens for websocket request
const webSocketConnection = new webSocket.Server({port: 5000});

const webSocketServer = () => {
    // fires when a user connects via a websocket
    // connectedUser is an object of a connected user, which is unique to every user that connects. 
    webSocketConnection.on('connection', (connectedUser, request, client) => {
        // is a function from the database handler file
        userConnected(connectedUser);
console.log('request>> ',request.socket.remoteAddress);
console.log('clienttt>> ',client);
        // fired when a message comes from a connected user
        connectedUser.on('message', message => {
            storeMessage(message);
            // loops through all connected users
            // webSocketConnection.clients.forEach(user => {
            //     // send message to all connected users except the user that sent the message
            //     connectedUser != user? user.send(message) : null;
            // });
        });

    });
}


module.exports = {
    webSocketServer,
    webSocketConnection
};