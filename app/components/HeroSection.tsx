"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/* ─────────────────────────────────────────────
   Hero Section
   ───────────────────────────────────────────── */
export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const [count, setCount] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setCount((c) => {
          if (c >= 350) { clearInterval(interval); return c; }
          return c + 7;
        });
      }, 20);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden batik-kawung-bg"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/80 pointer-events-none" />

      {/* Animated geometric shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -right-32 w-96 h-96 opacity-10"
        >
          <KawungGeometric size={384} />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-24 -left-24 w-80 h-80 opacity-8"
        >
          <KawungGeometric size={320} />
        </motion.div>
        {/* Gold particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <GoldParticle key={i} index={i} />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-gold/30 text-xs font-medium text-gold mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              Warisan Budaya Dunia — UNESCO 2009
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6"
            >
              <span className="block text-foreground">Jiwa dalam</span>
              <span className="block text-gradient-gold">Setiap Helai</span>
              <span className="block text-foreground">Batik</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg text-muted leading-relaxed mb-10 max-w-lg"
            >
              Setiap motif menyimpan doa, filosofi, dan identitas bangsa. 
              Jelajahi warisan agung batik Nusantara — dari tangan para empu 
              hingga panggung mode dunia.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#game"
                className="group flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gold text-warm-black font-semibold text-sm hover:bg-gold-light transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-gold/30"
              >
                <GamepadIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Mainkan Kuis Batik
              </a>
              <a
                href="#gallery"
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-full glass border border-border text-foreground font-semibold text-sm hover:border-gold hover:text-gold transition-all duration-300"
              >
                <GalleryIcon className="w-4 h-4" />
                Lihat Koleksi
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex gap-8 mt-12"
            >
              {[
                { value: `${count}+`, label: "Motif Batik" },
                { value: "34", label: "Provinsi" },
                { value: "1000+", label: "Tahun Sejarah" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl font-bold text-gold">{s.value}</div>
                  <div className="text-xs text-muted mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: 3D Tilt Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="hidden lg:block"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Outer ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-gold/20"
                style={{ transform: "translateZ(20px)" }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 rounded-full border border-gold/15 border-dashed"
                style={{ transform: "translateZ(30px)" }}
              />

              {/* Main visual */}
              <div className="absolute inset-16 rounded-full glass border-2 border-gold/40 flex items-center justify-center overflow-hidden">
                <KawungLargePattern />
              </div>

              {/* Floating info cards */}
              <FloatingCard
                className="absolute -left-4 top-1/4"
                delay={1.2}
                label="Kawung"
                sub="Kesucian & Keadilan"
                style={{ transform: "translateZ(50px)" }}
              />
              <FloatingCard
                className="absolute -right-4 bottom-1/3"
                delay={1.4}
                label="Parang"
                sub="Kekuatan & Ketangkasan"
                style={{ transform: "translateZ(50px)" }}
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted">Gulir ke bawah</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-gold/40 flex items-center justify-center"
          >
            <div className="w-1 h-2 rounded-full bg-gold" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Sub-components ── */

function GoldParticle({ index }: { index: number }) {
  const size = 2 + (index % 3) * 1.5;
  const left = `${(index * 8.3) % 100}%`;
  const top = `${(index * 13.7) % 100}%`;
  const delay = index * 0.4;
  const duration = 3 + (index % 4);

  return (
    <motion.div
      className="absolute rounded-full bg-gold/40"
      style={{ width: size, height: size, left, top }}
      animate={{ y: [-8, 8, -8], opacity: [0.3, 0.8, 0.3] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function FloatingCard({
  label,
  sub,
  className,
  delay,
  style,
}: {
  label: string;
  sub: string;
  className?: string;
  delay: number;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      style={style}
      className={`${className} glass border border-gold/30 rounded-xl px-3 py-2 shadow-lg`}
    >
      <div className="text-xs font-semibold text-gold">{label}</div>
      <div className="text-[10px] text-muted mt-0.5">{sub}</div>
    </motion.div>
  );
}

function KawungGeometric({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      <ellipse cx="50" cy="100" rx="40" ry="28" stroke="#C9A84C" strokeWidth="0.8" />
      <ellipse cx="150" cy="100" rx="40" ry="28" stroke="#C9A84C" strokeWidth="0.8" />
      <ellipse cx="100" cy="50" rx="28" ry="40" stroke="#C9A84C" strokeWidth="0.8" />
      <ellipse cx="100" cy="150" rx="28" ry="40" stroke="#C9A84C" strokeWidth="0.8" />
      <circle cx="100" cy="100" r="12" stroke="#C9A84C" strokeWidth="0.8" />
      <circle cx="100" cy="100" r="4" fill="#C9A84C" opacity="0.6" />
    </svg>
  );
}

function KawungLargePattern() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
      {Array.from({ length: 3 }).map((_, row) =>
        Array.from({ length: 3 }).map((_, col) => {
          const cx = 33 + col * 67;
          const cy = 33 + row * 67;
          return (
            <g key={`${row}-${col}`}>
              <ellipse cx={cx - 18} cy={cy} rx="15" ry="10" stroke="#C9A84C" strokeWidth="1" opacity="0.6" />
              <ellipse cx={cx + 18} cy={cy} rx="15" ry="10" stroke="#C9A84C" strokeWidth="1" opacity="0.6" />
              <ellipse cx={cx} cy={cy - 18} rx="10" ry="15" stroke="#C9A84C" strokeWidth="1" opacity="0.6" />
              <ellipse cx={cx} cy={cy + 18} rx="10" ry="15" stroke="#C9A84C" strokeWidth="1" opacity="0.6" />
              <circle cx={cx} cy={cy} r="4" fill="#C9A84C" opacity="0.8" />
            </g>
          );
        })
      )}
    </svg>
  );
}

/* ── Icons ── */
function GamepadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M6 11h4M8 9v4M15 12h.01M17 10h.01M4 7h16a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z" />
    </svg>
  );
}

function GalleryIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  );
}

