import React, { useEffect, useRef } from 'react';

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let stars = [];

    const STAR_COUNT = 80;

    const initStars = (w, h) => {
      stars = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random(),
        baseRadius: 0.4 + Math.random() * 1.2,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.01 + Math.random() * 0.02,
        driftX: (Math.random() - 0.5) * 0.3,
        driftY: (Math.random() - 0.5) * 0.15 + 0.1,
      }));
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (stars.length === 0) {
        initStars(w, h);
      } else {
        for (const star of stars) {
          if (star.x > w) star.x = Math.random() * w;
          if (star.y > h) star.y = Math.random() * h;
        }
      }
    };

    resize();
    window.addEventListener('resize', resize);

    let time = 0;

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      time++;

      for (const star of stars) {
        star.x += star.driftX * star.z;
        star.y += star.driftY * star.z;

        if (star.x < -5) star.x = w + 5;
        if (star.x > w + 5) star.x = -5;
        if (star.y < -5) star.y = h + 5;
        if (star.y > h + 5) star.y = -5;

        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase);
        const opacity = (0.15 + star.z * 0.2) + twinkle * 0.08;
        const radius = star.baseRadius * (0.6 + star.z * 0.4);

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
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
