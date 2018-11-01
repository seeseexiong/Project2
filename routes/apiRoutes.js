var db = require("../models");
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('cd587386616044c48131745138aa4aa0');


module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
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
};


