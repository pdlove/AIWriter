import SceneManager from './SceneManager.js';

async function runExample() {
  const ollamaHost = 'http://172.16.0.124:11434'; // Change to your ollama server
  const model = 'llama3.1:latest'; // Change to your model

  const systemPrompts = {
    characters: `
You are {agentName}, a character in a turn-based collaborative story simulation.
You have personality, history, goals, knowledge, and a role.
Respond ONLY in JSON with keys:
{
  "thoughts": "Your private thoughts about the current scene.",
  "narration": "A brief narrative description of what you do or observe, or 'None'.",
  "speech": {
    "line": "What you say, or 'None'",
    "target": "Who you are speaking to, or 'None'"
  }
}
Do not include anything outside the JSON block.
`,
    environment: `
You are the Ship, an intelligent environment in a collaborative story simulation.
You respond to events and character actions realistically.
Respond ONLY in JSON with keys:
{
  "status_update": "Brief update on ship systems or 'None'.",
  "system_action": "Automatic system reactions or 'None'.",
  "alert": {
    "level": "Green, Yellow, Red, or None",
    "message": "Alert message for crew or 'None'."
  }
}
Do not include anything outside the JSON block.
`,
    narrative: `
You are a skilled storyteller. Given a sequence of character and environment actions, generate a coherent, engaging story narrative.
Use third-person past tense prose.
Do not add dialogue or out-of-story commentary.
`,
  };

  const sceneManager = new SceneManager(ollamaHost, model, systemPrompts);

  // Add environment agent "Ship"
  sceneManager.addEnvironmentAgent('Ship', { description: 'The spaceship environment' });

  // Add characters Ada and Captain
  sceneManager.addCharacter('Ada', { name: 'Ada', personality: 'quiet, analytical', history: '', goals: '', knowledge: '', role: 'engineer', });
  sceneManager.addCharacter('Captain', { name: 'Captain', personality: 'authoritative, decisive', history: '', goals: '', knowledge: '', role: 'leader', });

  let situation = 'The ship is traveling through an asteroid field.';
  let events = [];

  for (let turn = 1; turn <= 10; turn++) {
    console.log(`\n=== TURN ${turn} ===`);

    // Add Alien at turn 5
    if (turn === 5) {
      sceneManager.addCharacter('Alien', { name: 'Alien', personality: 'mysterious, cryptic', history: '', goals: '', knowledge: '', role: 'unknown', });
      events.push('An unknown alien presence is detected aboard the ship.');
      console.log('>>> Alien has boarded the scene.');
    }

    const turnResponses = await sceneManager.collectTurn(situation, events);

    for (const [agent, res] of Object.entries(turnResponses)) {
      console.log(`-- ${agent} response --`);
      console.log(JSON.stringify(res, null, 2));
    }

    // Finalize the turn by accepting all raw responses
    const finalized = Object.entries(turnResponses).map(([agentName, res]) => {
      if ('narration' in res) {
        return {
          agentName,
          narration: res.narration || 'None',
          speech: res.speech || { line: 'None', target: 'None' },
        };
      }
      // Environment style response
      if ('status_update' in res) {
        return {
          agentName,
          narration: res.status_update || 'None',
          speech: { line: 'None', target: 'None' },
        };
      }
      return { agentName, narration: 'None', speech: { line: 'None', target: 'None' } };
    });

    sceneManager.finalizeTurn(sceneManager.turnNumber - 1, finalized);

    // Add a generic event for next turn
    events.push(`Turn ${turn} completed.`);
  }

  console.log('\n=== Compiling Narrative ===');
  const story = await sceneManager.compileNarrative();
  console.log('=== Story Output ===\n', story);
}

// Run the example
runExample().catch(console.error);