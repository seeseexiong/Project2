var db = require("../models");
var path = require("path");
var serve = require("express-static")
const express = require("express");
const app = express();


module.exports = function (app) {
  // Load Main page ========================================================

  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../index.html"));
  });

  // app.get("/", function (req, res) {
  //   res.sendFile(path.join(__dirname, "../index.html"));
  // });

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

  // process the login form
  // app.post('/login', do all our passport stuff here);

  // Current Users Login ========================================================
  app.get('/login', function (req, res) {
    // render the page and pass in any flash data if it exists
    res.render("login" );
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
  app.get("*", function (req, res) {

 // Render 404 page for any unmatched routes
  app.get("*",  (req, res) => {

    res.render("404");
  });
})
  })}