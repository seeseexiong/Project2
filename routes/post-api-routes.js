var db = require("../models");

module.exports = (app) =>{
    db.Post.createPost({
    title: req.body.title,
    body: req.body.body,
}).then((post) => { 
        post.dataValues.user = u;           
        res.json(post);                                
    }).catch((err)=>{
        console.log(err);
        res.sendStatus(500);
    });                    
    //show all posts
    app.get('/user/:id', (req,res) => { models.Post.findAll({
        include: [ { 
                    model: models.user,
                    attributes: ['id','username']
                    },
                     { 
                     model: models.post, 
         include: {
                    model: models.Comment,
                    attributes: ['id','username']
                    }
                    }
                    ],
        order: [
                    ['createdAt', 'DESC']
                ]
            }).then((posts) => {
                Promise.all(posts.map((post) => {
                    return post.countLikes();
                })).then((likes)=>{
                    var postsWithLikes = posts.map((post, index) => {
                        post.dataValues.likes = likes[index];
                        return post;
                    });

                    res.json(postsWithLikes);
                })                                
            }).catch((err) =>{
                console.log(err);
                res.sendStatus(500);
            });
        })
        
    //Find specific
    app.get('/l/:postId', (req, res,)=>{ // get single post by post ID   
            models.Post.findById(req.params.postId,
                                { include: [ 
                                            { 
                                                model: models.user,
                                                attributes: ['id','username',]
                                            },
                                            { 
                                                model: models.Comment, 
                                                include: {
                                                            model: models.user,
                                                            attributes: ['id','username',]
                                            }
                                        }
                                    ] 
                                }).then((s)=> {
                                    res.json(s);
                                }); 
        });
        app.get('/user/:userId', (req, res, next) =>{  // get posts of a single users specific post
            models.Post.findAll({ where: { userId: req.params.userId }}).then((posts) => {
                res.json(posts);
            }).catch(()=>{
                res.sendStatus(400)
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