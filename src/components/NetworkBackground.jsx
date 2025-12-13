import React, { useRef, useEffect } from 'react';

const NetworkBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Configuration
    const particleCount = 100;
    const connectionDistance = 100;
    const mouseDistance = 150;
    
    let w, h;
    let particles = [];
    
    // Mouse state
    const mouse = { x: null, y: null };

    // Resize handling
    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    // Particle Class
    class Particle {
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.5; // Velocity X
        this.vy = (Math.random() - 0.5) * 0.5; // Velocity Y
        this.size = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;

        // Mouse interaction (Push away)
        if (mouse.x != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouseDistance) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouseDistance - distance) / mouseDistance;
            const directionX = forceDirectionX * force * 3; // Push strength
            const directionY = forceDirectionY * force * 3;

            this.x -= directionX;
            this.y -= directionY;
          }
        }
      }

      draw() {
        ctx.fillStyle = 'rgba(34, 211, 238, 0.5)'; // Cyan color
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    const init = () => {
      resize();
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Update and Draw Particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Draw Connections
      particles.forEach((a, index) => {
        // Connect to other particles
        for (let i = index + 1; i < particles.length; i++) {
          const b = particles[i];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = 1 - distance / connectionDistance;
            ctx.strokeStyle = `rgba(34, 211, 238, ${opacity * 0.2})`; // Cyan lines
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        
        // Connect to Mouse (Optional: makes it feel very interactive)
        if (mouse.x != null) {
            const dx = a.x - mouse.x;
            const dy = a.y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < connectionDistance + 50) {
                 const opacity = 1 - distance / (connectionDistance + 50);
                 ctx.strokeStyle = `rgba(34, 211, 238, ${opacity * 0.4})`;
                 ctx.lineWidth = 1;
                 ctx.beginPath();
                 ctx.moveTo(a.x, a.y);
                 ctx.lineTo(mouse.x, mouse.y);
                 ctx.stroke();
            }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Event Listeners
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });
    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 bg-black"
    />
  );
};

export default NetworkBackground;