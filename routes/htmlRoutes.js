var db = require("../models");
var path = require("path");

module.exports =  (app) => {
  // Load index page ========================================================
  app.get("/",  (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
  });

  // Main LogIn Page ========================================================
  app.get('/login/main',  (req, res) => {
    // render the page and pass in any flash data if it exists
    res.render("login-main" );
  });
  // cms route loads cms.html
  app.get("/cms", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/cms.html"));
  });

 // Render 404 page for any unmatched routes
  app.get("*",  (req, res) => {
    res.render("404");
  });
}
// comment out non working stuff
