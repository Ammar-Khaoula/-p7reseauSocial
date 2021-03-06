'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imagesURL: {
      type: DataTypes.STRING,
    },
    bio:{
      type: DataTypes.TEXT
    },
    createdAt:{
      type: "TIMESTAMP",
      defaultValue: DataTypes.NOW,
      field: "createdAt",
    },
    isAdmin:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false
    },
  }, {
    sequelize,
    tableName:'Users',
    modelName: 'User',
  });
  return User;
};