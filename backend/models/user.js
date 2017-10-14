import mongoose from 'mongoose';
import crypto from 'crypto';
import config from '../config/database';
import jwt from 'jsonwebtoken';

/* const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database') */

// User Schema
/* const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}); */

// User Schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    hash: String,
    salt: String
});

userSchema.methods.setPassword = function(password, callback) {
    crypto.randomBytes(16, (err, buf) => {
        if(err) {
            return callback(err);
        }
        this.salt = buf.toString('hex');
        console.log(`${buf.length} bytes of random data: ${buf.toString('hex')}`);
    });    

    crypto.pbkdf2(password, this.salt, 1000, 64, 'sha1', (err, derivedKey) => {
        if(err) {
            return callback(err);
        }
        this.hash = derivedKey.toString('hex');
        console.log(derivedKey.toString('hex'));
    });
};

userSchema.methods.validPassword = function(password, callback) {
    let pwdhash;
    crypto.pbkdf2(password, this.salt, 1000, 64, 'sha1', (err, derivedKey) => {
        if(err) {
            return callback(err);
        }
        pwdhash = derivedKey.toString('hex');
        console.log(derivedKey.toString('hex'));
    });
    return callback(null, this.hash === pwdhash);
};

userSchema.methods.generateJwt = function() {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000)
    }, config.secret);
};

userSchema.methods.getUserByUsername = function(username, callback) {
    const query = { username: username };
    User.findOne(query, callback);
}

export const User = mongoose.model('User', userSchema);

/* const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback) {
    const query = { username: username };
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {    
    bcrypt.genSalt(10, (err, salt) => {        
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;            
            newUser.password = hash;  
            console.log(JSON.stringify(newUser));          
            newUser.save(callback);        
        });
    });
} 

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
} */