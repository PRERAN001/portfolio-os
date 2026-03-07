import React from 'react';

const GridBackground = () => {
  return (
    <div className="absolute inset-0 z-0 bg-[#0a0a0a] overflow-hidden">
      
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px), 
                           linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      ></div>
      
      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black opacity-80"></div>
    </div>
  );
};

export default GridBackground;