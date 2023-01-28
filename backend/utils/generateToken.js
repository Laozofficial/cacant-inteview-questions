const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({
    id
  }, process.env.JWT_SECRET || 'cacant@secret', {
    expiresIn: '30d',
  });
};

module.exports = generateToken;