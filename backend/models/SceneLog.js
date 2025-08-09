const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('SceneLog', {
    character_id: DataTypes.INTEGER,
    character_name: DataTypes.STRING,
    action_type: DataTypes.STRING, // thought, action, speech, environment
    content: DataTypes.TEXT,
    timestamp: DataTypes.DATE,
    order_in_scene: DataTypes.INTEGER,
  });
};