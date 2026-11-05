"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#heritage", label: "Warisan" },
    { href: "#gallery", label: "Galeri" },
    { href: "#game", label: "Mini-Game" },
    { href: "#canvas", label: "Studio" },
    { href: "#lens", label: "Batik Lens" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={[
        "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
        scrolled ? "glass shadow-lg py-3" : "py-5 bg-transparent",
      ].join(" ")}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9">
            <KawungLogo />
          </div>
          <span className="font-display text-xl font-bold tracking-wide text-gradient-gold">
            kawung
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-foreground/70 hover:text-gold transition-colors duration-200 relative group"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-full glass border border-border flex items-center justify-center hover:border-gold transition-colors duration-200"
          >
            {theme === "dark" ? (
              <SunIcon className="w-4 h-4 text-gold" />
            ) : (
              <MoonIcon className="w-4 h-4 text-deep-brown" />
            )}
          </button>
          <a
            href="#game"
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-gold text-warm-black text-sm font-semibold hover:bg-gold-light transition-colors duration-200 animate-pulse-gold"
          >
            <PlayIcon className="w-3.5 h-3.5" />
            Mainkan Kuis
          </a>
          {/* Hamburger */}
          <button
            className="md:hidden w-9 h-9 rounded-full glass border border-border flex items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <MenuIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden mt-2 mx-4 glass rounded-2xl border border-border p-5"
        >
          <ul className="flex flex-col gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm font-medium text-foreground/80 hover:text-gold transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#game"
            className="mt-4 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-gold text-warm-black text-sm font-semibold"
            onClick={() => setMenuOpen(false)}
          >
            <PlayIcon className="w-3.5 h-3.5" />
            Mainkan Kuis
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
}

/* ── Icons ── */
function KawungLogo() {
  return (
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="9" cy="18" rx="7" ry="5" stroke="#C9A84C" strokeWidth="1.5" />
      <ellipse cx="27" cy="18" rx="7" ry="5" stroke="#C9A84C" strokeWidth="1.5" />
      <ellipse cx="18" cy="9" rx="5" ry="7" stroke="#C9A84C" strokeWidth="1.5" />
      <ellipse cx="18" cy="27" rx="5" ry="7" stroke="#C9A84C" strokeWidth="1.5" />
      <circle cx="18" cy="18" r="2.5" fill="#C9A84C" />
    </svg>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M5 3l14 9-14 9V3z" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

import { useState } from "react";
import { useTheme } from "./ThemeProvider";

