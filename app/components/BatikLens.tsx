"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Compass } from "lucide-react";

/* ─────────────────────────────────────────────
   Batik Lens — Interactive Motif Scanner
   ───────────────────────────────────────────── */

interface Hotspot {
  id: string;
  x: number; // percentage
  y: number;
  label: string;
  title: string;
  description: string;
  color: string;
}

interface FabricItem {
  id: string;
  name: string;
  region: string;
  year: string;
  bgGradient: string;
  pattern: React.ReactNode;
  hotspots: Hotspot[];
}

const FABRICS: FabricItem[] = [
  {
    id: "kawung",
    name: "Kawung Picis",
    region: "Yogyakarta",
    year: "Abad ke-9",
    bgGradient: "from-amber-950 to-amber-900",
    pattern: <KawungFabric />,
    hotspots: [
      {
        id: "center",
        x: 50, y: 50,
        label: "Inti Motif",
        title: "Titik Pusat — Kebijaksanaan",
        description: "Lingkaran tengah melambangkan raja atau penguasa yang menjadi pusat alam semesta kerajaan. Hanya kalangan keraton yang boleh mengenakannya.",
        color: "#C9A84C",
      },
      {
        id: "petal",
        x: 25, y: 35,
        label: "Kelopak",
        title: "Empat Kelopak — Arah Mata Angin",
        description: "Empat elips/kelopak merepresentasikan empat arah mata angin dan empat elemen alam: air, api, tanah, udara — simbol keseimbangan kosmis.",
        color: "#0E7490",
      },
      {
        id: "gap",
        x: 72, y: 68,
        label: "Ruang Antar",
        title: "Celah Kosong — Alam Semesta",
        description: "Ruang di antara kelopak bukan sekadar kosong — ia melambangkan alam semesta (jagat raya) yang mengelilingi kekuatan inti.",
        color: "#7C3AED",
      },
    ],
  },
  {
    id: "mega-mendung",
    name: "Mega Mendung",
    region: "Cirebon",
    year: "Abad ke-17",
    bgGradient: "from-blue-950 to-indigo-950",
    pattern: <MegaMendungFabric />,
    hotspots: [
      {
        id: "cloud",
        x: 40, y: 30,
        label: "Awan",
        title: "Mega — Kesabaran & Kedamaian",
        description: "Motif awan berlapis terinspirasi seni China dan Persia yang masuk via jalur perdagangan Sutra. Awan melambangkan ketenangan jiwa yang tinggi.",
        color: "#0E7490",
      },
      {
        id: "gradient",
        x: 65, y: 55,
        label: "Gradasi Warna",
        title: "7 Tingkatan Warna",
        description: "Tradisi asli Mega Mendung Cirebon memiliki 7 lapisan gradasi warna — semakin banyak lapisan, semakin tinggi tingkat keahlian si pembatik.",
        color: "#2563EB",
      },
      {
        id: "spiral",
        x: 30, y: 70,
        label: "Ujung Spiral",
        title: "Lingkaran — Siklus Kehidupan",
        description: "Ujung spiral pada awan mewakili siklus kehidupan manusia yang terus berputar — lahir, hidup, dan kembali ke alam.",
        color: "#7C3AED",
      },
    ],
  },
  {
    id: "parang",
    name: "Parang Rusak",
    region: "Surakarta",
    year: "Era Mataram",
    bgGradient: "from-purple-950 to-purple-900",
    pattern: <ParangFabric />,
    hotspots: [
      {
        id: "blade",
        x: 35, y: 40,
        label: "Bilah Parang",
        title: "Bilah — Ketajaman Pikiran",
        description: "Bentuk diagonal tajam seperti bilah pedang melambangkan ketajaman pikiran, keberanian, dan semangat ksatria yang pantang menyerah.",
        color: "#7C3AED",
      },
      {
        id: "wave",
        x: 60, y: 60,
        label: "Gerak Ombak",
        title: "Kontinuitas — Semangat Tak Padam",
        description: "Pola yang mengalir tanpa putus merefleksikan ombak laut Selatan — semangat manusia yang tidak pernah berhenti berjuang meski menghadapi badai.",
        color: "#C9A84C",
      },
      {
        id: "mlinjon",
        x: 75, y: 30,
        label: "Mlinjon",
        title: "Biji Mlinjon — Kesuburan",
        description: "Bentuk kecil di antara bilah parang disebut 'mlinjon' (biji melinjo), melambangkan benih kehidupan dan harapan kesuburan.",
        color: "#16A34A",
      },
    ],
  },
];

export default function BatikLens() {
  const [activeFabric, setActiveFabric] = useState<FabricItem>(FABRICS[0]);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [magnifier, setMagnifier] = useState<{ x: number; y: number } | null>(null);
  const fabricRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = fabricRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMagnifier({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section id="lens" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 batik-truntum-bg opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-gold uppercase tracking-widest mb-3">
            <span className="w-6 h-px bg-gold" />
            Batik Lens
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Pindai Makna{" "}
            <span className="text-gradient-gold">Tersembunyi</span>
          </h2>
          <p className="mt-4 text-muted text-lg max-w-2xl">
            Arahkan kursor pada titik-titik hotspot untuk mengungkap filosofi di setiap sudut motif batik.
          </p>
        </div>

        {/* Fabric selector */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {FABRICS.map((f) => (
            <button
              key={f.id}
              onClick={() => { setActiveFabric(f); setActiveHotspot(null); }}
              className={[
                "flex-shrink-0 px-5 py-2.5 rounded-full border text-sm font-medium transition-all duration-300",
                activeFabric.id === f.id
                  ? "border-gold bg-gold/15 text-gold"
                  : "border-border text-muted hover:border-gold/40 hover:text-foreground",
              ].join(" ")}
            >
              {f.name}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          {/* Fabric canvas */}
          <div
            ref={fabricRef}
            className={`relative rounded-3xl overflow-hidden border border-gold/30 cursor-crosshair bg-gradient-to-br ${activeFabric.bgGradient}`}
            style={{ minHeight: "480px" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMagnifier(null)}
          >
            {/* Pattern */}
            <div className="absolute inset-0 opacity-80">
              {activeFabric.pattern}
            </div>

            {/* Magnifier glass effect */}
            {magnifier && (
              <div
                className="absolute pointer-events-none z-20 w-24 h-24 rounded-full border-2 border-gold/60 shadow-xl overflow-hidden"
                style={{
                  left: `${magnifier.x}%`,
                  top: `${magnifier.y}%`,
                  transform: "translate(-50%, -50%)",
                  boxShadow: "0 0 0 2px rgba(201,168,76,0.3), 0 8px 32px rgba(0,0,0,0.5)",
                }}
              >
                <div
                  className="w-48 h-48 absolute"
                  style={{
                    left: `${50 - magnifier.x * 2}%`,
                    top: `${50 - magnifier.y * 2}%`,
                    transform: "scale(2)",
                    transformOrigin: "center",
                  }}
                >
                  {activeFabric.pattern}
                </div>
                <div className="absolute inset-0 ring-2 ring-gold/40 rounded-full" />
              </div>
            )}

            {/* Hotspots */}
            {activeFabric.hotspots.map((hs) => (
              <button
                key={hs.id}
                className="absolute z-10 group"
                style={{
                  left: `${hs.x}%`,
                  top: `${hs.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                onClick={() => setActiveHotspot(activeHotspot?.id === hs.id ? null : hs)}
                aria-label={hs.label}
              >
                {/* Ping ring */}
                <span
                  className="absolute inline-flex h-full w-full rounded-full opacity-75 hotspot-ring"
                  style={{ background: hs.color + "60" }}
                />
                {/* Dot */}
                <span
                  className="relative inline-flex w-5 h-5 rounded-full border-2 border-white/80 shadow-lg cursor-pointer hover:scale-125 transition-transform duration-200"
                  style={{ background: hs.color }}
                />
                {/* Tooltip */}
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 text-white text-[10px] px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {hs.label}
                </span>
              </button>
            ))}

            {/* Legend overlay */}
            <div className="absolute bottom-4 left-4 glass border border-gold/30 rounded-xl px-3 py-2 text-xs text-muted">
              {activeFabric.name} · {activeFabric.region} · {activeFabric.year}
            </div>
          </div>

          {/* Info panel */}
          <div className="flex flex-col gap-4">
            {/* Fabric info */}
            <div className="glass border border-border rounded-2xl p-5">
              <div className="text-xs text-gold uppercase tracking-wider mb-1">{activeFabric.region}</div>
              <h3 className="font-display text-xl font-bold mb-1">{activeFabric.name}</h3>
              <div className="text-xs text-muted">{activeFabric.year}</div>
            </div>

            {/* Hotspot list */}
            <div className="glass border border-border rounded-2xl p-5">
              <h4 className="text-xs font-semibold text-gold uppercase tracking-wider mb-3">
                Titik Makna ({activeFabric.hotspots.length})
              </h4>
              <div className="space-y-2">
                {activeFabric.hotspots.map((hs) => (
                  <button
                    key={hs.id}
                    onClick={() => setActiveHotspot(activeHotspot?.id === hs.id ? null : hs)}
                    className={[
                      "w-full text-left px-3 py-2.5 rounded-xl border transition-all duration-200",
                      activeHotspot?.id === hs.id
                        ? "border-current"
                        : "border-border hover:border-current/40",
                    ].join(" ")}
                    style={{ color: hs.color }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: hs.color }} />
                      <span className="text-xs font-semibold text-foreground">{hs.label}</span>
                    </div>
                    <div className="text-[11px] text-muted mt-0.5 ml-4.5">{hs.title}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Active hotspot detail */}
            <AnimatePresence>
              {activeHotspot && (
                <motion.div
                  key={activeHotspot.id}
                  initial={{ opacity: 0, y: 12, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -12, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl border p-5 overflow-hidden"
                  style={{
                    borderColor: activeHotspot.color + "40",
                    background: activeHotspot.color + "0C",
                  }}
                >
                  <div
                    className="text-xs font-semibold uppercase tracking-wider mb-1"
                    style={{ color: activeHotspot.color }}
                  >
                    {activeHotspot.label}
                  </div>
                  <h4 className="font-display text-base font-bold text-foreground mb-2">
                    {activeHotspot.title}
                  </h4>
                  <p className="text-sm text-muted leading-relaxed">
                    {activeHotspot.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {!activeHotspot && (
              <div className="glass border border-dashed border-border rounded-2xl p-6 text-center text-sm text-muted">
                <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center mx-auto mb-3">
                  <Search className="w-5 h-5" />
                </div>
                Arahkan kursor atau sentuh titik interaktif pada kain untuk mempelajari filosofi tiap lekukan motif.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── SVG Fabric Patterns (tiled) ── */
function KawungFabric() {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="kawung-fab" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <ellipse cx="20" cy="40" rx="17" ry="12" fill="none" stroke="#C9A84C" strokeWidth="1.5" />
          <ellipse cx="60" cy="40" rx="17" ry="12" fill="none" stroke="#C9A84C" strokeWidth="1.5" />
          <ellipse cx="40" cy="20" rx="12" ry="17" fill="none" stroke="#C9A84C" strokeWidth="1.5" />
          <ellipse cx="40" cy="60" rx="12" ry="17" fill="none" stroke="#C9A84C" strokeWidth="1.5" />
          <circle cx="40" cy="40" r="5" fill="#C9A84C" opacity="0.9" />
          <circle cx="40" cy="40" r="2" fill="#B87333" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#kawung-fab)" />
    </svg>
  );
}

function MegaMendungFabric() {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="mm-fab" x="0" y="0" width="120" height="80" patternUnits="userSpaceOnUse">
          {[0, 1, 2, 3].map((l) => (
            <path
              key={l}
              d={`M-10 ${20 + l * 15} Q30 ${12 + l * 15} 60 ${20 + l * 15} Q90 ${28 + l * 15} 130 ${20 + l * 15}`}
              fill="none"
              stroke={`hsl(${200 + l * 10}, 70%, ${40 + l * 10}%)`}
              strokeWidth={3 - l * 0.5}
              opacity={1 - l * 0.15}
            />
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#mm-fab)" />
    </svg>
  );
}

function ParangFabric() {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="parang-fab" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M5 60 Q20 30 35 0" fill="none" stroke="#9333EA" strokeWidth="3" strokeLinecap="round" />
          <path d="M20 60 Q35 30 50 0" fill="none" stroke="#9333EA" strokeWidth="3" strokeLinecap="round" />
          <path d="M12 60 Q27 30 42 0" fill="none" stroke="#C084FC" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
          <circle cx="10" cy="30" r="3" fill="#C9A84C" opacity="0.7" />
          <circle cx="40" cy="15" r="2" fill="#C9A84C" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#parang-fab)" />
    </svg>
  );
}

