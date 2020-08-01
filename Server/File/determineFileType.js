const path = require('path');

// determines and returns the type of a file
let determineFileType = (file) => {
    
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
        case '.jpeg': 
            return 'image/jpeg';
            break;
        case '.png': 
            return 'image/png';
            break; 
        case '.svg': 
            return 'image/svg+xml';
            break; 
    }
}

module.exports = determineFileType;