
// middleware to validate JWT tokens: verify if a request contains a valid JWT (JSON Web Token) in the Authorization header.

const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    // else if token is not null. ie it has some value. then check using jwt.verify() function
    try {
        const decoded = jwt.verify(token, SECRET_KEY);  // decode the data
        req.user = decoded; // attach to req.user property
        next();  // pass control to the next middleware
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports= {authenticate};