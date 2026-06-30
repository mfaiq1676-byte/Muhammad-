import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialization helper for Gemini
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// 1. Generate trendy AI short-video captions & hashtags
app.post('/api/ai/captions', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Return beautiful, realistic mock suggestions if key is not configured
      const fallbackCaptions = [
        `✨ Simulated Loop: Bending dimensions with custom particles under the mood of "${prompt}". #motionart #creative #zen`,
        `🌌 Dreamy synth echoes inspired by "${prompt}". Let the colors carry you away. #ambientmusic #synthwave #vibes`,
        `🛸 Cyberpunk matrix grids echoing "${prompt}". The neon never fades. #cyberpunk #tokyonights #futuristic`
      ];
      return res.json({ captions: fallbackCaptions, isMock: true });
    }

    const modelResponse = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: `Generate exactly 3 extremely catchy, trending short-video social captions and high-engagement hashtags based on the prompt: "${prompt}". Return each caption on a new line with its hashtags. Keep them concise (maximum 15 words per caption). No numbering, no introductory text, no Markdown styling.`,
    });

    const text = modelResponse.text || '';
    const captions = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    res.json({ captions: captions.slice(0, 3), isMock: false });
  } catch (error: any) {
    console.error('Gemini error:', error);
    res.status(500).json({ error: 'Failed to generate AI captions', details: error.message });
  }
});

// 2. Recommend categories or hashtags
app.post('/api/ai/recommend', async (req, res) => {
  try {
    const { category } = req.body;
    const ai = getGeminiClient();
    if (!ai) {
      const mockRecommends = [
        `🔥 Hot Trend: #ambientbeats is booming in the ${category || 'creative'} category!`,
        `💡 Creator Suggestion: Try making a loop with '#generativeflow' to double engagement!`,
        `📈 Audience Insight: Viewers are watching 'audio-visual syth loops' for 42% longer today.`
      ];
      return res.json({ recommendations: mockRecommends, isMock: true });
    }

    const promptText = `Provide exactly 3 helpful, actionable creator insights or trending hashtag suggestions for the category "${category || 'General'}" on a short video social platform. Keep each suggestion to 1 short sentence. No numbering or bullet points, just plain text separated by new lines.`;

    const modelResponse = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: promptText,
    });

    const text = modelResponse.text || '';
    const recommendations = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    res.json({ recommendations: recommendations.slice(0, 3), isMock: false });
  } catch (error: any) {
    console.error('Gemini recommend error:', error);
    res.status(500).json({ error: 'Failed to generate recommendations', details: error.message });
  }
});

// 3. Content moderation check (AI Admin & Creator safety)
app.post('/api/ai/moderate', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Simulate simple safety filter
      const isHarmful = text.toLowerCase().includes('spam') || text.toLowerCase().includes('hate');
      return res.json({
        approved: !isHarmful,
        reason: isHarmful ? 'Flagged by simulation: Contains potentially restricted words' : 'Approved: Healthy vibe check!',
        isMock: true
      });
    }

    const promptText = `Analyze the following social media post text and determine if it complies with friendly community guidelines. It should be free of hate speech, toxic harassment, excessive violence, or scams.
    Text: "${text}"
    
    Respond strictly with a JSON object in this format:
    {"approved": true/false, "reason": "brief 1-sentence explanation of compliance or violation"}`;

    const modelResponse = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: promptText,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const rawJson = (modelResponse.text || '').trim();
    const moderationResult = JSON.parse(rawJson);
    res.json({ ...moderationResult, isMock: false });
  } catch (error: any) {
    console.error('Gemini moderate error:', error);
    res.status(500).json({ error: 'Failed to complete safety moderation check', details: error.message });
  }
});

// Configure Vite middleware and static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
