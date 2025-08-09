const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Chapter', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    chapter_order: DataTypes.INTEGER,
  });
};