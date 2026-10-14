const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Ollama Local Chat Endpoint
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  console.log(" Received message from frontend:", message);

  try {
    const response = await axios.post('http://127.0.0.1:11434/api/generate', {
      model: 'llama3:latest',
      prompt: message,
      stream: false
    });

    console.log(" Ollama response sent back successfully!");
    res.status(200).json({
      reply: response.data.response
    });
  } catch (error) {
    console.error(" OLLAMA ERROR DETAIL:", error.response?.data || error.message);
    res.status(500).json({ error: error.message || 'Ollama local server error' });
  }
});

const PORT = 5001; 

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
}).on('error', (err) => {
  console.error(' Server startup error:', err);
});