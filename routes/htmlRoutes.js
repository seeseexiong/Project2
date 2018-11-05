var db = require("../models");
var path = require("path");
var server = require("/config.json")

module.exports = function (app) {
  // Load index page ========================================================
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../index.html"));
  });

  // Main LogIn Page ========================================================
  app.get('/login/main', function (req, res) {
    // render the page and pass in any flash data if it exists
    res.render("login-main", { message: req.flash('loginMessage') });
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
    res.render("login", { message: req.flash('loginMessage') });
  });

  // process the login form
  // app.post('/login', do all our passport stuff here);

  // SignUp Page ========================================================
  app.get('/signup', function (req, res) {

    // render the page and pass in any flash data if it exists
    res.render("signup", { message: req.flash('signupMessage') });
  });

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