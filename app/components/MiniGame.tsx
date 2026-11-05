"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  HelpCircle,
  Clock,
  Sparkles,
  MapPin,
  RotateCcw,
  Check,
  X,
  ArrowRight,
  BookOpen,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Mini-Game: "Tebak Filosofi & Motif Batik"
   ───────────────────────────────────────────── */

interface MotifCard {
  id: string;
  name: string;
  region: string;
  philosophy: string;
  color: string;
  pattern: React.ReactNode;
}

interface Question {
  motif: MotifCard;
  type: "region" | "philosophy";
  options: string[];
  correct: string;
}

const MOTIFS: MotifCard[] = [
  {
    id: "kawung",
    name: "Kawung",
    region: "Yogyakarta",
    philosophy: "Kesucian budi pekerti dan keadilan — simbol buah kolang-kaling yang melambangkan empat arah mata angin serta harmoni kosmis",
    color: "#1E40AF",
    pattern: <KawungPattern />,
  },
  {
    id: "parang",
    name: "Parang",
    region: "Surakarta",
    philosophy: "Kekuatan ksatria dan pantang menyerah — dinamika ombak laut selatan yang tak pernah surut menerpa karang",
    color: "#7C3AED",
    pattern: <ParangPattern />,
  },
  {
    id: "mega-mendung",
    name: "Mega Mendung",
    region: "Cirebon",
    philosophy: "Kejernihan pikiran dan ketenangan jiwa — formasi awan pembawa hujan penyejuk kehidupan",
    color: "#0E7490",
    pattern: <MegaMendungPattern />,
  },
  {
    id: "truntum",
    name: "Truntum",
    region: "Surakarta",
    philosophy: "Cinta luhur yang bersemi kembali — diciptakan Ratu Kencana sebagai simbol ketulusan dan kesetiaan sejati",
    color: "#B45309",
    pattern: <TruntumPattern />,
  },
  {
    id: "sidomukti",
    name: "Sidomukti",
    region: "Surakarta",
    philosophy: "Kemakmuran berkelanjutan dan martabat luhur — harapan akan kehidupan mulia yang terwujud nyata",
    color: "#166534",
    pattern: <SidomuktiPattern />,
  },
  {
    id: "lereng",
    name: "Lereng",
    region: "Yogyakarta",
    philosophy: "Kewaspadaan melangkah dan kerendahan hati — garis diagonal sebagai simbol pergerakan dinamis kehidupan",
    color: "#9D174D",
    pattern: <LerengPattern />,
  },
];

function generateQuestions(): Question[] {
  const questions: Question[] = [];
  const shuffled = [...MOTIFS].sort(() => Math.random() - 0.5).slice(0, 5);

  shuffled.forEach((motif, i) => {
    const type: "region" | "philosophy" = i % 2 === 0 ? "region" : "philosophy";

    if (type === "region") {
      const wrongRegions = MOTIFS
        .filter((m) => m.id !== motif.id)
        .map((m) => m.region)
        .filter((v, idx, a) => a.indexOf(v) === idx)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      const options = [...wrongRegions, motif.region].sort(() => Math.random() - 0.5);
      questions.push({ motif, type, options, correct: motif.region });
    } else {
      const wrongPhilos = MOTIFS
        .filter((m) => m.id !== motif.id)
        .map((m) => m.philosophy)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      const options = [...wrongPhilos, motif.philosophy].sort(() => Math.random() - 0.5);
      questions.push({ motif, type, options, correct: motif.philosophy });
    }
  });

  return questions;
}

const BADGES = [
  { min: 5, label: "Maestro Batik", sublabel: "Pengetahuan sempurna tentang filosofi dan motif", color: "from-amber-500 to-yellow-600" },
  { min: 4, label: "Kurator Budaya", sublabel: "Apresiasi mendalam terhadap warisan Nusantara", color: "from-blue-600 to-indigo-700" },
  { min: 3, label: "Penjelajah Wastra", sublabel: "Memahami esensi motif dasar Nusantara", color: "from-teal-600 to-cyan-700" },
  { min: 2, label: "Apresiator Muda", sublabel: "Langkah awal mengapresiasi mahakarya leluhur", color: "from-amber-600 to-orange-700" },
  { min: 0, label: "Penikmat Budaya", sublabel: "Awal perjalanan mengenal kekayaan batik", color: "from-zinc-600 to-stone-700" },
];

type GamePhase = "intro" | "playing" | "result";

export default function MiniGame() {
  const [phase, setPhase] = useState<GamePhase>("intro");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const startGame = useCallback(() => {
    const qs = generateQuestions();
    setQuestions(qs);
    setCurrentQ(0);
    setScore(0);
    setSelected(null);
    setAnswered(false);
    setAnswers([]);
    setPhase("playing");
  }, []);

  const handleSelect = useCallback(
    (option: string) => {
      if (answered) return;
      setSelected(option);
      setAnswered(true);
      const isCorrect = option === questions[currentQ].correct;
      if (isCorrect) setScore((s) => s + 1);
      setAnswers((a) => [...a, isCorrect]);
    },
    [answered, currentQ, questions]
  );

  const handleNext = useCallback(() => {
    if (currentQ + 1 >= questions.length) {
      setPhase("result");
    } else {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setAnswered(false);
    }
  }, [currentQ, questions.length]);

  const badge = BADGES.find((b) => score >= b.min)!;

  return (
    <section id="game" className="py-24 relative overflow-hidden">
      {/* BG accent */}
      <div className="absolute inset-0 batik-parang-bg opacity-25 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-gold uppercase tracking-widest mb-3">
            <span className="w-6 h-px bg-gold" />
            Eksplorasi Interaktif
            <span className="w-6 h-px bg-gold" />
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Tebak <span className="text-gradient-gold">Filosofi & Motif</span>
          </h2>
          <p className="mt-4 text-muted text-lg max-w-xl mx-auto">
            Uji pemahaman dan ketajaman analisismu dalam mengenali asal usul serta makna simbolik batik Nusantara.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {phase === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              className="text-center"
            >
              <div className="glass border border-gold/30 rounded-3xl p-10 max-w-lg mx-auto shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/25 mx-auto flex items-center justify-center text-gold mb-6">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-3 text-foreground">
                  Uji Pengetahuan Budaya
                </h3>
                <p className="text-muted mb-8 leading-relaxed text-sm">
                  Terdapat <strong className="text-foreground font-semibold">5 pertanyaan terkurasi</strong> seputar 
                  sentra daerah dan falsafah motif. Setiap jawaban yang tepat akan mengakumulasi pencapaian apresiasi budayamu.
                </p>
                <div className="grid grid-cols-3 gap-3 mb-8 text-center">
                  {[
                    { icon: HelpCircle, label: "5 Kurasi Soal" },
                    { icon: Clock, label: "Tanpa Batas Waktu" },
                    { icon: Award, label: "Predikat Apresiasi" },
                  ].map((s) => {
                    const IconComp = s.icon;
                    return (
                      <div key={s.label} className="rounded-xl bg-gold/5 border border-gold/15 p-3 flex flex-col items-center">
                        <IconComp className="w-5 h-5 text-gold mb-1.5" />
                        <div className="text-xs font-medium text-foreground">{s.label}</div>
                      </div>
                    );
                  })}
                </div>
                <button
                  onClick={startGame}
                  className="w-full py-3.5 rounded-full bg-gold text-warm-black font-semibold text-sm hover:bg-gold-light transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-sm flex items-center justify-center gap-2"
                >
                  Mulai Evaluasi Pengetahuan
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {phase === "playing" && questions[currentQ] && (
            <motion.div
              key={`question-${currentQ}`}
              initial={{ opacity: 0, x: 48 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -48 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Progress */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-1.5 flex-1">
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      className={[
                        "h-1.5 flex-1 rounded-full transition-all duration-500",
                        i < currentQ
                          ? answers[i]
                            ? "bg-emerald-600"
                            : "bg-rose-600"
                          : i === currentQ
                          ? "bg-gold"
                          : "bg-border",
                      ].join(" ")}
                    />
                  ))}
                </div>
                <span className="text-xs font-medium text-muted whitespace-nowrap">
                  Pertanyaan {currentQ + 1} dari {questions.length}
                </span>
              </div>

              {/* Question card */}
              <div className="glass border border-border rounded-3xl overflow-hidden shadow-sm">
                {/* Motif preview */}
                <div
                  className="p-8 flex flex-col md:flex-row gap-6 items-center border-b border-border"
                  style={{ background: `${questions[currentQ].motif.color}0D` }}
                >
                  <div
                    className="w-28 h-28 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden border-2 bg-surface"
                    style={{ borderColor: questions[currentQ].motif.color + "40" }}
                  >
                    {questions[currentQ].motif.pattern}
                  </div>
                  <div>
                    <div className="text-xs text-muted uppercase tracking-wider mb-1 font-semibold">
                      Spesimen Motif
                    </div>
                    <div
                      className="font-display text-3xl font-bold tracking-tight"
                      style={{ color: questions[currentQ].motif.color }}
                    >
                      {questions[currentQ].motif.name}
                    </div>
                    <div className="text-sm text-foreground/80 mt-2 flex items-center gap-2">
                      {questions[currentQ].type === "region" ? (
                        <>
                          <MapPin className="w-4 h-4 text-gold shrink-0" />
                          <span>Dari daerah manakah motif batik ini berasal?</span>
                        </>
                      ) : (
                        <>
                          <BookOpen className="w-4 h-4 text-gold shrink-0" />
                          <span>Apakah falsafah dan makna luhur yang terkandung di dalamnya?</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Options */}
                <div className="p-6 grid gap-3">
                  {questions[currentQ].options.map((opt, i) => {
                    const isSelected = selected === opt;
                    const isCorrect = opt === questions[currentQ].correct;
                    let optClass =
                      "w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 text-sm font-medium ";

                    if (!answered) {
                      optClass +=
                        "border-border hover:border-gold hover:bg-gold/5 cursor-pointer active:scale-[0.99] bg-surface";
                    } else if (isCorrect) {
                      optClass +=
                        "border-emerald-600/60 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-semibold";
                    } else if (isSelected && !isCorrect) {
                      optClass += "border-rose-600/60 bg-rose-500/10 text-rose-800 dark:text-rose-300";
                    } else {
                      optClass += "border-border opacity-40 bg-surface";
                    }

                    return (
                      <motion.button
                        key={opt}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className={optClass}
                        onClick={() => handleSelect(opt)}
                      >
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                            {answered ? (
                              isCorrect ? (
                                <Check className="w-3.5 h-3.5" />
                              ) : isSelected ? (
                                <X className="w-3.5 h-3.5" />
                              ) : (
                                String.fromCharCode(65 + i)
                              )
                            ) : (
                              String.fromCharCode(65 + i)
                            )}
                          </span>
                          <span className="leading-relaxed">{opt}</span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Feedback + Next */}
                <AnimatePresence>
                  {answered && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="px-6 pb-6"
                    >
                      <div
                        className={[
                          "rounded-xl p-4 mb-4 text-sm flex items-start gap-3",
                          selected === questions[currentQ].correct
                            ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300"
                            : "bg-rose-500/10 border border-rose-500/30 text-rose-800 dark:text-rose-300",
                        ].join(" ")}
                      >
                        {selected === questions[currentQ].correct ? (
                          <>
                            <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <strong className="block mb-0.5">Jawaban Tepat</strong>
                              {questions[currentQ].type === "region"
                                ? `Motif ${questions[currentQ].motif.name} berakar dari tradisi ${questions[currentQ].motif.region}.`
                                : `Karakteristik makna ${questions[currentQ].motif.name} teridentifikasi dengan tepat.`}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                              <X className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <strong className="block mb-0.5">Kurang Tepat</strong>
                              Jawaban yang benar:{" "}
                              <span className="font-semibold underline decoration-rose-500/50">
                                {questions[currentQ].correct}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                      <button
                        onClick={handleNext}
                        className="w-full py-3 rounded-full bg-gold text-warm-black font-semibold text-sm hover:bg-gold-light transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                      >
                        {currentQ + 1 >= questions.length
                          ? "Lihat Hasil Kurasi"
                          : "Lanjut ke Pertanyaan Berikutnya"}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {phase === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <div className="glass border border-gold/40 rounded-3xl p-10 max-w-lg mx-auto relative overflow-hidden shadow-sm">
                {/* Badge title */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r ${badge.color} text-white font-bold text-base mb-3 shadow-md`}
                >
                  <Award className="w-5 h-5 shrink-0" />
                  <span>{badge.label}</span>
                </motion.div>

                <p className="text-xs text-muted mb-6">{badge.sublabel}</p>

                <h3 className="font-display text-2xl font-bold mb-1 text-foreground">
                  Evaluasi Selesai
                </h3>
                <p className="text-muted text-sm mb-6">Hasil apresiasi pengetahuan batik Nusantara:</p>

                {/* Score donut */}
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50" cy="50" r="40"
                      fill="none" stroke="currentColor"
                      strokeWidth="8" className="text-border opacity-30"
                    />
                    <circle
                      cx="50" cy="50" r="40"
                      fill="none" stroke="#C9A84C"
                      strokeWidth="8"
                      strokeDasharray={`${(score / questions.length) * 251.3} 251.3`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="font-display text-3xl font-bold text-gold">{score}</div>
                    <div className="text-xs text-muted">dari {questions.length}</div>
                  </div>
                </div>

                {/* Per-question breakdown */}
                <div className="flex justify-center gap-2 mb-8">
                  {answers.map((correct, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${
                        correct
                          ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/40"
                          : "bg-rose-500/15 text-rose-700 dark:text-rose-400 border border-rose-500/40"
                      }`}
                    >
                      {correct ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    </motion.div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={startGame}
                    className="flex-1 py-3 rounded-full bg-gold text-warm-black font-semibold text-sm hover:bg-gold-light transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Ulangi Kuis
                  </button>
                  <a
                    href="#gallery"
                    className="flex-1 py-3 rounded-full glass border border-border text-foreground font-semibold text-sm hover:border-gold transition-all text-center flex items-center justify-center gap-2"
                  >
                    <span>Koleksi Galeri</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ── SVG Motif Patterns ── */
function KawungPattern() {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
      <ellipse cx="25" cy="50" rx="20" ry="13" stroke="#1E40AF" strokeWidth="2" />
      <ellipse cx="75" cy="50" rx="20" ry="13" stroke="#1E40AF" strokeWidth="2" />
      <ellipse cx="50" cy="25" rx="13" ry="20" stroke="#1E40AF" strokeWidth="2" />
      <ellipse cx="50" cy="75" rx="13" ry="20" stroke="#1E40AF" strokeWidth="2" />
      <circle cx="50" cy="50" r="6" fill="#1E40AF" />
    </svg>
  );
}

function ParangPattern() {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <path
            d={`M${i * 33 + 5} 95 Q${i * 33 + 16} 50 ${i * 33 + 28} 5`}
            stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round"
          />
          <path
            d={`M${i * 33 + 12} 95 Q${i * 33 + 23} 50 ${i * 33 + 35} 5`}
            stroke="#7C3AED" strokeWidth="1" strokeLinecap="round" opacity="0.4"
          />
        </g>
      ))}
    </svg>
  );
}

function MegaMendungPattern() {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M5 ${25 + i * 25} Q25 ${15 + i * 25} 50 ${25 + i * 25} Q75 ${35 + i * 25} 95 ${25 + i * 25}`}
          stroke="#0E7490"
          strokeWidth={2 - i * 0.4}
          fill="none"
          opacity={1 - i * 0.2}
        />
      ))}
      <ellipse cx="30" cy="40" rx="18" ry="12" fill="#0E7490" opacity="0.15" />
      <ellipse cx="70" cy="60" rx="18" ry="12" fill="#0E7490" opacity="0.15" />
    </svg>
  );
}

function TruntumPattern() {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
      {[[50, 50], [25, 25], [75, 25], [25, 75], [75, 75]].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={i === 0 ? 10 : 7} fill="#B45309" opacity="0.8" />
          {Array.from({ length: 8 }).map((_, p) => {
            const angle = (p * Math.PI * 2) / 8;
            const r2 = i === 0 ? 18 : 14;
            return (
              <line
                key={p}
                x1={cx} y1={cy}
                x2={cx + Math.cos(angle) * r2}
                y2={cy + Math.sin(angle) * r2}
                stroke="#B45309" strokeWidth="1.5" opacity="0.5"
              />
            );
          })}
        </g>
      ))}
    </svg>
  );
}

function SidomuktiPattern() {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
      <rect x="20" y="20" width="60" height="60" rx="4" stroke="#166534" strokeWidth="2" />
      <rect x="30" y="30" width="40" height="40" rx="2" stroke="#166534" strokeWidth="1.5" />
      <rect x="40" y="40" width="20" height="20" fill="#166534" opacity="0.3" />
      <line x1="20" y1="50" x2="80" y2="50" stroke="#166534" strokeWidth="1" opacity="0.4" />
      <line x1="50" y1="20" x2="50" y2="80" stroke="#166534" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

function LerengPattern() {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={i}
          x1={i * 14 - 10} y1="0"
          x2={i * 14 + 90} y2="100"
          stroke="#9D174D"
          strokeWidth={i % 2 === 0 ? 2 : 1}
          opacity={i % 2 === 0 ? 0.8 : 0.3}
        />
      ))}
    </svg>
  );
}

