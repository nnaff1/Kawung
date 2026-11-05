"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────
   Gallery Showcase + Modal
   ───────────────────────────────────────────── */

type Region = "semua" | "yogyakarta" | "surakarta" | "cirebon" | "pekalongan";

interface GalleryItem {
  id: string;
  name: string;
  region: Region;
  technique: string;
  year: string;
  colors: string[];
  pattern: React.ReactNode;
  philosophy: string;
  significance: string;
  funFact: string;
}

const GALLERY: GalleryItem[] = [
  {
    id: "kawung",
    name: "Kawung Picis",
    region: "yogyakarta",
    technique: "Tulis",
    year: "Abad ke-9",
    colors: ["#1a3a6b", "#C9A84C", "#2C1810"],
    pattern: <GalleryPattern id="kawung" />,
    philosophy: "Kesucian jiwa dan keadilan — simbol buah kolang-kaling (buah aren) yang melambangkan empat arah mata angin dan unsur alam.",
    significance: "Motif ini hanya boleh dikenakan oleh kalangan keraton dan raja. Kawung adalah salah satu motif tertua dalam sejarah batik Jawa, ditemukan dalam relief Candi Prambanan.",
    funFact: "Motif kawung pernah ditemukan pada arca dewa-dewi Hindu di Jawa, menunjukkan usianya yang lebih dari 1.000 tahun!",
  },
  {
    id: "parang",
    name: "Parang Rusak Barong",
    region: "surakarta",
    technique: "Tulis",
    year: "Era Mataram Islam",
    colors: ["#2d1b69", "#7c3aed", "#C9A84C"],
    pattern: <GalleryPattern id="parang" />,
    philosophy: "Kekuatan ksatria dan pantang menyerah — gerak ombak laut yang tak pernah berhenti meskipun diterpa badai.",
    significance: "Parang Rusak Barong adalah motif parang terbesar dan paling sakral. Hanya Sultan yang boleh mengenakannya di keraton.",
    funFact: "Kata 'barong' berarti singa — motif ini melambangkan raja singa di lautan kehidupan.",
  },
  {
    id: "mega-mendung",
    name: "Mega Mendung",
    region: "cirebon",
    technique: "Tulis & Cap",
    year: "Abad ke-17",
    colors: ["#03045E", "#0096C7", "#90E0EF"],
    pattern: <GalleryPattern id="mega-mendung" />,
    philosophy: "Ketenangan jiwa dan kedamaian hati — awan yang membawa hujan sebagai berkah kehidupan dari langit.",
    significance: "Mega Mendung merupakan ikon batik Cirebon, terpengaruh budaya Tiongkok via jalur sutra maritim. Tercatat dalam naskah keraton sejak abad ke-17.",
    funFact: "Proses pembuatan Mega Mendung asli memerlukan 7 lapisan gradasi warna — semakin banyak lapisan, semakin mahal harganya!",
  },
  {
    id: "truntum",
    name: "Truntum",
    region: "surakarta",
    technique: "Tulis",
    year: "Abad ke-18",
    colors: ["#1a0a00", "#B45309", "#fbbf24"],
    pattern: <GalleryPattern id="truntum" />,
    philosophy: "Cinta yang tumbuh kembali seperti bintang di langit malam — 'truntum' berasal dari kata 'taruntum' yang berarti tumbuh kembali.",
    significance: "Diciptakan Ratu Kencana saat bertafakur menanti suaminya, Paku Buwono III. Motif ini sering dipakai orang tua pengantin sebagai doa restu.",
    funFact: "Ratu Kencana membuat motif ini dalam sunyi dan kesedihan — itulah mengapa filosofi truntum sangat dalam tentang kesetiaan.",
  },
  {
    id: "sidomukti",
    name: "Sidomukti",
    region: "surakarta",
    technique: "Tulis",
    year: "Era Kasunanan",
    colors: ["#14532d", "#166534", "#C9A84C"],
    pattern: <GalleryPattern id="sidomukti" />,
    philosophy: "Kemakmuran abadi dan keberkahan hidup — 'sido' berarti terus-menerus, 'mukti' berarti mulia dan sejahtera.",
    significance: "Wajib dipakai pengantin putri Solo dalam prosesi pernikahan adat. Motif ini adalah doa kemuliaan dan kesejahteraan bagi pasangan baru.",
    funFact: "Di upacara adat Jawa, orang tua pengantin memakai Truntum sementara pengantin memakai Sidomukti — keduanya saling melengkapi.",
  },
  {
    id: "lereng",
    name: "Lereng Parang",
    region: "yogyakarta",
    technique: "Cap",
    year: "Abad ke-19",
    colors: ["#4a1942", "#9D174D", "#C9A84C"],
    pattern: <GalleryPattern id="lereng" />,
    philosophy: "Kerendahan hati dan kewaspadaan dalam melangkah — garis diagonal mengajarkan manusia untuk selalu menjaga keseimbangan.",
    significance: "Lereng adalah penyederhanaan dari Parang, cocok untuk pakaian sehari-hari. Popularitasnya tinggi di kalangan pejabat dan priyayi.",
    funFact: "Kata 'lereng' berarti lereng gunung — seperti lereng, hidup harus dijalani dengan hati-hati agar tidak tergelincir.",
  },
  {
    id: "tambal",
    name: "Tambal Sewu",
    region: "pekalongan",
    technique: "Tulis",
    year: "Abad ke-20",
    colors: ["#1e1b4b", "#7c3aed", "#ec4899", "#f97316"],
    pattern: <GalleryPattern id="tambal" />,
    philosophy: "Penyempurnaan dan penyembuhan — batik tambal dipercaya dapat menyembuhkan penyakit bila dijadikan selimut bagi orang sakit.",
    significance: "Merupakan gabungan berbagai motif berbeda dalam satu kain — melambangkan persatuan dalam keberagaman Nusantara.",
    funFact: "Kata 'tambal' berarti menambal/memperbaiki. Orang yang sakit diyakini bisa sembuh jika diselimuti batik tambal!",
  },
  {
    id: "pekalongan-buketan",
    name: "Buketan Pekalongan",
    region: "pekalongan",
    technique: "Tulis & Cap",
    year: "Abad ke-19",
    colors: ["#1a2a1a", "#16a34a", "#ec4899", "#f97316"],
    pattern: <GalleryPattern id="buketan" />,
    philosophy: "Keindahan alam dan kegembiraan hidup — buket bunga melambangkan suka cita dan harapan masa depan yang cerah.",
    significance: "Merupakan perpaduan seni batik Jawa dengan pengaruh Eropa (Belanda) dan Tionghoa — mencerminkan kota Pekalongan sebagai melting pot budaya.",
    funFact: "Batik Pekalongan terkenal dengan warnanya yang paling cerah dan berani di antara semua sentra batik Indonesia!",
  },
];

const REGION_FILTERS: { id: Region; label: string; count: number }[] = [
  { id: "semua", label: "Semua", count: GALLERY.length },
  { id: "yogyakarta", label: "Yogyakarta", count: GALLERY.filter((g) => g.region === "yogyakarta").length },
  { id: "surakarta", label: "Surakarta / Solo", count: GALLERY.filter((g) => g.region === "surakarta").length },
  { id: "cirebon", label: "Cirebon", count: GALLERY.filter((g) => g.region === "cirebon").length },
  { id: "pekalongan", label: "Pekalongan", count: GALLERY.filter((g) => g.region === "pekalongan").length },
];

export default function GallerySection() {
  const [activeRegion, setActiveRegion] = useState<Region>("semua");
  const [modalItem, setModalItem] = useState<GalleryItem | null>(null);

  const filtered = activeRegion === "semua"
    ? GALLERY
    : GALLERY.filter((g) => g.region === activeRegion);

  return (
    <section id="gallery" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-gold uppercase tracking-widest mb-3">
            <span className="w-6 h-px bg-gold" />
            Galeri Koleksi
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Motif dari{" "}
            <span className="text-gradient-gold">Penjuru Nusantara</span>
          </h2>
          <p className="mt-4 text-muted text-lg max-w-2xl">
            Koleksi motif batik representatif dari empat sentra utama. Klik kartu untuk membaca filosofi lengkapnya.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-10 overflow-x-auto pb-2 flex-wrap">
          {REGION_FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveRegion(f.id)}
              className={[
                "flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-300 whitespace-nowrap",
                activeRegion === f.id
                  ? "border-gold bg-gold/15 text-gold"
                  : "border-border text-muted hover:border-gold/40 hover:text-foreground",
              ].join(" ")}
            >
              {f.label}
              <span
                className={[
                  "text-xs px-1.5 py-0.5 rounded-full",
                  activeRegion === f.id ? "bg-gold/20 text-gold" : "bg-border/50 text-muted",
                ].join(" ")}
              >
                {f.count}
              </span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <GalleryCard item={item} onClick={() => setModalItem(item)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalItem && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && setModalItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 32 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-2xl w-full glass border border-gold/30 rounded-3xl overflow-hidden"
            >
              {/* Pattern preview header */}
              <div
                className="relative h-48 flex items-center justify-center overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${modalItem.colors[0]}, ${modalItem.colors[1] || modalItem.colors[0]})` }}
              >
                <div className="w-full h-full absolute opacity-80">
                  {modalItem.pattern}
                </div>
                <div className="relative z-10 text-center px-6">
                  <div className="font-display text-3xl font-bold text-white/95 drop-shadow-lg">
                    {modalItem.name}
                  </div>
                </div>
                <button
                  onClick={() => setModalItem(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {/* Info */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {[
                    { label: "Daerah", value: modalItem.region.charAt(0).toUpperCase() + modalItem.region.slice(1) },
                    { label: "Teknik", value: modalItem.technique },
                    { label: "Era", value: modalItem.year },
                  ].map((m) => (
                    <div key={m.label} className="px-3 py-1.5 rounded-xl bg-gold/10 border border-gold/20">
                      <div className="text-[10px] text-muted">{m.label}</div>
                      <div className="text-xs font-semibold text-gold">{m.value}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <ModalSection icon="🧘" title="Filosofi" text={modalItem.philosophy} />
                  <ModalSection icon="🏛️" title="Makna Budaya" text={modalItem.significance} />
                  <div className="rounded-xl bg-amber-500/8 border border-amber-500/20 p-4">
                    <div className="text-xs font-semibold text-amber-500 mb-1">💡 Tahukah Kamu?</div>
                    <p className="text-sm text-muted">{modalItem.funFact}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function GalleryCard({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="w-full text-left rounded-2xl border border-border overflow-hidden hover:border-gold/40 transition-all duration-300 hover:shadow-lg group"
      style={{
        background: `linear-gradient(160deg, ${item.colors[0]}CC, ${item.colors[1] || item.colors[0]}88)`,
      }}
    >
      {/* Pattern */}
      <div className="relative h-36 overflow-hidden">
        <div className="absolute inset-0 opacity-70 group-hover:opacity-90 transition-opacity duration-300">
          {item.pattern}
        </div>
        {/* Technique badge */}
        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/50 text-[10px] text-white/80 font-medium">
          {item.technique}
        </div>
      </div>
      {/* Text */}
      <div className="p-3">
        <div className="text-[10px] text-gold/70 uppercase tracking-wide mb-0.5">
          {item.region.charAt(0).toUpperCase() + item.region.slice(1)}
        </div>
        <div className="text-sm font-semibold text-white/90 leading-tight">{item.name}</div>
        <div className="mt-2 text-[10px] text-white/40 group-hover:text-white/60 transition-colors">
          Klik untuk filosofi →
        </div>
      </div>
    </motion.button>
  );
}

function ModalSection({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div>
      <h4 className="text-xs font-semibold text-gold uppercase tracking-wider mb-1.5">
        {icon} {title}
      </h4>
      <p className="text-sm text-muted leading-relaxed">{text}</p>
    </div>
  );
}

/* ── Gallery SVG Patterns ── */
function GalleryPattern({ id }: { id: string }) {
  const patterns: Record<string, React.ReactNode> = {
    kawung: (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`gal-${id}`} x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <ellipse cx="12" cy="25" rx="10" ry="7" fill="none" stroke="#C9A84C" strokeWidth="1.2" />
            <ellipse cx="38" cy="25" rx="10" ry="7" fill="none" stroke="#C9A84C" strokeWidth="1.2" />
            <ellipse cx="25" cy="12" rx="7" ry="10" fill="none" stroke="#C9A84C" strokeWidth="1.2" />
            <ellipse cx="25" cy="38" rx="7" ry="10" fill="none" stroke="#C9A84C" strokeWidth="1.2" />
            <circle cx="25" cy="25" r="3.5" fill="#C9A84C" opacity="0.9" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#gal-${id})`} />
      </svg>
    ),
    parang: (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`gal-${id}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M5 40 Q15 20 25 0" fill="none" stroke="#9333EA" strokeWidth="2.5" />
            <path d="M20 40 Q30 20 40 0" fill="none" stroke="#9333EA" strokeWidth="2.5" />
            <path d="M12 40 Q22 20 32 0" fill="none" stroke="#C084FC" strokeWidth="0.8" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#gal-${id})`} />
      </svg>
    ),
    "mega-mendung": (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`gal-${id}`} x="0" y="0" width="100" height="60" patternUnits="userSpaceOnUse">
            {[0, 1, 2].map((l) => (
              <path
                key={l}
                d={`M-5 ${15 + l * 15} Q25 ${8 + l * 15} 50 ${15 + l * 15} Q75 ${22 + l * 15} 105 ${15 + l * 15}`}
                fill="none" stroke={`hsl(${200 + l * 15}, 70%, ${45 + l * 12}%)`}
                strokeWidth={2.5 - l * 0.5} opacity={1 - l * 0.2}
              />
            ))}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#gal-${id})`} />
      </svg>
    ),
    truntum: (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`gal-${id}`} x="0" y="0" width="45" height="45" patternUnits="userSpaceOnUse">
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              return (
                <circle key={i}
                  cx={22.5 + Math.cos(angle) * 14}
                  cy={22.5 + Math.sin(angle) * 14}
                  r="4" fill="#B45309" opacity="0.8"
                />
              );
            })}
            <circle cx="22.5" cy="22.5" r="5" fill="#fbbf24" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#gal-${id})`} />
      </svg>
    ),
    sidomukti: (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`gal-${id}`} x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <rect x="5" y="5" width="40" height="40" fill="none" stroke="#16a34a" strokeWidth="1.5" />
            <rect x="13" y="13" width="24" height="24" fill="none" stroke="#16a34a" strokeWidth="1" />
            <rect x="20" y="20" width="10" height="10" fill="#16a34a" opacity="0.4" />
            <line x1="5" y1="25" x2="45" y2="25" stroke="#16a34a" strokeWidth="0.6" opacity="0.5" />
            <line x1="25" y1="5" x2="25" y2="45" stroke="#16a34a" strokeWidth="0.6" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#gal-${id})`} />
      </svg>
    ),
    lereng: (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`gal-${id}`} x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            {Array.from({ length: 5 }).map((_, i) => (
              <line key={i} x1={i * 8 - 10} y1="0" x2={i * 8 + 30} y2="30"
                stroke="#9D174D" strokeWidth={i % 2 === 0 ? 2 : 0.8}
                opacity={i % 2 === 0 ? 0.9 : 0.4}
              />
            ))}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#gal-${id})`} />
      </svg>
    ),
    tambal: (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`gal-${id}`} x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="30" height="30" fill="#7c3aed" opacity="0.5" />
            <rect x="30" y="0" width="30" height="30" fill="#ec4899" opacity="0.5" />
            <rect x="0" y="30" width="30" height="30" fill="#f97316" opacity="0.5" />
            <rect x="30" y="30" width="30" height="30" fill="#06b6d4" opacity="0.5" />
            <circle cx="15" cy="15" r="8" fill="none" stroke="white" strokeWidth="1" opacity="0.3" />
            <line x1="0" y1="30" x2="60" y2="30" stroke="white" strokeWidth="0.5" opacity="0.3" />
            <line x1="30" y1="0" x2="30" y2="60" stroke="white" strokeWidth="0.5" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#gal-${id})`} />
      </svg>
    ),
    buketan: (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`gal-${id}`} x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            {[[15, 15], [45, 20], [25, 45], [50, 50]].map(([cx, cy], i) => (
              <g key={i}>
                {Array.from({ length: 6 }).map((_, p) => {
                  const a = (p / 6) * Math.PI * 2;
                  return (
                    <ellipse key={p}
                      cx={cx + Math.cos(a) * 7} cy={cy + Math.sin(a) * 7}
                      rx="4" ry="6"
                      transform={`rotate(${(p / 6) * 360} ${cx + Math.cos(a) * 7} ${cy + Math.sin(a) * 7})`}
                      fill={["#ec4899", "#16a34a", "#f97316", "#0096C7"][i % 4]}
                      opacity="0.7"
                    />
                  );
                })}
                <circle cx={cx} cy={cy} r="3" fill="#fbbf24" />
              </g>
            ))}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#gal-${id})`} />
      </svg>
    ),
  };

  return patterns[id] || <div />;
}

