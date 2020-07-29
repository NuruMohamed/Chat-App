const connection = require('./databaseConnector');

const retrieveData = (sqlQuery) => {

    return new Promise((resolve, reject) => {
        connection.query(sqlQuery, (error, result) => {
            if(error) reject(error);
            
            resolve(result);
        })
    })
}


module.exports = retrieveData;
