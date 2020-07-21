const mysql = require('mysql');

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

const userConnected = (connectedUser) => {
    let sqlQuery = `SELECT * FROM messages `;
    let messageToBeSent = [];
    connection.query(sqlQuery, (error, result) => {
        if(error) throw error;

        messageToBeSent = result.map(element => {
            return {
                userName: element.user,
                messageBody: element.message_body
            };
        });
        // console.log(messageToBeSent);
        connectedUser.send(JSON.stringify(messageToBeSent));
        
    });
    // socket.send('hello sql')
}

// userConnected();



module.exports = userConnected;