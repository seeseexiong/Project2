var db = require("../models");
var path = require("path");
var static = require("express-static")
const express = require("express");
const app = express();
const webhoseio = require('webhoseio');

const client = webhoseio.config({token: '1a43be81-0d4e-4978-b200-a25ba4130e1e'});
client.query('filterWebContent', {q: 'github'})
  .then(output => {
    console.log(output['posts'][0]['text']); // Print the text of the first post
    console.log(output['posts'][0]['published']); // Print the text of the first post publication date
});

// Get the next batch of posts
client.getNext()
  .then(output => {
    console.log(output['posts'][0]['thread']['site']); // Print the site of the first post
  });


module.exports = function (app) {

  // Load Main page ========================================================
  app.use(express.static('public'));

  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + 'public/index.html'));
  });

// USER page ========================================================
  app.get('/user', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/user.html'));
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
  })}

