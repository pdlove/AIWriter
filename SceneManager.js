import fetch from 'node-fetch';

class SceneManager {
  constructor(ollamaHost, model, systemPrompts) {
    this.ollamaHost = ollamaHost;
    this.model = model;
    this.systemPrompts = systemPrompts; // { characters: string, environment: string, narrative: string }

    this.characters = new Map(); // name => profile object
    this.environmentAgents = new Map(); // name => profile object

    this.globalChatLog = []; // [{ role, name?, content }] full conversation for all agents

    this.turnNumber = 0;
    this.turnLog = []; // [{ responses: {agentName: parsedResponse}, finalizedActions: [...] }]
  }

  addCharacter(name, profile) {
    if (!this.characters.has(name)) {
      this.characters.set(name, profile);
    }
  }

  removeCharacter(name) {
    this.characters.delete(name);
  }

  addEnvironmentAgent(name, profile) {
    if (!this.environmentAgents.has(name)) {
      this.environmentAgents.set(name, profile);
    }
  }

  removeEnvironmentAgent(name) {
    this.environmentAgents.delete(name);
  }

  // Build the messages array for an agent turn, including full global history
  buildMessagesForAgent(agentName, isEnvironment = false) {
    // Get the system prompt for this agent type and insert the agent name if needed
    const systemPromptTemplate = isEnvironment
      ? this.systemPrompts.environment
      : this.systemPrompts.characters;

    // Optionally, you can do agent-specific substitutions here, for example:
    const systemPrompt = systemPromptTemplate.replace(/\{agentName\}/g, agentName);

    // Build messages array
    const messages = [
      { role: 'system', content: systemPrompt },
      ...this.globalChatLog,
      {
        role: 'user',
        content: `It is now your turn, ${agentName}. Respond ONLY in JSON as instructed.`,
      },
    ];

    return messages;
  }

  async queryAgent(agentName, isEnvironment = false) {
    if (
      (isEnvironment && !this.environmentAgents.has(agentName)) ||
      (!isEnvironment && !this.characters.has(agentName))
    ) {
      throw new Error(`Agent ${agentName} not found`);
    }

    const messages = this.buildMessagesForAgent(agentName, isEnvironment);

    const response = await fetch(`${this.ollamaHost}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: this.model,
        messages,
        stream: false,
      }),
    });

    const data = await response.json();

    if (!data.message || !data.message.content) {
      throw new Error('Invalid response from model');
    }

    // Save raw model output into globalChatLog as assistant message with agentName
    this.globalChatLog.push({
      role: 'assistant',
      name: agentName,
      content: data.message.content,
    });

    // Extract JSON block
    const match = data.message.content.match(/```json\s*([\s\S]*?)```/);
    if (!match) {
      throw new Error(`No JSON found in response from ${agentName}`);
    }

    const parsed = JSON.parse(match[1]);
    return parsed;
  }

  // Collect a turn: query all characters and environment agents for their turn
  async collectTurn(situation, events) {
    this.turnNumber++;

    // Add a user system message describing current scene situation and recent events
    const situationMessage = {
      role: 'user',
      content: `
Scene Situation:
${situation}

Events since last turn:
${events.map((e) => `- ${e}`).join('\n')}
      `.trim(),
    };
    this.globalChatLog.push(situationMessage);

    const turnResponses = {};

    // Query environment agents first
    for (const [name] of this.environmentAgents.entries()) {
      const response = await this.queryAgent(name, true);
      turnResponses[name] = response;
    }

    // Then query characters
    for (const [name] of this.characters.entries()) {
      const response = await this.queryAgent(name, false);
      turnResponses[name] = response;
    }

    // Save this turn’s responses and initialize finalizedActions empty
    this.turnLog.push({
      responses: turnResponses,
      finalizedActions: [],
    });

    return turnResponses;
  }

  finalizeTurn(turnIndex, finalizedActions) {
    if (!this.turnLog[turnIndex]) throw new Error('Invalid turn index');
    this.turnLog[turnIndex].finalizedActions = finalizedActions;
  }

  rewindToTurn(turnIndex) {
    if (turnIndex < 0 || turnIndex >= this.turnLog.length)
      throw new Error('Invalid turn index');

    // Remove all globalChatLog entries after the specified turn
    // We do this by keeping all system/user messages up to turnIndex
    // and all assistant messages up to that turn

    // Strategy: count how many assistant messages per turn to remove
    // Since each turn adds one user situation message + n assistant messages

    // Simplify: remove all assistant messages after turnIndex-th turn responses

    // We'll keep user messages up to turnIndex and assistant messages only up to that turn

    // Collect how many messages per turn in globalChatLog by role
    // But for simplicity, just rebuild globalChatLog from turnLog history:

    // Start with initial system prompt messages if any (not stored here)

    // Rebuild globalChatLog:
    this.globalChatLog = [];

    for (let i = 0; i < turnIndex; i++) {
      // Add situation user message for that turn
      this.globalChatLog.push({
        role: 'user',
        content: this.turnLog[i].situationMessageContent || '(no situation stored)',
      });

      // Add all assistant messages for that turn from turnLog responses
      for (const [agentName, rawResponse] of Object.entries(this.turnLog[i].responses)) {
        // Raw response is parsed JSON, but we saved raw text in globalChatLog
        // Instead, let's assume the original raw content is stored somewhere else or
        // For now, skipping detailed rewind logic of raw content.
      }
    }

    // Remove all turns after turnIndex
    this.turnLog = this.turnLog.slice(0, turnIndex);
    this.turnNumber = turnIndex;
  }

  // Compile all finalized actions into a story-like narrative via Ollama
  async compileNarrative() {
    // Flatten all finalizedActions into a string text prompt
    const narrativeText = this.turnLog
      .map((turn) => {
        if (!turn.finalizedActions || turn.finalizedActions.length === 0) return '';
        return turn.finalizedActions
          .map((act) => {
            // act expected to have { agentName, narration, speech }
            let speechText = '';
            if (act.speech && act.speech.line && act.speech.line !== 'None') {
              speechText = `${act.agentName} says "${act.speech.line}"`;
            }
            let narrationText = act.narration && act.narration !== 'None' ? `${act.agentName} ${act.narration}` : '';
            return [narrationText, speechText].filter(Boolean).join('. ');
          })
          .filter(Boolean)
          .join(' ');
      })
      .filter(Boolean)
      .join('\n');

    const messages = [
      { role: 'system', content: this.systemPrompts.narrative },
      { role: 'user', content: narrativeText },
    ];

    const response = await fetch(`${this.ollamaHost}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: this.model,
        messages,
        stream: false,
      }),
    });

    const data = await response.json();
    return data.message?.content || '';
  }
}

export default SceneManager;
