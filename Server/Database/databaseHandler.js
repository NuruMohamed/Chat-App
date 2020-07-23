const mysql = require('mysql');
const retrieveData = require('./retrieveFromDatabase');  
const sendMessageToUser = require('../sendDataToUsers');
const storeToDatabase = require('./storeToDatabase');


const connection = mysql.createConnection({
                        host: 'localhost',
                        database: 'chat',
                        user: 'root',
                        password: ''
                    });

connection.connect(error => {
    if(error) throw error;
    console.log('mysql connected');
});

// retrieve all messages and send them to the connected user
const userConnected = async (connectedUser) => {
    let sqlQuery = `SELECT * FROM messages `;
    let result = await retrieveData(connection, sqlQuery);
    console.log('2');
    sendMessageToUser(connectedUser, result);
    // return result;
}

// stores message to the database that is sent by users 
const storeMessage = (message) => {
    let ParsedMessage = JSON.parse(message);
    let sqlQuery =`INSERT INTO messages(message_body, user) VALUES('${ParsedMessage.messageBody}', '${ParsedMessage.userName}')`
    storeToDatabase(connection, sqlQuery);
}


module.exports = {
    userConnected,
    storeMessage
};