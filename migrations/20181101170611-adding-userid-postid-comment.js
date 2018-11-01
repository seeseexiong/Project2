'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    queryInterface.addColumn(
      'Like',
      'userId',{
        type: Sequelize.INTEGER
      }
    )

  },

  down: (queryInterface, Sequelize) => {

    'Like',
    'userId'
  }
};