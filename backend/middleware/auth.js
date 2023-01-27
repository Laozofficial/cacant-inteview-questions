const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');


const authGuard = asyncHandler(async(req, res, next) => {


    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        // Get token from header
        token = req.headers.authorization.split(' ')[1]
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // Get user from the token
        req.user = await User.findById(decoded.id).select('-password')
        next()
      } catch (error) {
            console.log(error);

            const response = {
                'error': 'please login to continue'
            };

            res.status(401).json(response);
      }
    }
  
    if (!token) {
        const response = {
            'error': 'No authorization token'
        }
        res.status(401).json(response);
    }


});

module.exports = authGuard;