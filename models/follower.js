"use strict";
module.exports = (sequelize,DataTypes) => {
//var User = sequelize.define('User', {name: DataTypes.STRING});
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

//var Followers = sequelize.define('Followers', {FollowedId: DataTypes.INTEGER, FollowerId: DataTypes.INTEGER});

// define relationships
User.belongsToMany(User, { as: 'Followers', through: 'UserFollowers'});
// User.belongsToMany(User, { as: 'Followers', foreignKey: 'FollowerId', through: 'Followers'});

// create + get content
// sequelize.sync({ force: true }).then(function() {
//     Person.create({ name: 'jon' }).then(function(jon) {
//         Person.create({ name: 'bob' }).then(function(bob) {
//             jon.addFollower(bob).then(function() {
//                 jon.getFollowers().then(function(followers) {
//                     console.log(followers.map(function(User) {return User.name}));
//                 });
//             });
//         });
//     });
return User;
};
