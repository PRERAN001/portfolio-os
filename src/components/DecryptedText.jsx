import React, { useState, useEffect } from 'react';

const DecryptedText = ({ text = "PRERAN S", speed = 50, revealSpeed = 100 }) => {
  const [display, setDisplay] = useState('');
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";

  useEffect(() => {
    let iteration = 0;
    let timer = null;

    const startDecrypt = () => {
      timer = setInterval(() => {
        setDisplay(prev => 
          text.split("").map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          }).join("")
        );

        if (iteration >= text.length) { 
          clearInterval(timer);
        }
        
        iteration += 1 / 3; // Slows down the reveal
      }, speed);
    };

    // Tiny delay before starting
    setTimeout(startDecrypt, 500);

    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className="font-mono text-cyan-400 tracking-tighter">
      {display}
    </span>
  );
};

export default DecryptedText;