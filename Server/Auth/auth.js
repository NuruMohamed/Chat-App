const jwt = require("jsonwebtoken");

// checks if a user is authenticated or not 
module.exports = isAuthenticated = (req) => {
    if(req.headers.cookie) {
        const accessToken = findCookie('access_token', req);
        console.log( accessToken);
        // if the user has the cookie 'access_token'
        if (accessToken) 
            return verifyUser(accessToken);         
        else 
            return false;
    } else {
        return false;
    }
}

// parse the user's cookies and return the cookie value of the one requested
const findCookie = (cookieName, req) => {
    const parsedCookie = req.headers.cookie.split('; ');
    let cookieValue = false;
    parsedCookie.forEach(cookie => {
        // if it's the requested cookie, return its value 
        if (cookie.split('=')[0] == cookieName) 
            cookieValue = cookie.split('=')[1];
    });
    
    // if the requested cookie couldn't be found, return false
    return cookieValue; 
}

const verifyUser = access_token => {
    let user;
    
    // verify if the JSON web token is valid
    jwt.verify(access_token, 'secret', (error, data) => {
        if(error) {
            user = false;
        } else {
            console.log(data);
            user = data;
        }
    });

    return user;
}

