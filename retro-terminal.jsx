import React, { useState, useEffect } from 'react';

const CRTTerminal = () => {
  const [bootSequence, setBootSequence] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [selectedOption, setSelectedOption] = useState(0);
  const [currentScreen, setCurrentScreen] = useState('boot');
  const [glitchActive, setGlitchActive] = useState(false);

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => setShowCursor(prev => !prev), 530);
    return () => clearInterval(interval);
  }, []);

  // Boot sequence animation
  useEffect(() => {
    if (bootSequence < 5) {
      const timeout = setTimeout(() => setBootSequence(prev => prev + 1), 400);
      return () => clearTimeout(timeout);
    }
  }, [bootSequence]);

  // Random glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.85) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 50 + Math.random() * 100);
      }
    }, 2000);
    return () => clearInterval(glitchInterval);
  }, []);

  const menuOptions = [
    { id: 'status', label: 'SYSTEM STATUS' },
    { id: 'files', label: 'ACCESS FILES' },
    { id: 'comms', label: 'COMMUNICATIONS' },
    { id: 'diagnostics', label: 'RUN DIAGNOSTICS' },
  ];

  const handleKeyDown = (e) => {
    if (currentScreen === 'menu') {
      if (e.key === 'ArrowUp') {
        setSelectedOption(prev => (prev > 0 ? prev - 1 : menuOptions.length - 1));
      } else if (e.key === 'ArrowDown') {
        setSelectedOption(prev => (prev < menuOptions.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'Enter') {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 150);
      }
    }
  };

  useEffect(() => {
    if (bootSequence >= 5) {
      const timeout = setTimeout(() => setCurrentScreen('menu'), 800);
      return () => clearTimeout(timeout);
    }
  }, [bootSequence]);

  return (
    <div 
      className="crt-container"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{
        minHeight: '100vh',
        background: '#1a1a1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        fontFamily: 'monospace',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&family=Share+Tech+Mono&display=swap');
        
        .crt-monitor {
          background: linear-gradient(145deg, #d4d4d4 0%, #a8a8a8 50%, #909090 100%);
          padding: 40px;
          border-radius: 20px;
          box-shadow: 
            0 30px 60px rgba(0,0,0,0.5),
            inset 0 2px 0 rgba(255,255,255,0.3),
            inset 0 -2px 0 rgba(0,0,0,0.2);
          position: relative;
        }
        
        .crt-monitor::before {
          content: 'NEXUS-7 TERMINAL';
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          color: #666;
          letter-spacing: 3px;
        }
        
        .crt-bezel {
          background: #0a0a0a;
          border-radius: 12px;
          padding: 8px;
          box-shadow: 
            inset 0 0 50px rgba(0,0,0,0.8),
            inset 0 2px 3px rgba(0,0,0,0.9);
        }
        
        .crt-screen {
          position: relative;
          width: 600px;
          height: 450px;
          background: #0d0d0d;
          border-radius: 50px / 40px;
          overflow: hidden;
          box-shadow: 
            inset 0 0 100px rgba(255, 102, 0, 0.03),
            inset 0 0 20px rgba(0,0,0,0.8),
            inset 0 0 60px rgba(0,0,0,0.9),
            0 0 2px 1px rgba(0,0,0,0.5);
        }
        
        .crt-glass {
          position: absolute;
          inset: 0;
          border-radius: 50px / 40px;
          background: radial-gradient(
            ellipse 120% 120% at 50% 50%,
            transparent 0%,
            transparent 50%,
            rgba(0, 0, 0, 0.15) 70%,
            rgba(0, 0, 0, 0.4) 85%,
            rgba(0, 0, 0, 0.7) 100%
          );
          pointer-events: none;
          z-index: 15;
        }
        
        .crt-bulge {
          position: absolute;
          inset: 0;
          border-radius: 50px / 40px;
          background: radial-gradient(
            ellipse 80% 80% at 30% 30%,
            rgba(255, 255, 255, 0.07) 0%,
            transparent 50%
          );
          pointer-events: none;
          z-index: 16;
        }
        
        .crt-screen::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50px / 40px;
          background: 
            repeating-linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.2) 0px,
              rgba(0, 0, 0, 0.2) 1px,
              transparent 1px,
              transparent 3px
            );
          pointer-events: none;
          z-index: 10;
        }
        
        .crt-screen::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50px / 40px;
          background: radial-gradient(
            ellipse at center,
            transparent 0%,
            rgba(0, 0, 0, 0.1) 60%,
            rgba(0, 0, 0, 0.4) 100%
          );
          pointer-events: none;
          z-index: 11;
        }
        
        .screen-content {
          position: relative;
          height: 100%;
          padding: 40px 50px;
          z-index: 5;
        }
        
        .screen-warp {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: perspective(600px) rotateX(2deg) rotateY(0deg);
          transform-style: preserve-3d;
        }
        
        .screen-inner {
          width: 92%;
          height: 92%;
          position: relative;
        }
        
        .glitch-active .screen-warp {
          animation: glitch 0.1s linear;
        }
        
        @keyframes glitch {
          0% { transform: perspective(600px) rotateX(2deg) translate(0); filter: hue-rotate(0deg); }
          20% { transform: perspective(600px) rotateX(2deg) translate(-3px, 2px); filter: hue-rotate(90deg); }
          40% { transform: perspective(600px) rotateX(2deg) translate(3px, -2px); filter: hue-rotate(-90deg); }
          60% { transform: perspective(600px) rotateX(2deg) translate(-2px, 1px); }
          80% { transform: perspective(600px) rotateX(2deg) translate(2px, -1px); }
          100% { transform: perspective(600px) rotateX(2deg) translate(0); filter: hue-rotate(0deg); }
        }
        
        .amber-text {
          color: #ff6a00;
          font-family: 'VT323', monospace;
          text-shadow: 
            0 0 5px rgba(255, 106, 0, 0.8),
            0 0 10px rgba(255, 106, 0, 0.5),
            0 0 20px rgba(255, 106, 0, 0.3);
        }
        
        .dim-text {
          color: #994400;
          text-shadow: 
            0 0 5px rgba(255, 106, 0, 0.3);
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #331a00;
        }
        
        .logo-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .logo {
          width: 60px;
          height: 60px;
          border: 3px solid #ff6a00;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          font-weight: bold;
          box-shadow: 
            0 0 10px rgba(255, 106, 0, 0.5),
            inset 0 0 10px rgba(255, 106, 0, 0.2);
        }
        
        .logo-text {
          font-size: 10px;
          letter-spacing: 4px;
          margin-top: 8px;
        }
        
        .system-info {
          text-align: right;
          font-size: 14px;
          line-height: 1.6;
        }
        
        .boot-line {
          font-size: 16px;
          margin: 8px 0;
          opacity: 0;
          animation: fadeIn 0.3s ease forwards;
        }
        
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        
        .menu-container {
          margin-top: 30px;
        }
        
        .menu-title {
          font-size: 18px;
          margin-bottom: 20px;
          letter-spacing: 2px;
        }
        
        .menu-option {
          display: flex;
          align-items: center;
          padding: 12px 15px;
          margin: 8px 0;
          font-size: 20px;
          cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.1s ease;
          position: relative;
        }
        
        .menu-option::before {
          content: '>';
          margin-right: 15px;
          opacity: 0;
          transition: opacity 0.1s ease;
        }
        
        .menu-option.selected {
          background: rgba(255, 106, 0, 0.1);
          border-color: #ff6a00;
          box-shadow: 
            0 0 10px rgba(255, 106, 0, 0.2),
            inset 0 0 20px rgba(255, 106, 0, 0.1);
        }
        
        .menu-option.selected::before {
          opacity: 1;
        }
        
        .cursor {
          display: inline-block;
          width: 12px;
          height: 20px;
          background: #ff6a00;
          margin-left: 5px;
          box-shadow: 0 0 10px rgba(255, 106, 0, 0.8);
        }
        
        .status-bar {
          position: absolute;
          bottom: 20px;
          left: 30px;
          right: 30px;
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          padding-top: 10px;
          border-top: 1px solid #331a00;
        }
        
        .blink {
          animation: blink 1s step-end infinite;
        }
        
        @keyframes blink {
          50% { opacity: 0; }
        }
        
        .power-led {
          position: absolute;
          bottom: -25px;
          right: 20px;
          width: 8px;
          height: 8px;
          background: #00ff00;
          border-radius: 50%;
          box-shadow: 
            0 0 5px #00ff00,
            0 0 10px #00ff00;
        }
        
        .vent-slots {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .vent-slot {
          width: 40px;
          height: 3px;
          background: linear-gradient(90deg, #666 0%, #888 50%, #666 100%);
          border-radius: 1px;
        }
        
        .reflection {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.04) 0%,
            rgba(255, 255, 255, 0.02) 30%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 12;
          border-radius: 50px 50px 0 0 / 40px 40px 0 0;
        }
        
        .edge-shadow {
          position: absolute;
          inset: 0;
          border-radius: 50px / 40px;
          box-shadow: 
            inset 8px 0 20px -5px rgba(0,0,0,0.6),
            inset -8px 0 20px -5px rgba(0,0,0,0.6),
            inset 0 8px 20px -5px rgba(0,0,0,0.6),
            inset 0 -8px 20px -5px rgba(0,0,0,0.6);
          pointer-events: none;
          z-index: 14;
        }
        
        .flicker {
          animation: flicker 0.15s infinite;
        }
        
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.98; }
        }
      `}</style>
      
      <div className="crt-monitor">
        <div className="vent-slots">
          {[...Array(8)].map((_, i) => <div key={i} className="vent-slot" />)}
        </div>
        <div className="crt-bezel">
          <div className={`crt-screen ${glitchActive ? 'glitch-active' : ''}`}>
            <div className="reflection" />
            <div className="crt-glass" />
            <div className="crt-bulge" />
            <div className="edge-shadow" />
            <div className="screen-warp">
              <div className="screen-inner">
                <div className="screen-content flicker">
              {currentScreen === 'boot' && (
                <div className="amber-text">
                  {bootSequence >= 1 && (
                    <div className="boot-line" style={{ animationDelay: '0ms' }}>
                      NEXUS-7 SYSTEM BIOS v3.2.1
                    </div>
                  )}
                  {bootSequence >= 2 && (
                    <div className="boot-line" style={{ animationDelay: '100ms' }}>
                      (C) 2124 WEYLAND SYSTEMS CORP.
                    </div>
                  )}
                  {bootSequence >= 3 && (
                    <div className="boot-line dim-text" style={{ animationDelay: '200ms' }}>
                      <br />MEMORY CHECK... 640K OK
                    </div>
                  )}
                  {bootSequence >= 4 && (
                    <div className="boot-line dim-text" style={{ animationDelay: '300ms' }}>
                      INITIALIZING NEURAL INTERFACE...
                    </div>
                  )}
                  {bootSequence >= 5 && (
                    <div className="boot-line" style={{ animationDelay: '400ms' }}>
                      <br />SYSTEM READY
                      {showCursor && <span className="cursor" />}
                    </div>
                  )}
                </div>
              )}
              
              {currentScreen === 'menu' && (
                <>
                  <div className="header amber-text">
                    <div className="logo-container">
                      <div className="logo">N7</div>
                      <div className="logo-text">NEXUS</div>
                    </div>
                    <div className="system-info">
                      <div>STATION: ARTEMIS-IV</div>
                      <div className="dim-text">SECTOR: 7G-ALPHA</div>
                      <div className="dim-text">CREW: 12 ACTIVE</div>
                    </div>
                  </div>
                  
                  <div className="menu-container amber-text">
                    <div className="menu-title">// MAIN TERMINAL ACCESS</div>
                    {menuOptions.map((option, index) => (
                      <div
                        key={option.id}
                        className={`menu-option ${selectedOption === index ? 'selected' : ''}`}
                        onClick={() => setSelectedOption(index)}
                        onMouseEnter={() => setSelectedOption(index)}
                      >
                        {option.label}
                        {selectedOption === index && showCursor && (
                          <span className="cursor" style={{ marginLeft: 'auto' }} />
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="status-bar amber-text dim-text">
                    <span>↑↓ NAVIGATE</span>
                    <span className="blink">● CONNECTED</span>
                    <span>ENTER TO SELECT</span>
                  </div>
                </>
              )}
            </div>
              </div>
            </div>
          </div>
          <div className="power-led" />
        </div>
      </div>
    </div>
  );
};

export default CRTTerminal;