import React, { useState } from 'react';
import { TiltCard } from '@/components/ui/TiltCard';
import { FileTree } from '@/components/ui/FileTree';
import { Badge } from '@/components/ui/Badge';
import { GithubGraph } from "@/components/unlumen-ui/github-graph";
import { Code2, Folder, Mail, Terminal, Gamepad2, Trophy, Coffee } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';

// ─────────────────────────────────────────────
// DATA CONFIGURATION
// ─────────────────────────────────────────────

const FEATURED_PROJECTS = [
  {
    id: 'agent-sdk',
    title: 'agent-sdk',
    subtitle: 'Modular Autonomous AI Agent Framework',
    description:
      'A lightweight, extensible SDK for building autonomous AI agents with tool-use, persistent memory, and multi-step reasoning. Designed to wire custom MCP tools and local models into a deterministic execution loop with zero boilerplate.',
    tags: ['Python', 'AI Agents', 'LLMs', 'Tool-Use', 'MCP', 'SDK'],
    repo: 'https://github.com/PRERAN001/agents-sdk',
    highlight: 'Modular · Extensible · Zero Boilerplate',
  },
  {
    id: 'ide',
    title: 'DAG IDE',
    subtitle: 'Graph-Orchestrated Autonomous Development Environment',
    description:
      'An experimental AI-powered browser IDE built on a Planner → Execution → Verification architecture. Decomposes natural language prompts into executable dependency DAGs, dispatches tasks to parallel worker agents, and validates every build/lint artifact before delivery.',
    tags: ['React', 'TypeScript', 'Node.js', 'Socket.IO', 'Monaco Editor', 'OpenRouter', 'MCP'],
    repo: 'https://github.com/PRERAN001/ide',
    highlight: 'DAG Planner · Parallel Workers · MCP Tools',
    showTree: true,
  },
  {
    id: 'instadeep_clone',
    title: 'InstaDeep — Social Engine Architecture',
    subtitle: 'High-Scale Feed Ranking & Recommendation Infrastructure',
    description:
      'A deep systems-level implementation of Instagram-grade infrastructure: ML-based feed scoring and ranking algorithms, story ordering pipelines, Edge cache + CDN hierarchy, real-time notification fanout (Kafka/Redis), and sub-millisecond timeline aggregation. Far beyond a CRUD app — an exploration of massive-scale social engineering.',
    tags: ['System Architecture', 'ML Feed Ranking', 'Redis Streams', 'Kafka', 'Edge CDN', 'PostgreSQL', 'React'],
    repo: 'https://github.com/PRERAN001/INSTA_DEEP_CLONE',
    highlight: 'ML Ranking · Fanout Pipeline · Sub-ms Timeline',
  },
  {
    id: 'sitecmd',
    title: 'sitecmd',
    subtitle: 'Web-to-CLI Interaction Compiler',
    description:
      'A terminal utility that compiles interactive browser sessions into reusable, parameterized CLI commands. Record browser actions once, replay them from the shell with dynamic arguments — zero Playwright scripting needed. Natively manages persistent auth, MFA/OTP tokens, OAuth flows, and cron pipelines.',
    tags: ['Node.js', 'Playwright', 'CLI Tooling', 'Browser Automation', 'npm'],
    repo: 'https://github.com/PRERAN001/sitecmd',
    highlight: 'Zero-Code Automation · Shell-Friendly · Local Auth',
  },
];

const DAG_TREE_DATA = [
  {
    name: 'dag-ide-core',
    type: 'folder',
    defaultOpen: true,
    children: [
      {
        name: 'planner/',
        type: 'folder',
        tag: 'LLM Graph',
        defaultOpen: true,
        children: [
          { name: 'intent-analyzer.ts', highlight: true },
          { name: 'task-decomposer.ts' },
          { name: 'dag-builder.ts', highlight: true },
        ],
      },
      {
        name: 'engine/',
        type: 'folder',
        tag: 'Parallel Workers',
        children: [
          { name: 'task-dispatcher.ts' },
          { name: 'worker-pool.ts' },
        ],
      },
      {
        name: 'verifier/',
        type: 'folder',
        tag: 'Build & Lint QA',
        children: [
          { name: 'build-verifier.ts' },
          { name: 'test-runner.ts' },
        ],
      },
      {
        name: 'mcp-servers/',
        type: 'folder',
        tag: 'Git/Mongo/FS',
      },
    ],
  },
];

const EXPLORE_PROJECTS = [
  {
    id: 'grepme-X',
    title: 'grepme-X',
    desc: 'Regex-powered CLI tool that statically analyzes Node.js codebases and auto-generates structured, accurate READMEs — zero LLM required.',
    lang: 'JavaScript',
    repo: 'https://github.com/PRERAN001/grepme-X',
  },
  {
    id: 'Chat',
    title: 'Chat Engine',
    desc: 'Real-time bidirectional messaging application built with Next.js, Socket.IO, and room partitioning.',
    lang: 'TypeScript',
    repo: 'https://github.com/PRERAN001',
  },
  {
    id: 'Agentpay-MONAD-BLITZ',
    title: 'Agentpay',
    desc: ' Autonomous AI Agent Economic Network on Monad Testnet.',
    lang: 'React',
    repo: 'https://github.com/PRERAN001/Agentpay-MONAD-BLITZ',
  },
  {
    id: 'more',
    title: '38+ more repositories',
    desc: 'Explore open source experiments, CLI utilities, and systems code on GitHub.',
    lang: 'View All →',
    repo: 'https://github.com/PRERAN001?tab=repositories',
  },
];

const SKILLS = [
  'JavaScript', 'TypeScript', 'Python', 'React', 'Next.js','pyrotch',
  'Node.js', 'Express', 'FastAPI', 'Tailwind CSS', 'MongoDB',
  'PostgreSQL', 'C','C++'  ,'Socket.IO', 'Playwright',
  'Docker', 'Git', 'LLMs / AI Agents', 'MCP Protocol',
  'System Design', 'CLI Tooling', 'WebSockets',
];

// ─────────────────────────────────────────────
// MAIN APP COMPONENT
// ─────────────────────────────────────────────

export default function App() {
  const [showExplore, setShowExplore] = useState(false);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white antialiased">

      {/* ── TOP NAVIGATION ── */}
      <nav className="max-w-4xl mx-auto px-5 sm:px-6 pt-10 pb-0 flex items-center justify-between border-b border-zinc-200 pb-6">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-sm text-zinc-900 font-semibold tracking-wide">
            PRERAN S
          </span>
          <Badge variant="default" className="ml-1 text-[10px] py-0 px-1.5 hidden sm:inline-flex bg-zinc-100 text-zinc-700 border-zinc-200">
            building
          </Badge>
        </div>

        <div className="flex items-center gap-5 font-mono text-xs text-zinc-600">
          <a
            href="https://github.com/PRERAN001"
            target="_blank"
            rel="noreferrer"
            className="hover:text-zinc-900 transition-colors flex items-center gap-1.5"
          >
            <FaGithub className="w-3.5 h-3.5" />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/preran-s-131077345"
            target="_blank"
            rel="noreferrer"
            className="hover:text-zinc-900 transition-colors flex items-center gap-1.5"
          >
            <FaLinkedin className="w-3.5 h-3.5" />
            LinkedIn
          </a>
          <a
            href="mailto:preran248@gmail.com"
            className="hover:text-zinc-900 transition-colors flex items-center gap-1"
          >
            <Mail className="w-3.5 h-3.5" />
            Email
          </a>
        </div>
      </nav>

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-4xl mx-auto px-5 sm:px-6 pt-16 pb-24 space-y-20">

        {/* ── HERO ── */}
        <section>
          <h1 className="text-3xl sm:text-5xl font-bold text-zinc-900 tracking-tight leading-[1.15] mb-4">
            Preran S
          </h1>

          <p className="text-lg sm:text-xl text-zinc-600 font-medium mb-6">
             AI · Systems · Agents · Architecture
          </p>

          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed max-w-2xl mb-6">
            Computer Science student architecting autonomous AI agent loops, graph-based execution IDEs,
            deep social feed pipelines, and developer CLI utilities. Based in Bangalore.
          </p>

          {/* AFK / lifestyle links */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-zinc-500">
            <span className="text-zinc-600 font-medium">afk:</span>
           
            <a
              href="https://github.com/PRERAN001"
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-900 transition-colors flex items-center gap-1"
            >
              <Code2 className="w-3 h-3" />
              Open Source
            </a>
            <span className="flex items-center gap-1 text-zinc-500">
              <Gamepad2 className="w-3 h-3" />
              Gaming
            </span>
            
          </div>
        </section>

        {/* ── FEATURED PROJECTS ── */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Folder className="w-4 h-4 text-zinc-500" />
            <p className="font-mono text-zinc-500 text-sm select-none">// projects</p>
          </div>

          <div className="space-y-6">
            {FEATURED_PROJECTS.map((project) => (
              <div
                key={project.id}
                className="p-6 sm:p-8 bg-zinc-50 rounded-xl hover:bg-zinc-100 transition-all group cursor-pointer"
                onClick={() => window.open(project.repo, '_blank')}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="font-mono text-zinc-900 text-base sm:text-lg font-semibold tracking-tight group-hover:text-zinc-700">
                      {project.title}
                    </h3>
                    {project.highlight && (
                      <p className="font-mono text-[11px] text-emerald-600 mt-0.5 tracking-wide">
                        {project.highlight}
                      </p>
                    )}
                  </div>
                  <span className="text-zinc-400 group-hover:text-zinc-600 transition-colors text-lg leading-none mt-0.5 flex-shrink-0">
                    ↗
                  </span>
                </div>

                {project.subtitle && (
                  <p className="font-mono text-xs text-zinc-500 mb-3">{project.subtitle}</p>
                )}

                <p className="text-zinc-600 text-sm leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Embedded File Tree for DAG IDE */}
                {project.showTree && (
                  <div className="mb-4">
                    <p className="font-mono text-[11px] text-zinc-500 mb-2">Architecture Spec:</p>
                    <FileTree items={DAG_TREE_DATA} />
                  </div>
                )}

                {project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-200">
                    {project.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-white border border-zinc-200 text-zinc-600"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Collapsible Explore Section */}
          <div className="mt-8 pt-6 border-t border-zinc-200">
            <button
              onClick={() => setShowExplore((v) => !v)}
              className="font-mono text-xs text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-2 mb-4 cursor-pointer"
            >
              <span
                className="inline-block transition-transform duration-200 text-emerald-600"
                style={{ transform: showExplore ? 'rotate(90deg)' : 'rotate(0deg)' }}
              >
                ›
              </span>
              <span>{showExplore ? 'collapse explorer' : 'explore other repositories'}</span>
            </button>

            {showExplore && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {EXPLORE_PROJECTS.map((p) => (
                  <a
                    key={p.id}
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 rounded-xl bg-zinc-50 hover:bg-zinc-100 transition-all block group no-underline"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-zinc-900 text-sm font-medium group-hover:text-zinc-700">
                        {p.title}
                      </span>
                      <span className="font-mono text-[11px] text-zinc-400 group-hover:text-zinc-600">
                        {p.lang}
                      </span>
                    </div>
                    <p className="text-zinc-600 text-xs leading-relaxed">{p.desc}</p>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── GITHUB ACTIVITY (FULL WIDTH) ── */}
        <section className="-mx-5 sm:-mx-6 px-5 sm:px-6 py-10 bg-zinc-50 border-y border-zinc-200">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <FaGithub className="w-4 h-4 text-zinc-500" />
              <p className="font-mono text-zinc-500 text-sm select-none">// github</p>
            </div>

            <div className="mb-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <a
                  href="https://github.com/PRERAN001"
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-sm text-zinc-700 hover:text-zinc-900 transition-colors flex items-center gap-1"
                >
                  @PRERAN001 <span className="text-zinc-400">↗</span>
                </a>
                <div className="flex items-center gap-4 font-mono text-xs text-zinc-500">
                  <span><strong className="text-zinc-900">41</strong> repos</span>
                  <span><strong className="text-zinc-900">8</strong> followers</span>
                  <span><strong className="text-zinc-900">12</strong> stars</span>
                </div>
              </div>

              {/* GitHub Graph */}
              <div className="bg-white rounded-xl p-5 border border-zinc-200">
                <GithubGraph
  account="PRERAN001"
  months={12}
  variant="violet"
  animation="cascade"
  animationSpeed={1.4}
  cellSize={12}
  cellGap={4}
  cellRadius={6}
  ambientEffect="twinkle"
  ambientIntensity={0.7}
  showLegend
/>
              </div>
            </div>

            {/* Achievements */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-zinc-600 mr-2">achievements:</span>
              <Badge variant="default" className="bg-emerald-50 text-emerald-700 border-emerald-200">GitHub Pro</Badge>
              <Badge variant="secondary" className="bg-zinc-100 text-zinc-700 border-zinc-200">YOLO</Badge>
              <Badge variant="secondary" className="bg-zinc-100 text-zinc-700 border-zinc-200">Pull Shark</Badge>
              <Badge variant="secondary" className="bg-zinc-100 text-zinc-700 border-zinc-200">Quickdraw</Badge>
            </div>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Terminal className="w-4 h-4 text-zinc-500" />
            <p className="font-mono text-zinc-500 text-sm select-none">// skills</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <Badge key={skill} variant="default" className="text-xs py-1 px-2.5 bg-zinc-100 text-zinc-700 border-zinc-200 hover:bg-zinc-200">
                {skill}
              </Badge>
            ))}
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Mail className="w-4 h-4 text-zinc-500" />
            <p className="font-mono text-zinc-500 text-sm select-none">// contact</p>
          </div>

          <p className="text-zinc-600 text-sm leading-relaxed mb-6 max-w-md">
            Open to engineering internships, technical collaborations, and ambitious systems problems.
            Drop a message directly — I respond quickly.
          </p>

          <div className="flex flex-wrap items-center gap-6 font-mono text-sm">
            <a
              href="mailto:preranshankar@gmail.com"
              className="text-zinc-900 hover:text-zinc-600 transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4" />
              preran248@gmail.com
            </a>
            <a
              href="https://github.com/PRERAN001"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-600 hover:text-zinc-900 transition-colors flex items-center gap-1.5"
            >
              <FaGithub className="w-4 h-4" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/preran-s-131077345"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-600 hover:text-zinc-900 transition-colors flex items-center gap-1.5"
            >
              <FaLinkedin className="w-4 h-4" />
              LinkedIn
            </a>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="max-w-4xl mx-auto px-5 sm:px-6 pb-12 border-t border-zinc-200 pt-8">
        <div className="flex items-center justify-between font-mono text-xs text-zinc-500">
          <span>© 2026 preran s · bengaluru, in</span>
          <a
            href="https://preran-s.me"
            target="_blank"
            rel="noreferrer"
            className="hover:text-zinc-900 transition-colors"
          >
            preran-s.me
          </a>
        </div>
      </footer>

    </div>
  );
}
