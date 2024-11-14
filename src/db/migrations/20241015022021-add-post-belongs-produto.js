'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Posts', 'produtoId', {
            type: Sequelize.INTEGER,
            references: {
                model: 'Produtos',
                key: 'id'
            },
            onDelete: 'SET NULL'
        })
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Posts', 'produtoId')
    }
};
