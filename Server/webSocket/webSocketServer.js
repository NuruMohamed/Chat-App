const webSocketConnection = require('./webSocketConnector');
const {userConnected, storeMessage} = require('../Database/databaseHandler');
const isAuthenticated = require('../Auth/auth');

const webSocketServer = () => {
    // fires when a user connects via a websocket
    // connectedUser is an object of a connected user, which is unique to every user that connects. 
    webSocketConnection.on('connection', (connectedUser, request) => {
        // if a websocket is request is authenticated, assign to user and execute the code inside  
        if(user = isAuthenticated(request)) {
            // assign the connected user to its userName as it's a unique identifies of its account
            // the userName is helpful to interact with the database and other functionalities for prcoesses explicit to the user
            connectedUser.userName = user.userName;

            // send user it's name to be displayed 
            connectedUser.send(JSON.stringify({
                dataType: 'currentUserName',
                userName: user.userName
            }));

            // is a function from the database handler file
            userConnected(connectedUser);

            // fired when a message comes from a connected user
            connectedUser.on('message', message => {
                storeMessage(message, connectedUser.userName);
            });

        } else { // if the websocket request isn't authenticated, close the connection
            connectedUser.close();
        }

    });
}


module.exports = {
    webSocketServer
};