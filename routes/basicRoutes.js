var express = require('express');
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));
var router = express.Router();

//Home page
router.get("/", function(req, res){
    res.render("home");
});
//Login page. Need user authentication here.
router.get("/login", function(req, res){
    res.render("login"); //after authentication, goes to fitbit auth process.
});

router.post('/login',
    passport.authenticate('local', { successRedirect: '/authenticate',
        failureRedirect: '/login',
        failureFlash: true })
);

//Login page. Need user authentication here.
router.get("/register", function(req, res){
    res.render("register")
});
//Login page. Need user authentication here.
router.get("/authenticate", function(req, res){
    res.redirect('/auth/fitbit'); //after authentication, goes to fitbit auth process.
});
router.get("/steps", function(req, res){
    require('./services/fusioncharts_api').set_steps_data(res);
});
router.get("/distance", function(req, res){
    require('./services/fusioncharts_api').set_chart_data(res);
});
router.get("/dashboard", function(req, res){
    res.render("dashboard");
});
router.get("/admin", function(req, res){
    res.render("admin");
});


module.exports = router;