import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { personalInfo } from '../data/constants';

const QUICK_QUESTIONS = ["What are your skills?", "Show me projects", "Experience?", "How to hire you?"];

const getReply = (raw) => {
  const text = raw.toLowerCase();
  if (/(skill|tech|stack|language)/.test(text))
    return "Prateek works with PHP, Laravel, Node.js, .NET, React, React Native, MySQL, PostgreSQL, MongoDB, Redis, Docker and AWS — backend-heavy, with polished React UIs on top.";
  if (/(project|work|portfolio|built)/.test(text))
    return "Highlights: Mann Fleet (ride booking with live tracking), Practly (exam-prep platform on microservices), DVAGOO (driver KYC & ride assignment) and OLCURE (healthcare). Check the 'Featured Work' section for full case studies!";
  if (/(experience|background|year)/.test(text))
    return "Prateek has 2.5+ years of experience as a Full Stack Developer, building backends, admin panels and websites for production products.";
  if (/(contact|hire|email|reach|phone|freelance|job)/.test(text))
    return `He's open to freelance and full-time roles! Email ${personalInfo.email} or use the contact form at the bottom of the page.`;
  if (/(where|location|city|based)/.test(text))
    return `He's based in ${personalInfo.location}, and happy to work remotely.`;
  if (/(resume|cv)/.test(text))
    return "You can download his resume from the 'Resume' button in the top navigation bar.";
  if (/\b(hi|hello|hey|namaste)\b/.test(text))
    return "Hello! 👋 I'm Prateek's assistant. Ask me about his skills, projects, experience, or how to get in touch.";
  return "I can answer questions about Prateek's skills, projects, experience, location, or how to contact him. Try one of the suggestions below!";
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm PrateekAI 🤖 Ask me anything about Prateek's skills, projects or experience." },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', onKey);
    // Don't pop the keyboard open automatically on phones
    if (window.matchMedia('(pointer: fine)').matches) setTimeout(() => inputRef.current?.focus(), 200);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const ask = (question) => {
    const q = question.trim();
    if (!q || isTyping) return;
    setMessages((prev) => [...prev, { role: 'user', content: q }]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'assistant', content: getReply(q) }]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        className="keep-white fixed bottom-5 right-5 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-pink-500 text-white shadow-[0_10px_30px_-5px_rgba(249,115,22,0.6)] sm:bottom-6 sm:right-6"
        onClick={() => setIsOpen((o) => !o)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label={isOpen ? 'Close chat' : 'Open chat assistant'}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isOpen ? 'close' : 'open'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {isOpen ? <FaTimes size={20} /> : <FaRobot size={22} />}
          </motion.span>
        </AnimatePresence>
        {!isOpen && <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-orange-500/40" />}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 bottom-24 z-[70] flex h-[min(520px,calc(100svh-8rem))] origin-bottom-right flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0c0c12] shadow-2xl sm:inset-x-auto sm:right-6 sm:w-[380px]"
            role="dialog"
            aria-label="Chat assistant"
          >
            <div className="keep-white flex items-center gap-3 bg-gradient-to-r from-orange-500 to-pink-500 px-4 py-3.5 text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                <FaRobot size={17} />
              </span>
              <div className="flex-1">
                <h3 className="text-sm font-bold">PrateekAI</h3>
                <p className="flex items-center gap-1.5 text-xs text-white/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> Online
                </p>
              </div>
              <button onClick={() => setIsOpen(false)} className="rounded-full p-2 transition-colors hover:bg-white/20" aria-label="Close chat">
                <FaTimes />
              </button>
            </div>

            <div className="custom-scrollbar flex flex-1 flex-col gap-3 overflow-y-auto p-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'keep-white rounded-br-md bg-gradient-to-br from-orange-500 to-pink-500 text-white'
                        : 'rounded-bl-md border border-white/5 bg-white/5 text-gray-200'
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-2xl rounded-bl-md border border-white/5 bg-white/5 px-4 py-3">
                    {[0, 0.15, 0.3].map((d) => (
                      <motion.span key={d} className="h-1.5 w-1.5 rounded-full bg-gray-400" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: d }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="flex gap-2 overflow-x-auto border-t border-white/5 px-3 pt-3">
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => ask(q)}
                  className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-300 transition-colors hover:border-orange-400/40 hover:text-orange-400"
                >
                  {q}
                </button>
              ))}
            </div>

            <form onSubmit={(e) => { e.preventDefault(); ask(input); }} className="flex gap-2 p-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder-gray-500 focus:border-orange-400/50 focus:outline-none sm:text-sm"
                aria-label="Message"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="keep-white flex w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 text-white transition-opacity disabled:opacity-40"
                aria-label="Send"
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
