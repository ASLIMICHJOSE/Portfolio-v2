import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaFilePdf, FaExternalLinkAlt, FaSearch } from 'react-icons/fa';
import { certifications } from '../data/portfolio';
import ScrollReveal from '../components/ScrollReveal';
import PageTransition from '../components/PageTransition';
import TiltCard from '../components/TiltCard';

// Import PDF files
import cert1 from '../certificate/CertificateOfCompletion_Career Essentials in Software Development by Microsoft and LinkedIn.pdf';
import cert2 from '../certificate/CertificateOfCompletion_Data Cleaning in Python Essential Training.pdf';
import cert3 from '../certificate/CertificateOfCompletion_Introduction to Career Skills in Software Development (1).pdf';
import cert4 from '../certificate/CertificateOfCompletion_Introduction to Data Science.pdf';
import cert5 from '../certificate/CertificateOfCompletion_Learning Data Analytics 1 Foundations.pdf';
import cert6 from '../certificate/Microsoft_Certified_Azure_Fundamentals.pdf';

const certFiles = {
  1: cert1,
  2: cert2,
  3: cert3,
  4: cert4,
  5: cert5,
  6: cert6
};

const categories = ['All', 'Software Development', 'Cloud Computing', 'Data Science & Analytics'];

export default function Certificates() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = certifications.filter((cert) => {
    const matchesCategory =
      activeCategory === 'All' ||
      (activeCategory === 'Software Development' && cert.category.toLowerCase().includes('development')) ||
      (activeCategory === 'Cloud Computing' && cert.category.toLowerCase().includes('cloud')) ||
      (activeCategory === 'Data Science & Analytics' &&
        (cert.category.toLowerCase().includes('data') || cert.category.toLowerCase().includes('python')));

    const matchesSearch =
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const [gridRef, gridInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <PageTransition>
      <section
        id="certificates"
        className="pt-24 pb-20 px-4 md:px-8 lg:px-12 w-full flex-grow flex flex-col items-center bg-transparent"
      >
        <div className="w-full max-w-7xl mx-auto flex-grow flex flex-col">
          {/* Title */}
          <ScrollReveal direction="up">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-xl sm:text-3xl font-mono font-bold text-cyber-green whitespace-nowrap tracking-wide">
                &lt; CERTIFICATIONS /&gt;
              </h2>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-cyber-green/60 to-transparent" />
            </div>
          </ScrollReveal>

          {/* Filters & Search */}
          <ScrollReveal direction="up" delay={0.1}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
              {/* Category buttons */}
              <div className="flex flex-wrap gap-2.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="px-4 py-2 rounded font-mono text-xs tracking-wider border transition-all duration-200"
                    style={{
                      backgroundColor: activeCategory === cat ? '#00FF41' : 'transparent',
                      color: activeCategory === cat ? '#0a0a0f' : '#00FF41',
                      borderColor: activeCategory === cat ? '#00FF41' : 'rgba(0,255,65,0.3)',
                      fontWeight: activeCategory === cat ? 700 : 400,
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative max-w-xs w-full">
                <input
                  type="text"
                  placeholder="search_cert..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-[#0f0f1a] border border-cyber-border text-white text-xs font-mono rounded focus:outline-none focus:border-[#00FF41] focus:ring-1 focus:ring-[#00FF41]/30 transition-all placeholder:text-slate-600"
                />
                <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
              </div>
            </div>
          </ScrollReveal>

          {/* Cards Grid */}
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow">
            {filtered.map((cert, index) => {
              const fileUrl = certFiles[cert.id];
              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{
                    duration: 0.5,
                    ease: 'easeOut',
                    delay: index * 0.08,
                  }}
                  className="h-full"
                >
                  <TiltCard
                    className="group rounded-lg flex flex-col justify-between p-6 h-full border border-cyber-border overflow-hidden"
                    style={{
                      backgroundColor: '#0f0f1a',
                    }}
                  >
                  <div>
                    {/* Header: Category & Date */}
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-mono text-[10px] text-cyber-teal uppercase tracking-widest">
                        {cert.category}
                      </span>
                      <span className="font-mono text-[10px] text-slate-500">
                        [{cert.date}]
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold text-white text-base mb-2 group-hover:text-cyber-green transition-colors duration-200 font-sans leading-snug">
                      {cert.title}
                    </h3>

                    {/* Issuer */}
                    <p className="text-xs text-slate-400 font-mono mb-6">
                      <span className="text-slate-600">&gt; issuer:</span> {cert.issuer}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-auto pt-4 border-t border-cyber-border/40 flex items-center justify-between">
                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-[11px] text-cyber-green hover:underline"
                    >
                      <FaFilePdf size={12} className="shrink-0" />
                      <span>view_pdf.bin</span>
                    </a>

                    <a
                      href={fileUrl}
                      download={cert.fileName}
                      className="p-1.5 rounded border border-cyber-border hover:border-[#00FF41] hover:bg-[#00FF41]/10 text-slate-400 hover:text-cyber-green transition-all"
                      title="Download PDF"
                    >
                      <FaExternalLinkAlt size={10} />
                    </a>
                  </div>
                </TiltCard>
                </motion.div>
              );
            })}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-20 font-mono text-sm text-slate-500 flex-grow flex items-center justify-center">
              &gt; no_certificates_found_matching_query.err
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
