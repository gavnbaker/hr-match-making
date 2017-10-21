const passportJwt = require('passport-jwt');

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const User = require('../models/user');
const config = require('../config/database');

module.exports = function(passport) {
    let jwtOptions = {};
    jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    jwtOptions.secretOrKey = config.secret;    

    passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, next) {        
        console.log('payload received: ',jwt_payload);        
        User.getUserByUsername(jwt_payload.username, function(err, user) {
            if(err) {
                console.error(err);
                return next(err, false);
            }

            if(user) {
                // Return if user not found in database  
                console.log('User found');          
                return next(null, user);
            } else {
                // If credentials are correct, return the user object
                console.log('No User found');          
                return next(null, false, {message: 'Invalid User'});
            }           
        });
    }));
}