var db = require("../models");
var path = require("path");


module.exports = function (app) {
  // Load Main page ========================================================
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../index.html"));
  });
<<<<<<< HEAD
=======

>>>>>>> 094dd29d3848af1bff34d3f7d8ccd5e98c50d1ec
  // Main LogIn Page ========================================================
  app.get('/login/main', function (req, res) {
    // render the page and pass in any flash data if it exists
    res.render("login-main" );
  });
  // cms route loads cms.html
  app.get("/cms", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/cms.html"));
  });

  // process the login form
  // app.post('/login', do all our passport stuff here);

  // Current Users Login ========================================================
  app.get('/login', function (req, res) {
    // render the page and pass in any flash data if it exists
    res.render("login" );
  });

  
  // Profile Page ========================================================
  // want protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  // app.get('/profile', isLoggedIn, function (req, res) {
  //   res.render('profile.handlebars', {
  //     user: req.user // get the user out of session and pass to template
  //   });
  // });

  // LogOut Page ========================================================
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });


  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });
 

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
}
// comment out non working stuff
