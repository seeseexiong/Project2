var db = require("../models");

module.exports = (app) =>{
// GET route for getting all of the posts
app.get("/api/posts", function(req, res) {
    var query = {};
    if (req.query.user_id) {
      query.userId = req.query.user_id;
    }
    // 1. Add a join here to include all of the users to these posts
    
    db.Post.findAll({
      include: [db.user],
      where: query
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/posts/:id", function(req, res) {
    
    db.Post.findOne({
      include:[db.user],
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      console.log(dbPost);
      res.json(dbPost);
    });
  });

  // POST route for saving a new post
  app.post("/api/posts", function(req, res) {
    db.Post.create(req.body).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/posts/:id", function(req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // PUT route for updating posts
  app.put("/api/posts", function(req, res) {
    db.Post.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};

//     db.Post.createPost({
//     title: req.body.title,
//     body: req.body.body,
// }).then((post) => { 
//         post.dataValues.user = u;           
//         res.json(post);                                
//     }).catch((err)=>{
//         console.log(err);
//         res.sendStatus(500);
//     });                    
//     //show all posts
//     app.get('/post/:id', (req,res) => { models.Post.findAll({
//         include: [ { 
//                     model: models.user,
//                     attributes: ['id','username']
//                     },
//                      { 
//                      model: models.post, 
//          include: {
//                     model: models.Comment,
//                     attributes: ['id','username']
//                     }
//                     }
//                     ],
//         order: [
//                     ['createdAt', 'DESC']
//                 ]
//             }).then((posts) => {
//                 Promise.all(posts.map((post) => {
//                     return post.countLikes();
//                 })).then((likes)=>{
//                     var postsWithLikes = posts.map((post, index) => {
//                         post.dataValues.likes = likes[index];
//                         return post;
//                     });

//                     res.json(postsWithLikes);
//                 })                                
//             }).catch((err) =>{
//                 console.log(err);
//                 res.sendStatus(500);
//             });
//         })
        
//     //Find specific
//     app.get('/', (req, res,)=>{ // get single post by post ID   
//             models.Post.findById(req.params.postId,
//                                 { include: [ 
//                                             { 
//                                                 model: models.user,
//                                                 attributes: ['id','username',]
//                                             },
//                                             { 
//                                                 model: models.Comment, 
//                                                 include: {
//                                                             model: models.user,
//                                                             attributes: ['id','username',]
//                                             }
//                                         }
//                                     ] 
//                                 }).then((s)=> {
//                                     res.json(s);
//                                 }); 
//         });
//         app.get('/user/:userId', (req, res, next) =>{  // get posts of a single users specific post
//             models.Post.findAll({ where: { userId: req.params.userId }}).then((posts) => {
//                 res.json(posts);
//             }).catch(()=>{
//                 res.sendStatus(400)
//             }); 
//         });

//       //Save
//       app.post("/api/posts", (req, res) => {
//         db.Post.create(req.body).then((dbPost) => {
//           res.json(dbPost);
//         });
//       });
//       //DELETE
//       app.delete("/api/posts/:id", (req, res) => {
//         db.Post.destroy({
//           where: {
//             id: req.params.id
//           }
//         }).then((dbPost) => {
//           res.json(dbPost);
//         });
//       });
//       //UPDATE
//       app.put("/api/posts", (req, res) => {
//         db.Post.update(
//           req.body,
//           {
//             where: {
//               id: req.body.id
//             }
//           }).then((dbPost) => {
//           res.json(dbPost);
//         });
//       });
//     ;}