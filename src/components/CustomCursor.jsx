import React, { useEffect, useState } from "react";

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });

    const over = (e) => {
      const tag = e.target.tagName;
      setHover(tag === "BUTTON" || tag === "A");
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <>
      {/* small dot */}
      <div
        className="fixed w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[9999]"
        style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      />

      {/* outer circle */}
      <div
        className="fixed border border-cyan-400 rounded-full pointer-events-none z-[9999]"
        style={{
          width: hover ? 40 : 20,
          height: hover ? 40 : 20,
          transform: `translate(${pos.x - (hover ? 20 : 10)}px, ${
            pos.y - (hover ? 20 : 10)
          }px)`,
        }}
      />
    </>
  );
};

export default CustomCursor;