"use strict";
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define("Post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Post.associate = function(models) {
    // Post should belong to an USER
    // A Post can't be created without an USER due to the *foreign key constraint*
    Post.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Post;
};