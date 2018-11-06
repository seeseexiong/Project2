var db = require("../models");
var path = require("path");
var serve = require("express-static")
const express = require("express");
const app = express();


module.exports =  (app) => {
  // Load index page ========================================================
  app.get('/', function(req, res) {
    console.log("hi")
    res.sendFile((path.join(__dirname, "../public/index.html")));
  });


  
  // Main Blog Page ========================================================
  app.get('/blog',  (req, res) => {
    // render the page and pass in any flash data if it exists
    res.sendFile(path.join(__dirname, "../blog-post.html"));
  });
  // cms route loads cms.html
  app.get("/friends", (req, res) => {
    res.sendFile(path.join(__dirname, "../friend-followers2.html"));
  });

 // Render 404 page for any unmatched routes
  app.get("*",  (req, res) => {
    res.render("404");
  });
}
// comment out non working stuff
