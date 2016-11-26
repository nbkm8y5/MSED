module.exports = function (app, passport) {

    app.get("/", function (req, res) {
        res.render("home");
    });

    app.get('/login', function (req, res) {

        res.render(
            'login',
            {
                message: req.flash('loginMessage')
            });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: 'dashboard', //change to '/auth/fitbit' after fitbit_oauth is fixed.
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get("/steps", isLoggedIn, function (req, res) {
        require('./services/fusioncharts_api').set_steps_data(res);
    });
    app.get("/distance", isLoggedIn, function (req, res) {
        require('./services/fusioncharts_api').set_chart_data(res);
    });
    app.get("/dashboard", isLoggedIn, function (req, res) {
        res.render("dashboard",
            {
                loggedin: 1
            });
    });
    app.get("/admin", isLoggedIn, function (req, res) {
        res.render("admin",
            {
                loggedin: 1
            });
    });
    app.get("/register", function (req, res) {
        res.render("register", {
            message: req.flash('registerMessage')
        });
    });

    app.post('/register', passport.authenticate('local-signup', {
        successRedirect: '/login',
        failureRedirect: '/register',
        failureFlash: true
    }));

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

};


function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
