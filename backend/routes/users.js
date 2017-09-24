const express = require('express');
const router = express.Router();

// Register
router.post('/register', (request, response, next) => {
    response.send('Register');
});

// Authenticate
router.post('/authenticate', (request, response, next) => {
    response.send('Authenticate');
});

// Profile
router.get('/profile', (request, response, next) => {
    response.send('Profile');
});

// Validate
router.get('/validate', (request, response, next) => {
    response.send('Validate');
});

module.exports = router;