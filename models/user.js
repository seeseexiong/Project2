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
const DT = require('sequelize').Sequelize;

var sequelize = require("./config/config.json");
var User = sequelize.define("User", { 
  // the routeName gets saved as a string
    //valuation_id     : {type:DT.UUID, defaultValue:DT.UUIDV4},
    name       : DT.STRING,
    email      : DT.STRING,
    username   : DT.STRING,
    password   : DT.STRING(320), 

}, 
{
  paranoid:true,
}
);

User.prototype.validPassword = function(password) {
  
  console.log("Password from the DB:" , this.password)
  console.log("Password from the Client :" , password)
  return (this.password === password)
}

// Syncs with DB
User.sync();

// Makes the Character Model available for other files (will also create a table)
module.exports = User;
