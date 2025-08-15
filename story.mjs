  
import { Ollama } from 'ollama'
import fs from "fs";
import path from "path";

class OllamaStoryGenerator {
  constructor(model = "qwen3:8b", host = "http://172.16.0.124:11434") {
    this.model = model;
    this.host = host;
    this.conversationHistory = [];
    this.characters = {};
    this.storyContext = "";
    // Create the Ollama client instance
    this.client = new Ollama({ host: this.host });
  }

  generateStoryPrompt(genre, characters, plotPoints) {
    return `
You are a professional ${genre} writer. Create an engaging story with these elements:

Characters: ${characters}
Key Plot Points: ${plotPoints}

Maintain consistent character voices and advance the plot naturally.
Write in vivid, immersive prose that shows rather than tells.
`.trim();
  }

  async generateText(prompt, maxTokens = 500) {
    let fullResponse = "";

    try {
      // Call the Ollama client generate method with streaming enabled
      const stream = await this.client.generate(        
        {
          model: this.model,
          prompt,
          options: {
            num_predict: maxTokens,
            temperature: 0.8,
            top_p: 0.9,
            repeat_penalty: 1.1,
          },
          stream: true,
          think: false,
        }
      );

      // stream is an async iterable of data chunks
      for await (const chunk of stream) {
        if (chunk.response) {
          process.stdout.write(chunk.response); // Optional: show live output on console
          fullResponse += chunk.response;
        }
      }

      return fullResponse.trim();
    } catch (error) {
      console.error(`Error generating text: ${error.message}`);
      return `Error connecting to Ollama: ${error.message}`;
    }
  }

  async continueStory(continuationPrompt) {
    const contextPrompt = `
Previous story context: ${this.storyContext}

Continue the story: ${continuationPrompt}

Maintain character consistency and narrative flow.
`.trim();

    const newContent = await this.generateText(contextPrompt);
    this.storyContext += "\n" + newContent;
    return newContent;
  }

  createCharacterProfile(name, traits, background) {
    this.characters[name] = {
      traits,
      background,
      dialogueStyle: "",
      storyArc: "",
    };
  }

  saveStory(title, content) {
    const timestamp = new Date()
      .toISOString()
      .replace(/[:\-T]/g, "")
      .slice(0, 15);
    const dir = path.resolve("stories");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    const filename = path.join(dir, `${title}_${timestamp}.md`);
    const header = `# ${title}

Generated: ${new Date().toLocaleString()}

`;
    fs.writeFileSync(filename, header + content, { encoding: "utf-8" });
    return filename;
  }
}

export { OllamaStoryGenerator };


// Example usage for different story genres

async function createMysteryStory() {
  const generator = new OllamaStoryGenerator();

  const characters =
    "Detective Sarah Chen (analytical, observant), Marcus Webb (suspicious landlord)";
  const plotPoints = "Missing tenant, locked apartment, mysterious phone calls";

  const prompt = generator.generateStoryPrompt("mystery", characters, plotPoints);
  const storyOpening = await generator.generateText(prompt, 800);

  const investigationPrompt = "Sarah discovers a hidden safe behind a painting";
  const storyContinuation = await generator.continueStory(investigationPrompt);

  const fullStory = storyOpening + "\n\n" + storyContinuation;
  const filename = generator.saveStory("The_Locked_Room_Mystery", fullStory);

  console.log(`Mystery story saved to: ${filename}`);
  return fullStory;
}

async function createSciFiStory() {
  const model = "codellama:13b"; // Change to your model
  const generator = new OllamaStoryGenerator(model);

  const characters = "Jonathan Kender (amnesia has skills but no memory), AI Assistant (omniscient, cryptic, broken)";
  const plotPoints = "Jonathan comes out of a clone pod, AI tries to help him remember, but he has no memory of who he is or what happened before or where he is, is on spaceship in deep space";

  const prompt = generator.generateStoryPrompt("science fiction", characters, plotPoints);
  const storyContent = await generator.generateText(prompt, 1000);

  const filename = generator.saveStory(model.replace(":","_"), storyContent);
  console.log(`Science fiction story saved to: ${filename}`);

  return storyContent;
}

// Export the class and functions if used in a module environment
createSciFiStory();