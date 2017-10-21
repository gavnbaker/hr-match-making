const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/', function(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) {
            return res.json(
                {
                    success: false,
                    msg: 'Error trying to find username',
                    error: JSON.stringify(err)
                }
            );
        }
        if(!user) {
            return res.json(
                {
                    success: false,
                    msg: 'User not found',
                    error: JSON.stringify(err)
                }
            );
        }

        user.comparePassword(password, function(err, isMatch) {
            if(err) next(err);
            if(isMatch) {                
                const token = user.generateJwt();
                return res.json(
                    {
                        success: true,
                        msg: 'User logged in',
                        token: 'JWT ' + token                                               
                    }
                );
            } else {
                return res.json(
                    {
                        success: false,
                        msg: 'Wrong password'                        
                    }
                );
            }
        });

    })
});

module.exports = router;