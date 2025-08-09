const { Sequelize } = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'aiwriter.db',
  logging: console.log, // Set to false to disable SQL logging
});

// Import all models
const Story = require('./Story')(sequelize);
const Chapter = require('./Chapter')(sequelize);
const Scene = require('./Scene')(sequelize);
const Character = require('./Character')(sequelize);
const SceneCharacter = require('./SceneCharacter')(sequelize);
const SceneLog = require('./SceneLog')(sequelize);
const Settings = require('./Settings')(sequelize);

// Define relationships
Story.hasMany(Chapter, { onDelete: 'CASCADE' });
Chapter.belongsTo(Story);

Chapter.hasMany(Scene, { onDelete: 'CASCADE' });
Scene.belongsTo(Chapter);

Scene.hasMany(SceneCharacter, { onDelete: 'CASCADE' });
SceneCharacter.belongsTo(Scene);

Scene.hasMany(SceneLog, { onDelete: 'CASCADE' });
SceneLog.belongsTo(Scene);

module.exports = {
  sequelize,
  Story,
  Chapter,
  Scene,
  Character,
  SceneCharacter,
  SceneLog,
  Settings,
};