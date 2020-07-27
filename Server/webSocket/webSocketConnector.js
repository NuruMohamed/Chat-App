const webSocket = require('ws');

const webSocketConnection = new webSocket.Server({port: 5000});

module.exports = webSocketConnection;