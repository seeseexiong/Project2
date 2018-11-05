"use strict";
module.exports = (sequelize, DataTypes) => {
    let Like = sequelize.define('Like', {
        Like: DataTypes.BOOLEAN,
        });
    Like.associate = (models) =>{
        models.Like.belongsTo(models.user,{as : 'user', foreignKey: 'userId'})
        models.Like.belongsTo(models.Post,{as : 'Post', foreignKey: 'postId'})
    }
    return Like;
};