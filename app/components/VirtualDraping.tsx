"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────────
   Virtual Draping Preview
   ───────────────────────────────────────────── */

type GarmentType = "kemeja" | "outer" | "blazer" | "dress";
type MotifId = "kawung" | "parang" | "mega-mendung" | "truntum" | "sidomukti" | "lereng";

interface DrapeConfig {
  garment: GarmentType;
  motif: MotifId;
  primaryColor: string;
  bgColor: string;
  style: "formal" | "casual" | "modern";
}

const GARMENTS: { id: GarmentType; label: string; icon: string }[] = [
  { id: "kemeja", label: "Kemeja", icon: "👔" },
  { id: "outer", label: "Outerwear", icon: "🧥" },
  { id: "blazer", label: "Blazer", icon: "🤵" },
  { id: "dress", label: "Dress", icon: "👗" },
];

const MOTIF_CHOICES: { id: MotifId; label: string; color: string; bg: string }[] = [
  { id: "kawung", label: "Kawung", color: "#C9A84C", bg: "#1a0a00" },
  { id: "parang", label: "Parang", color: "#7C3AED", bg: "#2d1b69" },
  { id: "mega-mendung", label: "Mega Mendung", color: "#0096C7", bg: "#03045E" },
  { id: "truntum", label: "Truntum", color: "#B45309", bg: "#1a0a00" },
  { id: "sidomukti", label: "Sidomukti", color: "#16A34A", bg: "#14532d" },
  { id: "lereng", label: "Lereng", color: "#9D174D", bg: "#4a1942" },
];

const DEFAULT_CONFIG: DrapeConfig = {
  garment: "kemeja",
  motif: "kawung",
  primaryColor: "#C9A84C",
  bgColor: "#1a0a00",
  style: "modern",
};

export default function VirtualDraping() {
  const [config, setConfig] = useState<DrapeConfig>(DEFAULT_CONFIG);
  const [rotating, setRotating] = useState(false);
  const [view, setView] = useState<"front" | "back">("front");

  const update = (patch: Partial<DrapeConfig>) => setConfig((c) => ({ ...c, ...patch }));

  const handleMotif = (m: (typeof MOTIF_CHOICES)[0]) => {
    update({ motif: m.id, primaryColor: m.color, bgColor: m.bg });
  };

  const handleRotate = () => {
    setRotating(true);
    setTimeout(() => {
      setView((v) => (v === "front" ? "back" : "front"));
      setRotating(false);
    }, 400);
  };

  return (
    <section id="draping" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 batik-kawung-bg opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-gold uppercase tracking-widest mb-3">
            <span className="w-6 h-px bg-gold" />
            Virtual Draping
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Batik di{" "}
            <span className="text-gradient-gold">Pakaian Modern</span>
          </h2>
          <p className="mt-4 text-muted text-lg max-w-2xl">
            Visualisasikan bagaimana motif batik klasik terlihat elegan dalam siluet pakaian kontemporer.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_280px] gap-8 items-start">
          {/* Preview area */}
          <div className="relative">
            <div className="relative mx-auto max-w-xs">
              {/* Mannequin silhouette with batik draping */}
              <motion.div
                animate={{ rotateY: rotating ? 90 : 0 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <GarmentPreview
                  garment={config.garment}
                  motif={config.motif}
                  primaryColor={config.primaryColor}
                  bgColor={config.bgColor}
                  view={view}
                />
              </motion.div>

              {/* Controls overlay */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button
                  onClick={handleRotate}
                  className="w-10 h-10 rounded-full glass border border-gold/30 flex items-center justify-center hover:border-gold transition-all text-gold text-sm"
                  title="Putar"
                >
                  ↻
                </button>
                <div className="w-10 h-10 rounded-full glass border border-border flex items-center justify-center text-xs text-muted">
                  {view === "front" ? "F" : "B"}
                </div>
              </div>

              {/* Label */}
              <div className="text-center mt-4">
                <div className="text-xs text-muted">
                  {GARMENTS.find((g) => g.id === config.garment)?.label} ·{" "}
                  {MOTIF_CHOICES.find((m) => m.id === config.motif)?.label} ·{" "}
                  {view === "front" ? "Tampak Depan" : "Tampak Belakang"}
                </div>
              </div>
            </div>

            {/* Style context cards */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              {(["formal", "casual", "modern"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => update({ style: s })}
                  className={[
                    "py-2.5 rounded-xl border text-xs font-medium transition-all duration-200 capitalize",
                    config.style === s
                      ? "border-gold bg-gold/15 text-gold"
                      : "border-border text-muted hover:border-gold/30",
                  ].join(" ")}
                >
                  {s === "formal" ? "🏛️ Formal" : s === "casual" ? "☕ Kasual" : "✨ Modern"}
                </button>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-5">
            {/* Garment selector */}
            <div className="glass border border-border rounded-2xl p-4">
              <h4 className="text-xs font-semibold text-gold uppercase tracking-wider mb-3">Jenis Pakaian</h4>
              <div className="grid grid-cols-2 gap-2">
                {GARMENTS.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => update({ garment: g.id })}
                    className={[
                      "py-3 rounded-xl border text-xs font-medium transition-all duration-200 flex flex-col items-center gap-1",
                      config.garment === g.id
                        ? "border-gold bg-gold/15 text-gold"
                        : "border-border text-muted hover:border-gold/30 hover:text-foreground",
                    ].join(" ")}
                  >
                    <span className="text-xl">{g.icon}</span>
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Motif selector */}
            <div className="glass border border-border rounded-2xl p-4">
              <h4 className="text-xs font-semibold text-gold uppercase tracking-wider mb-3">Motif Batik</h4>
              <div className="space-y-2">
                {MOTIF_CHOICES.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => handleMotif(m)}
                    className={[
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all duration-200",
                      config.motif === m.id
                        ? "border-current bg-current/10"
                        : "border-border hover:border-current/30",
                    ].join(" ")}
                    style={{ color: m.color }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex-shrink-0 overflow-hidden"
                      style={{ background: m.bg }}
                    >
                      <MiniMotifThumb motif={m.id} color={m.color} />
                    </div>
                    <span className="text-sm font-medium text-foreground">{m.label}</span>
                    {config.motif === m.id && (
                      <span className="ml-auto text-xs">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Info card */}
            <div className="glass border border-gold/20 rounded-2xl p-4 bg-gold/5">
              <h4 className="text-xs font-semibold text-gold mb-2">💡 Batik dalam Mode</h4>
              <p className="text-xs text-muted leading-relaxed">
                Desainer Indonesia seperti Didiet Maulana, Oscar Lawalata, dan Anne Avantie telah membawa 
                batik ke panggung mode internasional — membuktikan bahwa warisan bisa selaras dengan modernitas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Garment SVG Preview ── */
function GarmentPreview({
  garment, motif, primaryColor, bgColor, view,
}: {
  garment: GarmentType;
  motif: MotifId;
  primaryColor: string;
  bgColor: string;
  view: "front" | "back";
}) {
  const patternId = `drape-${garment}-${motif}`;

  return (
    <svg
      viewBox="0 0 300 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full drop-shadow-2xl"
    >
      <defs>
        <MotifPattern id={patternId} motif={motif} color={primaryColor} bg={bgColor} />
        <filter id="fabric-shadow">
          <feDropShadow dx="4" dy="8" stdDeviation="8" floodOpacity="0.4" />
        </filter>
      </defs>

      {garment === "kemeja" && <ShirtShape patternId={patternId} view={view} primaryColor={primaryColor} />}
      {garment === "outer" && <OuterShape patternId={patternId} view={view} primaryColor={primaryColor} />}
      {garment === "blazer" && <BlazerShape patternId={patternId} view={view} primaryColor={primaryColor} />}
      {garment === "dress" && <DressShape patternId={patternId} view={view} primaryColor={primaryColor} />}
    </svg>
  );
}

function ShirtShape({ patternId, view, primaryColor }: { patternId: string; view: string; primaryColor: string }) {
  return (
    <g filter="url(#fabric-shadow)">
      {/* Body */}
      <path
        d="M80 90 L60 70 L40 80 L30 120 L50 125 L50 360 L250 360 L250 125 L270 120 L260 80 L240 70 L220 90 L200 75 L150 70 L100 75 Z"
        fill={`url(#${patternId})`}
      />
      {/* Collar */}
      <path
        d="M150 70 L130 90 L150 85 L170 90 Z"
        fill={primaryColor} opacity="0.8"
      />
      {/* Left sleeve */}
      <path
        d="M80 90 L40 80 L25 150 L55 155 L60 125 L80 115 Z"
        fill={`url(#${patternId})`} opacity="0.9"
      />
      {/* Right sleeve */}
      <path
        d="M220 90 L260 80 L275 150 L245 155 L240 125 L220 115 Z"
        fill={`url(#${patternId})`} opacity="0.9"
      />
      {/* Button line */}
      {view === "front" && (
        <>
          <line x1="150" y1="80" x2="150" y2="360" stroke={primaryColor} strokeWidth="1" opacity="0.4" />
          {[110, 150, 190, 230, 270, 310].map((y) => (
            <circle key={y} cx="150" cy={y} r="3" fill={primaryColor} opacity="0.7" />
          ))}
        </>
      )}
      {/* Outline */}
      <path
        d="M80 90 L60 70 L40 80 L30 120 L50 125 L50 360 L250 360 L250 125 L270 120 L260 80 L240 70 L220 90 L200 75 L150 70 L100 75 Z"
        fill="none" stroke={primaryColor} strokeWidth="1.5" opacity="0.4"
      />
    </g>
  );
}

function OuterShape({ patternId, view, primaryColor }: { patternId: string; view: string; primaryColor: string }) {
  return (
    <g filter="url(#fabric-shadow)">
      <path
        d="M70 80 L40 65 L20 80 L15 140 L45 148 L45 370 L255 370 L255 148 L285 140 L280 80 L260 65 L230 80 L205 60 L150 55 L95 60 Z"
        fill={`url(#${patternId})`}
      />
      {/* Lapels */}
      <path
        d="M150 55 L120 95 L150 90 L180 95 Z"
        fill={primaryColor} opacity="0.6"
      />
      <path
        d="M70 80 L20 80 L15 140 L45 148 L50 120 L75 100 Z"
        fill={`url(#${patternId})`} opacity="0.85"
      />
      <path
        d="M230 80 L280 80 L285 140 L255 148 L250 120 L225 100 Z"
        fill={`url(#${patternId})`} opacity="0.85"
      />
      <path
        d="M70 80 L40 65 L20 80 L15 140 L45 148 L45 370 L255 370 L255 148 L285 140 L280 80 L260 65 L230 80 L205 60 L150 55 L95 60 Z"
        fill="none" stroke={primaryColor} strokeWidth="1.5" opacity="0.4"
      />
    </g>
  );
}

function BlazerShape({ patternId, view, primaryColor }: { patternId: string; view: string; primaryColor: string }) {
  return (
    <g filter="url(#fabric-shadow)">
      <path
        d="M75 85 L50 70 L30 85 L25 135 L55 140 L55 355 L245 355 L245 140 L275 135 L270 85 L250 70 L225 85 L200 68 L150 62 L100 68 Z"
        fill={`url(#${patternId})`}
      />
      {/* Blazer lapels */}
      <path d="M150 62 L115 100 L135 95 L150 70 L165 95 L185 100 Z" fill={primaryColor} opacity="0.7" />
      {/* Pocket */}
      <rect x="65" y="220" width="40" height="25" rx="3" fill={primaryColor} opacity="0.3" stroke={primaryColor} strokeWidth="1" />
      {/* Sleeves */}
      <path d="M75 85 L30 85 L20 155 L52 158 L55 125 L78 108 Z" fill={`url(#${patternId})`} opacity="0.9" />
      <path d="M225 85 L270 85 L280 155 L248 158 L245 125 L222 108 Z" fill={`url(#${patternId})`} opacity="0.9" />
      <path
        d="M75 85 L50 70 L30 85 L25 135 L55 140 L55 355 L245 355 L245 140 L275 135 L270 85 L250 70 L225 85 L200 68 L150 62 L100 68 Z"
        fill="none" stroke={primaryColor} strokeWidth="1.5" opacity="0.35"
      />
    </g>
  );
}

function DressShape({ patternId, view, primaryColor }: { patternId: string; view: string; primaryColor: string }) {
  return (
    <g filter="url(#fabric-shadow)">
      {/* Bodice */}
      <path
        d="M100 70 L80 85 L60 80 L55 130 L80 135 L80 200 L220 200 L220 135 L245 130 L240 80 L220 85 L200 70 L150 60 Z"
        fill={`url(#${patternId})`}
      />
      {/* Skirt */}
      <path
        d="M80 200 L50 390 L250 390 L220 200 Z"
        fill={`url(#${patternId})`} opacity="0.9"
      />
      {/* Waistband */}
      <rect x="80" y="193" width="140" height="14" rx="4" fill={primaryColor} opacity="0.5" />
      {/* Neckline */}
      <path d="M150 60 L130 80 L150 75 L170 80 Z" fill={primaryColor} opacity="0.5" />
      {/* Outline */}
      <path
        d="M100 70 L80 85 L60 80 L55 130 L80 135 L80 200 L50 390 L250 390 L220 200 L220 135 L245 130 L240 80 L220 85 L200 70 L150 60 Z"
        fill="none" stroke={primaryColor} strokeWidth="1.5" opacity="0.4"
      />
    </g>
  );
}

function MotifPattern({ id, motif, color, bg }: { id: string; motif: MotifId; color: string; bg: string }) {
  const size = 40;
  return (
    <pattern id={id} x="0" y="0" width={size} height={size} patternUnits="userSpaceOnUse">
      <rect width={size} height={size} fill={bg} />
      {motif === "kawung" && (
        <>
          <ellipse cx="10" cy="20" rx="8" ry="5.5" fill="none" stroke={color} strokeWidth="1" opacity="0.7" />
          <ellipse cx="30" cy="20" rx="8" ry="5.5" fill="none" stroke={color} strokeWidth="1" opacity="0.7" />
          <ellipse cx="20" cy="10" rx="5.5" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.7" />
          <ellipse cx="20" cy="30" rx="5.5" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.7" />
          <circle cx="20" cy="20" r="3" fill={color} opacity="0.8" />
        </>
      )}
      {motif === "parang" && (
        <>
          <path d="M3 40 Q12 20 20 0" fill="none" stroke={color} strokeWidth="2.5" opacity="0.8" />
          <path d="M18 40 Q27 20 35 0" fill="none" stroke={color} strokeWidth="2.5" opacity="0.8" />
          <path d="M10 40 Q19 20 27 0" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
        </>
      )}
      {motif === "mega-mendung" && (
        <>
          {[0, 1, 2].map((l) => (
            <path key={l}
              d={`M-2 ${8 + l * 11} Q10 ${4 + l * 11} 20 ${8 + l * 11} Q30 ${12 + l * 11} 42 ${8 + l * 11}`}
              fill="none" stroke={color} strokeWidth={2 - l * 0.4} opacity={0.9 - l * 0.2}
            />
          ))}
        </>
      )}
      {motif === "truntum" && (
        <>
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2;
            return <circle key={i} cx={20 + Math.cos(a) * 11} cy={20 + Math.sin(a) * 11} r="3.5" fill={color} opacity="0.75" />;
          })}
          <circle cx="20" cy="20" r="4" fill={color} />
        </>
      )}
      {motif === "sidomukti" && (
        <>
          <rect x="4" y="4" width="32" height="32" fill="none" stroke={color} strokeWidth="1.5" opacity="0.7" />
          <rect x="11" y="11" width="18" height="18" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
          <rect x="16" y="16" width="8" height="8" fill={color} opacity="0.3" />
        </>
      )}
      {motif === "lereng" && (
        <>
          {Array.from({ length: 4 }).map((_, i) => (
            <line key={i} x1={i * 12 - 8} y1="0" x2={i * 12 + 42} y2={size}
              stroke={color} strokeWidth={i % 2 === 0 ? 2.5 : 1} opacity={i % 2 === 0 ? 0.8 : 0.35}
            />
          ))}
        </>
      )}
    </pattern>
  );
}

function MiniMotifThumb({ motif, color }: { motif: MotifId; color: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      {motif === "kawung" && (
        <>
          <ellipse cx="8" cy="16" rx="6" ry="4" stroke={color} strokeWidth="1.5" />
          <ellipse cx="24" cy="16" rx="6" ry="4" stroke={color} strokeWidth="1.5" />
          <ellipse cx="16" cy="8" rx="4" ry="6" stroke={color} strokeWidth="1.5" />
          <ellipse cx="16" cy="24" rx="4" ry="6" stroke={color} strokeWidth="1.5" />
          <circle cx="16" cy="16" r="2.5" fill={color} />
        </>
      )}
      {motif === "parang" && (
        <path d="M4 32 Q12 16 20 0M14 32 Q22 16 30 0" fill="none" stroke={color} strokeWidth="2.5" />
      )}
      {motif === "mega-mendung" && (
        <>
          <path d="M2 10 Q8 5 16 10 Q24 15 30 10" fill="none" stroke={color} strokeWidth="2" />
          <path d="M2 20 Q8 15 16 20 Q24 25 30 20" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
        </>
      )}
      {motif === "truntum" && (
        <>
          {Array.from({ length: 6 }).map((_, i) => {
            const a = (i / 6) * Math.PI * 2;
            return <circle key={i} cx={16 + Math.cos(a) * 9} cy={16 + Math.sin(a) * 9} r="3" fill={color} opacity="0.8" />;
          })}
          <circle cx="16" cy="16" r="4" fill={color} />
        </>
      )}
      {motif === "sidomukti" && (
        <>
          <rect x="4" y="4" width="24" height="24" fill="none" stroke={color} strokeWidth="2" />
          <rect x="9" y="9" width="14" height="14" fill="none" stroke={color} strokeWidth="1.2" />
          <rect x="13" y="13" width="6" height="6" fill={color} opacity="0.5" />
        </>
      )}
      {motif === "lereng" && (
        <>
          {Array.from({ length: 3 }).map((_, i) => (
            <line key={i} x1={i * 12 - 4} y1="0" x2={i * 12 + 28} y2="32"
              stroke={color} strokeWidth={i % 2 === 0 ? 2.5 : 1.2} opacity={i % 2 === 0 ? 0.9 : 0.4}
            />
          ))}
        </>
      )}
    </svg>
  );
}

