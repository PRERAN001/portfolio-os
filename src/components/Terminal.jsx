import React, { useState, useRef, useEffect } from "react";

const Terminal = ({ onClose, onCommand }) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { type: "system", content: "Welcome to UserOS v1.0.0" },
    { type: "system", content: 'Type "help" for commands.' },
  ]);

  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const cmdRaw = input.trim();
      if (!cmdRaw) return;

      const newHistory = [...history, { type: "user", content: cmdRaw }];
      const cmd = cmdRaw.toLowerCase();
      let response = "";

      const appResponse = onCommand(cmdRaw);

      if (appResponse) {
        // If App handled it (e.g., "open about"), use that response
        response = appResponse;
      } else {
        // 2. If App didn't handle it, handle local commands here
        switch (cmd) {
          case "help":
            response =
              "Commands: open [window], close [window], clear, exit, whoami";
            break;
          case "clear":
            setHistory([]);
            setInput("");
            return;
          case "exit":
            onClose();
            return;
          case "whoami":
            response = "root user";
            break;
          default:
            response = `Command not found: ${cmd}`;
        }
      }

      if (response) {
        newHistory.push({ type: "system", content: response });
      }

      setHistory(newHistory);
      setInput("");
    }
  };

  return (
    <div
      className="h-full w-full bg-[#0c0c0c] text-green-500 font-mono text-sm p-4 overflow-y-auto cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      // Inside the return statement of Terminal.jsx, before the output map:
      <div className="text-gray-400 mb-4 select-none">
        <pre className="text-[10px] md:text-xs text-cyan-500 font-bold leading-none mb-2">
          {`
  ____  ____  ____  ____  _  _ 
 (  _ \\(  _ \\(  __)(  _ \\( \\/ )
  ) __/ )   / ) _)  )   / )  ( 
 (__)  (__\\_)(____)(__\\_)(_/\\_)
 SYSTEM v1.0.2 [User: Visitor]
`}
        </pre>
        <p>
          Welcome to Portfolio OS. Type{" "}
          <span className="text-white">'help'</span> to see available commands.
        </p>
      </div>
      {history.map((line, i) => (
        <div
          key={i}
          className={`mb-1 ${
            line.type === "user" ? "text-white" : "text-green-500"
          }`}
        >
          {line.type === "user" ? (
            <span>
              <span className="text-neon-blue mr-2">~</span>
              {line.content}
            </span>
          ) : (
            <span>{`> ${line.content}`}</span>
          )}
        </div>
      ))}
      <div className="flex items-center">
        <span className="text-neon-blue mr-2">~</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-none outline-none flex-1 text-white caret-white"
          autoFocus
        />
      </div>
      <div ref={endRef} />
    </div>
  );
};

export default Terminal;
