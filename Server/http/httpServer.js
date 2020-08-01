const http = require('http');
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
