"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.hasMany(models.Item, {through: models.TransactionItems })

    }
  }
  Transaction.init(
    {
      name: DataTypes.STRING,
      pickUpLocation: DataTypes.STRING,
      dropLocation: DataTypes.STRING,
      bill: DataTypes.INTEGER,
      isPaid: DataTypes.BOOLEAN,
      isDone: DataTypes.BOOLEAN,
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
