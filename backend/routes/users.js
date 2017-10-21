const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), function(req, res, next) {
    res.json(
        {
            success: true,
            msg: "You were authenticated.",
            user: req.user.username
        });
}); 


module.exports = router;