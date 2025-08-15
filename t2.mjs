import { Ollama } from 'ollama'

const ollama = new Ollama({ host: 'http://172.16.0.124:11434' })

  async function generateText(prompt, maxTokens = 500) {
    let fullResponse = "";

    try {
      // Call the Ollama client generate method with streaming enabled
      const stream = await ollama.generate(        
        {
          model: "qwen3:8b",
          prompt,
          options: {
            num_predict: maxTokens,
            temperature: 0.8,
            top_p: 0.9,
            repeat_penalty: 1.1,
          },
          think: false,
          stream: true 
        }
      );

      // stream is an async iterable of data chunks
      for await (const chunk of stream) {
        if (chunk.response) {
          process.stdout.write(chunk.response); // Optional: show live output on console
          fullResponse += chunk.response;
        }
      }

      console.log(`\nFull response: ${fullResponse}`);
      return fullResponse.trim();
    } catch (error) {
      console.error(`Error generating text: ${error.message}`);
      return `Error connecting to Ollama: ${error.message}`;
    }
  }

generateText("Why is the sky blue?");
