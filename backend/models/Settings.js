const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Settings', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      defaultValue: 1,
    },
    ollama_endpoint: DataTypes.STRING,
    ollama_model: DataTypes.STRING,
  });
};