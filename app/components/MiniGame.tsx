"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    philosophy: "Kesucian jiwa dan keadilan — simbol buah kolang-kaling yang melambangkan empat arah mata angin",
    color: "#1E40AF",
    pattern: <KawungPattern />,
  },
  {
    id: "parang",
    name: "Parang",
    region: "Surakarta",
    philosophy: "Kekuatan ksatria dan pantang menyerah — gerak ombak laut yang tak pernah berhenti",
    color: "#7C3AED",
    pattern: <ParangPattern />,
  },
  {
    id: "mega-mendung",
    name: "Mega Mendung",
    region: "Cirebon",
    philosophy: "Ketenangan jiwa dan kedamaian hati — awan yang membawa hujan sebagai berkah kehidupan",
    color: "#0E7490",
    pattern: <MegaMendungPattern />,
  },
  {
    id: "truntum",
    name: "Truntum",
    region: "Surakarta",
    philosophy: "Cinta yang tumbuh kembali — diciptakan Ratu Kencana sebagai simbol kesetiaan kepada suami",
    color: "#B45309",
    pattern: <TruntumPattern />,
  },
  {
    id: "sidomukti",
    name: "Sidomukti",
    region: "Surakarta",
    philosophy: "Kemakmuran abadi dan keberkahan — 'sido' berarti jadi/terus-menerus, 'mukti' berarti mulia",
    color: "#166534",
    pattern: <SidomuktiPattern />,
  },
  {
    id: "lereng",
    name: "Lereng",
    region: "Yogyakarta",
    philosophy: "Kerendahan hati dan kewaspadaan — motif diagonal yang melambangkan hidup yang selalu bergerak",
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
  { min: 5, label: "🏆 Maestro Batik", color: "from-yellow-400 to-amber-500" },
  { min: 4, label: "🥇 Pecinta Batik", color: "from-blue-400 to-indigo-500" },
  { min: 3, label: "🥈 Penjelajah Budaya", color: "from-teal-400 to-cyan-500" },
  { min: 2, label: "🥉 Pemula Batik", color: "from-orange-400 to-red-500" },
  { min: 0, label: "📚 Terus Belajar!", color: "from-gray-400 to-gray-500" },
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
      <div className="absolute inset-0 batik-parang-bg opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-gold uppercase tracking-widest mb-3">
            <span className="w-6 h-px bg-gold" />
            Mini-Game Interaktif
            <span className="w-6 h-px bg-gold" />
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Tebak{" "}
            <span className="text-gradient-gold">Filosofi Batik</span>
          </h2>
          <p className="mt-4 text-muted text-lg">
            Uji pemahamanmu tentang motif dan filosofi batik Nusantara
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
              <div className="glass border border-gold/30 rounded-3xl p-10 max-w-lg mx-auto">
                <div className="text-6xl mb-6">🎮</div>
                <h3 className="font-display text-2xl font-bold mb-3">
                  Siap Bermain?
                </h3>
                <p className="text-muted mb-8 leading-relaxed">
                  Kamu akan mendapat <strong className="text-gold">5 pertanyaan</strong> tentang 
                  asal daerah dan filosofi motif batik. Jawab dengan benar untuk mendapatkan badge!
                </p>
                <div className="grid grid-cols-3 gap-4 mb-8 text-center">
                  {[
                    { icon: "❓", label: "5 Soal" },
                    { icon: "⏱️", label: "Bebas Waktu" },
                    { icon: "🏅", label: "5 Badge" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl bg-gold/8 border border-gold/15 p-3">
                      <div className="text-2xl mb-1">{s.icon}</div>
                      <div className="text-xs font-semibold text-muted">{s.label}</div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={startGame}
                  className="w-full py-3.5 rounded-full bg-gold text-warm-black font-bold text-lg hover:bg-gold-light transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  Mulai Permainan 🚀
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
                            ? "bg-green-500"
                            : "bg-red-500"
                          : i === currentQ
                          ? "bg-gold"
                          : "bg-border",
                      ].join(" ")}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted whitespace-nowrap">
                  {currentQ + 1} / {questions.length}
                </span>
              </div>

              {/* Question card */}
              <div className="glass border border-border rounded-3xl overflow-hidden">
                {/* Motif preview */}
                <div
                  className="p-8 flex flex-col md:flex-row gap-6 items-center border-b border-border"
                  style={{ background: `${questions[currentQ].motif.color}18` }}
                >
                  <div
                    className="w-28 h-28 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden border-2"
                    style={{ borderColor: questions[currentQ].motif.color + "60" }}
                  >
                    {questions[currentQ].motif.pattern}
                  </div>
                  <div>
                    <div className="text-xs text-muted uppercase tracking-wider mb-1">Motif Batik</div>
                    <div
                      className="font-display text-3xl font-bold"
                      style={{ color: questions[currentQ].motif.color }}
                    >
                      {questions[currentQ].motif.name}
                    </div>
                    <div className="text-sm text-muted mt-2">
                      {questions[currentQ].type === "region"
                        ? "🗺️ Dari daerah manakah motif batik ini berasal?"
                        : "🧘 Apakah filosofi / makna motif batik ini?"}
                    </div>
                  </div>
                </div>

                {/* Options */}
                <div className="p-6 grid gap-3">
                  {questions[currentQ].options.map((opt, i) => {
                    const isSelected = selected === opt;
                    const isCorrect = opt === questions[currentQ].correct;
                    let optClass =
                      "w-full text-left px-5 py-4 rounded-xl border transition-all duration-300 text-sm font-medium ";

                    if (!answered) {
                      optClass +=
                        "border-border hover:border-gold hover:bg-gold/8 cursor-pointer active:scale-98";
                    } else if (isCorrect) {
                      optClass +=
                        "border-green-500 bg-green-500/10 text-green-500";
                    } else if (isSelected && !isCorrect) {
                      optClass += "border-red-500 bg-red-500/10 text-red-500";
                    } else {
                      optClass += "border-border opacity-50";
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
                            {answered
                              ? isCorrect
                                ? "✓"
                                : isSelected
                                ? "✗"
                                : String.fromCharCode(65 + i)
                              : String.fromCharCode(65 + i)}
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
                          "rounded-xl p-4 mb-4 text-sm",
                          selected === questions[currentQ].correct
                            ? "bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400"
                            : "bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400",
                        ].join(" ")}
                      >
                        {selected === questions[currentQ].correct ? (
                          <div>
                            <strong>✅ Benar!</strong>{" "}
                            {questions[currentQ].type === "region"
                              ? `Motif ${questions[currentQ].motif.name} memang berasal dari ${questions[currentQ].motif.region}.`
                              : `Filosofi yang tepat untuk ${questions[currentQ].motif.name}.`}
                          </div>
                        ) : (
                          <div>
                            <strong>❌ Kurang tepat.</strong> Jawaban yang benar:{" "}
                            <strong>{questions[currentQ].correct}</strong>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={handleNext}
                        className="w-full py-3 rounded-full bg-gold text-warm-black font-semibold hover:bg-gold-light transition-all duration-200 hover:scale-105 active:scale-95"
                      >
                        {currentQ + 1 >= questions.length
                          ? "Lihat Hasil 🏆"
                          : "Soal Berikutnya →"}
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
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <div className="glass border border-gold/40 rounded-3xl p-10 max-w-lg mx-auto relative overflow-hidden">
                {/* Confetti-like decoration */}
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        background: ["#C9A84C", "#E8C97A", "#B87333", "#7C3AED"][i % 4],
                        opacity: 0.4,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        rotate: [0, 180, 360],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        delay: Math.random(),
                        repeat: Infinity,
                      }}
                    />
                  ))}
                </div>

                {/* Badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                  className={`inline-block px-6 py-3 rounded-2xl bg-gradient-to-r ${badge.color} text-white font-bold text-xl mb-6 shadow-lg`}
                >
                  {badge.label}
                </motion.div>

                <h3 className="font-display text-3xl font-bold mb-2">
                  Permainan Selesai!
                </h3>
                <p className="text-muted mb-6">Inilah hasil perjalanan batikmu:</p>

                {/* Score donut */}
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50" cy="50" r="40"
                      fill="none" stroke="currentColor"
                      strokeWidth="10" className="text-border opacity-30"
                    />
                    <circle
                      cx="50" cy="50" r="40"
                      fill="none" stroke="#C9A84C"
                      strokeWidth="10"
                      strokeDasharray={`${(score / questions.length) * 251.3} 251.3`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="font-display text-3xl font-bold text-gold">{score}</div>
                    <div className="text-xs text-muted">/ {questions.length}</div>
                  </div>
                </div>

                {/* Per-question breakdown */}
                <div className="flex justify-center gap-2 mb-8">
                  {answers.map((correct, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
                        correct
                          ? "bg-green-500/15 text-green-500 border border-green-500/40"
                          : "bg-red-500/15 text-red-500 border border-red-500/40"
                      }`}
                    >
                      {correct ? "✓" : "✗"}
                    </motion.div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={startGame}
                    className="flex-1 py-3 rounded-full bg-gold text-warm-black font-semibold hover:bg-gold-light transition-all duration-200 hover:scale-105"
                  >
                    Main Lagi 🔄
                  </button>
                  <a
                    href="#gallery"
                    className="flex-1 py-3 rounded-full glass border border-border text-foreground font-semibold hover:border-gold transition-all text-center"
                  >
                    Lihat Galeri 🎨
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

