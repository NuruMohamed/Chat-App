const connection = require('./Database/databaseConnector');
const MySQLEvents = require('@rodrigogs/mysql-events');
const {sendMessageToAllUsers} = require('./sendDataToUsers');

async function databaselistener() {

    const instance = new MySQLEvents(connection, {
        startAtEnd: true,
        serverId: 7,
        excludedSchemas: {
          mysql: true,
        },
    })

    await instance.start();
    // watch on messages table for all new messages
    instance.addTrigger({
        name: 'messages',
        expression: 'chat.messages',
        statement: MySQLEvents.STATEMENTS.INSERT,
        onEvent: event => {
            sendMessageToAllUsers(event.affectedRows[0].after);
        }
    });


    instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, error => console.log('connection error: ', error));
    instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, error => console.log('Zongji error: ', error));
}


module.exports = databaselistener;