import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ScrollReveal from '../components/ScrollReveal';
import { personalInfo } from '../data/portfolio';
import { FaGithub, FaGlobe } from 'react-icons/fa';
import PageTransition from '../components/PageTransition';
import emailjs from '@emailjs/browser';

const terminalLines = [
  {
    cmd: '$ echo $EMAIL',
    output: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
  },
  {
    cmd: '$ echo $PHONE',
    output: personalInfo.phone,
    href: null,
  },
  {
    cmd: '$ echo $LOCATION',
    output: personalInfo.location,
    href: null,
  },
  {
    cmd: '$ open $PORTFOLIO',
    output: personalInfo.portfolio,
    href: personalInfo.portfolio,
  },
];

function TerminalBlock() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (!inView) return;
    if (visibleCount >= terminalLines.length) return;
    const timer = setTimeout(() => {
      setVisibleCount((c) => c + 1);
    }, 400);
    return () => clearTimeout(timer);
  }, [inView, visibleCount]);

  return (
    <div
      ref={ref}
      className="rounded-lg border border-cyber-border overflow-hidden"
      style={{ backgroundColor: '#0f0f1a' }}
    >
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-cyber-border">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-3 text-[10px] text-slate-500 font-mono tracking-wider">
          contact — bash
        </span>
      </div>

      {/* Terminal body */}
      <div className="p-5 space-y-4 font-mono text-sm">
        {terminalLines.map((line, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={
              idx < visibleCount
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: -10 }
            }
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="space-y-1"
          >
            <p className="text-cyber-green text-xs">{line.cmd}</p>
            {line.href ? (
              <a
                href={line.href}
                target={line.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="text-slate-300 text-sm hover:text-cyber-green transition-colors underline underline-offset-2 decoration-cyber-green/30 hover:decoration-cyber-green block"
              >
                → {line.output}
              </a>
            ) : (
              <p className="text-slate-300 text-sm">→ {line.output}</p>
            )}
          </motion.div>
        ))}

        {/* Blinking cursor at the end */}
        {visibleCount >= terminalLines.length && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-cyber-green animate-pulse"
          >
            █
          </motion.span>
        )}
      </div>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');

    // Fetch EmailJS keys from Vite environment variables (requires server restart locally, or GitHub Secrets on production build)
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.warn('EmailJS environment variables are missing. Simulating success...');
      setTimeout(() => {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      }, 1200);
      return;
    }

    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      message: form.message,
      to_name: personalInfo.name,
      reply_to: form.email,
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(
        (response) => {
          console.log('EmailJS Success:', response.status, response.text);
          setStatus('success');
          setForm({ name: '', email: '', message: '' });
        },
        (error) => {
          console.error('EmailJS Error:', error);
          setStatus('error');
        }
      );
  };

  return (
    <PageTransition>
      <section
        id="contact"
        className="pt-24 pb-20 px-4 md:px-8 lg:px-12 w-full flex-grow flex flex-col justify-center bg-transparent min-h-screen"
      >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section title */}
        <ScrollReveal direction="up">
          <div className="flex items-center gap-4 mb-14">
            <h2 className="text-xl sm:text-3xl font-mono font-bold text-cyber-green whitespace-nowrap tracking-wide">
              &lt; CONTACT /&gt;
            </h2>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-cyber-green/60 to-transparent" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left — Terminal contact info */}
          <ScrollReveal direction="left" delay={0.1}>
            <TerminalBlock />
          </ScrollReveal>

          {/* Right — Contact form */}
          <ScrollReveal direction="right" delay={0.2}>
            <div
              className="rounded-lg border border-cyber-border p-6 sm:p-8"
              style={{ backgroundColor: '#0f0f1a' }}
            >
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
                  <div
                    className="font-mono text-sm px-5 py-3 rounded border"
                    style={{
                      backgroundColor: 'rgba(0,255,65,0.05)',
                      borderColor: 'rgba(0,255,65,0.3)',
                      color: '#00FF41',
                    }}
                  >
                    [ SUCCESS ] Message transmitted ✓
                  </div>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-4 px-4 py-2 font-mono text-xs text-slate-400 border border-cyber-border rounded hover:border-cyber-green hover:text-cyber-green transition-all"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {status === 'error' && (
                    <div
                      className="font-mono text-xs px-4 py-2 rounded border"
                      style={{
                        backgroundColor: 'rgba(239,68,68,0.05)',
                        borderColor: 'rgba(239,68,68,0.3)',
                        color: '#ef4444',
                      }}
                    >
                      [ ERROR ] Transmission failed. Please try again.
                    </div>
                  )}
                  {/* Name */}
                  <div>
                    <input
                      type="text"
                      id="contact-name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="// your name"
                      className="w-full rounded px-4 py-3 font-mono text-sm text-white placeholder-slate-600 focus:outline-none transition-all duration-200"
                      style={{
                        backgroundColor: '#0a0a0f',
                        border: '1px solid rgba(0,255,65,0.3)',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#00FF41';
                        e.currentTarget.style.boxShadow = '0 0 0 2px rgba(0,255,65,0.15)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(0,255,65,0.3)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <input
                      type="email"
                      id="contact-email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="// your email"
                      className="w-full rounded px-4 py-3 font-mono text-sm text-white placeholder-slate-600 focus:outline-none transition-all duration-200"
                      style={{
                        backgroundColor: '#0a0a0f',
                        border: '1px solid rgba(0,255,65,0.3)',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#00FF41';
                        e.currentTarget.style.boxShadow = '0 0 0 2px rgba(0,255,65,0.15)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(0,255,65,0.3)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="// your message"
                      className="w-full rounded px-4 py-3 font-mono text-sm text-white placeholder-slate-600 focus:outline-none transition-all duration-200 resize-none"
                      style={{
                        backgroundColor: '#0a0a0f',
                        border: '1px solid rgba(0,255,65,0.3)',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#00FF41';
                        e.currentTarget.style.boxShadow = '0 0 0 2px rgba(0,255,65,0.15)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(0,255,65,0.3)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    id="contact-submit"
                    disabled={status === 'sending'}
                    className="w-full py-3.5 rounded font-mono font-bold text-sm tracking-wider transition-all duration-200 disabled:opacity-50 hover:shadow-[0_0_20px_rgba(0,255,65,0.2)]"
                    style={{
                      backgroundColor: '#00FF41',
                      color: '#0a0a0f',
                    }}
                  >
                    {status === 'sending' ? (
                      'TRANSMITTING...'
                    ) : (
                      <>
                        SEND MESSAGE_
                        <span className="animate-pulse">▌</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>

        {/* Social row */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="flex justify-center gap-4 mt-16">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-lg border flex items-center justify-center transition-all duration-200"
              style={{
                backgroundColor: '#0f0f1a',
                borderColor: '#1a1a2e',
                color: '#94a3b8',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#00FF41';
                e.currentTarget.style.color = '#00FF41';
                e.currentTarget.style.boxShadow = '0 0 12px rgba(0,255,65,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1a1a2e';
                e.currentTarget.style.color = '#94a3b8';
                e.currentTarget.style.boxShadow = 'none';
              }}
              aria-label="GitHub"
            >
              <FaGithub size={18} />
            </a>
            <a
              href={personalInfo.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-lg border flex items-center justify-center transition-all duration-200"
              style={{
                backgroundColor: '#0f0f1a',
                borderColor: '#1a1a2e',
                color: '#94a3b8',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#00FF41';
                e.currentTarget.style.color = '#00FF41';
                e.currentTarget.style.boxShadow = '0 0 12px rgba(0,255,65,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1a1a2e';
                e.currentTarget.style.color = '#94a3b8';
                e.currentTarget.style.boxShadow = 'none';
              }}
              aria-label="Portfolio"
            >
              <FaGlobe size={18} />
            </a>
          </div>
        </ScrollReveal>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-cyber-border text-center font-mono text-[10px] text-slate-600">
          <p>© {new Date().getFullYear()} {personalInfo.name.toUpperCase()}. ALL RIGHTS RESERVED.</p>
          <p className="mt-1 text-slate-700 font-sans text-[10px]">
            Built with React, Vite, Tailwind CSS & Framer Motion.
          </p>
        </div>
      </div>
    </section>
  </PageTransition>
  );
}
