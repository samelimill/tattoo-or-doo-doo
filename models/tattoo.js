const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Tattoo extends Model {}

Tattoo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true, // Content could be optional if you have an image
    },
    imgUrl: {
      type: DataTypes.STRING, // Store the URL or file path of the image
      allowNull: true, // Image is optional
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    points: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Tattoo;