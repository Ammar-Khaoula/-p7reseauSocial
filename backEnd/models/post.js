'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  post.init({
    publication:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: "TIMESTAMP",
        defaultValue: DataTypes.NOW,
        field: "createdAt",
    },
    imageUrl:  {
      type: DataTypes.STRING,
      allowNull: true
    },
    like:  {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    tableName:'posts',
    modelName: 'post',
  });
  return post;
};