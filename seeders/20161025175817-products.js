'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
            //Here 'Products' refers to the table name
    return queryInterface.bulkInsert('Products', [{
      user_id:1,
      name: 'MacBook',
      description: 'Late 2011 13" MacBook Pro',
      sold:false,
      created_at: new Date(),
      updated_at: new Date(),
    }], {});

    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
