const webSocketConnection = require('./webSocketConnector');
const {userConnected, storeMessage} = require('../Database/databaseHandler');


const webSocketServer = () => {
    // fires when a user connects via a websocket
    // connectedUser is an object of a connected user, which is unique to every user that connects. 
    webSocketConnection.on('connection', (connectedUser, request) => {
        connectedUser.id = 'passme'
        // is a function from the database handler file
        userConnected(connectedUser);
        
        // console.log(connectedUser.id);

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
    webSocketServer
};