const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('SceneCharacter', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    personality: DataTypes.TEXT,
    history: DataTypes.TEXT,
    goals: DataTypes.TEXT,
    scene_role: DataTypes.STRING, // protagonist, antagonist, background, environment
    knowledge: DataTypes.TEXT,
    masterCharacterId: DataTypes.INTEGER,
  });
};