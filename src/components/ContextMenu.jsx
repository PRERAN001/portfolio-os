import React from 'react';
import { FaSyncAlt, FaEye, FaGithub, FaImage } from 'react-icons/fa';

const ContextMenu = ({ x, y, closeMenu, onCommand }) => {
  return (
    <div 
      className="absolute bg-[#1c1c1c]/95 border border-gray-700 rounded-lg shadow-2xl py-2 w-48 z-[99999] backdrop-blur-md animate-fade-in"
      style={{ top: y, left: x }}
      onClick={(e) => e.stopPropagation()} // Prevent clicking inside from closing immediately
    >
      <div className="flex flex-col text-sm text-gray-300">
        
        <MenuItem icon={<FaSyncAlt />} label="Refresh System" onClick={() => window.location.reload()} />
       
        
        <div className="h-px bg-gray-700 my-1 mx-2"></div>
        
        
        <MenuItem icon={<FaGithub />} label="My GitHub" onClick={() => window.open('https://github.com/PRERAN001', '_blank')} />
        
        <div className="h-px bg-gray-700 my-1 mx-2"></div>
        
        <div className="px-4 py-1 text-xs text-gray-600 font-mono">
          v1.0.2 Stable
        </div>
      </div>
    </div>
  );
};

const MenuItem = ({ icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="flex items-center gap-3 px-4 py-2 hover:bg-cyan-500/20 hover:text-cyan-400 transition-colors text-left w-full"
  >
    <span className="text-xs">{icon}</span>
    <span>{label}</span>
  </button>
);

export default ContextMenu;