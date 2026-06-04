import React, { useEffect, useState, useRef } from 'react';

export default function CursorGlow() {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  
  // Custom tracking positions
  const mouseRef = useRef({ x: -100, y: -100 });
  const innerRef = useRef(null);
  const outerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isVisible]);

  useEffect(() => {
    let animFrame;
    let outerX = -100;
    let outerY = -100;

    const updatePosition = () => {
      const mouse = mouseRef.current;
      
      // Smooth physical lag/damping
      outerX += (mouse.x - outerX) * 0.16;
      outerY += (mouse.y - outerY) * 0.16;

      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
      }

      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${outerX}px, ${outerY}px, 0)`;
      }

      animFrame = requestAnimationFrame(updatePosition);
    };

    updatePosition();
    return () => cancelAnimationFrame(animFrame);
  }, []);

  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      // Identify if elements are interactive or have data attributes
      const isInteractive = target.closest(
        'a, button, [role="button"], input, textarea, select, .tilt-card, [data-interactive]'
      );

      if (isInteractive) {
        setIsHovered(true);
        // Find suitable text descriptor
        let text = isInteractive.getAttribute('data-cursor-text');
        
        if (!text) {
          if (isInteractive.tagName === 'A' || isInteractive.closest('a')) {
            text = 'GOTO';
          } else if (isInteractive.tagName === 'BUTTON' || isInteractive.closest('button')) {
            text = 'CLICK';
          } else if (isInteractive.tagName === 'INPUT' || isInteractive.tagName === 'TEXTAREA') {
            text = 'WRITE';
          } else {
            text = 'SCAN';
          }
        }
        setCursorText(text);
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (!target) return;

      const isInteractive = target.closest(
        'a, button, [role="button"], input, textarea, select, .tilt-card, [data-interactive]'
      );
      
      if (isInteractive) {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner precise green dot cursor */}
      <div
        ref={innerRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full pointer-events-none z-[99999] hidden md:block transition-colors duration-300"
        style={{
          backgroundColor: isHovered ? '#00FFF7' : '#00FF41',
          boxShadow: isHovered 
            ? '0 0 10px rgba(0, 255, 247, 0.8)' 
            : '0 0 8px rgba(0, 255, 65, 0.8)',
        }}
      />

      {/* Outer physics-damped custom tracking circle/brackets */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 pointer-events-none z-[99998] hidden md:flex items-center justify-center transition-all duration-300"
        style={{
          width: isHovered ? '50px' : '32px',
          height: isHovered ? '50px' : '32px',
          marginLeft: isHovered ? '-25px' : '-16px',
          marginTop: isHovered ? '-25px' : '-16px',
        }}
      >
        {isHovered ? (
          <div className="absolute inset-0 flex items-center justify-center animate-spin-slow">
            {/* Target HUD Style Brackets */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyber-teal" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyber-teal" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyber-teal" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyber-teal" />
          </div>
        ) : (
          <div className="w-full h-full rounded-full border border-cyber-green/45 bg-cyber-green/5 blur-[0.5px]" />
        )}

        {/* HUD Text label aligned next to cursor */}
        {isHovered && cursorText && (
          <span className="absolute left-8 font-mono text-[9px] tracking-widest text-cyber-teal bg-[#0a0a0f]/90 border border-cyber-teal/30 px-1.5 py-0.5 rounded shadow-[0_0_8px_rgba(0,255,247,0.25)] whitespace-nowrap uppercase">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}
