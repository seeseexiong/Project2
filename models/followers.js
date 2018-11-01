"use strict";

var User = sequelize.define('User', {name: Sequelize.STRING});
var Followers = sequelize.define('Followers', {FollowedId: Sequelize.INTEGER, FollowerId: Sequelize.INTEGER});

// define relationships
User.hasMany(User, { as: 'Followers', foreignKey: 'FollowedId', through: Followers});
User.hasMany(User, { as: 'Followeds', foreignKey: 'FollowerId', through: Followers});

// create + get content
sequelize.sync({ force: true }).success(function() {
    Person.create({ name: 'jon' }).success(function(jon) {
        Person.create({ name: 'bob' }).success(function(bob) {
            jon.addFollower(bob).success(function() {
                jon.getFollowers().success(function(followers) {
                    console.log(followers.map(function(person) {return person.name}));
                });
            });
        });
    });
});