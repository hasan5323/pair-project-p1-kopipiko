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
    hooks: {
      beforeCreate: (user, options) => {
        let category = user.category;
        let category_code = "001";
        if (category === "Mart") {
          category_code = "001";
        } else if (category === "Midi") {
          category_code = "002";
        } else if (category_code === "Exspress") {
          category_code = "003";
        }
        let timestamp = new Date().getTime();
        let code = `${category_code}-${timestamp}`;
        user.code = code;
      },
    },
    sequelize,
    modelName: "Store",
  });
  return TransactionItems;
};