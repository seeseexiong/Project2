'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    queryInterface.addColumn(
      'Like',
      'postId',{
        type: Sequelize.INTEGER
      }
    )

  },

  down: (queryInterface, Sequelize) => {

    'Like',
    'postId'
  }
};