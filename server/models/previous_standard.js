'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Previous_Standard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Previous_Standard.init({
    userId: DataTypes.INTEGER,
    percentage: DataTypes.DECIMAL,
    remark: DataTypes.STRING,
    standard: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Previous_Standard',
  });
  return Previous_Standard;
};