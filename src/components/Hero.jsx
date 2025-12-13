import React from 'react';
import { FaReact, FaNodeJs, FaPython, FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import DecryptedText from './DecryptedText';
const Hero = () => {
  const socialLinks = [
    { icon: <FaGithub />, link: "https://github.com/PRERAN001", label: "GitHub" },
    { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/preran-s-131077345", label: "LinkedIn" },
    
    { icon: <FaEnvelope />, link: "mailto:preran248@gmail.com", label: "Email" },
  ];

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-0 select-none">
      {/* Glitch Name */}
      <h1 className="text-6xl md:text-9xl font-bold opacity-90 relative z-10">
  <DecryptedText text="PRERAN S" />
</h1>
      
      {/* Subtitle */}
      <div className="mt-2 flex items-center gap-3 text-cyan-500/60 font-mono text-sm md:text-xl tracking-[0.2em] uppercase">
        <span>Full Stack</span>
        <span className="w-1 h-1 bg-cyan-500 rounded-full"></span>
        <span>AI Engineer</span>
      </div>

      {/* === SOCIAL LINKS (The New Part) === */}
      <div className="flex gap-6 mt-8 z-20"> {/* z-20 ensures they are clickable */}
        {socialLinks.map((social, index) => (
          <a 
            key={index}
            href={social.link}
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyan-400 text-2xl transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] cursor-pointer pointer-events-auto"
            title={social.label}
          >
            {social.icon}
          </a>
        ))}
      </div>

      {/* Decorative Orbit (Keep this behind) */}
      <div className="absolute mt-8 w-64 h-64 border border-cyan-500/10 rounded-full animate-spin-slow flex items-center justify-center opacity-30 pointer-events-none">
         <div className="absolute top-0 bg-black p-1"><FaReact /></div>
         <div className="absolute bottom-0 bg-black p-1"><FaNodeJs /></div>
         <div className="absolute left-0 bg-black p-1"><FaPython /></div>
      </div>
    </div>
  );
};

export default Hero;