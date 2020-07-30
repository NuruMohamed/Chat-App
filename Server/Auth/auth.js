const jwt = require("jsonwebtoken");

// checks if a user is authenticated or not 
module.exports = isAuthenticated = (req) => {
    if(req.headers.cookie) {
        const accessToken = findCookie('access_token', req);

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
    // cookie header is a string where each cookies are separated by ; and a space
    const parsedCookie = req.headers.cookie.split('; ');
    // holds the return value of the forEach callback function
    let cookieValue = false;
    parsedCookie.forEach(cookie => {
        // a cookie's key and value are separeted by = sign 
        // if it's the requested cookie, return its value 
        if (cookie.split('=')[0] == cookieName) 
            cookieValue = cookie.split('=')[1];
    });
    
    // if the requested cookie couldn't be found, return false
    return cookieValue; 
}

const verifyUser = access_token => {
    // holds the return value of the callback function passed to jwt.verify() 
    let user;
    
    // verify if the JSON web token is valid
    jwt.verify(access_token, 'secret', (error, data) => {
        if(error) {
            user = false;
        } else {
            user = data;
        }
    });

    return user;
}

