import { useCallback, useEffect, useRef, useState } from "react";
import { celebrate } from "@/lib/celebrate";
import { EyebrowLabel, FloatingPetals, GoldDivider } from "./Ornaments";

const REVEAL_THRESHOLD = 0.6;

/**
 * Section 2 — genuine canvas scratch-to-reveal date card.
 * Mouse + touch via Pointer Events; the layer dissolves once ~60% is scratched,
 * firing the celebration exactly once.
 */
export function ScratchDateCard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  const revealedRef = useRef(false);

  useEffect(() => {
    if (revealed) return;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const sizeCanvas = () => {
      const rect = wrap.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      paintTexture(rect.width, rect.height);
    };

    const paintTexture = (w: number, h: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = "source-over";

      const base = ctx.createLinearGradient(0, 0, w, h);
      base.addColorStop(0, "#F6D9E4");
      base.addColorStop(0.5, "#F1C6D6");
      base.addColorStop(1, "#E9B7C9");
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, w, h);

      // Soft floral suggestion: scattered translucent rosettes.
      for (let i = 0; i < 16; i++) {
        const cx = ((i * 137) % 100) / 100 * w;
        const cy = ((i * 61) % 100) / 100 * h;
        const r = 14 + ((i * 7) % 18);
        ctx.beginPath();
        for (let p = 0; p < 6; p++) {
          const a = (p / 6) * Math.PI * 2;
          ctx.moveTo(cx, cy);
          ctx.ellipse(
            cx + Math.cos(a) * r * 0.55,
            cy + Math.sin(a) * r * 0.55,
            r * 0.5,
            r * 0.32,
            a,
            0,
            Math.PI * 2,
          );
        }
        ctx.fillStyle = `rgba(199, 125, 147, ${0.05 + ((i % 4) * 0.02)})`;
        ctx.fill();
      }

      // Champagne-gold ornament dots and fine filigree arcs.
      for (let i = 0; i < 40; i++) {
        const x = ((i * 89) % 100) / 100 * w;
        const y = ((i * 47) % 100) / 100 * h;
        ctx.beginPath();
        ctx.arc(x, y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(214, 181, 116, 0.55)";
        ctx.fill();
      }
      ctx.strokeStyle = "rgba(214, 181, 116, 0.5)";
      ctx.lineWidth = 1.4;
      for (let i = 0; i < 6; i++) {
        const x = ((i * 167) % 100) / 100 * w;
        const y = ((i * 83) % 100) / 100 * h;
        ctx.beginPath();
        ctx.arc(x, y, 22, Math.PI * 0.15, Math.PI * 0.95);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x + 30, y + 12, 14, Math.PI * 1.1, Math.PI * 1.9);
        ctx.stroke();
      }
    };

    sizeCanvas();

    let drawing = false;
    let lastX = -1;
    let lastY = -1;
    let movesSinceCheck = 0;

    const brushTo = (x: number, y: number) => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "#000"; // fully opaque erase — one pass fully clears
      const r = 26;
      if (lastX >= 0) {
        // Interpolate so fast swipes leave no gaps.
        const dist = Math.hypot(x - lastX, y - lastY);
        const steps = Math.max(1, Math.ceil(dist / (r * 0.5)));
        for (let i = 0; i <= steps; i++) {
          const ix = lastX + ((x - lastX) * i) / steps;
          const iy = lastY + ((y - lastY) * i) / steps;
          ctx.beginPath();
          ctx.arc(ix, iy, r, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      lastX = x;
      lastY = y;
    };

    const scratchedRatio = () => {
      const rect = wrap.getBoundingClientRect();
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let cleared = 0;
      let total = 0;
      const step = Math.max(4, Math.floor(8 * dpr));
      for (let y = 0; y < canvas.height; y += step) {
        for (let x = 0; x < canvas.width; x += step) {
          const alpha = data[(y * canvas.width + x) * 4 + 3] ?? 255;
          total++;
          if (alpha < 100) cleared++;
        }
      }
      void rect;
      return total === 0 ? 0 : cleared / total;
    };

    const finishReveal = () => {
      if (revealedRef.current) return;
      revealedRef.current = true;
      setRevealed(true);
      celebrate();
    };

    const pointFromEvent = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onDown = (e: PointerEvent) => {
      drawing = true;
      lastX = -1;
      lastY = -1;
      canvas.setPointerCapture(e.pointerId);
      const { x, y } = pointFromEvent(e);
      brushTo(x, y);
    };

    const onMove = (e: PointerEvent) => {
      if (!drawing) return;
      e.preventDefault();
      const { x, y } = pointFromEvent(e);
      brushTo(x, y);
      if (++movesSinceCheck >= 12) {
        movesSinceCheck = 0;
        if (scratchedRatio() >= REVEAL_THRESHOLD) finishReveal();
      }
    };

    const onUp = (e: PointerEvent) => {
      if (!drawing) return;
      drawing = false;
      lastX = -1;
      lastY = -1;
      if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
      if (scratchedRatio() >= REVEAL_THRESHOLD) finishReveal();
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("pointerleave", onUp);
    window.addEventListener("resize", sizeCanvas);

    return () => {
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("pointerleave", onUp);
      window.removeEventListener("resize", sizeCanvas);
    };
  }, [revealed]);

  const scrollToCountdown = useCallback(() => {
    document.getElementById("countdown")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section id="scratch-card" className="relative overflow-hidden bg-cream px-6 py-24 sm:py-32">
      <FloatingPetals count={7} className="opacity-60" />
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <EyebrowLabel>A Special Date Awaits</EyebrowLabel>
        <h2 className="mt-4 font-display text-4xl font-semibold text-burgundy sm:text-5xl">
          Scratch to Reveal Our Wedding Date
        </h2>
        <GoldDivider className="mt-6" />

        <div
          ref={wrapRef}
          className="relative mx-auto mt-12 aspect-[16/10] w-full select-none overflow-hidden rounded-[var(--radius-2xl)] border border-gold/60 shadow-[0_28px_70px_-30px_color-mix(in_oklab,var(--color-burgundy)_45%,transparent)]"
        >
          {/* Hidden content beneath the scratch surface */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-ivory via-blush/50 to-ivory px-4 text-center transition-opacity duration-700 ${revealed ? "opacity-100" : "opacity-100"}`}
          >
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.45em] text-dusty-rose">
              Save the Date
            </p>
            <p
              className={`mt-5 font-display text-3xl font-bold leading-snug tracking-wide text-burgundy sm:text-5xl ${revealed ? "animate-in fade-in zoom-in duration-1000" : ""}`}
            >
              SATURDAY
              <span className="mx-2 font-script text-4xl font-normal normal-case text-dusty-rose sm:text-6xl">
                21 November 2026
              </span>
            </p>
            <p
              className={`mt-5 font-display text-lg italic text-gold-deep sm:text-xl ${revealed ? "animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300" : ""}`}
            >
              Let the countdown to forever begin!
            </p>
          </div>

          {/* Scratch surface */}
          {!revealed && (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 h-full w-full cursor-pointer touch-none"
              style={{ userSelect: "none", WebkitUserSelect: "none" }}
              aria-label="Scratch the surface to reveal the wedding date"
              role="img"
            />
          )}
        </div>

        {revealed && (
          <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <button
              type="button"
              onClick={scrollToCountdown}
              className="rounded-full bg-burgundy px-8 py-3 font-body text-xs font-bold uppercase tracking-[0.3em] text-ivory shadow-lg transition-all hover:bg-dusty-rose hover:shadow-xl"
            >
              Continue to Our Wedding
            </button>
          </div>
        )}
        {!revealed && (
          <p className="mt-8 font-body text-xs tracking-wide text-muted-foreground">
            Use your finger or mouse to gently scratch the blush surface.
          </p>
        )}
      </div>
    </section>
  );
}
