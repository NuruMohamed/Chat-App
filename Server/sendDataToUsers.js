// const {webSocketConnection} = require('./webSocketServer');
const webSocketConnection = require('./webSocket/webSocketConnector');

// sends previous messages to a user when it connects
// the two parameters: First, an object of a connected user. Second, the messages retrieved from database
const sendMessageToUser = (connectedUser, messages) => {
    
    const messageToBeSent = messages.map(element => {
                            // formatting the retrived messages in the way the client code understands. 
                            return {
                                userName: element.user,
                                messageBody: element.message_body
                            };
                        });
    // converts to JSON and sends messages to a user
    connectedUser.send(JSON.stringify(messageToBeSent));
}

// send new message to all connected users
const sendMessageToAllUsers = message => {
    const messageToBeSent = {
        userName: message.user,
        messageBody: message.message_body
    };

    // loops through all connected users
    webSocketConnection.clients.forEach(user=> {
        // converts to JSON and sends messages to a user
        // the JSON will be sent as an array, because the client script accepts an array
        user.send(JSON.stringify([messageToBeSent]));
    })
}


module.exports = {
    sendMessageToUser,
    sendMessageToAllUsers
}