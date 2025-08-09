const { Story, Chapter, Scene, Character, SceneCharacter, SceneLog, Settings } = require('../models');

async function seedDatabase() {
  try {
    // Check if data already exists
    const existingStories = await Story.count();
    const existingCharacters = await Character.count();
    
    if (existingStories > 0 || existingCharacters > 0) {
      console.log('Database already seeded, skipping...');
      return;
    }

    console.log('Seeding database with example data...');

    // Seed Master Characters
    const lexLuthor = await Character.create({
      name: 'Lex Luthor',
      description: 'Brilliant businessman and scientist',
      personality: 'Intelligent, ambitious, methodical, sometimes ruthless. Believes in human potential and self-determination.',
      history: 'Built LexCorp from the ground up. Has a complex relationship with Superman, viewing him as both a threat and an opportunity.',
      goals: 'Advance human technology and potential, protect Earth from alien threats, maintain control over Metropolis.',
      scene_role: 'protagonist',
      knowledge: 'Knows Superman\'s secret identity, has extensive resources and technology, understands the political landscape of Metropolis.'
    });

    const superman = await Character.create({
      name: 'Superman',
      description: 'The Man of Steel, alien superhero',
      personality: 'Honorable, compassionate, strong-willed, sometimes naive about human nature.',
      history: 'Last son of Krypton, raised by the Kents in Smallville. Protects Earth as Superman.',
      goals: 'Protect Earth and its people, maintain peace, help those in need.',
      scene_role: 'antagonist',
      knowledge: 'Has superhuman abilities, knows Lex Luthor\'s schemes, but doesn\'t know Lex knows his secret identity.'
    });

    const loisLane = await Character.create({
      name: 'Lois Lane',
      description: 'Investigative journalist at the Daily Planet',
      personality: 'Determined, brave, curious, professional. Willing to risk everything for a story.',
      history: 'Award-winning reporter who often gets into dangerous situations while investigating stories.',
      goals: 'Uncover the truth, write compelling stories, maintain journalistic integrity.',
      scene_role: 'background',
      knowledge: 'Works with Clark Kent, has suspicions about Superman\'s identity, knows Lex Luthor is powerful but doesn\'t know the full extent of his schemes.'
    });

    // Seed Stories
    const story1 = await Story.create({
      name: 'Story 1',
      description: 'A tale of adventure.',
      story_order: 1
    });

    const story2 = await Story.create({
      name: 'Story 2',
      description: 'A mystery unfolds.',
      story_order: 2
    });

    // Seed Chapters for Story 1
    const chapter11 = await Chapter.create({
      StoryId: story1.id,
      name: 'Chapter 1',
      description: 'The beginning.',
      chapter_order: 1
    });

    const chapter12 = await Chapter.create({
      StoryId: story1.id,
      name: 'Chapter 2',
      description: 'The journey continues.',
      chapter_order: 2
    });

    // Seed Chapter for Story 2
    const chapter21 = await Chapter.create({
      StoryId: story2.id,
      name: 'Chapter 1',
      description: 'A strange event.',
      chapter_order: 1
    });

    // Seed Scenes for Chapter 1.1
    const scene111 = await Scene.create({
      ChapterId: chapter11.id,
      name: 'Scene 1',
      description: 'Opening scene.',
      scene_order: 1,
      status: 'planned',
      starting_prompt: 'Lex Luthor stands in his office overlooking Metropolis, contemplating the day ahead.',
      narrative: `# Opening Scene

The story begins with Lex Luthor in his office, contemplating the challenges ahead...

The morning sun cast long shadows across the marble floor of Lex Luthor's corner office. From his position behind the massive oak desk, he could see the entire expanse of Metropolis spread out below him like a chess board waiting for the next move.

*This is where our story truly begins,* he thought to himself, *where human ingenuity meets alien interference.*`
    });

    const scene112 = await Scene.create({
      ChapterId: chapter11.id,
      name: 'Scene 2',
      description: 'Conflict arises.',
      scene_order: 2,
      status: 'planned',
      starting_prompt: 'News breaks of an incident downtown that requires Superman\'s attention.',
      narrative: `# Conflict Arises

Tension builds as opposing forces come into play...

The emergency alert blazed across every screen in the city. A construction crane had malfunctioned downtown, threatening to collapse onto a crowded street. Within minutes, the familiar red and blue blur streaked across the sky.

Lex watched from his window, his jaw tightening. *Always the savior,* he mused. *But who saves us from the savior?*`
    });

    // Seed Scenes for Chapter 1.2
    const scene121 = await Scene.create({
      ChapterId: chapter12.id,
      name: 'Scene 1',
      description: 'A twist.',
      scene_order: 1,
      status: 'planned',
      starting_prompt: 'Lois Lane discovers something unexpected about the recent incidents.',
      narrative: `# The Twist

Unexpected developments change everything...

Lois Lane's fingers flew across the keyboard as she cross-referenced the data from the past week's incidents. The pattern was subtle, almost invisible, but it was there. Someone was orchestrating these "accidents" - creating situations that would require Superman's intervention.

The question was: why?`
    });

    const scene122 = await Scene.create({
      ChapterId: chapter12.id,
      name: 'Scene 2',
      description: 'A revelation.',
      scene_order: 2,
      status: 'planned',
      starting_prompt: 'The truth about the recent events comes to light.',
      narrative: `# The Revelation

Truths are finally revealed...

In the depths of LexCorp's research facility, monitors displayed real-time analysis of Superman's responses to each crisis. Reaction times, flight patterns, energy signatures - all meticulously catalogued.

"Sir," his assistant approached cautiously, "the analysis is complete. We now have a comprehensive baseline of his capabilities."

Lex smiled. Knowledge was power, and power was the only currency that mattered in this game.`
    });

    // Seed Scene for Chapter 2.1
    const scene211 = await Scene.create({
      ChapterId: chapter21.id,
      name: 'Scene 1',
      description: 'The clue.',
      scene_order: 1,
      status: 'planned',
      starting_prompt: 'A mysterious discovery sets the investigation in motion.',
      narrative: `# The Clue

A mysterious discovery sets the investigation in motion...

The package arrived at the Daily Planet with no return address, containing only a single photograph and a cryptic note: "Not everything is as it seems. The real threat comes from within."

Lois studied the image - it appeared to be taken from inside LexCorp's executive floor. But how? And more importantly, by whom?`
    });

    // Seed some Scene Characters (examples of characters in scenes)
    await SceneCharacter.create({
      SceneId: scene111.id,
      name: 'Lex Luthor',
      description: 'Brilliant businessman and scientist',
      personality: 'Intelligent, ambitious, methodical, sometimes ruthless. Believes in human potential and self-determination.',
      history: 'Built LexCorp from the ground up. Has a complex relationship with Superman, viewing him as both a threat and an opportunity.',
      goals: 'Advance human technology and potential, protect Earth from alien threats, maintain control over Metropolis.',
      scene_role: 'protagonist',
      knowledge: 'Knows Superman\'s secret identity, has extensive resources and technology, understands the political landscape of Metropolis.',
      masterCharacterId: lexLuthor.id
    });

    await SceneCharacter.create({
      SceneId: scene111.id,
      name: 'Superman',
      description: 'The Man of Steel, alien superhero',
      personality: 'Honorable, compassionate, strong-willed, sometimes naive about human nature.',
      history: 'Last son of Krypton, raised by the Kents in Smallville. Protects Earth as Superman.',
      goals: 'Protect Earth and its people, maintain peace, help those in need.',
      scene_role: 'antagonist',
      knowledge: 'Has superhuman abilities, knows Lex Luthor\'s schemes, but doesn\'t know Lex knows his secret identity.',
      masterCharacterId: superman.id
    });

    await SceneCharacter.create({
      SceneId: scene112.id,
      name: 'Lois Lane',
      description: 'Investigative journalist at the Daily Planet',
      personality: 'Determined, brave, curious, professional. Willing to risk everything for a story.',
      history: 'Award-winning reporter who often gets into dangerous situations while investigating stories.',
      goals: 'Uncover the truth, write compelling stories, maintain journalistic integrity.',
      scene_role: 'background',
      knowledge: 'Works with Clark Kent, has suspicions about Superman\'s identity, knows Lex Luthor is powerful but doesn\'t know the full extent of his schemes.',
      masterCharacterId: loisLane.id
    });

    // Seed some sample Scene Log entries
    await SceneLog.create({
      SceneId: scene111.id,
      character_id: lexLuthor.id,
      character_name: 'Lex Luthor',
      action_type: 'thought',
      content: 'Another day, another opportunity to advance human potential. But first, I need to address the Superman problem.',
      timestamp: new Date(),
      order_in_scene: 1
    });

    await SceneLog.create({
      SceneId: scene111.id,
      character_id: lexLuthor.id,
      character_name: 'Lex Luthor',
      action_type: 'action',
      content: 'Lex walked to the window and looked out over Metropolis, his hands clasped behind his back.',
      timestamp: new Date(),
      order_in_scene: 2
    });

    await SceneLog.create({
      SceneId: scene111.id,
      character_id: lexLuthor.id,
      character_name: 'Lex Luthor',
      action_type: 'speech',
      content: '"Mercy, bring me the latest reports on the alien\'s activities. It\'s time we took a more... proactive approach."',
      timestamp: new Date(),
      order_in_scene: 3
    });

    // Initialize default settings
    await Settings.create({
      id: 1,
      ollama_endpoint: 'http://localhost:11434',
      ollama_model: 'llama2'
    });

    console.log('Database seeded successfully!');
    console.log('✓ Created 3 master characters');
    console.log('✓ Created 2 stories with 3 chapters');
    console.log('✓ Created 5 scenes with narratives');
    console.log('✓ Created sample scene characters and log entries');
    console.log('✓ Initialized default settings');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

module.exports = seedDatabase;