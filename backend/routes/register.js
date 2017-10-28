const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Register
router.post('/', function(req, res, next) {
    let user = new User();
    user.name = req.body.name,
    user.email = req.body.email,
    user.username = req.body.username, 
    user.password = req.body.password;       

    user.save(function(err) {
        if(err) {            
            res.json({err: err, msg: 'Unable to register user.'});
        }
        const token = user.generateJwt();
        
        res.status(200);
        res.json({
            success: true,
            msg: 'User Created',
            token: 'JWT ' + token                    
        });
    });
});

module.exports = router;