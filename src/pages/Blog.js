import React, { useState } from 'react';

const styles = {
  page: {
    maxWidth: 720,
    margin: '0 auto',
    padding: '120px 24px 80px',
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 700,
    color: '#fff',
    margin: '0 0 8px 0',
    letterSpacing: '-0.02em',
  },
  pageSubtitle: {
    fontSize: 15,
    color: '#666',
    margin: '0 0 48px 0',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px 24px',
  },
  blackHole: {
    position: 'relative',
    width: 280,
    height: 280,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  coreText: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    fontWeight: 600,
    textAlign: 'center',
    lineHeight: 1.3,
    transition: 'color 0.4s ease',
  },
};

const keyframes = `
  @keyframes orbit1 {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes orbit2 {
    from { transform: rotate(60deg); }
    to { transform: rotate(420deg); }
  }
  @keyframes orbit3 {
    from { transform: rotate(120deg); }
    to { transform: rotate(480deg); }
  }
  @keyframes orbit4 {
    from { transform: rotate(180deg); }
    to { transform: rotate(540deg); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.05); }
  }
  @keyframes particleDrift {
    0% { opacity: 0; transform: translate(0, 0) scale(0); }
    20% { opacity: 1; }
    100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(1); }
  }
`;

const ringConfig = [
  { size: 240, duration: 12, anim: 'orbit1', baseOpacity: 0.04, hoverOpacity: 0.25, hoverColor: '140, 140, 255' },
  { size: 200, duration: 9, anim: 'orbit2', baseOpacity: 0.06, hoverOpacity: 0.3, hoverColor: '160, 120, 255' },
  { size: 160, duration: 7, anim: 'orbit3', baseOpacity: 0.08, hoverOpacity: 0.35, hoverColor: '180, 100, 255' },
  { size: 120, duration: 5, anim: 'orbit4', baseOpacity: 0.05, hoverOpacity: 0.4, hoverColor: '200, 80, 255' },
];

const getRingStyle = (config, hovered) => ({
  position: 'absolute',
  width: config.size,
  height: config.size,
  borderRadius: '50%',
  border: hovered
    ? `1.5px solid rgba(${config.hoverColor}, ${config.hoverOpacity})`
    : `1px solid rgba(255, 255, 255, ${config.baseOpacity})`,
  boxShadow: hovered
    ? `0 0 12px 2px rgba(${config.hoverColor}, ${config.hoverOpacity * 0.4}), inset 0 0 8px 1px rgba(${config.hoverColor}, ${config.hoverOpacity * 0.2})`
    : 'none',
  top: '50%',
  left: '50%',
  marginTop: -config.size / 2,
  marginLeft: -config.size / 2,
  animation: `${config.anim} ${config.duration}s linear infinite`,
  transition: 'border 0.4s ease, box-shadow 0.4s ease',
});

const getGlowRing = (size, delay, hovered) => ({
  position: 'absolute',
  width: size,
  height: size,
  borderRadius: '50%',
  top: '50%',
  left: '50%',
  marginTop: -size / 2,
  marginLeft: -size / 2,
  border: hovered
    ? '1px solid rgba(140, 100, 255, 0.25)'
    : '1px solid rgba(100, 100, 255, 0.1)',
  animation: `pulse 3s ease-in-out ${delay}s infinite`,
  transition: 'border 0.4s ease',
});

const getCoreStyle = (hovered) => ({
  width: 90,
  height: 90,
  borderRadius: '50%',
  background: hovered
    ? 'radial-gradient(circle, #050510 40%, #0a0a1a 70%, transparent 100%)'
    : 'radial-gradient(circle, #000 40%, #0a0a0a 70%, transparent 100%)',
  boxShadow: hovered
    ? '0 0 50px 15px rgba(120, 80, 255, 0.15), inset 0 0 20px 5px rgba(0,0,0,0.9)'
    : '0 0 40px 10px rgba(0,0,0,0.8), inset 0 0 20px 5px #000',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  transition: 'background 0.4s ease, box-shadow 0.4s ease',
});

const particles = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * 360;
  const rad = (angle * Math.PI) / 180;
  const dist = 60 + Math.random() * 40;
  return {
    key: i,
    style: {
      position: 'absolute',
      width: 2,
      height: 2,
      borderRadius: '50%',
      backgroundColor: `rgba(150, 150, 255, ${0.3 + Math.random() * 0.4})`,
      top: '50%',
      left: '50%',
      '--dx': `${Math.cos(rad) * dist}px`,
      '--dy': `${Math.sin(rad) * dist}px`,
      animation: `particleDrift ${2 + Math.random() * 2}s ease-out ${Math.random() * 3}s infinite`,
    },
  };
});

export default function Blog() {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={styles.page}>
      <style>{keyframes}</style>
      <h1 style={styles.pageTitle}>Blog</h1>
      <p style={styles.pageSubtitle}>Thoughts on AI, research, and engineering.</p>
      <div style={styles.container}>
        <div
          style={styles.blackHole}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {ringConfig.map((config, i) => (
            <div key={i} style={getRingStyle(config, hovered)} />
          ))}

          <div style={getGlowRing(170, 0, hovered)} />
          <div style={getGlowRing(210, 1, hovered)} />
          <div style={getGlowRing(250, 2, hovered)} />

          {particles.map((p) => (
            <div key={p.key} style={p.style} />
          ))}

          <div style={getCoreStyle(hovered)}>
            <span style={{ ...styles.coreText, color: hovered ? '#a080ff' : '#555' }}>
              Coming<br />Soon
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
