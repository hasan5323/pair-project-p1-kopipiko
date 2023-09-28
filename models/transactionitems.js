'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TransactionItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TransactionItems.belongsTo(models.Transaction)
      TransactionItems.belongsTo(models.Item)

    }
  }
  TransactionItems.init({
    TransactionId: {
      type: DataTypes.INTEGER,
    references: {
      model: "Transactions",
      key: "id"
    }},
    ItemId: {
      type: DataTypes.INTEGER,
    references: {
      model: "Items",
      key: "id"
    }},
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TransactionItems',
  });
  return TransactionItems;
};