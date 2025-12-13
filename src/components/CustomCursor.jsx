import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('.cursor-pointer')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <>
      {/* Main Dot */}
      <div 
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[99999] mix-blend-difference transition-transform duration-75"
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      />
      {/* Outer Ring */}
      <div 
        className={`fixed top-0 left-0 border border-cyan-400 rounded-full pointer-events-none z-[99999] transition-all duration-150 ease-out flex items-center justify-center`}
        style={{ 
          width: isHovering ? '40px' : '20px', 
          height: isHovering ? '40px' : '20px',
          transform: `translate(${position.x - (isHovering ? 20 : 10)}px, ${position.y - (isHovering ? 20 : 10)}px)`,
          opacity: 0.8
        }}
      >
        {isHovering && <div className="w-1 h-1 bg-cyan-400 rounded-full animate-ping absolute" />}
      </div>
    </>
  );
};

export default CustomCursor;