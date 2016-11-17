var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

//NPM Module to integrate Handlerbars UI template engine with Express
var exphbs  = require('express-handlebars');
//Declaring Express to use Handlerbars template engine with main.handlebars as
//the default layout
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var body = {"activities-distance":[{"dateTime":"2016-11-06","value":"0.0"},{"dateTime":"2016-11-07","value":"0.0"},
{"dateTime":"2016-11-08","value":"0.0"},{"dateTime":"2016-11-09","value":"0.0"},{"dateTime":"2016-11-10","value":"0.0"},
{"dateTime":"2016-11-11","value":"0.0"},{"dateTime":"2016-11-12","value":"0.0"}]};

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Defining middleware to serve static files
app.use('/public', express.static('public'));

/*Prepares fitbit oauth with passport.
 Think of this as having all the code from fitbit_oauth on app.js*/
require('./services/fitbit_oauth').init_fitbit(app); //comment this to test chart rendering w/o fitbit.

 //require('./services/fusioncharts_api').set_data(JSON.stringify(body)); //testing fusioncharts_api subsystem.
 //require('./services/fusioncharts_api').set_data(JSON.stringify(body)); //testing fusioncharts_api subsystem.

//Home page
app.get("/", function(req, res){
  res.render("home");
});
//Login page. Need user authentication here.
app.get("/login", function(req, res){
  res.redirect('/auth/fitbit'); //after authentication, goes to fitbit auth process.
});
app.get("/steps", function(req, res){
  require('./services/fusioncharts_api').set_steps_data(res);
});
app.get("/distance", function(req, res){
  require('./services/fusioncharts_api').set_chart_data(res);
});
app.get("/dashboard", function(req, res){
  res.render("chart");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
