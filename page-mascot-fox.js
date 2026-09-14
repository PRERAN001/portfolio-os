/**
 * Page Mascot JS - Risograph Chibi Fox Companion
 * Character: Rusty the Riso Fox (Cyan & Orange Duotone)
 */
(function() {
  const currentScript = document.currentScript || document.querySelector('script[data-mascot]');
  const mascotName = currentScript && currentScript.dataset ? currentScript.dataset.mascot : null;

  if (!mascotName || mascotName !== 'riso-fox') {
    return;
  }

  if (window.__risoFoxMascotLoaded) {
    return;
  }
  window.__risoFoxMascotLoaded = true;

  const style = document.createElement('style');
  style.textContent = `
    @keyframes foxFloat {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-7px) rotate(-2deg); }
    }
    @keyframes foxPop {
      0% { opacity: 0; transform: scale(0.85) translateY(8px); }
      100% { opacity: 1; transform: scale(1) translateY(0); }
    }
    .fox-mascot-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 99999;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      font-family: system-ui, -apple-system, sans-serif;
      pointer-events: none;
    }
    .fox-speech-bubble {
      pointer-events: auto;
      background: #0f172a;
      color: #f8fafc;
      border: 2px solid rgba(6, 182, 212, 0.6);
      padding: 10px 14px;
      border-radius: 16px;
      font-size: 13px;
      line-height: 1.4;
      max-width: 220px;
      margin-bottom: 8px;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.4);
      animation: foxPop 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      position: relative;
    }
    .fox-speech-bubble::after {
      content: '';
      position: absolute;
      bottom: -7px;
      right: 24px;
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 6px solid rgba(6, 182, 212, 0.6);
    }
    .fox-avatar-btn {
      pointer-events: auto;
      cursor: pointer;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(6, 182, 212, 0.2));
      border: 2px solid rgba(249, 115, 22, 0.5);
      box-shadow: 0 12px 24px -6px rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s ease;
      animation: foxFloat 3.2s ease-in-out infinite;
    }
    .fox-avatar-btn:hover {
      transform: scale(1.1);
    }
    .fox-avatar-btn:active {
      transform: scale(0.95);
    }
    .fox-avatar-img {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      object-fit: contain;
      user-select: none;
      filter: drop-shadow(2px 2px 0px #06b6d4) drop-shadow(-2px -1px 0px #f97316);
    }
  `;
  document.head.appendChild(style);

  const quotes = [
    "Yip! Risograph duotone cyan & orange ink! 🎨",
    "Stipple halftones & offset print overlays! 🦊",
    "What does the fox say? 'Use clean CSS!' 💻✨",
    "Fluffy tail keeps me warm in winter! 🌾",
    "Stay clever & stay curious! 🧡🔵"
  ];

  function playYip() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(850, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch(e) {}
  }

  const container = document.createElement('div');
  container.className = 'fox-mascot-container';

  const bubble = document.createElement('div');
  bubble.className = 'fox-speech-bubble';
  bubble.innerHTML = '<span>Yip! Hi! I\'m Rusty the Riso Fox! 🦊🎨</span>';

  const btn = document.createElement('div');
  btn.className = 'fox-avatar-btn';

  const img = document.createElement('img');
  img.className = 'fox-avatar-img';
  img.alt = 'Riso Chibi Fox Mascot';
  img.src = 'file:///C:/Users/prera/.gemini/antigravity/brain/a5748251-2c8f-420a-b67f-f73c080563ed/chibi_fox_riso_1789407744656.jpg';

  btn.appendChild(img);
  container.appendChild(bubble);
  container.appendChild(btn);

  btn.addEventListener('click', () => {
    playYip();
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    bubble.innerHTML = `<span>${randomQuote}</span>`;
    bubble.style.animation = 'none';
    void bubble.offsetWidth;
    bubble.style.animation = 'foxPop 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  });

  window.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(container);
  });
  if (document.body) {
    document.body.appendChild(container);
  }
})();
