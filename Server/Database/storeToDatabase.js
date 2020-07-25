const connection = require('./databaseConnector');


const storeToDatabase = (sqlQuery) => {
    connection.query(sqlQuery, (error, result) => {
        if(error) throw error;

        console.log(result);
    })
}

module.exports = storeToDatabase;