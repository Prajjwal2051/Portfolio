import { useEffect, useRef } from "react";

const COLORS = ["#e8907a", "#c8a540", "#6ee7b7", "#5aa0c8", "#a0d8b0"];
const COUNT = 50;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: -999, y: -999 };

    function resize() {
      canvas!.width = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
    }
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas!.width,
      y: Math.random() * canvas!.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.8 + 0.8,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]!,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    if (reduced) {
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      window.removeEventListener("mousemove", onMouseMove);
      ro.disconnect();
      return;
    }

    let rafId = 0;

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80 && dist > 0) {
          const force = ((80 - dist) / 80) * 0.5;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.5) {
          p.vx = (p.vx / speed) * 1.5;
          p.vy = (p.vy / speed) * 1.5;
        }
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas!.width;
        else if (p.x > canvas!.width) p.x = 0;
        if (p.y < 0) p.y = canvas!.height;
        else if (p.y > canvas!.height) p.y = 0;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = p.color;
        ctx!.globalAlpha = p.alpha;
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;

      rafId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    />
  );
}
