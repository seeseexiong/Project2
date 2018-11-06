var db = require("../models");

module.exports = (app) =>{
    db.Post.createPost({
    title: req.body.title,
    body: req.body.body,
}).then(function(post) { 
        post.dataValues.user = u;           
        res.json(post);                                
    }).catch(function(err){
        console.log(err);
        res.sendStatus(500);
    });                    
    //show all posts
    app.get("/api/posts", (req,res) =>{
        var query = {};
        if(req.query.userid){
            query.userid = req.query.userid;    
        }
        db.Post.findall({
            where: query
        }). then((dbPost)=>{
            res.json(dbPost);
        });
    });
    //Find specific
    app.get("/api/posts/:id", (req, res) => {
        db.Post.findOne({
          where: {
            id: req.params.id
          }
        }).then((dbPost) => {
          console.log(dbPost);
          res.json(dbPost);
        });
      });
      //Save
      app.post("/api/posts", (req, res) => {
        db.Post.create(req.body).then((dbPost) => {
          res.json(dbPost);
        });
      });
      //DELETE
      app.delete("/api/posts/:id", (req, res) => {
        db.Post.destroy({
          where: {
            id: req.params.id
          }
        }).then((dbPost) => {
          res.json(dbPost);
        });
      });
      //UPDATE
      app.put("/api/posts", (req, res) => {
        db.Post.update(
          req.body,
          {
            where: {
              id: req.body.id
            }
          }).then((dbPost) => {
          res.json(dbPost);
        });
      });
    ;}