import React, { useState, useEffect } from "react";

// === COMPONENTS ===
import Window from "./components/Window";
import Terminal from "./components/Terminal";
import Taskbar from "./components/Taskbar";
import Contact from "./components/Contact";
import Spotlight from "./components/Spotlight";
import NetworkBackground from "./components/NetworkBackground";
import Hero from "./components/Hero";
import SystemWidget from "./components/SystemWidget";
import ShortcutsPanel from "./components/ShortcutsPanel";
import ContextMenu from "./components/ContextMenu";
import CustomCursor from "./components/CustomCursor";
import Skills from "./components/Skills";
import FloatingResume from "./components/FloatingResume";
import useIsMobile from "./hooks/useIsMobile";
import GlassyQuote from "./components/GlassyQuote";
import ProjectExplorer from "./components/ProjectExplorer";
import MatrixBackground from './components/MatrixBackground';
import GridBackground from './components/GridBackground';
// === ICONS ===
import {
  FaTerminal,
  FaFolder,
  FaCode,
  FaEnvelope,
  FaChartBar,
  FaGithub,
  FaLinkedin,
  FaTools,
} from "react-icons/fa";

function App() {
  const isMobile = useIsMobile();
  const [bgIndex, setBgIndex] = useState(0);

  // === STATES ===
  const [windows, setWindows] = useState({
    about: true, // You might want to set this to false on mobile by default
    terminal: false,
    projects: false,
    contact: false,
    performance: false,
    skills: false,
  });

  const [zIndexes, setZIndexes] = useState({
    about: 20,
    terminal: 21,
    projects: 22,
    contact: 23,
    performance: 24,
    skills: 25,
  });

  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
  });

  // === HANDLERS ===
  const bringToFront = (id) => {
    setZIndexes((prev) => {
      const highest = Math.max(...Object.values(prev));
      if (prev[id] === highest) return prev;
      return { ...prev, [id]: highest + 1 };
    });
  };

  const toggleWindow = (id, forceOpen = null) => {
    setWindows((prev) => ({
      ...prev,
      [id]: forceOpen !== null ? forceOpen : !prev[id],
    }));
    if (forceOpen !== false) {
      bringToFront(id);
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY });
  };

  const handleClick = () => {
    if (contextMenu.visible) setContextMenu({ ...contextMenu, visible: false });
  };

  const handleCommand = (cmd) => {
    const args = cmd.split(" ");
    const command = args[0].toLowerCase();
    const target = args[1]?.toLowerCase();

    if(command === 'bg_toggle') {
        setBgIndex(prev => (prev + 1) % 3); // Cycle: 0 -> 1 -> 2 -> 0
        return;
    }

    switch (command) {
      case "open":
        if (target && windows.hasOwnProperty(target)) {
          toggleWindow(target, true);
        }
        break;
      case "close":
        if (target && windows.hasOwnProperty(target)) {
          toggleWindow(target, false);
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setIsSpotlightOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      className={`h-screen w-screen bg-black relative overflow-hidden text-white font-mono selection:bg-cyan-500/30 ${
        !isMobile ? "cursor-none" : ""
      }`}
      onContextMenu={handleContextMenu}
      onClick={handleClick}
    >
      {/* === 1. BACKGROUND LAYERS === */}
      {bgIndex === 0 && <NetworkBackground />}
      {bgIndex === 1 && <MatrixBackground />}
      {bgIndex === 2 && <GridBackground />}

      {/* Hero Text - Scaled down on Mobile */}
      <div
        className={`${
          isMobile ? "scale-50 origin-top top-10 absolute w-full" : ""
        }`}
      >
        <Hero />
      </div>

      <div className="absolute inset-0 pointer-events-none z-50 scanlines opacity-50"></div>

      {/* === 2. DESKTOP WIDGETS (Hidden on Mobile) === */}
      {!isMobile && (
        <>
          <SystemWidget />
          <ShortcutsPanel />
          <CustomCursor />
        </>
      )}

      {/* Big Clock (Bottom Right) */}
      <div className="absolute bottom-16 right-10 text-right z-0 pointer-events-none select-none">
        <h1 className="text-6xl md:text-8xl font-bold text-white/10 tracking-tighter font-mono">
          {
            new Date()
              .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
              .split(" ")[0]
          }
        </h1>
        <p className="text-sm md:text-xl text-cyan-500/20 font-mono font-bold uppercase tracking-widest mr-1">
          SYSTEM_ONLINE
        </p>
      </div>

      {/* === 3. ICONS LAYOUT (Responsive Switch) === */}
      {isMobile ? (
        // === MOBILE LAYOUT ===
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-8 z-10 flex flex-col items-center">
          <div className="grid grid-cols-3 gap-8 justify-items-center">
            <MobileIcon
              icon={<FaFolder />}
              label="About"
              onClick={() => toggleWindow("about")}
            />
            <MobileIcon
              icon={<FaCode />}
              label="Projects"
              onClick={() => toggleWindow("projects")}
            />
            <MobileIcon
              icon={<FaTools />}
              label="Skills"
              onClick={() => toggleWindow("skills")}
            />
            <MobileIcon
              icon={<FaEnvelope />}
              label="Contact"
              onClick={() => toggleWindow("contact")}
            />
            <MobileIcon
              icon={<FaTerminal />}
              label="Term"
              onClick={() => toggleWindow("terminal")}
            />
            <MobileIcon
              icon={<FaGithub />}
              label="GitHub"
              onClick={() => window.open("https://github.com", "_blank")}
            />
          </div>

          {/* Mobile Quote Position */}
          <GlassyQuote isMobile={true} />
        </div>
      ) : (
        // === DESKTOP LAYOUT ===
        // Added 'items-center' to center the icons and the new text
        <div className="p-5 flex flex-col gap-6 absolute top-0 left-0 z-10 h-full items-center">
          <DesktopIcon
            icon={<FaFolder />}
            label="about_me"
            onClick={() => toggleWindow("about")}
          />
          <DesktopIcon
            icon={<FaCode />}
            label="projects"
            onClick={() => toggleWindow("projects")}
          />
          <DesktopIcon
            icon={<FaTools />}
            label="skills"
            onClick={() => toggleWindow("skills")}
          />
          <DesktopIcon
            icon={<FaEnvelope />}
            label="contact"
            onClick={() => toggleWindow("contact")}
          />
          <DesktopIcon
            icon={<FaTerminal />}
            label="terminal"
            onClick={() => toggleWindow("terminal")}
          />

          <div className="w-10 h-px bg-gray-700/50 mx-auto my-2"></div>

          <DesktopIcon
            icon={<FaGithub />}
            label="github"
            onClick={() => window.open("https://github.com", "_blank")}
          />
          <DesktopIcon
            icon={<FaLinkedin />}
            label="linkedin"
            onClick={() => window.open("https://linkedin.com", "_blank")}
          />

          {/* DESKTOP QUOTE: Now inside the list, so it sits below LinkedIn */}
        </div>
      )}

      {/* === 4. WINDOWS === */}
      <Window
        id="skills"
        title="tech_stack.json"
        isOpen={windows.skills}
        onClose={() => toggleWindow("skills")}
        zIndex={zIndexes.skills}
        onFocus={() => bringToFront("skills")}
        initialPosition={{ x: 350, y: 100 }}
      >
        <Skills />
      </Window>

      <Window
        id="about"
        title="system_profile.txt"
        isOpen={windows.about}
        onClose={() => toggleWindow("about")}
        zIndex={zIndexes.about}
        onFocus={() => bringToFront("about")}
      >
        <div className="p-6 text-gray-300 font-mono">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4 tracking-widest animate-pulse">
            USER: PRERAN S
          </h2>

          <div className="text-sm leading-relaxed space-y-4">
            <p>
              <span className="text-cyan-500 font-bold">{">"} STATUS:</span> 2nd
              Year Student @ Bangalore Institute of Technology.
            </p>

            <p>
              I don't just write code; I build systems. From creating my own{" "}
              <span className="text-white font-bold">"Jarvis" AI</span> to
              open-source tools like{" "}
              <span className="text-white font-bold">Jumpbot</span>, I love
              making computers do the heavy lifting.
            </p>

            <p>
              My goal is simple: Build fast, scalable apps using{" "}
              <span className="text-cyan-300">C++</span>,{" "}
              <span className="text-cyan-300">Python</span>, and{" "}
              <span className="text-cyan-300">React</span>.
            </p>

            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-xs text-gray-500">
                CURRENT_MISSION: BUILDING THE UNIMAGINABLE
              </p>
            </div>
          </div>
        </div>
      </Window>

      <Window
        id="projects"
        title="~/projects"
        isOpen={windows.projects}
        onClose={() => toggleWindow("projects")}
        zIndex={zIndexes.projects}
        onFocus={() => bringToFront("projects")}
        initialPosition={{ x: 200, y: 50 }}
      >
        <ProjectExplorer />
      </Window>

      <Window
        id="contact"
        title="Contact Me"
        isOpen={windows.contact}
        onClose={() => toggleWindow("contact")}
        zIndex={zIndexes.contact}
        onFocus={() => bringToFront("contact")}
      >
        <Contact />
      </Window>

      <Window
        id="terminal"
        title="Terminal"
        isOpen={windows.terminal}
        onClose={() => toggleWindow("terminal")}
        zIndex={zIndexes.terminal}
        onFocus={() => bringToFront("terminal")}
      >
        <Terminal
          onClose={() => toggleWindow("terminal")}
          onCommand={handleCommand}
        />
      </Window>

      {/* === 5. OVERLAYS === */}
      <Spotlight
        isOpen={isSpotlightOpen}
        onClose={() => setIsSpotlightOpen(false)}
        onCommand={handleCommand}
      />

      {contextMenu.visible && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          closeMenu={() => setContextMenu({ ...contextMenu, visible: false })}
          onCommand={handleCommand}
        />
      )}

      <FloatingResume />
      <Taskbar windows={windows} toggleWindow={toggleWindow} />
    </div>
  );
}

// === HELPER COMPONENTS ===

const DesktopIcon = ({ icon, label, onClick }) => (
  <div
    className="text-center group cursor-pointer w-20"
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
  >
    <div className="w-14 h-14 bg-gray-900/60 backdrop-blur-md rounded-xl border border-gray-600/50 flex items-center justify-center text-2xl group-hover:bg-gray-700/50 transition duration-200 mx-auto text-cyan-400 shadow-lg">
      {icon}
    </div>
    <span className="text-xs text-gray-300 mt-2 block shadow-black drop-shadow-md font-bold">
      {label}
    </span>
  </div>
);

// Bigger, Touch-friendly Icons for Mobile
const MobileIcon = ({ icon, label, onClick }) => (
  <div
    className="flex flex-col items-center gap-2"
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
  >
    <div className="w-16 h-16 bg-gray-800/80 backdrop-blur-md rounded-2xl border border-gray-600 flex items-center justify-center text-3xl text-cyan-400 shadow-lg active:scale-95 transition-transform">
      {icon}
    </div>
    <span className="text-xs text-gray-300 font-bold shadow-black drop-shadow-md">
      {label}
    </span>
  </div>
);

export default App;
