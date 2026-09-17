import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

import OpenAI from 'openai';

const openaiApiPlugin = () => ({
  name: 'configure-server',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (req.url === '/api/chat' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', async () => {
          try {
            const data = JSON.parse(body);
            const openai = new OpenAI({ apiKey: process.env.VITE_OPENAI_API_KEY });
            
            const systemPrompt = {
              role: "system",
              content: "You are PrateekAI, the personal AI assistant for Prateek Kumar Pandey. Keep answers under 3-4 sentences. Be professional."
            };
            
            const response = await openai.chat.completions.create({
              model: 'gpt-4o-mini',
              messages: [systemPrompt, ...data.messages],
            });
            
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: response.choices[0].message }));
          } catch (e) {
            console.error(e);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: "API Error" }));
          }
        });
      } else {
        next();
      }
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), openaiApiPlugin()],
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
darkMode: "class",
})
