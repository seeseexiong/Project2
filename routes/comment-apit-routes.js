var db = require("../models");
app.get("/", (req,res) => {
    db.Comment.findAll()
  })