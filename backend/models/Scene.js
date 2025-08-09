const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Scene', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    scene_order: DataTypes.INTEGER,
    starting_prompt: DataTypes.TEXT,
    status: DataTypes.STRING, // planned, running, hold, complete, final
    ending_state_summary: DataTypes.TEXT,
    narrative: DataTypes.TEXT,
  });
};