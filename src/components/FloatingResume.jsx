import React from 'react';
import { FaFileDownload, FaEye } from 'react-icons/fa';

const FloatingResume = () => {
  return (
    <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-50 flex gap-2">
        <a 
          href="/Preran S - Resume.pdf" 
          target="_blank"
          className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-300 group cursor-pointer"
        >
          <FaFileDownload className="group-hover:animate-bounce" />
          <span className="font-mono text-sm font-bold tracking-wide">DOWNLOAD_CV</span>
        </a>
    </div>
  );
};

export default FloatingResume;