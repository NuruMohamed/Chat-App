const fileReader = require('../File/fileReader');
const determineFileType = require('../File/determineFileType');
const url = require('url');
const path = require('path');


// this function process all requests
let authenticatedUser = (req, res) => {
    let parsedURL = url.parse(req.url);
    // by default this will return the home html page
    if(parsedURL.pathname == '/') {
        fileReader('user.html', 'text/html', req, res);
    } else if (parsedURL.pathname == '/login') {
        res.writeHead(307, {'Location': '/'});
        res.end();
    } else if (parsedURL.pathname == '/logout') {
        res.writeHead(307, {'Location': '/login', 'set-cookie': 'access_token=; Expires=01/01/1900'});
        res.end();
    } else if(path.basename(parsedURL.pathname).match(/[^\\/]+\.[^\\/]+$/)) { // if file is requested.      
        fileReader(parsedURL.pathname, determineFileType(parsedURL.pathname), req, res);
    } else {
        //  file not found
        res.writeHead(404);
        res.end();
    }
}

module.exports = authenticatedUser;