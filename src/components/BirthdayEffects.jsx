// src/components/BirthdayEffects.jsx
import React, { useEffect } from "react";

export default function BirthdayEffects() {
  useEffect(() => {
    // Bắn confetti đơn giản
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");
    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;
    let particles = [];
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H * 0.2,
        r: Math.random() * 8 + 5,
        d: Math.random() * 70,
        color: `hsl(${Math.random()*360},90%,60%)`,
        tilt: Math.random()*20-10,
        tiltAngle: 0,
      });
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, p.r, p.r/2, p.tilt, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
      update();
      requestAnimationFrame(draw);
    }
    function update() {
      for (let i = 0; i < particles.length; i++) {
        particles[i].y += Math.cos(particles[i].d) + 2 + particles[i].r / 3;
        particles[i].x += Math.sin(0.5) * 2;
        particles[i].tiltAngle += 0.07;
        particles[i].tilt = Math.sin(particles[i].tiltAngle) * 15;
        if (particles[i].y > H) {
          particles[i].x = Math.random() * W;
          particles[i].y = -20;
        }
      }
    }
    draw();
    return () => ctx && ctx.clearRect(0,0,W,H);
  }, []);

  return (
    <canvas id="confetti" className="fixed top-0 left-0 w-full h-full pointer-events-none z-40" />
  );
}