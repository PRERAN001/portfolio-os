import React, { useState, useEffect } from 'react';
import { FaWindows, FaFolder, FaTerminal, FaCode } from 'react-icons/fa';
import { SiBlender } from 'react-icons/si';

const Taskbar = ({ windows, toggleWindow }) => {
  const [time, setTime] = useState(new Date());

  // Update clock every minute
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time (e.g., 10:45 AM)
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="absolute bottom-0 left-0 w-full h-12 bg-[#1c1c1c]/90 backdrop-blur-md border-t border-gray-700 flex items-center justify-between px-4 z-50">
      
      {/* Left: Start & App Icons */}
      <div className="flex items-center gap-2">
        {/* Start Button (Visual only for now) */}
        <button className="p-2 text-cyan-400 hover:bg-white/10 rounded transition-all mr-2">
          <FaWindows size={20} />
        </button>

        {/* Taskbar Items */}
        <TaskbarItem 
          icon={<FaFolder />} 
          label="About" 
          isOpen={windows.about} 
          onClick={() => toggleWindow('about')} 
        />
        <TaskbarItem 
          icon={<FaCode />} 
          label="Projects" 
          isOpen={windows.projects} 
          onClick={() => toggleWindow('projects')} 
        />
        <TaskbarItem 
          icon={<FaTerminal />} 
          label="Terminal" 
          isOpen={windows.terminal} 
          onClick={() => toggleWindow('terminal')} 
        />
        <TaskbarItem 
          icon={<SiBlender />} 
          label="Blender" 
          isOpen={windows.blender} 
          onClick={() => toggleWindow('blender')} 
        />
      </div>

      {/* Right: System Tray (Clock) */}
      <div className="flex items-center gap-4">
        <div className="text-xs text-gray-400 font-mono hover:bg-white/5 px-2 py-1 rounded cursor-default">
          {formatTime(time)}
        </div>
      </div>
    </div>
  );
};

// Helper Component for Taskbar Items
const TaskbarItem = ({ icon, label, isOpen, onClick }) => (
  <button 
    onClick={onClick}
    className={`
      flex items-center gap-2 px-3 py-1.5 rounded-md transition-all text-sm
      ${isOpen 
        ? 'bg-gray-700 text-cyan-300 border-b-2 border-cyan-400' 
        : 'text-gray-400 hover:bg-white/5 hover:text-gray-200 border-b-2 border-transparent'}
    `}
  >
    {icon}
    <span className="hidden sm:inline">{label}</span>
  </button>
);

export default Taskbar;