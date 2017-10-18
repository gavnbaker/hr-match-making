const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email'
},
function(username, password, done) {
    User.findOne({email: username}, (err, user) => {
        if(err) {           
            return done(err);
        }
        if(!user) {
            // Return if user not found in database            
            return done(null, false, {message: 'User not found'});
        }
        // Return if password is wrong
        if(!user.validatePassword(password)) {
            return done(null, false, {message: 'Password is wrong'});
        }
        // If credentials are correct, return the user object
        return done(null, user);
    });
}));



/* const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user');
const config = require('../config/database'); */

/* module.exports = function(passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log(jwt_payload);
        User.getUserById({id: jwt_payload.sub}, (err, user) => {
            if(err) {
                return done(err, false);
            }

            if(user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
} */