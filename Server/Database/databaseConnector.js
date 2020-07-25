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

module.exports = connection;