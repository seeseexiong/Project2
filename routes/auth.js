var express = require('express');
var router = express.Router();
const path = require('path');


module.exports = function (app, passport) {
    // new handlebar routes ------------------------------------------------------------------------
    // LOGIN Dashboard ======================================================== 
    router.get('/login', function (req, res) {
        //res.sendFile(path.join(__dirname + '/public/login.html'));
        console.log('works');
    });

    // SignUp ======================================================== 
    // router.get('/signup', function (req, res) {
    //     //res.redirect("/#signUpModal");

    // });
    // signup redirects
    router.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/', //can change where to redirect
        failureRedirect: '/signup'
    }
    ));

    // SignIn ======================================================== 
    // router.get('/signin', function (req, res) {
    //     //res.redirect("/#signInModal");
    // });
    // signin redirects
    router.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/user', //can change where to redirect
        failureRedirect: '/signin'
    }
    ));

    // // LOGIN Dashboard ======================================================== 
    // router.get('/signin', function (req, res) {
    //     res.sendFile(path.join(__dirname + '/public/login.html'));
    // });


    // LogOut ======================================================== 
    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.use(router);
    return router;
}