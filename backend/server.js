const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');
const Groq = require('groq-sdk');

const app = express();
app.use(cors());
app.use(express.json());

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Google Token Verify කරන Endpoint එක
app.post('/api/auth/google', async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    
    // මෙහිදී payload.email, payload.name ආදිය database එකට save කරගැනීම හෝ JWT නිකුත් කිරීම කළ හැක
    res.status(200).json({ success: true, user: payload });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid Google Token' });
  }
});

// Groq හරහා Llama 3 Chat Endpoint එක
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: message }],
      model: 'llama3-8b-8192', // වඩාත් බුද්ධිමත් පිළිතුරු සඳහා 'llama3-70b-8192' යෙදිය හැක
    });
    res.status(200).json({ 
      reply: chatCompletion.choices[0].message.content 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch AI response' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});