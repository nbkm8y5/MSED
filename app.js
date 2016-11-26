var express = require('express');
var app = express();
require('dotenv').config();
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var configDB = require('./bin/database.js');
require('./bin/passport')(passport);
var exphbs = require('express-handlebars');

mongoose.connect(configDB.url);

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(session(
    {
        secret: process.env.ESS,
        resave: false,
        saveUninitialized: true
    }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/public', express.static('public'));

require('./routes/routes')(app, passport);
/*Prepares fitbit oauth with passport.
 Think of this as having all the code from fitbit_oauth on app.js*/
require('./services/fitbit_oauth')(app, passport, session); //comment this to test chart rendering w/o fitbit.

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
