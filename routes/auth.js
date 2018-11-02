const router = require("express").Router();
const passport = require("passport-local");
const flash = require('connect-flash');
require("../config/passport/passport-init");


module.exports = function (app, passport) {
// TEST ROUTE
router.get('/test', function (req, res) {
    // render the page and pass in any flash data if it exists
    res.send("THIS FUCKING WORKS");
});
    // // Main LogIn Page ========================================================
    router.get('/login/main', function (req, res) {
        // render the page and pass in any flash data if it exists
        res.render("login-main");
    });

    // Current Users Login ========================================================
    router.get('/login', function (req, res) {
        // render the page and pass in any flash data if it exists
        res.render("login");
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // SignUp Page ========================================================
    router.get('/signup', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render("signup");
    });

    //process the signup form
    router.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/test',
        failureRedirect: '/login'
    }
    ));

    // Profile Page ========================================================
    // want protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    router.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.handlebars', {
            user: req.user // get the user out of session and pass to template
        });
    });

    // LogOut Page ========================================================
    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.use(router);
};

// // route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}