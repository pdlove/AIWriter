const express = require('express');
const cors = require('cors');
const { sequelize, Story, Chapter, Scene, Character, SceneCharacter, SceneLog, Settings } = require('./models');
const seedDatabase = require('./seeds');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database and seed data
sequelize.sync().then(async () => {
  console.log('Database connected and synchronized');
  await seedDatabase();
});

// API Endpoints
// Stories CRUD
app.get('/api/stories', async (req, res) => {
  try {
    const stories = await Story.findAll({
      order: [['story_order', 'ASC']],
      include: [
        {
          model: Chapter,
          include: [
            {
              model: Scene,
              order: [['scene_order', 'ASC']]
            }
          ],
          order: [['chapter_order', 'ASC']]
        }
      ]
    });
    res.json(stories);
  } catch (error) {
    console.error('Error fetching stories:', error);
    res.status(500).json({ error: 'Failed to fetch stories' });
  }
});

app.post('/api/stories', async (req, res) => {
  try {
    const story = await Story.create(req.body);
    res.status(201).json(story);
  } catch (error) {
    console.error('Error creating story:', error);
    res.status(500).json({ error: 'Failed to create story' });
  }
});

app.put('/api/stories/:id', async (req, res) => {
  try {
    const [updated] = await Story.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const story = await Story.findByPk(req.params.id);
      res.json(story);
    } else {
      res.status(404).json({ error: 'Story not found' });
    }
  } catch (error) {
    console.error('Error updating story:', error);
    res.status(500).json({ error: 'Failed to update story' });
  }
});

app.delete('/api/stories/:id', async (req, res) => {
  try {
    const deleted = await Story.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Story not found' });
    }
  } catch (error) {
    console.error('Error deleting story:', error);
    res.status(500).json({ error: 'Failed to delete story' });
  }
});

// Chapters CRUD
app.get('/api/chapters', async (req, res) => {
  try {
    const chapters = await Chapter.findAll({
      order: [['chapter_order', 'ASC']],
      include: [{ model: Scene, order: [['scene_order', 'ASC']] }]
    });
    res.json(chapters);
  } catch (error) {
    console.error('Error fetching chapters:', error);
    res.status(500).json({ error: 'Failed to fetch chapters' });
  }
});

app.post('/api/chapters', async (req, res) => {
  try {
    const chapter = await Chapter.create(req.body);
    res.status(201).json(chapter);
  } catch (error) {
    console.error('Error creating chapter:', error);
    res.status(500).json({ error: 'Failed to create chapter' });
  }
});

app.put('/api/chapters/:id', async (req, res) => {
  try {
    const [updated] = await Chapter.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const chapter = await Chapter.findByPk(req.params.id);
      res.json(chapter);
    } else {
      res.status(404).json({ error: 'Chapter not found' });
    }
  } catch (error) {
    console.error('Error updating chapter:', error);
    res.status(500).json({ error: 'Failed to update chapter' });
  }
});

app.delete('/api/chapters/:id', async (req, res) => {
  try {
    const deleted = await Chapter.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Chapter not found' });
    }
  } catch (error) {
    console.error('Error deleting chapter:', error);
    res.status(500).json({ error: 'Failed to delete chapter' });
  }
});

// Scenes CRUD
app.get('/api/scenes', async (req, res) => {
  try {
    const scenes = await Scene.findAll({
      order: [['scene_order', 'ASC']]
    });
    res.json(scenes);
  } catch (error) {
    console.error('Error fetching scenes:', error);
    res.status(500).json({ error: 'Failed to fetch scenes' });
  }
});

app.get('/api/scenes/:id', async (req, res) => {
  try {
    const scene = await Scene.findByPk(req.params.id);
    if (scene) {
      res.json(scene);
    } else {
      res.status(404).json({ error: 'Scene not found' });
    }
  } catch (error) {
    console.error('Error fetching scene:', error);
    res.status(500).json({ error: 'Failed to fetch scene' });
  }
});

app.post('/api/scenes', async (req, res) => {
  try {
    const scene = await Scene.create(req.body);
    res.status(201).json(scene);
  } catch (error) {
    console.error('Error creating scene:', error);
    res.status(500).json({ error: 'Failed to create scene' });
  }
});

app.put('/api/scenes/:id', async (req, res) => {
  try {
    const [updated] = await Scene.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const scene = await Scene.findByPk(req.params.id);
      res.json(scene);
    } else {
      res.status(404).json({ error: 'Scene not found' });
    }
  } catch (error) {
    console.error('Error updating scene:', error);
    res.status(500).json({ error: 'Failed to update scene' });
  }
});

app.delete('/api/scenes/:id', async (req, res) => {
  try {
    const deleted = await Scene.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Scene not found' });
    }
  } catch (error) {
    console.error('Error deleting scene:', error);
    res.status(500).json({ error: 'Failed to delete scene' });
  }
});

// Master Characters CRUD
app.get('/api/characters', async (req, res) => {
  try {
    const characters = await Character.findAll({
      order: [['name', 'ASC']]
    });
    res.json(characters);
  } catch (error) {
    console.error('Error fetching characters:', error);
    res.status(500).json({ error: 'Failed to fetch characters' });
  }
});

app.post('/api/characters', async (req, res) => {
  try {
    const character = await Character.create(req.body);
    res.status(201).json(character);
  } catch (error) {
    console.error('Error creating character:', error);
    res.status(500).json({ error: 'Failed to create character' });
  }
});

app.put('/api/characters/:id', async (req, res) => {
  try {
    const [updated] = await Character.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const character = await Character.findByPk(req.params.id);
      res.json(character);
    } else {
      res.status(404).json({ error: 'Character not found' });
    }
  } catch (error) {
    console.error('Error updating character:', error);
    res.status(500).json({ error: 'Failed to update character' });
  }
});

app.delete('/api/characters/:id', async (req, res) => {
  try {
    const deleted = await Character.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Character not found' });
    }
  } catch (error) {
    console.error('Error deleting character:', error);
    res.status(500).json({ error: 'Failed to delete character' });
  }
});

// Scene Characters CRUD
app.get('/api/scenes/:sceneId/characters', async (req, res) => {
  try {
    const sceneCharacters = await SceneCharacter.findAll({
      where: { SceneId: req.params.sceneId },
      order: [['name', 'ASC']]
    });
    res.json(sceneCharacters);
  } catch (error) {
    console.error('Error fetching scene characters:', error);
    res.status(500).json({ error: 'Failed to fetch scene characters' });
  }
});

app.post('/api/scenes/:sceneId/characters', async (req, res) => {
  try {
    const sceneCharacter = await SceneCharacter.create({
      ...req.body,
      SceneId: req.params.sceneId
    });
    res.status(201).json(sceneCharacter);
  } catch (error) {
    console.error('Error creating scene character:', error);
    res.status(500).json({ error: 'Failed to create scene character' });
  }
});

app.put('/api/scene-characters/:id', async (req, res) => {
  try {
    const [updated] = await SceneCharacter.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const sceneCharacter = await SceneCharacter.findByPk(req.params.id);
      res.json(sceneCharacter);
    } else {
      res.status(404).json({ error: 'Scene character not found' });
    }
  } catch (error) {
    console.error('Error updating scene character:', error);
    res.status(500).json({ error: 'Failed to update scene character' });
  }
});

app.delete('/api/scene-characters/:id', async (req, res) => {
  try {
    const deleted = await SceneCharacter.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Scene character not found' });
    }
  } catch (error) {
    console.error('Error deleting scene character:', error);
    res.status(500).json({ error: 'Failed to delete scene character' });
  }
});

// Scene Log CRUD
app.get('/api/scenes/:sceneId/log', async (req, res) => {
  try {
    const sceneLog = await SceneLog.findAll({
      where: { SceneId: req.params.sceneId },
      order: [['order_in_scene', 'ASC']]
    });
    res.json(sceneLog);
  } catch (error) {
    console.error('Error fetching scene log:', error);
    res.status(500).json({ error: 'Failed to fetch scene log' });
  }
});

app.post('/api/scenes/:sceneId/log', async (req, res) => {
  try {
    const logEntry = await SceneLog.create({
      ...req.body,
      SceneId: req.params.sceneId,
      timestamp: new Date()
    });
    res.status(201).json(logEntry);
  } catch (error) {
    console.error('Error creating scene log entry:', error);
    res.status(500).json({ error: 'Failed to create scene log entry' });
  }
});

// Settings CRUD
app.get('/api/settings', async (req, res) => {
  try {
    const settings = await Settings.findByPk(1);
    if (settings) {
      res.json(settings);
    } else {
      // Return default settings if none exist
      res.json({
        id: 1,
        ollama_endpoint: 'http://localhost:11434',
        ollama_model: 'llama2'
      });
    }
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

app.put('/api/settings', async (req, res) => {
  try {
    const [settings, created] = await Settings.upsert({
      id: 1,
      ...req.body
    });
    res.json(settings);
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AIWriter Backend is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`AIWriter backend server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});