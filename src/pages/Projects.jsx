import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { projects } from '../data/portfolio';
import ScrollReveal from '../components/ScrollReveal';
import PageTransition from '../components/PageTransition';
import TiltCard from '../components/TiltCard';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

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
                {/* Project Image */}
                {project.image && (
                  <div className="relative w-full h-48 sm:h-52 overflow-hidden border-b border-cyber-border/20">
                    <img
                      src={`${import.meta.env.BASE_URL}${project.image.startsWith('/') ? project.image.slice(1) : project.image}`}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Neon gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] via-transparent to-transparent opacity-80" />
                    {/* Matrix-like tech scanning line effect */}
                    <div className="absolute inset-0 bg-cyber-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    {/* Status Badge overlay on image */}
                    <span
                      className="absolute top-4 right-4 font-mono text-[9px] px-2.5 py-0.5 rounded tracking-wider backdrop-blur-sm"
                      style={{
                        backgroundColor: project.status.toLowerCase().includes('comp')
                          ? 'rgba(0,255,65,0.15)'
                          : 'rgba(245,158,11,0.15)',
                        border: `1px solid ${
                          project.status.toLowerCase().includes('comp')
                            ? 'rgba(0,255,65,0.4)'
                            : 'rgba(245,158,11,0.4)'
                        }`,
                        color: project.status.toLowerCase().includes('comp')
                          ? '#00FF41'
                          : '#f59e0b',
                      }}
                    >
                      {project.status}
                    </span>
                  </div>
                )}

                <div className="p-5 flex flex-col flex-grow relative">
                  {/* Status badge when there is no image */}
                  {!project.image && (
                    <span
                      className="absolute top-5 right-5 font-mono text-[9px] px-2.5 py-0.5 rounded tracking-wider"
                      style={{
                        backgroundColor: project.status.toLowerCase().includes('comp')
                          ? 'rgba(0,255,65,0.15)'
                          : 'rgba(245,158,11,0.15)',
                        border: `1px solid ${
                          project.status.toLowerCase().includes('comp')
                            ? 'rgba(0,255,65,0.4)'
                            : 'rgba(245,158,11,0.4)'
                        }`,
                        color: project.status.toLowerCase().includes('comp')
                          ? '#00FF41'
                          : '#f59e0b',
                      }}
                    >
                      {project.status}
                    </span>
                  )}

                  {/* Type label */}
                  <span className="font-mono text-[10px] text-cyber-green uppercase tracking-widest mb-1.5">
                    {project.type}
                  </span>

                  {/* Title */}
                  <h3
                    className="font-semibold text-white mb-2 leading-snug group-hover:text-cyber-green transition-colors"
                    style={{ fontSize: '18px' }}
                  >
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-slate-400 leading-relaxed mb-4 flex-grow font-sans text-xs sm:text-sm"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Footer metadata & links */}
                  <div className="flex justify-between items-center mt-auto pt-3 border-t border-cyber-border/20">
                    <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                      {project.stack.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="font-mono text-[9px] px-2 py-0.5 rounded"
                          style={{
                            backgroundColor: '#0a0a0f',
                            border: '1px solid rgba(0,255,65,0.2)',
                            color: '#00FF41',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 3 && (
                        <span className="font-mono text-[9px] text-slate-500 self-center">
                          +{project.stack.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2.5">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-cyber-green transition-all hover:scale-110 p-1"
                          title="View GitHub Repository"
                        >
                          <FiGithub className="w-4 h-4" />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-cyber-green transition-all hover:scale-110 p-1"
                          title="View Live Demo"
                        >
                          <FiExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
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
