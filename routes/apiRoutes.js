var db = require("../models");
const webhoseio = require('webhoseio');

const client = webhoseio.config({ token: '1a43be81-0d4e-4978-b200-a25ba4130e1e' });
client.query('filterWebContent', { q: 'github' })
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
  // Get all examples
  app.get("/api/searchUsers", function (req, res) {
    db.users.findAll({ where: { name: req.params.name } }).then(function (dbUsers) {
      res.json(dbUsers);
    });
  });

  app.get("/api/followedPosts", function (req, res) {
    db.Posts.findAll({ where: { post: req.params.Post } }).then(function (dbPosts) {
      res.json(dbPosts);
    });
  });
  app.get("/api/followedLikes", function (req, res) {
    db.users.findAll({ like: req.params.like }).then(function (dbLikes) {
      res.json(dbLikes);
    });
  });
  app.get("/api/Comments", function (req, res) {
    db.User.findAll({ Comment: req.params.Comment }).then(function (dbComment) {
      res.json(dbComment);
    });
  });


  // Create a new example
  app.post("/api/Comments", function (req, res) {
    db.Comments.create(req.body).then(function (dbComment) {
      res.json(dbComment);
    });
  });

  // Delete an example by id
  app.delete("/api/users/:id", function (req, res) {
    db.User.destroy({ where: { id: req.params.id } }).then(function (dbUser) {
      res.json(dbUser);
    });
  });
  app.delete("/api/users/:id", function (req, res) {
    db.Comment.destroy({ where: { id: req.params.id } }).then(function (dbComment) {
      res.json(dbComment);
    });
  });

  

};
