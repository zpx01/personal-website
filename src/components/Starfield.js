import React, { useEffect, useRef } from 'react';

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const STAR_COUNT = 80;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random(), // depth: 0 = far, 1 = close
      baseRadius: 0.4 + Math.random() * 1.2,
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.01 + Math.random() * 0.02,
      driftX: (Math.random() - 0.5) * 0.3,
      driftY: (Math.random() - 0.5) * 0.15 + 0.1,
    }));

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time++;

      for (const star of stars) {
        star.x += star.driftX * star.z;
        star.y += star.driftY * star.z;

        if (star.x < -5) star.x = canvas.width + 5;
        if (star.x > canvas.width + 5) star.x = -5;
        if (star.y < -5) star.y = canvas.height + 5;
        if (star.y > canvas.height + 5) star.y = -5;

        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase);
        const opacity = (0.15 + star.z * 0.2) + twinkle * 0.08;
        const radius = star.baseRadius * (0.6 + star.z * 0.4);

        // Soft glow for closer stars
        if (star.z > 0.6) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200, 220, 255, ${opacity * 0.15})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.03, opacity)})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
