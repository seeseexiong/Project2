"use strict";
module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING
    }, {
      classMethods: {
        associate: (models) => {
          // associations can be defined here
        }
      }
    });
    return User;
  };
  
