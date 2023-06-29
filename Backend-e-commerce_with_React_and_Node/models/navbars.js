'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Navbars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Navbars.hasMany(models.Categories, {foreignKey:"navbar_id"});
    }
  }
  Navbars.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Navbars',
  });
  return Navbars;
};