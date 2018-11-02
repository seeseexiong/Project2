var db = require("../models");
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('cd587386616044c48131745138aa4aa0');



module.exports = function(app) {
  // Get all examples
  app.get("/api/searchUsers", function(req, res) {
    db.User.findAll({where : {name: req.params.name}}).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  app.get("/api/followedPosts", function(req, res) {
    db.Post.findAll({where: {Post: req.params.Post}}).then(function(dbPosts) {
      res.json(dbPosts);
    });
  });
  app.get("/api/followedLikes", function(req, res) {
    db.User.findAll({like: req.params.like}).then(function(dbLikes) {
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
    db.User.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  app.get('/api/topHeadlines', function(req, res) {
    newsapi.v2
      .topHeadlines({
        category: /*Favorites variable here*/'business',
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
  app.get('/api/searchHeadlines', function(req, res) {
    newsapi.v2
      .topHeadlines({
        category: /*Search term */'business',
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


