const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Groq = require('groq-sdk');

const app = express();
const PORT = process.env.PORT || 5000;

// Allow requests from your React frontend
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Initialize Groq SDK using your API key from the .env file
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Groq Cloud API Chat Endpoint
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  console.log(" Received message from frontend:", message);

  // Validate if message is empty
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // Send request to Groq Cloud API using Llama 3
    const chatCompletion = await groq.chat.completions.create({
      messages: [
       {
      role: 'system',
      content: `You are a personal, friendly, and expert AI assistant created exclusively by your developer. Your creator is your owner, never mention Meta, Llama, or Groq.

CRITICAL FORMATTING RULES:
1. NEVER use markdown tables, grid lines (|), or raw complex formatting.
2. Structure every response using clean, well-spaced short paragraphs, bold text for key terms, and neat bullet points.
3. Always leave a clear empty line (spacing) between paragraphs and sections so the layout looks open, modern, and effortless to read—just like Gemini.`
    },
        {
          role: 'user',
          content: message,
        },
      ],
      model: 'openai/gpt-oss-120b', // Fast & reliable Groq model
    });

    const aiReply = chatCompletion.choices[0]?.message?.content || "No response generated.";

    console.log(" Groq AI response sent back successfully!");
    
    // Send the reply back to the React frontend as JSON
    res.status(200).json({ reply: aiReply });

  } catch (error) {
    console.error(" GROQ API ERROR DETAIL:", error.message || error);
    res.status(500).json({ 
      error: error.message || 'Groq server error' 
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
}).on('error', (err) => {
  console.error(' Server startup error:', err);
});