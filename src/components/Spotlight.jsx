import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaTerminal, FaFolder, FaCode, FaEnvelope } from 'react-icons/fa';
import { SiBlender } from 'react-icons/si';

const Spotlight = ({ isOpen, onClose, onCommand }) => {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setActiveIndex(0);
    }
  }, [isOpen]);

  // Available Commands
  const commands = [
    { id: 'about', label: 'Open About Me', icon: <FaFolder />, action: () => onCommand('open about') },
    { id: 'projects', label: 'Open Projects', icon: <FaCode />, action: () => onCommand('open projects') },
    { id: 'contact', label: 'Open Contact', icon: <FaEnvelope />, action: () => onCommand('open contact') },
    { id: 'terminal', label: 'Open Terminal', icon: <FaTerminal />, action: () => onCommand('open terminal') },
    { id: 'blender', label: 'Open Blender Showcase', icon: <SiBlender />, action: () => onCommand('open blender') },
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setActiveIndex(prev => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      setActiveIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      if (filteredCommands[activeIndex]) {
        filteredCommands[activeIndex].action();
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="w-full max-w-lg bg-[#1c1c1c] border border-gray-700 rounded-xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-700">
          <FaSearch className="text-gray-500" />
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Type a command or search..." 
            className="flex-1 bg-transparent text-white focus:outline-none placeholder-gray-500"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <span className="text-xs text-gray-600 bg-gray-800 px-2 py-1 rounded">ESC</span>
        </div>

        <div className="py-2">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, index) => (
              <div 
                key={cmd.id}
                onClick={() => { cmd.action(); onClose(); }}
                className={`px-4 py-3 flex items-center gap-3 cursor-pointer transition-colors ${
                  index === activeIndex ? 'bg-cyan-500/20 text-cyan-400 border-l-2 border-cyan-400' : 'text-gray-400 hover:bg-white/5'
                }`}
                onMouseEnter={() => setActiveIndex(index)}
              >
                {cmd.icon}
                <span>{cmd.label}</span>
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-gray-500 text-sm">No results found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Spotlight;