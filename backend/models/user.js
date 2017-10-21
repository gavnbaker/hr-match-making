const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const config = require('../config/database');
const jwt = require('jsonwebtoken');

// User Schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

function generateHash(password, callback) {    
    bcrypt.genSalt(10, function(err, salt) {
        if(err) {
            console.error(err);
            return callback(err);
        }
        bcrypt.hash(password, salt, function(err, hash) {
            if(err) {
                console.error(err);
                return callback(err);    
            }            
            console.log(JSON.stringify(hash)); 
            callback(null, hash);
        });
    }); 
}

UserSchema.method({    
    comparePassword: function(candidatePassword, callback) {
        bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
            if(err) return callback(err);
            callback(null, isMatch);
        });
    },
    generateJwt: function() {
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + 7);
    
        return jwt.sign({          
            username: this.username,
           exp: parseInt(expiry.getTime() / 1000)
        }, config.secret);
    }
});

UserSchema.pre('save', function(next) {
    const user = this;

    // only hash the password if it has been modified (or is new)
    if(!user.isModified('password')) return next();

    generateHash(user.password, function(err, hash) {
        if(err) {
            console.error(err);
            return next(err);
        }
        user.password = hash;
        next();
    });
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserByUsername = function(username, callback) {
    const query = { username: username };
    User.findOne(query, callback);
}
