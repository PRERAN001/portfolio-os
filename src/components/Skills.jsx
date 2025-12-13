import React from 'react';
import { FaCode, FaServer, FaBrain, FaTools, FaReact, FaNodeJs, FaPython, FaDocker, FaGitAlt } from 'react-icons/fa';
import { SiCplusplus, SiTailwindcss, SiMongodb, SiTensorflow, SiTypescript, SiPostgresql ,SiHtml5} from 'react-icons/si';

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Architecture",
      icon: <FaCode className="text-cyan-400" />,
      skills: [
        { name: "React.js", icon: <FaReact /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss /> },
        { name: "HTML/CSS", icon: <SiHtml5 /> },
        
      ]
    },
    {
      title: "Backend & Systems",
      icon: <FaServer className="text-green-400" />,
      skills: [
        { name: "Node.js", icon: <FaNodeJs /> },
        { name: "C++", icon: <SiCplusplus /> },
        { name: "MongoDB", icon: <SiMongodb /> },
        
      ]
    },
    {
      title: "AI & Automation",
      icon: <FaBrain className="text-purple-400" />,
      skills: [
        { name: "Python", icon: <FaPython /> },
        { name: "TensorFlow", icon: <SiTensorflow /> },
        { name: "FastMCP", icon: <span className="font-bold text-xs">MCP</span> },
        { name: "LLM Agents", icon: <span className="font-bold text-xs">AI</span> },
      ]
    },
    {
      title: "DevOps & Tools",
      icon: <FaTools className="text-yellow-400" />,
      skills: [
        { name: "Git", icon: <FaGitAlt /> },
        { name: "Docker", icon: <FaDocker /> },
        
        { name: "Vercel", icon: <span className="font-bold text-xs">▲</span> },
      ]
    }
  ];

  return (
    <div className="h-full bg-[#111] text-gray-300 p-6 overflow-y-auto custom-scrollbar">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((cat, idx) => (
          <div key={idx} className="bg-[#1c1c1c] border border-gray-700/50 rounded-xl p-4 hover:border-cyan-500/30 transition-colors">
            <div className="flex items-center gap-3 mb-4 border-b border-gray-700 pb-2">
              <div className="p-2 bg-gray-800 rounded-lg">{cat.icon}</div>
              <h3 className="font-bold text-white text-sm">{cat.title}</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {cat.skills.map((skill, sIdx) => (
                <div key={sIdx} className="flex items-center gap-2 bg-[#252525] px-3 py-2 rounded border border-gray-700 hover:bg-[#2a2a2a] transition-colors cursor-default group">
                  <span className="text-lg text-gray-400 group-hover:text-cyan-400 transition-colors">{skill.icon}</span>
                  <span className="text-xs font-mono">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;