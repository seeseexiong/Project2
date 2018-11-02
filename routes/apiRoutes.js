var db = require("../models");
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('cd587386616044c48131745138aa4aa0');
var searchTerm = "sports"
var favorites = ["business", "sports", "politics"]


module.exports = function(app) {
  // Get all examples
  app.get("/api/searchUsers", function(req, res) {
    db.users.findAll({where : {name: req.params.name}}).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  app.get("/api/followedPosts", function(req, res) {
    db.Posts.findAll({where: {post: req.params.Post}}).then(function(dbPosts) {
      res.json(dbPosts);
    });
  });
  app.get("/api/followedLikes", function(req, res) {
    db.users.findAll({like: req.params.like}).then(function(dbLikes) {
      res.json(dbLikes);
    });
  });

  // Create a new example
  app.post("/api/comment", function(req, res) {
    db.Comments.create(req.body).then(function(dbComment) {
      res.json(dbComment);
    });
  });

  // Delete an example by id
  app.delete("/api/users/:id", function(req, res) {
    db.users.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  app.get('/api/topHeadlines', function(req, res) {
    newsapi.v2
      .topHeadlines({
        category: (favorites[0] + favorites[1] + favorites[2]),
        language: 'en',
        country: 'us',
      })
      .then(response => {
        console.log(response);
        res.json(response);
        /*
        {
          status: "ok",
          articles: [...]
        }
      */
      }).catch(function (err) {
        res.err(err)
      })
      
  });
  app.get('/api/searchHeadlines', function(req, res) {

    newsapi.v2
      .topHeadlines({
        category: searchTerm,
        language: 'en',
        country: 'us',
      })
      .then(response => {
        console.log(response);
        res.json(response);
        /*
        {
          status: "ok",
          articles: [...]
        }
      */
      });
  });
};


