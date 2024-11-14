'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.Produto, {foreignKey: 'produtoId'})
    }
  }
  Post.init({
    titulo: DataTypes.STRING,
    texto: DataTypes.STRING,
    produtoId: DataTypes.INTEGER,
    foto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  Post.sync();
  return Post;
};