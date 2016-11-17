const FitbitStrategy = require('passport-fitbit-oauth2').FitbitOAuth2Strategy;
const passport = require('passport');
const session = require('express-session');
const request = require('request');
const CLIENT_ID = '227WJM';
const CLIENT_SECRET = 'e06ef46c258363ce596d40142344be67';
function init_fitbit (app) {
  //session required to serialize and deserialize user so we can retrieve object through req.
  app.use(session({secret: '<sp>',
                 saveUninitialized: true,
                 resave: false}));
  app.use(passport.initialize()); //initializes pasport.
  app.use(passport.session());

  var fitbitStrategy = new FitbitStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  scope: ['activity','sleep','profile'],
  callbackURL: "http://localhost:3000/auth/fitbit/callback"
  }, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
        return done(null, accessToken);
      });
  });
  passport.use(fitbitStrategy);
  passport.serializeUser(function(user, done) {
  done(null, user);
  });
  passport.deserializeUser(function(obj, done) {
  done(null, obj);
  });
  var fitbitAuthenticate = passport.authenticate('fitbit', {
    successRedirect: '/auth/fitbit/success',
    failureRedirect: '/failure'
  });
  app.get('/auth/fitbit', fitbitAuthenticate);
  app.get('/auth/fitbit/callback', fitbitAuthenticate);
  app.get('/auth/fitbit/success', function(req, res) {
    require('./fitbit_api_calls').init_api_calls(req.user); //fires up fitbit api calls service to make calls with token.
    res.send("SUCCESS");
  });
  }
module.exports = {
  init_fitbit: init_fitbit
}
