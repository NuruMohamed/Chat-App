const retrieveData = require('./retrieveFromDatabase');  
const storeToDatabase = require('./storeToDatabase');
const connection = require('./databaseConnector');
const {sendMessageToUser} = require('../sendDataToUsers');

// retrieve all messages and send them to the connected user
const userConnected = async (connectedUser) => {
    console.log('>>> ' + connectedUser.id)
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
const storeMessage = (message) => {
    let ParsedMessage = JSON.parse(message);
    // console.log(ParsedMessage);
    let sqlQuery =`INSERT INTO messages(message_body, user) VALUES('${ParsedMessage[0].messageBody}', '${ParsedMessage[0].userName}')`;
    storeToDatabase(sqlQuery);
}


module.exports = {
    userConnected,
    storeMessage
};