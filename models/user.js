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

module.exports = function(sequelize, DataTypes) {

var User = sequelize.define("User", { 
  // the routeName gets saved as a string
    
    name: DataTypes.STRING, 
    email: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "username already taken"
      }
    }, 
    password: DataTypes.STRING, 

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

return User;
};