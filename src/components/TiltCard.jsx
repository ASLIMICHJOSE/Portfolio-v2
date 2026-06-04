import React, { useState, useRef } from 'react';

export default function TiltCard({ children, className = '', style = {}, onMouseEnter, onMouseLeave }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Relative coordinates
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xc = width / 2;
    const yc = height / 2;

    // Tilt degree maximum: 8 deg
    const rotateX = ((yc - y) / yc) * 8;
    const rotateY = ((x - xc) / xc) * 8;

    setRotate({ x: rotateX, y: rotateY });

    // Glare position percentage
    const glareX = (x / width) * 100;
    const glareY = (y / height) * 100;
    setGlare({ x: glareX, y: glareY, opacity: 0.15 });
  };

  const handleMouseEnter = (e) => {
    setIsHovered(true);
    if (onMouseEnter) onMouseEnter(e);
  };

  const handleMouseLeave = (e) => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
    if (onMouseLeave) onMouseLeave(e);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative select-none ${className}`}
      style={{
        ...style,
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${
          isHovered ? '1.04' : '1.0'
        }, ${isHovered ? '1.04' : '1.0'}, ${isHovered ? '1.04' : '1.0'})`,
        transition: isHovered
          ? 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s ease'
          : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s ease',
        willChange: 'transform',
      }}
    >
      {/* Spotlight Border Glow */}
      <div
        className="absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-300"
        style={{
          margin: '-1px',
          padding: '1px',
          background: `radial-gradient(circle 140px at ${glare.x}% ${glare.y}%, rgba(0, 255, 65, 0.4) 0%, rgba(0, 255, 247, 0.1) 40%, transparent 100%)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          zIndex: 5,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Cyber Grid Scanning Scanline Effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 rounded-lg z-1 overflow-hidden"
        style={{
          opacity: isHovered ? 0.08 : 0,
          backgroundImage: 'linear-gradient(rgba(0, 255, 65, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 65, 0.05) 1px, transparent 1px)',
          backgroundSize: '15px 15px',
        }}
      />

      {/* Glare Radial Overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10 rounded-lg"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(circle 220px at ${glare.x}% ${glare.y}%, rgba(0, 255, 65, 0.12) 0%, rgba(0, 255, 247, 0.04) 50%, transparent 100%)`,
        }}
      />

      {/* Child elements */}
      <div className="relative z-2 h-full flex flex-col flex-grow">
        {children}
      </div>
    </div>
  );
}
