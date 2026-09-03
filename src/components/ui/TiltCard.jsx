import React, { useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

export function TiltCard({
  title,
  subtitle,
  description,
  tags = [],
  highlight,
  href,
  className = "",
  children,
}) {
  const ref = useRef(null);
  const [hovering, setHovering] = useState(false);

  const springConfig = { stiffness: 300, damping: 30 };
  const rawX = useSpring(0, springConfig);
  const rawY = useSpring(0, springConfig);

  const rotateX = useTransform(rawY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(rawX, [-0.5, 0.5], [-7, 7]);

  function handleMouseMove(e) {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - left) / width - 0.5);
    rawY.set((e.clientY - top) / height - 0.5);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
    setHovering(false);
  }

  const Content = (
    <div className="relative z-10 p-6 sm:p-7 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h3 className="font-mono text-white text-base sm:text-lg font-semibold tracking-tight">
              {title}
            </h3>
            {highlight && (
              <p className="font-mono text-[11px] text-emerald-400 mt-0.5 tracking-wide">
                {highlight}
              </p>
            )}
          </div>
          {href && (
            <span className="text-zinc-500 group-hover:text-zinc-300 transition-colors text-lg leading-none mt-0.5 flex-shrink-0">
              ↗
            </span>
          )}
        </div>

        {subtitle && (
          <p className="font-mono text-xs text-zinc-500 mb-3">{subtitle}</p>
        )}

        <p className="text-zinc-400 text-sm leading-relaxed mb-5">
          {description}
        </p>

        {children}
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-900">
          {tags.map((t) => (
            <span
              key={t}
              className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-zinc-900/80 border border-zinc-800 text-zinc-400"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <motion.div
      ref={ref}
      className={`group relative rounded-xl border border-zinc-800/80 bg-zinc-950/60 overflow-hidden hover:border-zinc-700 transition-all ${className}`}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* subtle hover radial glow */}
      {hovering && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
      )}

      {href ? (
        <a href={href} target="_blank" rel="noreferrer" className="block h-full no-underline">
          {Content}
        </a>
      ) : (
        Content
      )}
    </motion.div>
  );
}
