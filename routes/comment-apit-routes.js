var db = require("../models");
var path = require("path");

app.get('/:postId/comment')// Add comment to a post
        .post(function(req,res){ 
            models.Comment.create({
                userId: req.body.userId,
                text: req.body.comment,
                PostId: req.params.postId
            }).then(function(comment) {
                res.json(comment);                                      
            }).catch(function(err){
                console.log(err);
                res.sendStatus(500);
            });
app.destroy('/:postId/comment')// delete comment to a post
db.Comment.destroy({
  where: {
    userId: req.params.userid
  }
}).then((dbPost) => {
  res.json(dbPost);
});
        });