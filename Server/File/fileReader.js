const fs = require('fs');
const path = require('path');

// read requested file from the machine 
const fileReader = (requestedFile, fileType, req, res) => {
    // __dirname provides the absolute path of this file, fileReader.js
    fs.readFile(path.join(__dirname, '../../public', requestedFile), 'utf8', (err, data) => {
        if(err) {
            if(err == 'ENOENT') { // if the requested file is not found
                res.writeHead(404);
                res.end();
            } else {              // if not, it could probably be a server error
                res.writeHead(500, {'Content-type': 'text/plain'});
                res.end('Server Error: Please try again!')
            }
        } else { // if the requested file is found, return the file to the user
            res.writeHead(200, {'Content-Type' : fileType});
            res.write(data);
            res.end();
        }
    });
}

module.exports = fileReader;