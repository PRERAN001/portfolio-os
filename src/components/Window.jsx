import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { FaTimes, FaMinus, FaExpand } from 'react-icons/fa';
import useIsMobile from '../hooks/useIsMobile'; // Import the hook

const Window = ({ 
  id, 
  title, 
  children, 
  isOpen, 
  onClose, 
  initialPosition = { x:  0, y: 400 },
  zIndex = 10,
  onFocus
}) => {
  const nodeRef = useRef(null);
  const isMobile = useIsMobile(); // Check if mobile

  if (!isOpen) return null;

  // Mobile: Fullscreen, No Drag
  // Desktop: Draggable, Windowed
  const windowClasses = isMobile
    ? "fixed inset-0 w-full h-full bg-[#1c1c1c] z-[9999] flex flex-col animate-fade-in" // Mobile Classes
    : "absolute flex flex-col bg-[#1c1c1c] border border-gray-700 rounded-lg shadow-2xl overflow-hidden w-[600px] max-w-[90vw]"; // Desktop Classes

  const Content = (
    <div 
      ref={nodeRef}
      className={windowClasses}
      style={{ zIndex: zIndex }}
      onClick={onFocus}
    >
      {/* Header */}
      <div className={`
        window-header h-10 bg-[#2d2d2d] border-b border-gray-700 flex items-center justify-between px-4 select-none shrink-0
        ${!isMobile ? 'cursor-move' : ''} 
      `}>
        <span className="text-sm font-mono text-gray-300 font-bold flex items-center gap-2">
          {/* Hide traffic lights on mobile to save space */}
          {!isMobile && (
             <div className="flex gap-1.5 mr-2">
                <span className="w-3 h-3 rounded-full bg-red-500 block"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500 block"></span>
                <span className="w-3 h-3 rounded-full bg-green-500 block"></span>
             </div>
          )}
          {title}
        </span>
        
        {/* Controls */}
        <div className="flex gap-4 text-gray-400">
          {!isMobile && (
            <>
               <button className="hover:text-white transition"><FaMinus size={10} /></button>
               <button className="hover:text-white transition"><FaExpand size={10} /></button>
            </>
          )}
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(); }} 
            className="hover:text-red-500 transition p-2"
          >
            <FaTimes size={isMobile ? 18 : 12} /> {/* Bigger close button on mobile */}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-[#0f0f0f]/95 overflow-y-auto custom-scrollbar p-0">
        {children}
      </div>
    </div>
  );

  // If mobile, return without Draggable wrapper
  if (isMobile) {
    return Content;
  }

  // If desktop, wrap in Draggable
  return (
    <Draggable
      handle=".window-header"
      defaultPosition={initialPosition}
      nodeRef={nodeRef}
      bounds="parent"
    >
      {Content}
    </Draggable>
  );
};

export default Window;