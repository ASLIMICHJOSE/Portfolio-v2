import React from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { skills } from '../data/portfolio';
import { FaCode, FaBrain, FaTools, FaCubes } from 'react-icons/fa';
import PageTransition from '../components/PageTransition';
import TiltCard from '../components/TiltCard';

const categories = [
  { key: 'frontend', label: 'Frontend', icon: FaCode },
  { key: 'ai', label: 'AI & CV', icon: FaBrain },
  { key: 'tools', label: 'Tools', icon: FaTools },
  { key: 'other', label: 'Other', icon: FaCubes },
];

const learningItems = 'Advanced React · State Management · Backend Integration · TensorFlow';

export default function Skills() {
  return (
    <PageTransition>
      <section id="skills" className="pt-24 pb-20 px-4 md:px-8 lg:px-12 w-full flex-grow flex flex-col justify-center bg-transparent">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section title */}
        <ScrollReveal direction="up">
          <div className="flex items-center gap-4 mb-14">
            <h2 className="text-xl sm:text-3xl font-mono font-bold text-cyber-green whitespace-nowrap tracking-wide">
              &lt; SKILLS /&gt;
            </h2>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-cyber-green/60 to-transparent" />
          </div>
        </ScrollReveal>

        {/* 2x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {categories.map((cat, idx) => {
            const items = skills[cat.key] || [];
            const Icon = cat.icon;
            return (
              <ScrollReveal key={cat.key} direction="up" delay={idx * 0.12} className="h-full">
                <TiltCard
                  className="rounded-lg p-6 h-full border border-cyber-border overflow-hidden flex flex-col justify-between"
                  style={{
                    backgroundColor: '#0f0f1a',
                    borderLeftWidth: '2px',
                    borderLeftColor: '#00FF41',
                  }}
                >
                  <div>
                    {/* Card header */}
                    <div className="flex items-center gap-3 mb-5">
                      <Icon className="text-cyber-green text-lg" />
                      <h3 className="font-mono font-bold text-sm text-cyber-green tracking-wider">
                        {cat.label}
                      </h3>
                    </div>

                    {/* Skill pills */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {items.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="font-mono text-xs px-3 py-1.5 rounded cursor-default transition-all duration-200"
                          style={{
                            backgroundColor: '#0a0a0f',
                            border: '1px solid rgba(0,255,65,0.2)',
                            color: '#00FF41',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#00FF41';
                            e.currentTarget.style.backgroundColor = 'rgba(0,255,65,0.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(0,255,65,0.2)';
                            e.currentTarget.style.backgroundColor = '#0a0a0f';
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Currently learning ticker */}
        <ScrollReveal direction="up" delay={0.5}>
          <div
            className="rounded-lg border border-cyber-border overflow-hidden"
            style={{ backgroundColor: '#0f0f1a' }}
          >
            <div className="py-3 px-4 relative overflow-hidden">
              <div className="skills-ticker font-mono text-sm text-cyber-green whitespace-nowrap">
                <span>{`> currently_leveling_up: [ ${learningItems} ]`}</span>
                <span className="ml-20">{`> currently_leveling_up: [ ${learningItems} ]`}</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        .skills-ticker {
          display: inline-flex;
          animation: tickerScroll 20s linear infinite;
        }
        @keyframes tickerScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  </PageTransition>
  );
}
