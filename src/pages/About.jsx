import React from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { personalInfo, experience } from '../data/portfolio';
import PageTransition from '../components/PageTransition';

export default function About() {
  return (
    <PageTransition>
      <section id="about" className="pt-24 pb-20 px-4 md:px-8 lg:px-12 w-full flex-grow flex flex-col justify-center bg-transparent">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section title with extending line */}
        <ScrollReveal direction="up">
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-xl sm:text-3xl font-mono font-bold text-cyber-green whitespace-nowrap tracking-wide">
              &lt; ABOUT ME /&gt;
            </h2>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-cyber-green/60 to-transparent" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Left column — 60% (3/5) */}
          <div className="lg:col-span-3">
            <ScrollReveal direction="left" delay={0.1}>
              {/* Terminal-style card */}
              <div
                className="rounded-lg p-6 sm:p-8 font-mono text-sm border border-cyber-border"
                style={{
                  backgroundColor: '#0f0f1a',
                  borderLeftWidth: '3px',
                  borderLeftColor: '#00FF41',
                }}
              >
                {/* Terminal header bar */}
                <div className="flex items-center gap-2 mb-5 pb-3 border-b border-cyber-border">
                  <span className="w-3 h-3 rounded-full bg-red-500/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <span className="w-3 h-3 rounded-full bg-green-500/70" />
                  <span className="ml-3 text-[10px] text-slate-500 tracking-wider">terminal — about</span>
                </div>

                {/* $ cat about.txt */}
                <p className="text-cyber-green mb-1">
                  <span className="text-slate-500">$</span> cat about.txt
                </p>
                <p className="text-slate-300 leading-relaxed mb-6 font-sans text-sm">
                  I'm <span className="text-white font-semibold">{personalInfo.name}</span>, an aspiring{' '}
                  <span className="text-cyber-green">{personalInfo.role}</span> passionate about building
                  pixel-perfect user interfaces and exploring the frontiers of{' '}
                  <span className="text-cyber-green">Artificial Intelligence</span> and{' '}
                  <span className="text-cyber-green">Computer Vision</span>. Currently interning at{' '}
                  <span className="text-white font-semibold">{experience.company}</span>, where I design
                  modern web interfaces using React and Tailwind CSS.
                </p>

                {/* Experience block */}
                <div className="border-t border-cyber-border pt-5 mt-2">
                  <p className="text-cyber-green mb-3">
                    <span className="text-slate-500">$</span> cat experience.log
                  </p>

                  <div className="mb-4">
                    <h3 className="text-white font-bold text-base">{experience.company}</h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                      <span className="text-cyber-teal text-xs">{experience.role}</span>
                      <span className="text-slate-600 text-[10px]">|</span>
                      <span className="text-slate-500 text-xs">{experience.period}</span>
                    </div>
                  </div>

                  {/* Bullet points */}
                  <ul className="space-y-2.5">
                    {experience.points.map((point, idx) => (
                      <li key={idx} className="flex gap-3 items-start text-xs text-slate-400 font-sans">
                        <span className="text-cyber-green font-mono select-none mt-0.5 shrink-0">&gt;</span>
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right column — 40% (2/5) */}
          <div className="lg:col-span-2 flex flex-col items-center justify-start gap-8">
            <ScrollReveal direction="right" delay={0.2}>
              <div className="flex flex-col items-center gap-8">
                {/* Glowing avatar placeholder */}
                <div className="relative">
                  {/* Pulse ring */}
                  <div
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{
                      border: '2px solid #00FF41',
                      opacity: 0.15,
                      animationDuration: '2.5s',
                    }}
                  />
                  {/* Outer glow ring */}
                  <div
                    className="w-40 h-40 sm:w-48 sm:h-48 rounded-full flex items-center justify-center"
                    style={{
                      border: '3px solid #00FF41',
                      boxShadow: '0 0 30px rgba(0,255,65,0.15), 0 0 60px rgba(0,255,65,0.05), inset 0 0 30px rgba(0,255,65,0.05)',
                      backgroundColor: '#0f0f1a',
                    }}
                  >
                    <span
                      className="font-mono font-bold text-4xl sm:text-5xl tracking-widest select-none"
                      style={{ color: '#00FF41' }}
                    >
                      ASLI
                    </span>
                  </div>
                </div>

                {/* Status badge */}
                <div
                  className="px-4 py-2 rounded font-mono text-[11px] tracking-wider border text-center"
                  style={{
                    borderColor: '#00FF41',
                    color: '#00FF41',
                    backgroundColor: 'rgba(0,255,65,0.05)',
                    animation: 'statusBlink 2s ease-in-out infinite',
                  }}
                >
                  [ AVAILABLE FOR OPPORTUNITIES ]
                </div>

                {/* Core Focus & Values Module */}
                <div className="w-full mt-4 rounded-lg p-5 font-mono text-xs border border-cyber-border/40 text-left" style={{ backgroundColor: '#0f0f1a' }}>
                  <div className="text-cyber-green mb-3 tracking-wider">// CORE_FOCUS_AREAS</div>
                  <div className="space-y-3 font-sans text-xs text-slate-400">
                    <div>
                      <span className="text-cyber-green font-mono font-bold mr-2">&gt; UI/UX Development:</span>
                      Creating pixel-perfect, highly responsive React templates with clean and structured CSS layouts.
                    </div>
                    <div>
                      <span className="text-cyber-green font-mono font-bold mr-2">&gt; Computer Vision:</span>
                      Integrating object detection (YOLOv8) models with web interfaces to measure real-time distance.
                    </div>
                    <div>
                      <span className="text-cyber-green font-mono font-bold mr-2">&gt; Performance Focus:</span>
                      Striving for minimal bundle footprint, optimized rendering lifecycles, and standard accessibility rules.
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Keyframe for the slow blinking badge */}
      <style>{`
        @keyframes statusBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
      </section>
    </PageTransition>
  );
}
