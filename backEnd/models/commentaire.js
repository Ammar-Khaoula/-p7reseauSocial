'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class commentaire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  commentaire.init({
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    }, 
    createdAt: {
      type: "TIMESTAMP",
      defaultValue: DataTypes.NOW,
      field: "createdAt",
    }, 
  }, {
    sequelize,
    tableName:'commentaires',
    modelName: 'commentaire',
  });
  return commentaire;
};