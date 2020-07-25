const retrieveData = require('./retrieveFromDatabase');  
const {sendMessageToUser} = require('../sendDataToUsers');
const storeToDatabase = require('./storeToDatabase');
const connection = require('./databaseConnector');


// retrieve all messages and send them to the connected user
const userConnected = async (connectedUser) => {
    let sqlQuery = `SELECT * FROM messages `;
    let result = await retrieveData(sqlQuery);
    console.log('2');
    sendMessageToUser(connectedUser, result);
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