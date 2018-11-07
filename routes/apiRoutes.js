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

  // To query /v2/top-headlines
  // All options passed to topHeadlines are optional, but you need to include at least one of them
  newsapi.v2.topHeadlines({
    sources: 'bbc-news,the-verge',
    q: 'bitcoin',
    category: 'business',
    language: 'en',
    country: 'us'
  }).then(response => {
    console.log(response);
    /*
      {
        status: "ok",
        articles: [...]
      }
    */
  });
  // To query /v2/everything
  // You must include at least one q, source, or domain
  newsapi.v2.everything({
    q: 'bitcoin',
    sources: 'bbc-news,the-verge',
    domains: 'bbc.co.uk, techcrunch.com',
    from: '2017-12-01',
    to: '2017-12-12',
    language: 'en',
    sortBy: 'relevancy',
    page: 2
  }).then(response => {
    console.log(response);
    /*
      {
        status: "ok",
        articles: [...]
      }
    */
  });
  // To query sources
  // All options are optional
  newsapi.v2.sources({
    category: 'technology',
    language: 'en',
    country: 'us'
  }).then(response => {
    console.log(response);
    /*
      {
        status: "ok",
        sources: [...]
      }
    */
  });


  // app.get('/api/topHeadlines', function(req, res) {
  //   var resultArray = []
  //   for (var i = 0; i < favorites.length; i++){
  //   var currentPromise = newsapi.v2
  //     .topHeadlines({
  //       category: favorites[i],
  //       language: 'en',
  //       country: 'us',
  //     })
  //     .then(response => {
  //       console.log(response);
  //       return response
  //       /*
  //       {
  //         status: "ok",
  //         articles: [...]
  //       }
  //     */
  //     }).catch(function (err) {
  //       res.err(err)
  //     })
  //     resultArray.push(currentPromise)
  //   }
  //   Promise.all(resultArray).then(headlines => {
  //     res.json(headlines)

  //   }).catch(function(err) {
  //     res.json(err)
  //   })
  // });
  // app.get('/api/searchHeadlines', function(req, res) {

  //   newsapi.v2
  //     .topHeadlines({
  //       category: searchTerm,
  //       language: 'en',
  //       country: 'us',
  //     })
  //     .then(response => {
  //       console.log(response);
  //       res.json(response);
  //       /*
  //       {
  //         status: "ok",
  //         articles: [...]
  //       }
  //     */
  //     });
  // });
  // app.get('/api/searchHeadlines', function(req, res) {
  //   newsapi.v2
  //     .topHeadlines({
  //       category: /*Search term */'business',
  //       language: 'en',
  //       country: 'us',
  //     })
  //     .then(response => {
  //       console.log(response);
  //       res.json(response);
  //       /*
  //       {
  //         status: "ok",
  //         articles: [...]
  //       }
  //     */
  //     });
  // });

};
