import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaTerminal, FaPaperPlane } from 'react-icons/fa';

const BOT_DATABASE = {
  about: "Asli Mich Jose J is an aspiring Computer Science student at Stella Mary's College of Engineering and an active Front-End Developer Intern at Iniram Square. He builds robust, modern web interfaces and trains computer vision models.",
  skills: "Asli's technology stack includes:\n- Frontend: HTML5, CSS3, JavaScript, React, Tailwind CSS, Vite\n- AI / Computer Vision: Python, OpenCV, YOLOv8, TensorFlow\n- Mobile: React Native, Flutter/Dart\n- Tools: Git, GitHub Pages, VS Code",
  serofast: "SeroFast is Asli's clinical predictive diagnostic project. It utilizes machine learning (TensorFlow / Scikit-Learn) and a FastAPI backend to predict whether syphilis patients will reach a 'serofast state' after treatment based on RPR titers.",
  contact: "You can transmit messages directly to Asli via:\n- Email: aslimich22@gmail.com\n- Phone: +91 8903252575\n- Location: KK District, Tamil Nadu\n- GitHub: https://github.com/aslimichjose",
  help: "AVAILABLE COMMANDS:\n> help.sh - Displays list of system commands\n> about.py - General information\n> skills.java - Programming capabilities\n> serofast.c - Biomedical diagnostic tool info\n> contact.sh - Developer location & email",
};

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "SYSTEM INITIALIZED. I am Asli_Core_AI (v1.0). Click a module or query the shell.",
      isTerminal: true
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const simulateBotReply = (key) => {
    setIsTyping(true);
    setTimeout(() => {
      const response = BOT_DATABASE[key] || "COMMAND NOT RECOGNIZED. Type 'help.sh' to view valid options.";
      setMessages((prev) => [...prev, { sender: 'bot', text: response }]);
      setIsTyping(false);
    }, 850);
  };

  const handleSend = (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { sender: 'user', text }]);
    if (!textToSend) setInput('');

    // Determine intent from text
    const cleanText = text.toLowerCase();
    let matchedKey = '';

    if (cleanText.includes('about') || cleanText.includes('who') || cleanText.includes('asli')) {
      matchedKey = 'about';
    } else if (cleanText.includes('skill') || cleanText.includes('lang') || cleanText.includes('stack')) {
      matchedKey = 'skills';
    } else if (cleanText.includes('serofast') || cleanText.includes('sero') || cleanText.includes('syphilis')) {
      matchedKey = 'serofast';
    } else if (cleanText.includes('contact') || cleanText.includes('email') || cleanText.includes('phone') || cleanText.includes('reach')) {
      matchedKey = 'contact';
    } else if (cleanText.includes('help') || cleanText.includes('command') || cleanText.includes('menu')) {
      matchedKey = 'help';
    }

    simulateBotReply(matchedKey);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-6 z-[60] w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 shadow-[0_0_15px_rgba(0,255,65,0.2)] hover:shadow-[0_0_25px_rgba(0,255,65,0.4)]"
        style={{
          backgroundColor: '#0f0f1a',
          border: '1px solid #00FF41',
          color: '#00FF41',
        }}
        aria-label="Open AI chat assistant"
      >
        {isOpen ? <FaTimes size={18} /> : <FaRobot size={18} className="animate-pulse" />}
      </button>

      {/* Side Console Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-36 right-6 w-[340px] sm:w-[380px] h-[460px] z-50 border border-cyber-border rounded-lg flex flex-col overflow-hidden shadow-[0_0_35px_rgba(0,255,65,0.15)] bg-black/95"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#0f0f1a] border-b border-cyber-border">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00FF41] animate-ping" />
                <span className="font-mono text-xs text-cyber-green font-semibold tracking-wider">
                  /bin/asli-core_v1.0
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-500 hover:text-cyber-green transition-colors"
              >
                <FaTimes size={14} />
              </button>
            </div>

            {/* Terminal Body */}
            <div className="flex-grow p-4 overflow-y-auto font-mono text-xs space-y-4 scrollbar-thin">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  {msg.sender === 'user' ? (
                    <>
                      <span className="text-[10px] text-slate-500 mb-0.5">$ user.query</span>
                      <div className="bg-cyber-green/10 border border-cyber-green/30 text-cyber-green px-3 py-2 rounded max-w-[85%] whitespace-pre-line">
                        {msg.text}
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="text-[10px] text-cyber-teal mb-0.5">$ system.stdout</span>
                      <div className="bg-[#0f0f1a] border border-[#1a1a2e] text-slate-300 px-3 py-2 rounded max-w-[85%] whitespace-pre-line">
                        {msg.text}
                      </div>
                    </>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex flex-col items-start">
                  <span className="text-[10px] text-cyber-teal mb-0.5">$ system.stdout</span>
                  <div className="bg-[#0f0f1a] border border-[#1a1a2e] text-cyber-green px-3 py-2 rounded flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Modules Prompt buttons */}
            <div className="px-4 py-2 bg-[#0f0f1a]/50 border-t border-cyber-border/40 flex flex-wrap gap-1.5">
              <button
                onClick={() => handleSend("about.py")}
                className="px-2 py-1 rounded border border-cyber-border text-[9px] font-mono text-slate-400 hover:text-cyber-green hover:border-cyber-green transition-all"
              >
                about.py
              </button>
              <button
                onClick={() => handleSend("skills.java")}
                className="px-2 py-1 rounded border border-cyber-border text-[9px] font-mono text-slate-400 hover:text-cyber-green hover:border-cyber-green transition-all"
              >
                skills.java
              </button>
              <button
                onClick={() => handleSend("serofast.c")}
                className="px-2 py-1 rounded border border-cyber-border text-[9px] font-mono text-slate-400 hover:text-cyber-green hover:border-cyber-green transition-all"
              >
                serofast.c
              </button>
              <button
                onClick={() => handleSend("contact.sh")}
                className="px-2 py-1 rounded border border-cyber-border text-[9px] font-mono text-slate-400 hover:text-cyber-green hover:border-cyber-green transition-all"
              >
                contact.sh
              </button>
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 border-t border-cyber-border bg-[#0f0f1a] flex gap-2"
            >
              <input
                type="text"
                placeholder="type query... (e.g., help)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow pl-3 pr-2 py-2 bg-[#0a0a0f] border border-cyber-border text-white text-xs font-mono rounded focus:outline-none focus:border-cyber-green transition-all"
              />
              <button
                type="submit"
                className="w-9 h-9 flex items-center justify-center rounded bg-cyber-green text-black hover:bg-cyber-green/90 transition-all shadow-[0_0_10px_rgba(0,255,65,0.2)]"
              >
                <FaPaperPlane size={11} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
