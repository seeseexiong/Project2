'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    queryInterface.addColumn(
      'Like',
      'post_userId',{
        type: Sequelize.INTEGER
      }
    )

  },

  down: (queryInterface, Sequelize) => {

    'Like',
    'post_userId'
  }
};