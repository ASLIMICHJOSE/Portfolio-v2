import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import { FaArrowUp } from 'react-icons/fa';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import CursorGlow from './components/CursorGlow';
import ChatbotWidget from './components/ChatbotWidget';
import ActiveBackground from './components/ActiveBackground';

import Hero from './pages/Hero';
import About from './pages/About';
import Education from './pages/Education';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Certificates from './pages/Certificates';
import Contact from './pages/Contact';

function BootScreen({ onComplete }) {
  const [lines, setLines] = useState([]);
  const bootLines = [
    '> INITIALIZING SYSTEM...',
    '> LOADING MODULES... OK',
    '> CONNECTING NEURAL INTERFACE...',
    '> PORTFOLIO_v3.0 READY',
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < bootLines.length) {
        setLines((prev) => [...prev, bootLines[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 400);
      }
    }, 280);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      key="boot"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: '#0a0a0f' }}
    >
      <div className="font-mono text-sm text-[#00FF41] space-y-2 px-6">
        {lines.map((line, idx) => (
          <motion.p
            key={idx}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            {line}
          </motion.p>
        ))}
        <span className="animate-pulse text-[#00FF41]">█</span>
      </div>
    </motion.div>
  );
}

// Scroll to top helper on page change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/education" element={<Education />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}

function MainApp() {
  const [showTop, setShowTop] = useState(false);

  // Back to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen text-slate-300 bg-[#0a0a0f] selection:bg-[#00FF4133] selection:text-[#00FF41] flex flex-col">
      {/* CRT scanline overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[60]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
          opacity: 0.03,
        }}
      />

      <ScrollToTop />
      
      {/* Global Interactive Canvas Background */}
      <ActiveBackground />

      <Navbar />
      <CursorGlow />
      <ChatbotWidget />

      {/* Main page content with router views */}
      <main className="relative z-10 w-full flex-grow flex flex-col pt-16">
        <AnimatedRoutes />
      </main>

      {/* Back to top button */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 w-10 h-10 flex items-center justify-center rounded cursor-pointer transition-colors duration-200"
            style={{
              backgroundColor: '#0f0f1a',
              border: '1px solid #00FF41',
              color: '#00FF41',
              boxShadow: '0 0 12px rgba(0,255,65,0.1)',
            }}
            aria-label="Back to top"
          >
            <FaArrowUp size={14} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  const [booting, setBooting] = useState(true);

  // Lenis smooth scroll
  useEffect(() => {
    const LenisClass = Lenis.default || Lenis;
    if (typeof LenisClass !== 'function') {
      console.warn('Lenis constructor not resolved correctly.');
      return;
    }

    try {
      const lenis = new LenisClass({
        lerp: 0.08,
        duration: 1.4,
        smoothWheel: true,
        touchMultiplier: 2,
      });

      let frameId;
      function raf(time) {
        lenis.raf(time);
        frameId = requestAnimationFrame(raf);
      }
      frameId = requestAnimationFrame(raf);

      return () => {
        cancelAnimationFrame(frameId);
        lenis.destroy();
      };
    } catch (e) {
      console.error('Failed to initialize Lenis scroll:', e);
    }
  }, []);

  return (
    <>
      {/* Boot screen */}
      <AnimatePresence>
        {booting && <BootScreen onComplete={() => setBooting(false)} />}
      </AnimatePresence>

      <Router>
        <MainApp />
      </Router>
    </>
  );
}

export default App;
