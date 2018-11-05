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
  };
  