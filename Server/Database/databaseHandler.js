const retrieveData = require('./retrieveFromDatabase');  
const storeToDatabase = require('./storeToDatabase');
const connection = require('./databaseConnector');
const {sendMessageToUser} = require('../sendDataToUsers');

// retrieve all messages and send them to the connected user
const userConnected = async (connectedUser) => {
    
    let sqlQuery = `SELECT * FROM messages `;
    let messages;
    try {
        messages = await retrieveData(sqlQuery);
    } catch (error) {
        console.log(error);
    }

    sendMessageToUser(connectedUser, messages);
}

// stores message to the database that is sent by users 
const storeMessage = (message, sender) => {
    let ParsedMessage = JSON.parse(message);

    let sqlQuery =`INSERT INTO messages(message_body, user) VALUES('${ParsedMessage[0].messageBody}', '${sender}')`;
    storeToDatabase(sqlQuery);
}


module.exports = {
    userConnected,
    storeMessage
};