// Import all models
import Series from './storyText/Series.js'
import Story from './storyText/Story.js'
import Chapter from './storyText/Chapter.js'
import Scene from './storyText/Scene.js'

import Character from './storyMeta/Character.js'


import Settings from './Settings.js'

export const modelList = { Series, Story, Chapter, Scene, Character,  Settings };
export const modelSeedOrder = [ 'Settings', 'Series', 'Character', 'Story', 'Chapter', 'Scene' ];

