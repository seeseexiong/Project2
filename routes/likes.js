var db = require("../models");

module.exports = (app) => {
app.post('/:postId/like', function(req,res){ // add a like to a post
            Promise.all([
                models.User.findById(req.body.likerUserId),
                models.Post.findById(req.params.postId)
            ]).then(function(results){
                var u = results[0];
                var p = results[1];

                p.addLike(u).then(function(likeRes){
                    res.json(likeRes);
                }).catch(function(err){
                    console.log(err);
                    res.sendStatus(500);
                });                
            })
        });
    
    app.post('/:postId/unlike' ,function(req,res){ // remove a like from a post
            Promise.all([
                models.User.findById(req.body.likerUserId),
                models.Post.findById(req.params.postId)
            ]).then(function(results){
                var u = results[0];
                var p = results[1];

                p.removeLike(u).then(function(likeRes){                    
                    res.json(likeRes);
                }).catch(function(err){
                    console.log(err);
                    res.sendStatus(500);
                });                
            })
        });
    }