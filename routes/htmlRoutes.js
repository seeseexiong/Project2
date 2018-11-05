var db = require("../models");
var path = require("path");


module.exports = function (app) {
  // Load Main page ========================================================
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // Friends-followers.html
  app.get("/friend", function(req, res) {
    res.sendFile(path.join(__dirname, "../friend-followers2.html"));
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