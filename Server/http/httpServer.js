const http = require('http');
const url = require('url');
const path = require('path');
const isAuthenticated = require('../Auth/auth.js');
const authenticatedUser = require('./authenticatedUser')
const unAuthenticatedUser = require('./unAuthenticatedUser');


// listen for http request  
module.exports = httpServer = http.createServer((req, res) => {
    
    if(isAuthenticated(req)) { // if a user is authenticated
        authenticatedUser(req, res);
    } else {                 // if not authenticated
        unAuthenticatedUser(req, res);
    }
    
    
});


// this function process all requests
let processRequest = (req, res) => {
    let parsedURL = url.parse(req.url);
    // by default this will return the home html page
    if(parsedURL.pathname == '/') {
        fileReader('user.html', 'text/html', req, res);
    } else if(path.basename(parsedURL.pathname).match(/[^\\/]+\.[^\\/]+$/)) { // if file is requested.
        
        fileReader(parsedURL.pathname, determineFileExtension(parsedURL.pathname), req, res);
    } else {
        //  file not found
        res.writeHead(404);
        res.end();
    }
}
