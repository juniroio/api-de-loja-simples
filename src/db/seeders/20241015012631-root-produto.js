'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Produtos', [{
         nome: 'rootName',
         descricao: "",
         preco: 0.0,
         createdAt: new Date(),
         updatedAt: new Date()
     }])
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Produtos', {nome: 'rootName'}, {})
    }
};