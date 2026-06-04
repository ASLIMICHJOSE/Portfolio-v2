import React from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { educationHistory, certifications } from '../data/portfolio';
import PageTransition from '../components/PageTransition';

const timelineNodes = [
  { year: '2023', label: 'START' },
  { year: '2024', label: null },
  { year: '2025', label: 'INTERN' },
  { year: '2026', label: null },
  { year: '2027', label: 'GRADUATE' },
];

export default function Education() {
  return (
    <PageTransition>
      <section id="education" className="pt-24 pb-20 px-4 md:px-8 lg:px-12 w-full flex-grow bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section title with extending line */}
        <ScrollReveal direction="up">
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-xl sm:text-3xl font-mono font-bold text-cyber-green whitespace-nowrap tracking-wide">
              &lt; EDUCATION /&gt;
            </h2>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-cyber-green/60 to-transparent" />
          </div>
        </ScrollReveal>

        {/* System log entry cards */}
        <div className="space-y-6 mb-10">
          {educationHistory.map((edu, idx) => (
            <ScrollReveal key={edu.id || idx} direction="up" delay={idx * 0.1}>
              <div
                className="rounded-lg p-6 sm:p-8 border border-cyber-border"
                style={{
                  backgroundColor: '#0f0f1a',
                  borderLeftWidth: '3px',
                  borderLeftColor: '#00FF41',
                }}
              >
                <div className="font-mono text-xs text-slate-500 mb-3 tracking-wider flex justify-between items-center">
                  <span>// SYSTEM_LOG :: EDUCATION_RECORD_0{edu.id || idx + 1}</span>
                  <span className="text-[10px] text-cyber-teal font-mono">[ ACTIVE_RECORD ]</span>
                </div>
                <div className="font-mono text-sm sm:text-base text-slate-200 leading-relaxed">
                  <span className="text-cyber-green">[ {edu.period.replace('–', '→').replace('-', '→')} ]</span>
                  <span className="mx-2 text-slate-600">—</span>
                  <span className="text-white font-bold">{edu.degree}</span>
                  <span className="text-slate-500 mx-2">@</span>
                  <span className="text-cyber-teal">{edu.institution}</span>
                </div>
                <p className="mt-3 text-slate-400 font-sans text-xs sm:text-sm leading-relaxed border-t border-cyber-border/20 pt-3">
                  {edu.details}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: '#00FF41' }}
                  />
                  <span className="font-mono text-[10px] text-[#00FF41] tracking-widest uppercase">
                    {edu.status}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Certifications list */}
        <ScrollReveal direction="up" delay={0.2}>
          <div
            className="rounded-lg p-6 sm:p-8 border border-cyber-border mb-12"
            style={{ backgroundColor: '#0f0f1a' }}
          >
            <div className="font-mono text-xs text-slate-500 mb-5 tracking-wider">
              // VERIFIED_CERTIFICATIONS
            </div>
            <div className="space-y-3">
              {certifications.map((cert, idx) => (
                <div key={cert.id || idx} className="flex flex-wrap items-center gap-2.5 font-mono text-sm">
                  <span className="text-cyber-green text-base select-none">✓</span>
                  <span className="text-slate-300">{cert.title}</span>
                  <span className="text-slate-500 text-xs">— {cert.issuer}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Horizontal timeline */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="relative overflow-x-auto pb-4">
            <div className="flex items-start justify-between min-w-[500px] relative px-4">
              {/* Dashed connecting line */}
              <div
                className="absolute top-[10px] left-8 right-8 h-[1px]"
                style={{
                  backgroundImage: 'repeating-linear-gradient(to right, #00FF41 0px, #00FF41 6px, transparent 6px, transparent 14px)',
                  opacity: 0.5,
                }}
              />

              {/* Timeline nodes */}
              {timelineNodes.map((node, idx) => (
                <div key={idx} className="flex flex-col items-center relative z-10" style={{ flex: 1 }}>
                  {/* Green dot */}
                  <div
                    className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                    style={{
                      borderColor: '#00FF41',
                      backgroundColor: node.label ? '#00FF41' : '#0d0d18',
                      boxShadow: node.label ? '0 0 12px rgba(0,255,65,0.4)' : 'none',
                    }}
                  >
                    {node.label && (
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#0d0d18' }} />
                    )}
                  </div>

                  {/* Year label */}
                  <span className="font-mono text-sm text-white mt-3 font-bold">{node.year}</span>

                  {/* Event label */}
                  {node.label && (
                    <span
                      className="font-mono text-[10px] tracking-wider mt-1 px-2 py-0.5 rounded"
                      style={{
                        color: '#00FF41',
                        backgroundColor: 'rgba(0,255,65,0.08)',
                        border: '1px solid rgba(0,255,65,0.2)',
                      }}
                    >
                      {node.label}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  </PageTransition>
  );
}
