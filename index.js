const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const databaselistener = require('./Server/databaseListener');
const {webSocketServer} = require('./Server/webSocket/webSocketServer');

// watch for database changes 
databaselistener();
// fires websocket server 
webSocketServer();


// listen for http request  
const server = http.createServer((req, res) => {
    processRequest(req, res);
    
}).listen(1000, () => {
    console.log("Chat HTTP server running: 1000");
})




// this function process all requests
let processRequest = (req, res) => {
    let parsedURL = url.parse(req.url);
    // by default this will return the home html page
    if(parsedURL.pathname == '/') {
        fileReader('user.html', 'text/html', req, res);
    } else if(path.basename(parsedURL.pathname).match(/[^\\/]+\.[^\\/]+$/)) { // if file is requested.
        
        fileReader(parsedURL.pathname, determineFileExtension(parsedURL.pathname), req, res);
    } 
    else {
        //  file not found
        res.writeHead(404);
        res.end();
    }
}

let fileReader = (requestedFile, fileType, req, res) => {
    // console.log(requestedFile);

    fs.readFile(path.join(__dirname, 'public', requestedFile), 'utf8', (err, data) => {
        if(err) {
            if(err == 'ENOENT') {
                res.writeHead(404);
                res.end();
            } else {
                res.writeHead(500, {'Content-type': 'text/plain'});
                res.end('Server Err: Please try again!')
            }
        } else {
            res.writeHead(200, {'Content-Type' : fileType});
            // console.log(fileType);
            // console.log(data);
            res.write(data);
            res.end();
        }
    });
}


// determines and returns the type of a file
let determineFileExtension = (file) => {
    
    switch(path.extname(file)) {
        case '.html': 
            return 'text/html';
            break;
        case '.js': 
            return 'text/javascript';
            break;  
        case '.css': 
            return 'text/css';
            break; 
        case '.jpg': 
            return 'image/jpg';
            break; 
        case '.png': 
            console.log('my png')
            return 'image/png';
            break; 
        case '.svg': 
            return 'image/svg+xml';
            break; 
    }
}