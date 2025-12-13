import React from 'react';
import { FaKeyboard } from 'react-icons/fa';

const ShortcutsPanel = () => {
  const shortcuts = [
    { keys: ['Ctrl', 'K'], desc: 'Spotlight Search' },
    { keys: ['Esc'], desc: 'Close Window' },
    { keys: ['Alt', 'Tab'], desc: 'Switch Focus' },
  ];

  return (
    <div className="absolute top-48 right-5 w-64 p-4 z-0 pointer-events-none opacity-60">
      <div className="flex items-center gap-2 text-gray-500 mb-3 text-xs uppercase font-bold tracking-wider">
        <FaKeyboard /> Shortcuts
      </div>
      <div className="space-y-2">
        {shortcuts.map((sc, i) => (
          <div key={i} className="flex items-center justify-between text-xs">
            <span className="text-gray-400">{sc.desc}</span>
            <div className="flex gap-1">
              {sc.keys.map(k => (
                <span key={k} className="bg-gray-800 border border-gray-700 px-1.5 py-0.5 rounded text-gray-300 font-mono">
                  {k}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShortcutsPanel;