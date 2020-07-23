const storeToDatabase = (connection, query) => {
    connection.query(query, (error, result) => {
        if(error) throw error;

        console.log(result);
    })
}

module.exports = storeToDatabase;