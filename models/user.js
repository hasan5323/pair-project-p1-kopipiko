"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Profile)
      User.hasMany(models.Transaction)

    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      role: DataTypes.STRING,
      ProfileId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Profiles",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
