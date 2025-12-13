import React, { useState } from 'react';
import { FaReact, FaNodeJs, FaPython, FaDatabase, FaGithub, FaExternalLinkAlt, FaCode, FaBrain } from 'react-icons/fa';

const PROJECT_DATA = [
  {
    id: 1,
    title: "sign_2_speak",
    type: "AI & Accessibility",
    description: "Real-time sign language recognition system that converts hand gestures into spoken speech. Utilizes computer vision and deep learning to bridge the communication gap for the hearing impaired.",
    tech: ["Python", "OpenCV", "TensorFlow", "CNN"],
    github: "https://github.com/PRERAN001/sign_2_speak",
    demo: "https://www.linkedin.com/posts/preran-s-131077345_sign2speak-hackathon-aiforgood-activity-7332778471212933121-5naN?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFZUNvUBhE2dBBn8wqtzFzsxSP9CVLydN1w", // Add demo link if available
    icon: <FaPython className="text-yellow-400" />
  },
  {
    id: 2,
    title: "enhanced_jarvis",
    type: "Virtual Assistant",
    description: "An advanced voice-activated assistant capable of automating system tasks, retrieving real-time information, and handling intelligent queries. Inspired by the Iron Man AI.",
    tech: ["Python", "NLP", "SpeechRecognition", "Automation"],
    github: "https://github.com/PRERAN001/enhanced_jarvis",
    demo: "https://drive.google.com/drive/u/0/folders/1uCgxH1I62UmyS75RtYUPuMPIrDn9TDNI",
    icon: <FaCode className="text-cyan-400" />
  },
  {
    id: 3,
    title: "whatsap_chat_analyzer",
    type: "Data Analytics",
    description: "A statistical analysis tool for WhatsApp chat exports. Visualizes user activity, communication patterns, most used words, and sentiment analysis through interactive dashboards.",
    tech: ["Python", "Streamlit", "Pandas", "Matplotlib"],
    github: "https://github.com/PRERAN001/whatsap_chat_analyzer",
    demo: "https://whatsappchatanalyzer001.streamlit.app/",
    icon: <FaDatabase className="text-green-500" />
  },
  {
    id: 4,
    title: "vibe",
    type: "Web Application",
    description: "A modern web application focused on user experience and mood-based interactions. (Description inferred from name - update if specific functionality differs).",
    tech: ["React", "Node.js", "WebSockets"],
    github: "https://github.com/PRERAN001/vibe",
    demo: "#",
    icon: <FaReact className="text-blue-400" />
  },
  {
    id: 5,
    title: "the summarizer",
    type: "NLP Tool",
    description: "Intelligent text summarization engine that condenses long documents and articles into concise, meaningful summaries using Natural Language Processing techniques.",
    tech: ["Python", "HuggingFace", "Transformers", "NLP"],
    github: "https://github.com/PRERAN001/the_summarizer",
    demo: "https://www.youtube.com/watch?v=vJIQnhKvQr0",
    icon: <FaBrain className="text-purple-400" />
  },
  {
    id: 6,
    title: "Mini GPT (3 Lakh Words)",
    type: "Deep Learning Research",
    description: "A custom implementation of the GPT architecture trained from scratch on a dataset of 300,000 words. Demonstrates understanding of Transformer attention mechanisms and language modeling.",
    tech: ["Python", "PyTorch", "Deep Learning", "Transformers"],
    github: "https://www.linkedin.com/posts/preran-s-131077345_machinelearning-deeplearning-nlp-activity-7369197864582844416-r4iA", // LinkedIn Link as requested
    demo: "https://www.linkedin.com/posts/preran-s-131077345_machinelearning-deeplearning-nlp-activity-7369197864582844416-r4iA",
    icon: <FaBrain className="text-pink-400" />
  }
];
const ProjectExplorer = () => {
  const [selectedId, setSelectedId] = useState(1);
  const selectedProject = PROJECT_DATA.find(p => p.id === selectedId);

  return (
    <div className="flex flex-col md:flex-row h-full text-gray-300">
      
      {/* SIDEBAR (Project List) */}
      <div className="w-full md:w-1/3 bg-[#181818] border-r border-gray-700 flex flex-col overflow-y-auto h-1/3 md:h-full">
        <div className="p-3 border-b border-gray-700/50 text-xs font-bold text-gray-500 uppercase tracking-wider sticky top-0 bg-[#181818] z-10">
          Explorer
        </div>
        {PROJECT_DATA.map((project) => (
          <div 
            key={project.id}
            onClick={() => setSelectedId(project.id)}
            className={`p-3 flex items-center gap-3 cursor-pointer transition-colors border-l-2 ${
              selectedId === project.id 
                ? 'bg-[#252525] border-cyan-400 text-white' 
                : 'border-transparent hover:bg-[#202020] text-gray-400'
            }`}
          >
            <span className="text-lg">{project.icon}</span>
            <div className="overflow-hidden">
              <h4 className="text-sm font-bold truncate">{project.title}</h4>
              <p className="text-[10px] text-gray-500 truncate">{project.type}</p>
            </div>
          </div>
        ))}
      </div>

      {/* MAIN CONTENT (Details) */}
      <div className="w-full md:w-2/3 bg-[#111] p-6 flex flex-col overflow-y-auto h-2/3 md:h-full">
        {selectedProject && (
          <div className="animate-fade-in">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-800 rounded-xl text-3xl">
                  {selectedProject.icon}
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-white">{selectedProject.title}</h2>
                  <span className="text-xs text-cyan-400 font-mono bg-cyan-900/20 px-2 py-0.5 rounded">
                    {selectedProject.type}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-invert prose-sm max-w-none text-gray-400 leading-relaxed mb-6">
              <p>{selectedProject.description}</p>
            </div>

            {/* Tech Stack Tags */}
            <div className="mb-8">
              <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tech.map(t => (
                  <span key={t} className="px-3 py-1 bg-[#1f1f1f] border border-gray-700 rounded text-xs text-gray-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-auto">
              <a href={selectedProject.github} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-[#252525] hover:bg-[#333] border border-gray-600 text-white py-2 rounded transition-all">
                <FaGithub /> <span className="text-sm">Source Code</span>
              </a>
              <a href={selectedProject.demo} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-cyan-700 hover:bg-cyan-600 text-white py-2 rounded transition-all">
                <FaExternalLinkAlt /> <span className="text-sm">Live Demo</span>
              </a>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default ProjectExplorer;