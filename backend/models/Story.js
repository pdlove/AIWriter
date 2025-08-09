const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Story', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    story_order: DataTypes.INTEGER,
  });
};