var db = require("../models");


module.exports = (app) => {
    app.get("/api/User", (req, res) => {
      db.User.findAll({}).then((dbUser) => {
        res.json(dbUser);
      });
    });
  
    app.get("/api/authors/:id", (req, res) => {
      db.User.findOne({
        where: {
          id: req.params.id
        }
      }).then((dbUser) => {
        res.json(dbUser);
      });
    });
  
    app.post("/api/authors", (req, res) => {
      db.User.create(req.body).then((dbUser) => {
        res.json(dbUser);
      });
    });
  
    app.delete("/api/authors/:id", (req, res) => {
      db.User.destroy({
        where: {
          id: req.params.id
        }
      }).then((dbUser) => {
        res.json(dbUser);
      });
    });
  
  };
  