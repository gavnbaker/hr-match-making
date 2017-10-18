const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to Database
mongoose.connect(config.database, {useMongoClient: true});
const db = mongoose.connection;

// On error
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// On connection
db.once('open', () => {
    console.log('Connected to database '+ config.database);
});

const app = express();

const users = require('./routes/users');

// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Logging Middleware
app.use(logger('dev'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set Static folder
app.use(express.static(path.join(__dirname, '../public')));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// require('./config/passport') (passport);

// handles all of the user routes/controllers
app.use('/users', users);

// Index Router
app.get('/', (request, response) => {
    response.send('Invalid endpoint');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.err = req.app.get('env') === 'development' ? err : {};

    // pass the error message to the client    
    res.status(err.status || 500).json({err: err});
});

// Start Server
app.listen(port, () => {
    console.log('Server started on port '+ port);
});


