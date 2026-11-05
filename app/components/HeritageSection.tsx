"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  BookOpen,
  Globe,
  PenTool,
  Stamp,
  Sparkles,
  Compass,
  MapPin,
} from "lucide-react";

const heritageCards = [
  {
    span: "col-span-12 md:col-span-7",
    type: "featured",
    icon: BookOpen,
    label: "Sejarah",
    title: "Lebih dari 1.000 Tahun Peradaban",
    body:
      "Batik telah hadir dalam peradaban Nusantara sejak abad ke-9 Masehi, terukir dalam relief Candi Prambanan. Kata 'batik' berakar dari bahasa Jawa — 'amba' (menulis) dan 'titik' (titik). Pada 2 Oktober 2009, UNESCO menetapkan batik Indonesia sebagai Warisan Kemanusiaan untuk Budaya Lisan dan Nonbendawi.",
    bg: "batik-kawung-bg",
    accent: true,
  },
  {
    span: "col-span-12 md:col-span-5",
    type: "stat",
    icon: Globe,
    label: "Pengakuan Dunia",
    title: "UNESCO Intangible Cultural Heritage",
    body: "Penetapan 2 Oktober sebagai Hari Batik Nasional menjadi tonggak abadi pengakuan internasional terhadap martabat dan kemurnian karya bangsa.",
    highlight: "2 Oktober",
    bg: "",
    accent: false,
  },
  {
    span: "col-span-12 md:col-span-4",
    type: "technique",
    icon: PenTool,
    label: "Teknik",
    title: "Batik Tulis",
    body:
      "Dikerjakan dengan canting tembaga presisi tinggi untuk menorehkan cairan malam panas secara manual. Setiap helai kain membutuhkan ketelatenan hingga berbulan-bulan.",
    tag: "Prestisius",
    bg: "",
    accent: false,
  },
  {
    span: "col-span-12 md:col-span-4",
    type: "technique",
    icon: Stamp,
    label: "Teknik",
    title: "Batik Cap",
    body:
      "Menggunakan stempel plat tembaga dengan ukiran motif geometris yang dicelupkan ke malam panas. Menghasilkan konsistensi pola simetris yang rapi dan terukur.",
    tag: "Konsistensi",
    bg: "",
    accent: false,
  },
  {
    span: "col-span-12 md:col-span-4",
    type: "technique",
    icon: Sparkles,
    label: "Teknik",
    title: "Batik Jumputan",
    body:
      "Teknik ikat celup di mana kain diikat benang kencang sebelum direndam ke dalam zat pewarna alami, membentuk gradasi organik yang ekspresif dan dinamis.",
    tag: "Organik",
    bg: "",
    accent: false,
  },
  {
    span: "col-span-12 md:col-span-6",
    type: "philosophy",
    icon: Compass,
    label: "Filosofi",
    title: "Bahasa Perlambang Kehidupan",
    body:
      "Motif batik bukan sekadar dekorasi ornamental — ia adalah teks simbolik. Kawung melambangkan kesucian budi dan keadilan; Parang mengalirkan keteguhan ksatria; Truntum menyemai cinta abadi; Mega Mendung menuntun kejernihan jiwa.",
    bg: "batik-truntum-bg",
    accent: false,
  },
  {
    span: "col-span-12 md:col-span-6",
    type: "regions",
    icon: MapPin,
    label: "Sentra Batik",
    regions: [
      { name: "Yogyakarta", style: "Klasik keraton, dominasi warna putih & sogan" },
      { name: "Surakarta / Solo", style: "Estetika anggun, karakter cokelat keemasan" },
      { name: "Pekalongan", style: "Pesisir cerah, perpaduan multikultural" },
      { name: "Cirebon", style: "Karakter maritim, Mega Mendung & Wadasan" },
    ],
    bg: "",
    accent: false,
  },
];

export default function HeritageSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="heritage" className="py-24 relative overflow-hidden">
      {/* Section header */}
      <div ref={ref} className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-gold uppercase tracking-widest mb-3">
            <span className="w-6 h-px bg-gold" />
            Warisan & Filosofi
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Kain yang{" "}
            <span className="text-gradient-gold">Bercerita</span>
          </h2>
          <p className="mt-4 text-muted text-lg max-w-2xl">
            Di setiap helai batik terukir doa, falsafah luhur, dan perjalanan peradaban Nusantara yang terus hidup melintasi zaman.
          </p>
        </motion.div>
      </div>

      {/* Bento Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-12 gap-4">
          {heritageCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={card.span}
            >
              <BentoCard card={card} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BentoCard({ card }: { card: (typeof heritageCards)[0] }) {
  const isRegions = card.type === "regions";
  const isFeatured = card.type === "featured";
  const hasTag = "tag" in card && card.tag;
  const IconComponent = card.icon;

  return (
    <div
      className={[
        "relative h-full min-h-[190px] rounded-2xl p-6 overflow-hidden border border-border hover-card cursor-default flex flex-col justify-between",
        isFeatured
          ? "bg-gradient-to-br from-gold/10 to-copper/5 border-gold/40"
          : "glass",
        card.bg,
      ].join(" ")}
    >
      {/* Background motif overlay */}
      {card.bg && (
        <div className="absolute inset-0 opacity-20 pointer-events-none" />
      )}

      {/* Featured corner accent */}
      {isFeatured && (
        <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-gold/20 to-transparent rounded-bl-3xl" />
      )}

      <div className="relative z-10">
        {/* Label & Icon Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
            <IconComponent className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold text-gold uppercase tracking-wider">
            {card.label}
          </span>
          {hasTag && (
            <span className="ml-auto px-2.5 py-0.5 rounded-full bg-gold/15 text-gold text-[10px] font-semibold tracking-wide">
              {(card as { tag: string }).tag}
            </span>
          )}
        </div>

        {isRegions ? (
          <>
            <h3 className="font-display text-lg font-bold text-foreground mb-3">
              Sentra Batik Nusantara
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {(card as { regions: { name: string; style: string }[] }).regions.map((r) => (
                <div
                  key={r.name}
                  className="rounded-xl bg-gold/5 border border-gold/15 p-3 hover:border-gold/40 transition-colors"
                >
                  <div className="text-sm font-semibold text-foreground">{r.name}</div>
                  <div className="text-xs text-muted mt-0.5">{r.style}</div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {"highlight" in card && card.highlight && (
              <div className="font-display text-4xl md:text-5xl font-bold text-gold mb-2 tracking-tight">
                {card.highlight}
              </div>
            )}
            <h3 className="font-display text-lg md:text-xl font-bold text-foreground mb-2">
              {card.title}
            </h3>
            <p className="text-sm text-muted leading-relaxed">{card.body}</p>
          </>
        )}
      </div>
    </div>
  );
}

