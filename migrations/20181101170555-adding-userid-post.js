'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn(
    'Post',
    'userId',
    {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id"
      }
    }
  )
},

  down: (queryInterface, Sequelize) => {

    return queryInterface.removeColumn(
      'Post',
      'userId'
    )
  }
};