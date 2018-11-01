'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.addColumn(
      'Comments',
      'postId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Post",
          key: "id"
        }
      }
    )
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.removeColumn(
      'Comment',
      'postId'
    )
  }
};