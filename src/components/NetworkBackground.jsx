import React, { useRef, useEffect } from 'react';

// Class moved OUTSIDE the component to fix the compilation error
class NebulaBlob {
  constructor(w, h, colors) {
    this.w = w;
    this.h = h;
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.v = 0.4 + Math.random() * 0.6;
    this.angle = Math.random() * Math.PI * 2;
    this.size = Math.random() * (w / 3) + 300; // Large, soft blobs
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update(w, h) {
    this.angle += 0.001 * this.v;
    this.x += Math.cos(this.angle) * this.v;
    this.y += Math.sin(this.angle) * this.v;

    // Wrap around screen
    if (this.x < -this.size) this.x = w + this.size;
    if (this.x > w + this.size) this.x = -this.size;
    if (this.y < -this.size) this.y = h + this.size;
    if (this.y > h + this.size) this.y = -this.size;
  }

  draw(ctx) {
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
    const { r, g, b } = this.color;
    
    // Increased opacity for better visibility
    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.25)`); 
    gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const NetworkBackground = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let blobs = [];

    const colors = [
      { r: 0, g: 212, b: 255 },   // Electric Blue
      { r: 124, g: 58, b: 237 }, // Deep Purple
      { r: 6, g: 182, b: 212 },  // Cyan
    ];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      blobs = Array.from({ length: 6 }, () => new NebulaBlob(canvas.width, canvas.height, colors));
    };

    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      // Background color
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Use "screen" to make overlapping colors vibrant
      ctx.globalCompositeOperation = 'screen';
      blobs.forEach(blob => {
        blob.update(canvas.width, canvas.height);
        blob.draw(ctx);
      });

      // Interactive Mouse Light
      const mouseGlow = ctx.createRadialGradient(
        mouse.current.x, mouse.current.y, 0,
        mouse.current.x, mouse.current.y, 200
      );
      mouseGlow.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
      mouseGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = mouseGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid Overlay (High-tech feel)
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      const step = 60;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', init);
    window.addEventListener('mousemove', handleMouseMove);
    init();
    animate();

    return () => {
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full -z-10 bg-[#020617]"
      style={{ display: 'block' }}
    />
  );
};

export default NetworkBackground;