"use strict";

module.exports = (sequelize, DataTypes) =>{
    let Comment = sequelize.define('Comment', {
        title: DataTypes.STRING,
        body: DataTypes.STRING
    });
    Comment.associate = (models) =>{
        models.Comment.belongsTo(models.Post,{as : 'Post', foreignKey: 'postId'})
    }
    return Comment;
};