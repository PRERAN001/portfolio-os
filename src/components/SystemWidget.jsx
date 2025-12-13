import React, { useState, useEffect } from 'react';
import { FaDesktop, FaChrome, FaGlobe } from 'react-icons/fa';

const SystemWidget = () => {
  const [specs, setSpecs] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    browser: 'Unknown',
    os: 'Unknown'
  });

  useEffect(() => {
    // Detect Browser & OS (Simple detection)
    const userAgent = navigator.userAgent;
    let browser = "Chrome"; 
    if(userAgent.includes("Firefox")) browser = "Firefox";
    else if(userAgent.includes("Safari") && !userAgent.includes("Chrome")) browser = "Safari";
    else if(userAgent.includes("Edg")) browser = "Edge";

    let os = "Windows";
    if(userAgent.includes("Mac")) os = "MacOS";
    else if(userAgent.includes("Linux")) os = "Linux";
    else if(userAgent.includes("Android")) os = "Android";
    else if(userAgent.includes("iPhone")) os = "iOS";

    setSpecs({
      width: window.innerWidth,
      height: window.innerHeight,
      browser: browser,
      os: os
    });

    // Update dimensions on resize
    const handleResize = () => {
      setSpecs(prev => ({ ...prev, width: window.innerWidth, height: window.innerHeight }));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="absolute top-5 right-5 w-64 bg-[#1c1c1c]/80 backdrop-blur-md border border-gray-700/50 rounded-xl p-4 text-xs font-mono text-gray-400 z-0 select-none pointer-events-none">
      <div className="flex justify-between items-center mb-3 border-b border-gray-700 pb-2">
        <span className="font-bold text-gray-200">CLIENT_CONNECTION</span>
        <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-2"><FaDesktop /> RES</span>
          <span className="text-cyan-400">{specs.width} x {specs.height}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="flex items-center gap-2"><FaChrome /> BROWSER</span>
          <span className="text-purple-400">{specs.browser}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="flex items-center gap-2"><FaGlobe /> OS</span>
          <span className="text-green-400">{specs.os}</span>
        </div>

        <div className="pt-2 border-t border-gray-700/50 text-[10px] text-gray-600">
          SECURE CONNECTION ESTABLISHED
        </div>
      </div>
    </div>
  );
};

export default SystemWidget;