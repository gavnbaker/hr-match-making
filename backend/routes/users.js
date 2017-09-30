const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

// Register
router.post('/register', (request, response, next) => {
    let newUser = new User({
        name: request.body.name,
        email: request.body.email,
        username: request.body.username,
        password: request.body.password
    });
    console.log(JSON.stringify(newUser));

    User.addUser(newUser, (err, user) => {
        if(err) {            
            response.json({
                success: false,
                msg: 'Failed to register user',
                error: JSON.stringify(err)
            });
        } else {
            response.json({
                success: true,
                msg: 'User registered'
            });
        }            
    });
});

// Authenticate
router.post('/authenticate', (request, response, next) => {
    response.send('Authenticate');
});

// Profile
router.get('/profile', (request, response, next) => {
    response.send('Profile');
});

// Validate input on server
router.get('/validate', (request, response, next) => {
    response.send('Validate');
});

module.exports = router;