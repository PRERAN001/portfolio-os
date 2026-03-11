import React from "react";
import { SiBlender } from "react-icons/si";
import { FaYoutube, FaCube, FaLightbulb } from "react-icons/fa";

const BLENDER_PROJECTS = [
  {
    id: 1,
    title: "Ear Pods Action",
    // IMPORTANT: Use the 'embed' version of the link
    videoUrl: "https://www.youtube.com/embed/JBysxE5-wp8",
    specs: {
      engine: "Eevee",
      samples: "200",
      modeling: "Hard Surface",
    },
    description: "A Simple Animation of Ear pods !!",
    tags: ["Lighting", "Texturing", "Animation"],
  },
  {
    id: 2,
    title: "Ship animation",
    // IMPORTANT: Use the 'embed' version of the link
    videoUrl: "https://www.youtube.com/embed/JogLMqM-Ul4 ",
    specs: {
      engine: "Eevee",
      samples: "200",
      modeling: "Hard Surface",
    },
    description: "A Simple Animation of Ear pods !!",
    tags: ["Lighting", "Texturing", "Animation"],
  },
  {
    id: 3,
    title: "GTR animation",
    // IMPORTANT: Use the 'embed' version of the link
    videoUrl: "https://www.youtube.com/embed/HF3-E9w2G9M ",
    specs: {
      engine: "cycles",
      samples: "200",
      modeling: "Hard Surface",
    },
    description: "A Simple Animation of Ear pods !!",
    tags: ["Lighting", "Texturing", "Animation"],
  },
  // Add more here...
];

const BlenderShowcase = () => {
  return (
    <div className="bg-[#0a0a0a] h-full overflow-y-auto p-6 font-mono custom-scrollbar">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 border-b border-orange-500/20 pb-6">
        <div className="p-3 bg-orange-500/10 rounded-xl border border-orange-500/30 shadow-[0_0_15px_rgba(245,121,42,0.1)]">
          <SiBlender className="text-4xl text-orange-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            3D Design & Animation
          </h2>
          <p className="text-gray-500 text-xs">
            render_engine: "Cycles" | workflow: "PBR"
          </p>
        </div>
      </div>

      {/* Projects Grid - Changed to 1 col on small, 2 on large */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-450 mx-auto">
        {BLENDER_PROJECTS.map((project) => (
          <div
            key={project.id}
            className="group bg-[#111] rounded-2xl overflow-hidden border border-gray-800 hover:border-orange-500/50 transition-all duration-300"
          >
            {/* Video Container - Aspect Ratio Fix */}
            <div className="aspect-video w-full bg-black relative">
              <iframe
                className="absolute inset-0 w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
                src={project.videoUrl}
                title={project.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Project Info */}
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                  {project.title}
                </h3>
                <FaYoutube className="text-red-600 text-xl" />
              </div>

              <p className="text-gray-400 text-sm mb-6 h-10 line-clamp-2">
                {project.description}
              </p>

              {/* Technical Specs Bar */}
              <div className="grid grid-cols-3 gap-3 py-4 border-t border-gray-800/50">
                <div className="flex flex-col items-center p-2 bg-[#1a1a1a] rounded-lg border border-gray-800">
                  <FaCube className="text-orange-500 mb-1 text-xs" />
                  <span className="text-[9px] text-gray-500 uppercase">
                    Workflow
                  </span>
                  <span className="text-[10px] font-bold text-gray-300">
                    {project.specs.modeling}
                  </span>
                </div>
                <div className="flex flex-col items-center p-2 bg-[#1a1a1a] rounded-lg border border-gray-800">
                  <span className="text-[9px] text-gray-500 uppercase">
                    Engine
                  </span>
                  <span className="text-[10px] font-bold text-gray-300">
                    {project.specs.engine}
                  </span>
                </div>
                <div className="flex flex-col items-center p-2 bg-[#1a1a1a] rounded-lg border border-gray-800">
                  <FaLightbulb className="text-yellow-400 mb-1 text-xs" />
                  <span className="text-[9px] text-gray-500 uppercase">
                    Samples
                  </span>
                  <span className="text-[10px] font-bold text-gray-300">
                    {project.specs.samples}
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-1 rounded-md bg-orange-500/10 text-orange-400 border border-orange-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlenderShowcase;
