import React, { useEffect, useRef } from 'react';

export default function ThreeDBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = { x: width / 2, y: height / 2, tx: width / 2, ty: height / 2 };

    const handleMouseMove = (e) => {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const numPerspectiveLines = 36;
    const rings = 12;
    const ringZ = Array.from({ length: rings }, (_, i) => i / rings);
    const speed = 0.002;
    let angle = 0;

    let animFrameId;
    const render = () => {
      // Clear canvas
      ctx.fillStyle = '#0a0a0f';
      ctx.fillRect(0, 0, width, height);

      // Parallax mouse damping
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;

      const centerX = width / 2 + (mouse.x - width / 2) * 0.15;
      const centerY = height / 2 + (mouse.y - height / 2) * 0.15;

      // Draw digital grid perspective lines
      ctx.lineWidth = 1;
      for (let i = 0; i < numPerspectiveLines; i++) {
        const theta = (i / numPerspectiveLines) * Math.PI * 2 + angle;
        const outerX = centerX + Math.cos(theta) * Math.max(width, height) * 1.5;
        const outerY = centerY + Math.sin(theta) * Math.max(width, height) * 1.5;

        // Gradient color for lines
        const grad = ctx.createLinearGradient(centerX, centerY, outerX, outerY);
        grad.addColorStop(0, 'rgba(0, 255, 65, 0.01)');
        grad.addColorStop(0.3, 'rgba(0, 255, 65, 0.03)');
        grad.addColorStop(1, 'rgba(0, 255, 65, 0.08)');

        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(outerX, outerY);
        ctx.stroke();
      }

      // Draw depth ring grid circles that expand outward
      for (let i = 0; i < rings; i++) {
        ringZ[i] += speed;
        if (ringZ[i] > 1) {
          ringZ[i] = 0;
        }

        const z = ringZ[i];
        // Exponential expansion to simulate linear motion in perspective space
        const radius = Math.pow(z, 2) * Math.max(width, height) * 1.3;

        // Fades out as it gets closer and when too far
        const opacity = Math.sin(z * Math.PI) * 0.12;

        ctx.strokeStyle = `rgba(0, 255, 65, ${opacity})`;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      angle += 0.0003;
      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
