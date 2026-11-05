"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Download, RotateCcw, Sliders, Palette, Grid } from "lucide-react";

/* ─────────────────────────────────────────────
   Batik Pattern Canvas / Studio Generator
   ───────────────────────────────────────────── */

type MotifType = "kawung" | "parang" | "truntum" | "mega-mendung" | "lereng" | "sidomukti";
type SymmetryType = "none" | "2x" | "4x" | "8x";

interface StudioConfig {
  motif: MotifType;
  primaryColor: string;
  secondaryColor: string;
  bgColor: string;
  scale: number;
  rotation: number;
  symmetry: SymmetryType;
  opacity: number;
}

const DEFAULT_CONFIG: StudioConfig = {
  motif: "kawung",
  primaryColor: "#C9A84C",
  secondaryColor: "#B87333",
  bgColor: "#1A0F07",
  scale: 1,
  rotation: 0,
  symmetry: "4x",
  opacity: 1,
};

const MOTIF_OPTIONS: { id: MotifType; label: string }[] = [
  { id: "kawung", label: "Kawung" },
  { id: "parang", label: "Parang" },
  { id: "truntum", label: "Truntum" },
  { id: "mega-mendung", label: "Mega Mendung" },
  { id: "lereng", label: "Lereng" },
  { id: "sidomukti", label: "Sidomukti" },
];

const SYMMETRY_OPTIONS: { id: SymmetryType; label: string }[] = [
  { id: "none", label: "Bebas" },
  { id: "2x", label: "2× Simetri" },
  { id: "4x", label: "4× Simetri" },
  { id: "8x", label: "8× Simetri" },
];

const PALETTE_PRESETS = [
  { name: "Klasik Keraton", primary: "#C9A84C", secondary: "#8B4513", bg: "#1a0a00" },
  { name: "Pesisir Pekalongan", primary: "#E63946", secondary: "#2196F3", bg: "#1a1a2e" },
  { name: "Mega Mendung Biru", primary: "#0096C7", secondary: "#90E0EF", bg: "#03045E" },
  { name: "Hijau Sogan", primary: "#4CAF50", secondary: "#8BC34A", bg: "#1a2a1a" },
  { name: "Ungu Modern", primary: "#9C27B0", secondary: "#E91E63", bg: "#120024" },
  { name: "Putih Klasik", primary: "#424242", secondary: "#795548", bg: "#F5F5F0" },
];

export default function BatikStudio() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const [config, setConfig] = useState<StudioConfig>(DEFAULT_CONFIG);
  const [downloading, setDownloading] = useState(false);
  const tick = useRef(0);

  /* ── Draw on canvas ── */
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const { motif, primaryColor, secondaryColor, bgColor, scale, rotation, symmetry, opacity } = config;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, W, H);

    const tileSize = Math.round(50 * scale);
    const cols = Math.ceil(W / tileSize) + 2;
    const rows = Math.ceil(H / tileSize) + 2;

    ctx.save();
    ctx.globalAlpha = opacity;

    for (let row = -1; row < rows; row++) {
      for (let col = -1; col < cols; col++) {
        const x = col * tileSize + (row % 2 === 0 ? 0 : tileSize / 2);
        const y = row * tileSize;
        ctx.save();
        ctx.translate(x + tileSize / 2, y + tileSize / 2);
        ctx.rotate((rotation * Math.PI) / 180);

        const mirrorX = symmetry !== "none" ? col % 2 === 0 : false;
        const mirrorY = (symmetry === "4x" || symmetry === "8x") ? row % 2 === 0 : false;

        if (mirrorX) ctx.scale(-1, 1);
        if (mirrorY) ctx.scale(1, -1);
        if (symmetry === "8x") {
          ctx.rotate((45 * (col + row)) * Math.PI / 180);
        }

        drawMotifUnit(ctx, motif, tileSize * 0.9, primaryColor, secondaryColor, tick.current);
        ctx.restore();
      }
    }

    ctx.restore();
  }, [config]);

  useEffect(() => {
    const animate = () => {
      tick.current += 0.5;
      draw();
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [draw]);

  /* ── Resize canvas to container ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = canvas.parentElement;
    if (!container) return;
    const resize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    resize();
    const obs = new ResizeObserver(resize);
    obs.observe(container);
    return () => obs.disconnect();
  }, []);

  const updateConfig = (patch: Partial<StudioConfig>) =>
    setConfig((c) => ({ ...c, ...patch }));

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setDownloading(true);
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `batik-${config.motif}-kawung.png`;
    a.click();
    setTimeout(() => setDownloading(false), 1000);
  };

  return (
    <section id="canvas" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-gold uppercase tracking-widest mb-3">
            <span className="w-6 h-px bg-gold" />
            Studio Interaktif
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Batik <span className="text-gradient-gold">Pattern Studio</span>
          </h2>
          <p className="mt-4 text-muted text-lg max-w-2xl">
            Rancang kain batikmu sendiri. Pilih motif, atur simetri, dan eksplorasi palet warna secara real-time.
          </p>
        </div>

        <div className="grid lg:grid-cols-[320px_1fr] gap-6">
          {/* Controls panel */}
          <div className="space-y-5">
            {/* Motif selector */}
            <ControlCard title="Motif Dasar">
              <div className="grid grid-cols-3 gap-2">
                {MOTIF_OPTIONS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => updateConfig({ motif: m.id })}
                    className={[
                      "py-2.5 px-2 rounded-xl border text-xs font-medium transition-all duration-200 text-center flex flex-col items-center justify-center gap-1",
                      config.motif === m.id
                        ? "border-gold bg-gold/15 text-gold font-semibold shadow-xs"
                        : "border-border hover:border-gold/40 text-muted hover:text-foreground bg-surface",
                    ].join(" ")}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
                    <span>{m.label}</span>
                  </button>
                ))}
              </div>
            </ControlCard>

            {/* Palette presets */}
            <ControlCard title="Palet Warna">
              <div className="grid grid-cols-2 gap-2 mb-3">
                {PALETTE_PRESETS.map((p) => (
                  <button
                    key={p.name}
                    onClick={() =>
                      updateConfig({
                        primaryColor: p.primary,
                        secondaryColor: p.secondary,
                        bgColor: p.bg,
                      })
                    }
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:border-gold/40 transition-all duration-200 text-left"
                  >
                    <div className="flex flex-col gap-0.5 flex-shrink-0">
                      <div className="w-3 h-3 rounded-full" style={{ background: p.primary }} />
                      <div className="w-3 h-3 rounded-full" style={{ background: p.secondary }} />
                    </div>
                    <span className="text-[11px] text-muted leading-tight">{p.name}</span>
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: "primaryColor", label: "Utama" },
                  { key: "secondaryColor", label: "Aksen" },
                  { key: "bgColor", label: "Latar" },
                ].map(({ key, label }) => (
                  <label key={key} className="flex flex-col gap-1 text-center">
                    <span className="text-[10px] text-muted">{label}</span>
                    <input
                      type="color"
                      value={config[key as keyof StudioConfig] as string}
                      onChange={(e) => updateConfig({ [key]: e.target.value })}
                      className="w-full h-8 rounded-lg border border-border cursor-pointer"
                    />
                  </label>
                ))}
              </div>
            </ControlCard>

            {/* Symmetry */}
            <ControlCard title="Simetri">
              <div className="grid grid-cols-2 gap-2">
                {SYMMETRY_OPTIONS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => updateConfig({ symmetry: s.id })}
                    className={[
                      "py-2 rounded-lg border text-xs font-medium transition-all duration-200",
                      config.symmetry === s.id
                        ? "border-gold bg-gold/15 text-gold"
                        : "border-border hover:border-gold/40 text-muted",
                    ].join(" ")}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </ControlCard>

            {/* Sliders */}
            <ControlCard title="Pengaturan">
              <div className="space-y-4">
                <SliderField
                  label="Skala"
                  value={config.scale}
                  min={0.5} max={3} step={0.1}
                  onChange={(v) => updateConfig({ scale: v })}
                  display={`${config.scale.toFixed(1)}×`}
                />
                <SliderField
                  label="Rotasi"
                  value={config.rotation}
                  min={0} max={360} step={5}
                  onChange={(v) => updateConfig({ rotation: v })}
                  display={`${config.rotation}°`}
                />
                <SliderField
                  label="Transparansi"
                  value={config.opacity}
                  min={0.1} max={1} step={0.05}
                  onChange={(v) => updateConfig({ opacity: v })}
                  display={`${Math.round(config.opacity * 100)}%`}
                />
              </div>
            </ControlCard>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setConfig(DEFAULT_CONFIG)}
                className="flex-1 py-2.5 rounded-xl border border-border text-muted text-sm hover:border-gold/40 hover:text-foreground transition-all duration-200 flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="flex-1 py-2.5 rounded-xl bg-gold text-warm-black text-sm font-semibold hover:bg-gold-light transition-all duration-200 hover:scale-[1.02] disabled:opacity-70 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>{downloading ? "Memproses..." : "Unduh PNG"}</span>
              </button>
            </div>
          </div>

          {/* Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl overflow-hidden border border-border"
            style={{ minHeight: "480px" }}
          >
            <canvas
              ref={canvasRef}
              id="batikCanvas"
              className="w-full h-full block"
              style={{ minHeight: "480px" }}
            />
            {/* Overlay label */}
            <div className="absolute bottom-4 right-4 glass border border-border rounded-xl px-3 py-1.5 text-xs text-muted">
              {MOTIF_OPTIONS.find((m) => m.id === config.motif)?.label} · {SYMMETRY_OPTIONS.find((s) => s.id === config.symmetry)?.label}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── Helper components ── */
function ControlCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass border border-border rounded-2xl p-4">
      <h4 className="text-xs font-semibold text-gold uppercase tracking-wider mb-3">{title}</h4>
      {children}
    </div>
  );
}

function SliderField({
  label, value, min, max, step, onChange, display,
}: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; display: string;
}) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-muted">{label}</span>
        <span className="text-gold font-mono">{display}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-gold"
      />
    </div>
  );
}

/* ── Canvas drawing functions ── */
function drawMotifUnit(
  ctx: CanvasRenderingContext2D,
  motif: MotifType,
  size: number,
  color1: string,
  color2: string,
  tick: number
) {
  const h = size / 2;
  ctx.strokeStyle = color1;
  ctx.fillStyle = color1;
  ctx.lineWidth = Math.max(1, size * 0.03);

  switch (motif) {
    case "kawung": {
      const r1 = h * 0.42, r2 = h * 0.28;
      ctx.beginPath(); ctx.ellipse(-h * 0.45, 0, r1, r2, 0, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(h * 0.45, 0, r1, r2, 0, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(0, -h * 0.45, r2, r1, 0, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(0, h * 0.45, r2, r1, 0, 0, Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = color2;
      ctx.beginPath(); ctx.arc(0, 0, h * 0.12, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(0, 0, h * 0.04, 0, Math.PI * 2);
      ctx.fillStyle = color2; ctx.fill();
      break;
    }
    case "parang": {
      ctx.lineWidth = Math.max(2, size * 0.05);
      for (let i = -1; i <= 1; i++) {
        ctx.beginPath();
        ctx.moveTo(i * h * 0.4 - h * 0.3, -h);
        ctx.quadraticCurveTo(i * h * 0.4 + h * 0.1, 0, i * h * 0.4 + h * 0.3, h);
        ctx.stroke();
        ctx.strokeStyle = color2;
        ctx.lineWidth = Math.max(1, size * 0.02);
        ctx.beginPath();
        ctx.moveTo(i * h * 0.4 - h * 0.1, -h);
        ctx.quadraticCurveTo(i * h * 0.4 + h * 0.3, 0, i * h * 0.4 + h * 0.5, h);
        ctx.stroke();
        ctx.strokeStyle = color1;
        ctx.lineWidth = Math.max(2, size * 0.05);
      }
      break;
    }
    case "truntum": {
      const petals = 8;
      for (let p = 0; p < petals; p++) {
        const angle = (p / petals) * Math.PI * 2;
        const px = Math.cos(angle) * h * 0.45;
        const py = Math.sin(angle) * h * 0.45;
        ctx.beginPath();
        ctx.arc(px, py, h * 0.18, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(0, 0, h * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = color2; ctx.fill();
      ctx.strokeStyle = color2;
      ctx.beginPath(); ctx.arc(0, 0, h * 0.1, 0, Math.PI * 2); ctx.fill();
      break;
    }
    case "mega-mendung": {
      const cloudColors = [color1, color2, color1 + "AA"];
      for (let l = 0; l < 3; l++) {
        ctx.strokeStyle = cloudColors[l];
        ctx.lineWidth = Math.max(1, size * 0.025) * (1 - l * 0.2);
        ctx.beginPath();
        ctx.moveTo(-h, (l - 1) * h * 0.33);
        ctx.quadraticCurveTo(-h * 0.3, (l - 1.5) * h * 0.33, 0, (l - 1) * h * 0.33);
        ctx.quadraticCurveTo(h * 0.3, (l - 0.5) * h * 0.33, h, (l - 1) * h * 0.33);
        ctx.stroke();
      }
      break;
    }
    case "lereng": {
      ctx.lineWidth = Math.max(2, size * 0.06);
      ctx.beginPath();
      ctx.moveTo(-h, h); ctx.lineTo(h, -h); ctx.stroke();
      ctx.strokeStyle = color2;
      ctx.lineWidth = Math.max(1, size * 0.025);
      ctx.beginPath();
      ctx.moveTo(-h * 0.5, h); ctx.lineTo(h, -h * 0.5); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-h, h * 0.5); ctx.lineTo(h * 0.5, -h); ctx.stroke();
      break;
    }
    case "sidomukti": {
      ctx.strokeRect(-h * 0.8, -h * 0.8, h * 1.6, h * 1.6);
      ctx.strokeStyle = color2;
      ctx.strokeRect(-h * 0.5, -h * 0.5, h, h);
      ctx.fillStyle = color1 + "30";
      ctx.fillRect(-h * 0.3, -h * 0.3, h * 0.6, h * 0.6);
      ctx.strokeStyle = color1;
      ctx.beginPath();
      ctx.moveTo(-h * 0.8, 0); ctx.lineTo(h * 0.8, 0); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, -h * 0.8); ctx.lineTo(0, h * 0.8); ctx.stroke();
      break;
    }
  }
}

