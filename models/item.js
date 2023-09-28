'use strict';
const {
  Model
} = require('sequelize');
const transactionitems = require('./transactionitems');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(models.Category)
      Item.hasMany(models.TransactionItems)
      // Item.belongsToMany((models.Transaction, {through: "TransactionItems", foreignKey: "ItemId" }))


    }
  }
  Item.init({
    name: DataTypes.STRING,
    isHuge: DataTypes.BOOLEAN,
    isLiquid: DataTypes.BOOLEAN,
    CategoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Categories",
        id: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};