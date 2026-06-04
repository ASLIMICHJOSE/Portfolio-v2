import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { personalInfo } from '../data/portfolio';
import PageTransition from '../components/PageTransition';

export default function Hero() {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [taglineIdx, setTaglineIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  const taglines = personalInfo.taglines;

  // Blinking cursor for top-left ▊
  useEffect(() => {
    const blink = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 800);
    return () => clearInterval(blink);
  }, []);

  // Typing effect
  useEffect(() => {
    let timer;
    const current = taglines[taglineIdx];

    if (!isDeleting) {
      if (text !== current) {
        timer = setTimeout(() => {
          setText(current.slice(0, text.length + 1));
        }, 50);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      if (text !== '') {
        timer = setTimeout(() => {
          setText(current.slice(0, text.length - 1));
        }, 25);
      } else {
        setIsDeleting(false);
        setTaglineIdx((prev) => (prev + 1) % taglines.length);
      }
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, taglineIdx, taglines]);

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <PageTransition>
      <section
        id="home"
        className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-transparent"
      >
      {/* Ambient glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-cyber-green/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-cyber-teal/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Top-left blinking green cursor */}
      <div className="absolute top-6 left-6 z-10 font-mono text-2xl text-cyber-green select-none">
        <span style={{ opacity: cursorVisible ? 1 : 0, transition: 'opacity 0.1s' }}>
          ▊
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center px-6">

        {/* Name — large, white, font-mono, wide tracking */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-mono font-bold tracking-[0.2em] text-white mb-4 leading-tight"
        >
          {personalInfo.name.toUpperCase()}
        </motion.h1>

        {/* Typing tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl font-mono text-slate-400 mb-10 min-h-[32px]"
        >
          <span className="text-cyber-green">{text}</span>
          <span className="text-cyber-green animate-pulse ml-0.5">|</span>
        </motion.p>

        {/* Two buttons side by side */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10"
        >
          {/* View Projects — solid green bg, black text */}
          <button
            onClick={() => navigateTo('/projects')}
            className="px-7 py-3 rounded-md font-mono font-bold text-sm tracking-wider text-black transition-all duration-200 hover:scale-105 shadow-[0_0_20px_rgba(0,255,65,0.2)] hover:shadow-[0_0_30px_rgba(0,255,65,0.4)]"
            style={{ backgroundColor: '#00FF41' }}
          >
            View Projects
          </button>

          {/* Contact Me — transparent, green border, green text */}
          <button
            onClick={() => navigateTo('/contact')}
            className="px-7 py-3 rounded-md font-mono font-bold text-sm tracking-wider border transition-all duration-200 hover:bg-cyber-green/10"
            style={{ borderColor: '#00FF41', color: '#00FF41' }}
          >
            Contact Me
          </button>
        </motion.div>

        {/* Three stat pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          {['React Dev', 'AI Builder', 'CS Student'].map((label) => (
            <div
              key={label}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full border font-mono text-xs tracking-wider"
              style={{
                backgroundColor: '#0f0f1a',
                borderColor: '#00FF41',
                color: '#00FF41',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-green" />
              {label}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator at bottom center */}
      <motion.button
        onClick={() => navigateTo('/about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 hover:text-cyber-green transition-colors cursor-pointer font-mono text-[10px] tracking-widest z-10"
        aria-label="Scroll down"
      >
        <span>SCROLL</span>
        <FaChevronDown className="animate-bounce text-xs" />
      </motion.button>
    </section>
  </PageTransition>
  );
}
