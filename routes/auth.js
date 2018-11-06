var express = require('express');
var router = express.Router();
const path = require('path');

// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated())
//         return next();

//     res.redirect('/signin');
// }

module.exports = function (app, passport) {
    // new handlebar routes ------------------------------------------------------------------------
    // Home Page ===================================================
    
    // router.get('/', function (req, res) {
    //     res.render("index");
    // });
    // User Page ===================================================

 


    //-----------------------------------------------------------------------------------------------

    // SignUp ======================================================== 
    router.get('/signup', function (req, res) {
        res.render("signup");
    });
    // signup redirects
    router.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/', //can change where to redirect
        failureRedirect: '/signup'
    }
    ));

    // SignIn ======================================================== 
    router.get('/signin', function (req, res) {
        res.render("signin");
    });
    // signin redirects
    router.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/user', //can change where to redirect
        failureRedirect: '/signin'
    }
    ));

    // User Dashboard ======================================================== 
    // router.get('/dashboard', function (req, res) {
    //     res.render("dashboard");
    // });


    // LogOut ======================================================== 
    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.use(router);
    return router;
}