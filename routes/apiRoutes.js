var db = require("../models");
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('cd587386616044c48131745138aa4aa0');

module.exports = function(app) {
  // Get all examples
  app.get(function(req, res) {
    newsapi.v2.topHeadlines({
      category: 'technology',
      language: 'en',
      country: 'us'
    }).then(function(mainHeadlines) {
      res.json(mainHeadlines);
      /*
        {
          status: "ok",
          sources: [...]
        }
      */
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
