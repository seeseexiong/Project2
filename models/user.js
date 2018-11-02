"use strict";
// module.exports = (sequelize, DataTypes) => {
//   var User = sequelize.define('User', {
//     name: DataTypes.STRING,
//     email: DataTypes.STRING,
//     username: DataTypes.STRING,
//     password: DataTypes.STRING
//   }, {
//       classMethods: {
//         associate: (models) => {
//           // associations can be defined here
//         }
//       }
//     });
//   return User;
// };

// User Model for Passport ===============================

const db = require("../models");

//define schema 
module.exports = function (sequelize, Sequelize) {

  var User = sequelize.define('User', {
    name: {
      type: Sequelize.STRING,
      notEmpty: true
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      }
    },
    username: {
      type: Sequelize.TEXT
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
    {
      paranoid: true
    });

  User.prototype.validPassword = function (password) {

    console.log("Password from the DB:", this.password)
    console.log("Password from the Client :", password)
    return (this.password === password)
  }

  // Syncs with DB
  User.sync();
  return User;
};


