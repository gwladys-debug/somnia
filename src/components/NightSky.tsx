"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
};

type ShootingStar = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number; // de 1 (apparition) à 0 (disparition)
};

/**
 * Fond de ciel nocturne animé : étoiles qui scintillent et étoile filante occasionnelle.
 * Placé une seule fois dans layout.tsx, il s'affiche derrière tous les écrans de Somnia.
 */
export function NightSky() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    const context = canvasEl?.getContext("2d");
    if (!canvasEl || !context) return;
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = context;

    // Accessibilité : respecte le réglage « réduire les animations » du système
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let shootingStar: ShootingStar | null = null;
    let nextShootingAt = 0;
    let frameId = 0;

    const createStars = () => {
      // Le nombre d'étoiles s'adapte à la taille de l'écran
      const count = Math.round((width * height) / 5000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.2 + 0.3,
        baseAlpha: Math.random() * 0.5 + 0.3,
        twinkleSpeed: Math.random() * 0.002 + 0.0005,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const drawSky = () => {
      // Dégradé du bleu nuit vers la couleur de fond actuelle de Somnia
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "#0B1220");
      gradient.addColorStop(1, "#212529");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Halo lunaire discret en haut à droite
      const cx = width * 0.85;
      const cy = height * 0.12;
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height) * 0.35);
      glow.addColorStop(0, "rgba(227, 242, 253, 0.10)");
      glow.addColorStop(1, "rgba(227, 242, 253, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);
    };

    const drawStars = (time: number) => {
      ctx.fillStyle = "#E3F2FD";
      for (const star of stars) {
        const twinkle = reduceMotion
          ? 1
          : 0.6 + 0.4 * Math.sin(time * star.twinkleSpeed + star.phase);
        ctx.globalAlpha = star.baseAlpha * twinkle;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const drawShootingStar = (time: number) => {
      // Une étoile filante toutes les 6 à 14 secondes
      if (!shootingStar && time > nextShootingAt) {
        shootingStar = {
          x: width * (0.3 + Math.random() * 0.7),
          y: height * Math.random() * 0.3,
          vx: -(4 + Math.random() * 2),
          vy: 2 + Math.random(),
          life: 1,
        };
      }
      if (!shootingStar) return;

      const s = shootingStar;
      const tailX = s.x - s.vx * 14;
      const tailY = s.y - s.vy * 14;
      const trail = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
      trail.addColorStop(0, `rgba(255, 255, 255, ${s.life})`);
      trail.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.strokeStyle = trail;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(tailX, tailY);
      ctx.stroke();

      s.x += s.vx;
      s.y += s.vy;
      s.life -= 0.015;
      if (s.life <= 0) {
        shootingStar = null;
        nextShootingAt = time + 6000 + Math.random() * 8000;
      }
    };

    const draw = (time: number) => {
      drawSky();
      drawStars(time);
      if (!reduceMotion) drawShootingStar(time);
    };

    const resize = () => {
      // Image nette sur les écrans haute résolution (Retina, mobiles)
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createStars();
      if (reduceMotion) draw(0); // ciel fixe, sans animation
    };

    const animate = (time: number) => {
      draw(time);
      frameId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    if (!reduceMotion) {
      nextShootingAt = performance.now() + 4000;
      frameId = requestAnimationFrame(animate);
    }

    // Nettoyage quand le composant est retiré de la page
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
