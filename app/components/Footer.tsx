"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2024);
  useEffect(() => { setCurrentYear(new Date().getFullYear()); }, []);

  return (
    <footer className="relative py-16 overflow-hidden border-t border-border">
      {/* Background pattern */}
      <div className="absolute inset-0 batik-kawung-bg opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <KawungLogoSmall />
              <span className="font-display text-xl font-bold text-gradient-gold">kawung</span>
            </div>
            <p className="text-sm text-muted leading-relaxed max-w-xs">
              Platform interaktif eksplorasi budaya batik Indonesia — 
              menghubungkan warisan leluhur dengan generasi masa kini.
            </p>
            {/* UNESCO badge */}
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold/8 text-xs text-gold">
              🌍 UNESCO Intangible Heritage 2009
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h4 className="text-xs font-semibold text-gold uppercase tracking-wider mb-4">Navigasi</h4>
            <ul className="space-y-2.5">
              {[
                { href: "#hero", label: "Beranda" },
                { href: "#heritage", label: "Warisan & Filosofi" },
                { href: "#game", label: "Mini-Game Kuis" },
                { href: "#canvas", label: "Pattern Studio" },
                { href: "#lens", label: "Batik Lens" },
                { href: "#gallery", label: "Galeri Koleksi" },
                { href: "#draping", label: "Virtual Draping" },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-muted hover:text-gold transition-colors duration-200"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Conservation call */}
          <div>
            <h4 className="text-xs font-semibold text-gold uppercase tracking-wider mb-4">
              Lestarikan Batik
            </h4>
            <p className="text-sm text-muted leading-relaxed mb-4">
              Batik bukan sekadar kain — ia adalah identitas bangsa. 
              Setiap kali kita memakai batik, kita merayakan warisan yang tak ternilai.
            </p>
            <div className="space-y-2">
              {[
                "👘 Gunakan batik di keseharian",
                "🎓 Pelajari sejarah dan filosofinya",
                "🛍️ Beli batik dari pengrajin lokal",
                "📢 Ceritakan kepada generasi muda",
              ].map((tip) => (
                <div key={tip} className="text-sm text-muted flex items-start gap-2">
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider with motif */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-border" />
          <div className="text-gold opacity-60">
            <KawungLogoSmall size={20} />
          </div>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted">
          <div>
            © {currentYear} <span className="text-gold font-semibold">Kawung</span> — 
            Proyek Web Budaya Indonesia
          </div>
          <div className="text-center">
            Dibuat dengan{" "}
            <span className="text-gold">❤</span>{" "}
            untuk melestarikan warisan Batik Nusantara
          </div>
          <div className="flex items-center gap-2">
            <span>Teknologi:</span>
            <span className="px-2 py-0.5 rounded-full bg-border/50 text-foreground/60">Next.js 16</span>
            <span className="px-2 py-0.5 rounded-full bg-border/50 text-foreground/60">Tailwind v4</span>
            <span className="px-2 py-0.5 rounded-full bg-border/50 text-foreground/60">Framer Motion</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function KawungLogoSmall({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <ellipse cx="9" cy="18" rx="7" ry="5" stroke="#C9A84C" strokeWidth="1.5" />
      <ellipse cx="27" cy="18" rx="7" ry="5" stroke="#C9A84C" strokeWidth="1.5" />
      <ellipse cx="18" cy="9" rx="5" ry="7" stroke="#C9A84C" strokeWidth="1.5" />
      <ellipse cx="18" cy="27" rx="5" ry="7" stroke="#C9A84C" strokeWidth="1.5" />
      <circle cx="18" cy="18" r="2.5" fill="#C9A84C" />
    </svg>
  );
}
