const formidable = require('formidable');
const url = require('url');
const path = require('path');
const jwt = require('jsonwebtoken');
const fileReader = require('../File/fileReader');
const determineFileType = require('../File/determineFileType');
const retrieveData = require('../Database/retrieveFromDatabase');
const storeToDatabase = require('../Database/storeToDatabase');

const unAuthenticatedUser = (req, res) => {
    // parse the requested URL
    const parsedURL = url.parse(req.url);

    if(parsedURL.pathname == '/login') {
        fileReader('login.html', 'text/html', req, res);
    } else if (parsedURL.pathname == '/loginAction') {
        console.log('lAction');
        const form = new  formidable();
        form.parse(req, (err, fields, files) => {
            handleLoginAction(fields.username, res);
            const signedToken = jwt.sign({userName: fields.username}, 'secret');
            res.writeHead(307, {'set-cookie': `access_token=${signedToken}; Expires=01/01/2021; path=/`, 'Location': '/'});
        //    console.log(signedToken);
            res.end();
            
            
        })
    } else if (path.basename(parsedURL.pathname).match(/[^\\/]+\.[^\\/]+$/)) { // if the request is a file
        fileReader(parsedURL.pathname, determineFileType(parsedURL.pathname), req, res);
    } else { // redirect to the login page as the user is unauthenticated
        res.writeHead(307, {'Location': '/login'});
        res.end();
    }
}

const handleLoginAction = async (userName, res) => {
    
    const sqlQuery = `SELECT userName FROM users WHERE userName = '${userName}'`
    const user = await retrieveData(sqlQuery);
    if(user.length == 0) {
        storeToDatabase(`INSERT INTO users(userName) VALUES ('${userName}')`)
        // res.end('welcome');
    }
}


module.exports = unAuthenticatedUser;