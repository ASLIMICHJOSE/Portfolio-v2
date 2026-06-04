import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { projects } from '../data/portfolio';
import ScrollReveal from '../components/ScrollReveal';
import PageTransition from '../components/PageTransition';
import TiltCard from '../components/TiltCard';

const filters = ['All', 'Front-End', 'AI / CV'];

function matchesFilter(project, filter) {
  if (filter === 'All') return true;
  if (filter === 'Front-End') return project.type.toLowerCase().includes('front');
  if (filter === 'AI / CV')
    return (
      project.type.toLowerCase().includes('ai') ||
      project.type.toLowerCase().includes('vision') ||
      project.type.toLowerCase().includes('cv')
    );
  return true;
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = projects.filter((p) => matchesFilter(p, activeFilter));

  // Intersection observer for staggered card animation
  const [gridRef, gridInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <PageTransition>
      <section id="projects" className="pt-24 pb-20 px-4 md:px-8 lg:px-12 w-full flex-grow flex flex-col justify-center bg-transparent">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section title */}
        <ScrollReveal direction="up">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-xl sm:text-3xl font-mono font-bold text-cyber-green whitespace-nowrap tracking-wide">
              &lt; PROJECTS /&gt;
            </h2>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-cyber-green/60 to-transparent" />
          </div>
        </ScrollReveal>

        {/* Filter buttons */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="flex flex-wrap gap-3 mb-10">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="px-5 py-2 rounded font-mono text-xs tracking-wider border transition-all duration-200"
                style={{
                  backgroundColor: activeFilter === f ? '#00FF41' : 'transparent',
                  color: activeFilter === f ? '#0a0a0f' : '#00FF41',
                  borderColor: activeFilter === f ? '#00FF41' : 'rgba(0,255,65,0.3)',
                  fontWeight: activeFilter === f ? 700 : 400,
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Project cards grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.5,
                ease: 'easeOut',
                delay: index * 0.1,
              }}
              className="h-full"
            >
              <TiltCard
                className="group rounded-lg flex flex-col h-full border border-cyber-border overflow-hidden"
                style={{
                  backgroundColor: '#0f0f1a',
                  borderTopWidth: project.highlight ? '2px' : '1px',
                  borderTopColor: project.highlight ? '#00FF41' : '#1a1a2e',
                }}
              >
              <div className="p-6 flex flex-col flex-grow relative">
                {/* Status badge — top right */}
                <span
                  className="absolute top-5 right-5 font-mono text-[10px] px-2.5 py-1 rounded tracking-wider"
                  style={{
                    backgroundColor: project.status.toLowerCase().includes('comp')
                      ? 'rgba(0,255,65,0.1)'
                      : 'rgba(245,158,11,0.1)',
                    border: `1px solid ${
                      project.status.toLowerCase().includes('comp')
                        ? 'rgba(0,255,65,0.3)'
                        : 'rgba(245,158,11,0.3)'
                    }`,
                    color: project.status.toLowerCase().includes('comp')
                      ? '#00FF41'
                      : '#f59e0b',
                  }}
                >
                  {project.status}
                </span>

                {/* Type label */}
                <span className="font-mono text-[10px] text-cyber-green uppercase tracking-widest mb-2">
                  {project.type}
                </span>

                {/* Title */}
                <h3
                  className="font-semibold text-white mb-3 pr-28 leading-snug"
                  style={{ fontSize: '18px' }}
                >
                  {project.title}
                </h3>

                {/* Description — 3 lines max */}
                <p
                  className="text-slate-400 leading-relaxed mb-5 flex-grow font-sans"
                  style={{
                    fontSize: '14px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {project.description}
                </p>

                {/* Stack pills */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.stack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-xs px-3 py-1 rounded"
                      style={{
                        backgroundColor: '#0a0a0f',
                        border: '1px solid rgba(0,255,65,0.3)',
                        color: '#00FF41',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-16 font-mono text-sm text-slate-500">
            No projects match this filter.
          </div>
        )}
      </div>
    </section>
  </PageTransition>
  );
}
