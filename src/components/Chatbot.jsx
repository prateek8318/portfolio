import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm PrateekAI. Ask me anything about Prateek's experience, skills, or projects!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Smart Fixed Responses based on keywords
      const userText = input.toLowerCase();
      let reply = "";

      if (userText.includes("skill") || userText.includes("tech") || userText.includes("stack")) {
        reply = "I specialize in React, Node.js, PHP, Laravel, SQL, and Tailwind CSS. I love building scalable applications with premium UI/UX!";
      } else if (userText.includes("project") || userText.includes("work") || userText.includes("portfolio")) {
        reply = "I've built 15+ premium projects, including OLCURE (a Healthcare App) and Shaadi Overseas. You can check them out in my 'Featured Work' section!";
      } else if (userText.includes("experience") || userText.includes("background")) {
        reply = "I have 2.5+ years of experience as a Full Stack Developer, delivering enterprise-level solutions and high-performance web apps.";
      } else if (userText.includes("contact") || userText.includes("hire") || userText.includes("email")) {
        reply = "You can easily reach out to me via the Contact section at the bottom of the page, or email me directly at prateek@portfolio.com. Let's build something awesome!";
      } else if (userText.includes("hi") || userText.includes("hello") || userText.includes("hey")) {
        reply = "Hello there! I'm Prateek's AI assistant. Ask me about his skills, projects, or experience!";
      } else {
        reply = "That's an interesting question! Since I'm currently running on a fixed response system, I can't answer everything. But you can definitely ask me about Prateek's skills, projects, or how to contact him!";
      }

      // Simulate network delay for realistic feel
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
        setIsLoading(false);
      }, 1000);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Oops! I'm having trouble connecting right now." 
      }]);
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(249,115,22,0.4)] z-[100] hover:scale-110 transition-transform"
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
        whileHover={{ rotate: 15 }}
      >
        <FaRobot size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-[350px] sm:w-[400px] h-[500px] bg-gray-900 border border-white/10 rounded-2xl shadow-2xl z-[100] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <FaRobot size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">PrateekAI</h3>
                  <p className="text-xs text-white/80">Personal Assistant</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-2 rounded-full transition-colors">
                <FaTimes />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 bg-gray-950/50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-orange-500 text-white rounded-tr-none' 
                      : 'bg-gray-800 text-gray-200 border border-white/5 rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 text-gray-200 border border-white/5 rounded-2xl rounded-tl-none p-4 flex gap-1">
                    <motion.div className="w-2 h-2 bg-gray-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                    <motion.div className="w-2 h-2 bg-gray-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                    <motion.div className="w-2 h-2 bg-gray-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-3 bg-gray-900 border-t border-white/5 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-gray-800 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-orange-500 border border-white/5"
                disabled={isLoading}
              />
              <button 
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-orange-500 text-white w-12 rounded-xl flex items-center justify-center hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaPaperPlane size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
