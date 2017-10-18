const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/user');

export function register(req, res) {
    const user = new User();

    user.name = req.body.name;
    user.email = req.body.email;

    user.setPassword(req.body.password, (err) => {
        console.error(err);
    });

    user.save((err) => {
        let token = user.generateJwt();
        res.status(200);
        res.json({token: token});
    });
}

export function login(req, response) {
    passport.authenticate('local', (err, user, info) => {
        let token;

        // If passport throws/catches an error
        if(err){
            res.status(404).json(err);
            return;
        }

        // If user is found
        if(user) {
            token = user.generateJwt();
            res.status(200);
            res.json({token: token});
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res);
}