var db = require("../models");


module.exports = (app) => {
    app.get("/api/user", (req, res) => {
      db.user.findAll({}).then((dbuser) => {
        res.json(dbuser);
      });
    });
  
    app.get("/api/user/:id", (req, res) => {
      db.user.findOne({
        where: {
          id: req.params.id
        }
      }).then((dbuser) => {
        res.json(dbuser);
      });
    });
  };
  