const httpServer = require('./server/http/httpServer');
const databaselistener = require('./Server/databaseListener');
const {webSocketServer} = require('./Server/webSocket/webSocketServer');

// watch for database changes 
databaselistener();

// run websocket server 
webSocketServer();

// run http server
httpServer.listen(1000, () => {
    console.log("Chat HTTP server running: 1000");
})



