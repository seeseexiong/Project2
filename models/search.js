module.exports = function(sequelize, DataTypes) {
    var search = sequelize.define("search", {
      term: DataTypes.STRING,
    });
    return search;
  };