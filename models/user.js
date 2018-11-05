"use strict";
module.exports = function(sequelize, Sequelize) {

	var User = sequelize.define('user', {
		id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
		name: { type: Sequelize.STRING,notEmpty: true},
		email: { type:Sequelize.STRING, validate: {isEmail:true} },
		username: {type:Sequelize.TEXT},
		password : {type: Sequelize.STRING,allowNull: false }, 
		last_login: {type: Sequelize.DATE},
        status: {type: Sequelize.ENUM('active','inactive'),defaultValue:'active' },
    profileImg: {type: Sequelize.STRING}

});

	return User;

}