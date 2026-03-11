import React, { useState } from "react";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaDatabase,
  FaGithub,
  FaExternalLinkAlt,
  FaCode,
  FaBrain,
  FaAws,
  FaInfinity,
  FaWhatsapp,
  FaExpand,
  FaYoutube,
  FaTextHeight,
} from "react-icons/fa";

const PROJECT_DATA = [
  {
    id: 1,
    title: "Error-Bot",
    type: "Cloud",
    description:
      "error-bot is a serverless cron job and uptime monitoring system built on AWS.It allows users to create scheduled HTTP checks through a web dashboard, stores job configuration persistently, and executes those checks automatically using AWS EventBridge Scheduler and Lambda.",
    tech: ["AWS", "React"],
    github: "https://github.com/PRERAN001/Error-Bot",
    demo: "https://www.linkedin.com/posts/preran-s-131077345_sign2speak-hackathon-aiforgood-activity-7332778471212933121-5naN?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFZUNvUBhE2dBBn8wqtzFzsxSP9CVLydN1w",
    video: "https://www.youtube.com/watch?v=qcjzjRJDvXY",
    videoLabel: "Watch Demo on YouTube",  
    icon: <FaAws className="text-yellow-400" />,
  },
  {
    id: 2,
    title: "enhanced_jarvis",
    type: "Virtual Assistant",
    description:
      "An advanced voice-activated assistant capable of automating system tasks, retrieving real-time information, and handling intelligent queries. Inspired by the Iron Man AI.",
    tech: ["Python", "NLP", "SpeechRecognition", "Automation"],
    github: "https://github.com/PRERAN001/enhanced_jarvis",
    video: "https://youtube.com/watch?v=XXXX", 
    videoLabel: "Watch Demo on YouTube",  
    demo: "https://drive.google.com/drive/u/0/folders/1uCgxH1I62UmyS75RtYUPuMPIrDn9TDNI",
    icon: <FaCode className="text-cyan-400" />,
  },
  {
    id: 3,
    title: "whatsap_chat_analyzer",
    type: "Data Analytics",
    description:
      "A statistical analysis tool for WhatsApp chat exports. Visualizes user activity, communication patterns, most used words, and sentiment analysis through interactive dashboards.",
    tech: ["Python", "Streamlit", "Pandas", "Matplotlib"],
    github: "https://github.com/PRERAN001/whatsap_chat_analyzer",
    demo: "https://whatsappchatanalyzer001.streamlit.app/",
    video: "https://youtu.be/glswCsQVeso?si=Q12MhVukiQ7syOCT",   
    videoLabel: "Watch Demo on YouTube",  
    icon: <FaWhatsapp className="text-green-500" />,
  },
  {
    id: 4,
    title: "rabbitz.io",
    type: "Web Application",
    description:
      "Rabbitz.io is an AI-powered web app builder that generates UI and logic from natural-language prompts and previews the result instantly in the browser.",
    tech: ["React", "Node.js", "Inngest"],
    github: "https://github.com/PRERAN001/vibe",
    demo: "https://rabbitz-nu.vercel.app/",
    video: "https://youtu.be/qZH7kWASGzI?si=hWdfTtnTISFwxmYM",   
    videoLabel: "Watch Demo on YouTube",  
    icon: <FaInfinity className="text-blue-400" />,
  },
  {
    id: 5,
    title: "Uber Clone",
    type: "Web Application",
    description:
      "A full-stack, real-time ride-sharing web application inspired by Uber. It supports two types of users — Passengers and Drivers — with live ride matching, interactive maps, and real-time trip status updates via WebSockets.",
    tech: ["React", "Node.js"],
    github: "https://github.com/PRERAN001/uber-clone-complete",
    demo: "#",
    video: "https://www.youtube.com/watch?v=xoE2H4UvaNE,   
    videoLabel: "Watch Demo on YouTube",  
    icon: <FaInfinity className="text-white" />,
  },
  {
    id: 6,
    title: "the summarizer",
    type: "NLP Tool",
    description:
      "Intelligent text summarization engine that condenses long documents and articles into concise, meaningful summaries using Natural Language Processing techniques.(due to the issue in transformer backend is not deployed)",
    tech: ["Python", "HuggingFace", "Transformers", "NLP"],
    github: "https://github.com/PRERAN001/summarizer-unlock-media-matrix",
    demo: "https://summarizer-unlock-media-matrix-dv6nb5vew.vercel.app",
    video: "https://youtu.be/qYN9sOpmDMA?si=rpHPQ_44IJU8W_Ul",   
    videoLabel: "Watch Demo on YouTube",  
    icon: <FaBrain className="text-purple-400" />,
  },
  {
    id: 7,
    title: "Mini GPT (3 Lakh Words)",
    type: "Deep Learning Research",
    description:
      "A custom implementation of the GPT architecture trained from scratch on a dataset of 300,000 words. Demonstrates understanding of Transformer attention mechanisms and language modeling.",
    tech: ["Python", "PyTorch", "Deep Learning", "Transformers"],
    github:
      "https://www.linkedin.com/posts/preran-s-131077345_machinelearning-deeplearning-nlp-activity-7369197864582844416-r4iA", // LinkedIn Link as requested
    demo: "https://www.linkedin.com/posts/preran-s-131077345_machinelearning-deeplearning-nlp-activity-7369197864582844416-r4iA",
     
    icon: <FaBrain className="text-pink-400" />,
  },
  {
    id: 8,
    title: "EDU-PORTAL",
    type: "Web Devlopment",
    description:
      "A full-stack web application designed for managing and streaming departmental educational resources. This project utilizes a Node.js backend and a React frontend to facilitate video uploads and resource sharing across various academic departments.",
    tech: ["Python", "PyTorch", "Deep Learning", "Transformers"],
    github: "https://github.com/PRERAN001/EDU-PORTAL",
    demo: "https://edu-portal-eta.vercel.app/",
    video: "https://youtu.be/LYiJVfR1PZk?si=w4qWJfUTZtuYFuTJ",   
    videoLabel: "Watch Demo on YouTube",  
    icon: <FaExpand className="text-pink-400" />,
  },
  {
    id: 9,
    title: "errorpad",
    type: "Web Devlopment",
    description:
      "A full-stack web application designed for managing and streaming departmental educational resources. This project utilizes a Node.js backend and a React frontend to facilitate video uploads and resource sharing across various academic departments.",
    tech: ["Python", "PyTorch", "Deep Learning", "Transformers"],
    github: "https://github.com/PRERAN001/EDU-PORTAL",
    demo: "https://edu-portal-eta.vercel.app/",
    video: "https://youtu.be/N41NNY00a6s?si=tc58t0E8oYO_96e3",   
    videoLabel: "Watch Demo on YouTube",  
    icon: <FaTextHeight className="text-red-600" />,
  },
  {
    id: 9,
    title: "Autonomous-Cloud-Deployment-Recovery-System",
    type: "Cloud",
    description:
      "A production-style cloud infrastructure and deployment system built on AWS, designed to demonstrate high availability, auto-recovery, and scalable application delivery using industry best practices.",
    tech: ["AWS"],
    github:
      "https://github.com/PRERAN001/Autonomous-Cloud-Deployment-Recovery-System",
    demo: "https://github.com/PRERAN001/Autonomous-Cloud-Deployment-Recovery-System",
    video: "https://youtube.com/watch?v=XXXX",   // ADD THIS
  videoLabel: "Watch Demo on YouTube",  
    icon: <FaAws className="text-yellow-500" />,
  },
];
const ProjectExplorer = () => {
  const [selectedId, setSelectedId] = useState(1);
  const selectedProject = PROJECT_DATA.find((p) => p.id === selectedId);

  return (
    <div className="flex flex-col md:flex-row h-full min-h-0 text-gray-300">
      {/* SIDEBAR (Project List) */}
     <div className="w-full md:w-1/4 bg-[#181818] border-r border-gray-700 flex flex-col h-full min-h-0">

        <div className="p-3 border-b border-gray-700/50 text-xs font-bold text-gray-500 uppercase tracking-wider sticky top-0 bg-[#181818] z-10">
          Explorer
        </div>

        {/* SCROLLABLE PROJECT LIST */}
        <div className="overflow-y-auto flex-1">
          {PROJECT_DATA.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedId(project.id)}
              className={`p-3 flex items-center gap-3 cursor-pointer transition-colors border-l-2 ${
                selectedId === project.id
                  ? "bg-[#252525] border-cyan-400 text-white"
                  : "border-transparent hover:bg-[#202020] text-gray-400"
              }`}
            >
              <span className="text-lg">{project.icon}</span>

              <div className="overflow-hidden">
                <h4 className="text-sm font-bold truncate">{project.title}</h4>
                <p className="text-[10px] text-gray-500 truncate">
                  {project.type}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="w-full md:w-3/4 bg-[#111] p-6 flex flex-col h-full overflow-y-auto">
        {selectedProject && (
          <div className="animate-fade-in">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-800 rounded-xl text-3xl">
                  {selectedProject.icon}
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-white">
                    {selectedProject.title}
                  </h2>

                  <span className="text-xs text-cyan-400 font-mono bg-cyan-900/20 px-2 py-0.5 rounded">
                    {selectedProject.type}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="text-gray-400 leading-relaxed mb-6">
              <p>{selectedProject.description}</p>
            </div>

            {/* Tech Stack */}
            <div className="mb-8">
              <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">
                Technologies
              </h3>

              <div className="flex flex-wrap gap-2">
                {selectedProject.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 bg-[#1f1f1f] border border-gray-700 rounded text-xs text-gray-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Buttons */}
            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-auto">
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[#252525] hover:bg-[#333] border border-gray-600 text-white py-2 rounded"
              >
                <FaGithub /> <span className="text-sm">Source Code</span>
              </a>

              <a
                href={selectedProject.demo}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-cyan-700 hover:bg-cyan-600 text-white py-2 rounded"
              >
                <FaExternalLinkAlt /> <span className="text-sm">Live Demo</span>
              </a>

              {selectedProject.video && (
                <a
                  href={selectedProject.video}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white py-2 rounded"
                >
                  <FaYoutube />
                  <span className="text-sm">
                    {selectedProject.videoLabel || "Watch Video"}
                  </span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectExplorer;
