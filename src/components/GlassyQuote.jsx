import React from 'react';

const GlassyQuote = ({ isMobile }) => {
  return (
    <div 
      className={`
        backdrop-blur-md bg-white/5 border border-white/10 
        text-gray-400 font-mono text-[10px] tracking-widest uppercase
        shadow-[0_0_15px_rgba(0,0,0,0.2)]
        flex items-center justify-center text-center
        pointer-events-none select-none
        ${isMobile 
          ? 'mt-8 py-3 px-4 rounded-xl w-full animate-fade-in' // Mobile
          : 'mt-4 py-3 px-2 rounded-xl w-32 text-[9px] leading-relaxed break-words' // Desktop: Fits under icons
        }
      `}
    >
      <span className="text-cyan-500/50 mr-1">"</span>
      Let's build something unimaginable
      <span className="text-cyan-500/50 ml-1">"</span>
    </div>
  );
};

export default GlassyQuote;