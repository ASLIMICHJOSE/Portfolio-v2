import React, { useEffect, useRef } from 'react';

export default function ActiveBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates with target (tx, ty) and current interpolation (x, y)
    const mouse = {
      x: width / 2,
      y: height / 2,
      tx: width / 2,
      ty: height / 2,
      isActive: false,
    };

    // Particles list
    const particles = [];
    const maxParticles = width < 768 ? 35 : 75; // Adaptive density for mobile performance
    const connectionDistance = 110;
    const repelRadius = 120;
    const repelStrength = 1.8;

    // Click interactive bursts
    const clickBursts = [];

    // Ambient floating glows
    const glows = [
      { x: width * 0.25, y: height * 0.3, vx: 0.2, vy: 0.15, radius: width * 0.2, color: 'rgba(0, 255, 65, 0.04)' },
      { x: width * 0.75, y: height * 0.7, vx: -0.15, vy: -0.2, radius: width * 0.25, color: 'rgba(0, 255, 247, 0.04)' },
      { x: width * 0.5, y: height * 0.5, vx: 0.1, vy: -0.1, radius: width * 0.22, color: 'rgba(191, 95, 255, 0.03)' },
    ];

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      glows[0].radius = width * 0.2;
      glows[1].radius = width * 0.25;
      glows[2].radius = width * 0.22;
    };

    const handleMouseMove = (e) => {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
      mouse.isActive = true;
    };

    const handleMouseLeave = () => {
      mouse.tx = width / 2;
      mouse.ty = height / 2;
      mouse.isActive = false;
    };

    const handleClick = (e) => {
      // Spawn binary code particles
      const chars = ['0', '1', '+', '-', '{', '}', '<', '>', '$', '_'];
      const burstCount = width < 768 ? 10 : 20;
      
      for (let i = 0; i < burstCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.5 + Math.random() * 2.5;
        clickBursts.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          char: chars[Math.floor(Math.random() * chars.length)],
          size: 10 + Math.floor(Math.random() * 8),
          opacity: 1.0,
          fadeSpeed: 0.015 + Math.random() * 0.015,
          color: Math.random() > 0.3 ? 'rgba(0, 255, 65, opacity)' : 'rgba(0, 255, 247, opacity)'
        });
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    // Particle Blueprint
    class NodeParticle {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        if (init) {
          this.y = Math.random() * height;
        } else {
          // Reset just off-screen depending on direction
          this.y = Math.random() > 0.5 ? 0 : height;
        }
        this.size = 1.0 + Math.random() * 1.5;
        this.baseVx = (Math.random() - 0.5) * 0.35;
        this.baseVy = (Math.random() - 0.5) * 0.35;
        this.vx = this.baseVx;
        this.vy = this.baseVy;
        this.color = Math.random() > 0.5 ? 'rgba(0, 255, 65, 0.25)' : 'rgba(0, 255, 247, 0.25)';
      }

      update() {
        // Interpolated Mouse Repulsion
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < repelRadius && dist > 0) {
          const force = (repelRadius - dist) / repelRadius;
          // Push away from mouse
          const ax = (dx / dist) * force * repelStrength;
          const ay = (dy / dist) * force * repelStrength;
          this.vx = this.baseVx + ax;
          this.vy = this.baseVy + ay;
        } else {
          // Smooth return to base velocity
          this.vx += (this.baseVx - this.vx) * 0.06;
          this.vy += (this.baseVy - this.vy) * 0.06;
        }

        this.x += this.vx;
        this.y += this.vy;

        // Wrap-around boundaries
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new NodeParticle());
    }

    // Animation loop
    const animate = () => {
      // Very soft clear to allow double buffering / minimal trailing
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, width, height);

      // 1. Mouse coordinates LERP (smooth damping)
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;

      // 2. Draw Floating Glow Blobs
      glows.forEach((glow) => {
        glow.x += glow.vx;
        glow.y += glow.vy;

        // Bounce glows off walls
        if (glow.x - glow.radius < 0 || glow.x + glow.radius > width) glow.vx *= -1;
        if (glow.y - glow.radius < 0 || glow.y + glow.radius > height) glow.vy *= -1;

        const mouseInfluenceX = (mouse.x - width / 2) * 0.08;
        const mouseInfluenceY = (mouse.y - height / 2) * 0.08;

        const grad = ctx.createRadialGradient(
          glow.x + mouseInfluenceX,
          glow.y + mouseInfluenceY,
          0,
          glow.x + mouseInfluenceX,
          glow.y + mouseInfluenceY,
          glow.radius
        );
        grad.addColorStop(0, glow.color);
        grad.addColorStop(1, 'rgba(5, 5, 8, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(glow.x + mouseInfluenceX, glow.y + mouseInfluenceY, glow.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Draw Perspective Cyber Grid in background
      // Vanishing point moves slightly with mouse to create dynamic 3D depth
      const vpX = width / 2 + (mouse.x - width / 2) * 0.07;
      const vpY = height * 0.35 + (mouse.y - height / 2) * 0.07;

      ctx.lineWidth = 0.5;
      const gridColor = 'rgba(0, 255, 65, 0.025)';
      ctx.strokeStyle = gridColor;

      // Horizontal grid lines (converge towards vanishing point)
      const horizontalLineCount = 14;
      for (let i = 0; i < horizontalLineCount; i++) {
        // Distribute exponentially to simulate depth
        const ratio = i / (horizontalLineCount - 1);
        const y = vpY + Math.pow(ratio, 2.5) * (height - vpY);

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Vertical perspective lines originating from vanishing point
      const verticalLineCount = width < 768 ? 10 : 22;
      for (let i = 0; i < verticalLineCount; i++) {
        const ratio = i / (verticalLineCount - 1);
        // Map ratio to bottom edge X coordinates
        const xBottom = ratio * width;

        ctx.beginPath();
        ctx.moveTo(vpX, vpY);
        ctx.lineTo(xBottom, height);
        ctx.stroke();
      }

      // 4. Update and Draw Particles & Connections
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // Draw faint connections between adjacent particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectionDistance) {
            const alpha = ((connectionDistance - dist) / connectionDistance) * 0.065;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            // Blend from cyber green to cyber teal
            ctx.strokeStyle = `rgba(0, 255, 120, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      // 5. Update and Draw Click Particles (Digital Burst)
      for (let i = clickBursts.length - 1; i >= 0; i--) {
        const p = clickBursts[i];
        p.x += p.vx;
        p.y += p.vy;
        p.opacity -= p.fadeSpeed;

        if (p.opacity <= 0) {
          clickBursts.splice(i, 1);
          continue;
        }

        ctx.font = `bold ${p.size}px 'Fira Code', monospace`;
        ctx.fillStyle = p.color.replace('opacity', p.opacity.toFixed(3));
        ctx.fillText(p.char, p.x, p.y);
      }

      animFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
