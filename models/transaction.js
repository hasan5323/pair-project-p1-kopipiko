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
      Transaction.belongsTo(models.User);
      Transaction.hasMany(models.TransactionItems);
      // Transaction.belongsToMany((models.Item, {through: "TransactionItems", foreignKey: "TransactionId" }))
    }
    static relatedTransaction(id) {
      return Transaction.findAll({
        where: {
          UserId: id,
        },
      });
    }
    paidStatus(boolean){
      if(boolean) {
        return `terbayar`
      }else {
        return `pending`
      }
    } 
    doneStatus(boolean){
      if(boolean) {
        return `selesai`
      }else {
        return `pending`
      }
    } 
  }
  Transaction.init(
    {
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
