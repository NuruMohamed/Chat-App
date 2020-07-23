const retrieveData = (connection, sqlQuery) => {

    return new Promise((resolve, reject) => {
        connection.query(sqlQuery, (error, result) => {
            if(error) reject(error);
            console.log('1');
            resolve(result);
        })
    })
}

// const retrieveData = (connection, sqlQuery) => {
//     // let sqlQuery = `SELECT * FROM messages `;
//     // let messageToBeSent = [];
//     connection.query(sqlQuery, (error, result) => {
//         if(error) throw error;

//         // messageToBeSent = result.map(element => {
//         //     return {
//         //         userName: element.user,
//         //         messageBody: element.message_body
//         //     };
//         // });
//         // console.log(messageToBeSent);
//         // connectedUser.send(JSON.stringify(messageToBeSent));
//         console.log('1');
//         return result;
//     });    
// };

module.exports = retrieveData;
