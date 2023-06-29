'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Categories.hasMany(models.Products, {foreignKey:"category_id"});
      Categories.belongsTo(models.Navbars, {foreignKey:"navbar_id"});
    }
  }
  Categories.init({
    name: DataTypes.STRING,
    navbar_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Categories',
  });
  return Categories;
};