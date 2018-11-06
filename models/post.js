"use strict";
module.exports = (sequelize, DataTypes) => {
    var Post = sequelize.define('Post', {
      title: DataTypes.STRING,
      body: DataTypes.STRING
    }, {});
  
  Post.associate = (models) => {
    Post.belongsTo(models.user,{as : 'user', foreignKey: 'userId'})
  }
  
    return Post;
  };