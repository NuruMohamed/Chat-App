const mysql = require('mysql');
const retrieveData = require('./retrieveFromDatabase');  
const sendMessageToUser = require('../sendDataToUsers');
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

const userConnected = async (connectedUser) => {
    // let sqlQuery = `SELECT * FROM messages `;
    let result = await retrieveData(connection, `SELECT * FROM messages `);
    console.log('2');
    sendMessageToUser(connectedUser, result);
    // return result;
}


// userConnected();
module.exports = userConnected;