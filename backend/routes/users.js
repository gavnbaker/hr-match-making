const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config/database');
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
    const username = request.body.username;
    const password = request.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) {
            return response.json(
                {
                    success: false,
                    msg: 'Error trying to find username',
                    error: JSON.stringify(err)
                }
            );
        }
        if(!user) {
            return response.json(
                {
                    success: false,
                    msg: 'User not found',
                    error: JSON.stringify(err)
                }
            );
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch) {
                const token = jwt.sign({data: user}, config.secret, {
                    expiresIn: 604800 // 1 week
                });

                return response.json(
                    {
                        success: true,
                        token: 'JWT ' + token,
                        user: {
                            id: user._id,
                            name: user.name,
                            username: user.username,
                            email: user.email
                        }
                    }
                );
            } else {
                return response.json(
                    {
                        success: false,
                        msg: 'Wrong password'                        
                    }
                );
            }
        });

    })
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (request, response, next) => {
    response.json(
        {
            user: request.user
        });
});


module.exports = router;