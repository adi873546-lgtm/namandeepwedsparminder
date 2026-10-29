/**
 * Lightweight canvas celebration: confetti + floating petals + sparkles.
 * No external dependency; the canvas removes itself when the burst ends.
 * Respects prefers-reduced-motion.
 */

const COLORS = ["#D6B574", "#E8A1B5", "#F4C7D9", "#C77D93", "#FFF8F0", "#F5D78E"];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vr: number;
  size: number;
  color: string;
  kind: "confetti" | "petal" | "sparkle";
  life: number;
}

export function celebrate(options?: { durationMs?: number; petalCount?: number }) {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const duration = options?.durationMs ?? 3200;
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText =
    "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:60;";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    canvas.remove();
    return;
  }

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const resize = () => {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener("resize", resize);

  const particles: Particle[] = [];
  const spawn = (count: number, kinds: Particle["kind"][]) => {
    for (let i = 0; i < count; i++) {
      const kind = kinds[Math.floor(Math.random() * kinds.length)] ?? "confetti";
      particles.push({
        x: Math.random() * window.innerWidth,
        y: -20 - Math.random() * window.innerHeight * 0.3,
        vx: (Math.random() - 0.5) * 1.6,
        vy: 1.4 + Math.random() * 2.2,
        rotation: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.12,
        size: 6 + Math.random() * 10,
        color: COLORS[Math.floor(Math.random() * COLORS.length)] ?? "#D6B574",
        kind,
        life: 1,
      });
    }
  };

  spawn(90, ["confetti", "petal"]);
  spawn(24, ["sparkle"]);

  const start = performance.now();
  let raf = 0;

  const drawPetal = (p: Particle) => {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.globalAlpha = 0.85 * p.life;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, p.size * 0.6, p.size, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const drawConfetti = (p: Particle) => {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.globalAlpha = 0.9 * p.life;
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    ctx.restore();
  };

  const drawSparkle = (p: Particle) => {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.globalAlpha = 0.9 * p.life;
    ctx.strokeStyle = p.color;
    ctx.lineWidth = 1.4;
    const s = p.size * 0.6;
    ctx.beginPath();
    ctx.moveTo(-s, 0);
    ctx.lineTo(s, 0);
    ctx.moveTo(0, -s);
    ctx.lineTo(0, s);
    ctx.stroke();
    ctx.restore();
  };

  const tick = (now: number) => {
    const elapsed = now - start;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (const p of particles) {
      p.x += p.vx + Math.sin((p.y + elapsed) / 90) * 0.6;
      p.y += p.vy;
      p.rotation += p.vr;
      p.life = Math.max(0, 1 - elapsed / duration);
      if (p.kind === "petal") drawPetal(p);
      else if (p.kind === "confetti") drawConfetti(p);
      else drawSparkle(p);
    }

    if (elapsed < duration) {
      raf = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.remove();
    }
  };

  raf = requestAnimationFrame(tick);
}
