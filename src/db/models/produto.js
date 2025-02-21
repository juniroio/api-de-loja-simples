'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Produto.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING,
    preco: DataTypes.NUMBER,
    tags: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Produto',
  });
  Produto.sync();
  return Produto;
};