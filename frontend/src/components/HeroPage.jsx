import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useNavigate } from "react-router-dom";

export default function HeroPage() {
  const [messages, setMessages] = useState([]); // Store chat history
  const [input, setInput] = useState(''); // The typed text in input box
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // When AI is replying, show thinking text

  const gotoSignup = () => {
    navigate("/signup");
  };
  // Function to handle sending the message
  const handleSend = async () => {
    if (!input.trim()) return; // If input is empty, do nothing

    const userMessageText = input;
    const newMessages = [...messages, { role: 'user', content: userMessageText }];

    setMessages(newMessages);
    setInput(''); // Clear input box
    setLoading(true); // Start loading state

    try {
      // Send POST request to backend API with JSON data
      const response = await axios.post('http://localhost:5000/api/chat', {
        message: userMessageText,
      });

      const aiReply = response.data.reply;

      // Append assistant's reply to the message history
      setMessages([
        ...newMessages,
        { role: 'assistant', content: aiReply },
      ]);
    } catch (error) {
      console.error('Error details:', error);

      // Handle connection errors gracefully in UI
      setMessages([
        ...newMessages,
        { role: 'assistant', content: ' Connection failed. Please try again.' },
      ]);
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  // Handle Enter key press inside input box (Note: 'Enter' must start with a capital E)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#050813] text-gray-100 justify-between p-4 md:p-6">
      
      {/* Top Welcome Heading */}
      <div className="max-w-4xl w-full mx-auto text-center mt-6">
        <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Hello, how about your day?
        </h1>
      </div>

      {/* Chat Messages Display Section */}
      <div className="max-w-4xl w-full mx-auto flex-1 overflow-y-auto space-y-4 my-6 px-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
           <div
  className={`p-4 rounded-2xl max-w-2xl text-sm md:text-base overflow-x-auto ${
    msg.role === 'user'
      ? 'bg-blue-600 text-white rounded-br-sm shadow-md'
      : 'bg-[#0f172a] border border-slate-800 text-gray-200'
  }`}
   >

     {msg.role === 'user' ? (
      <p>{msg.content}</p>
     ) : (
       <div className="prose prose-invert max-w-none">
         <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {msg.content}
         </ReactMarkdown>
      </div>
     )}
    </div> 
          </div>
        ))}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#0f172a] border border-slate-800 p-3 rounded-2xl text-blue-400 italic text-sm animate-pulse">
              AI is thinking....
            </div>
          </div>
        )}
      </div>

      {/* Combined Input Field and Send Button Section */}
      <div className="max-w-4xl w-full mx-auto pb-4">
        <div className="flex items-center w-full bg-[#0d1527] border border-blue-500/30 rounded-2xl px-4 py-3 shadow-2xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
          
          <input
            type="text"
            placeholder="Type your own idea........"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-gray-100 placeholder-gray-500 border-none focus:outline-none text-base"
          />

          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all shrink-0 ml-2 ${
              input.trim()
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md cursor-pointer'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            Send
          </button>

        </div>
      </div>

      <div>
        
        <button className="fixed top-10 right-10 bg-amber-50 text-black font-bold px-4 py-2 rounded-lg shadow hover:bg-blue-950 hover:text-amber-50 "
        onClick={gotoSignup}
        >
          login
          
        </button>
      </div>

    </div>
  );
}