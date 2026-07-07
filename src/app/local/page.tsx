"use client";

import Link from "next/link";
import { useLocalGame } from "@/hooks/useLocalGame";
import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function LocalPlay() {
  const { board, turn, scores, timeLeft, selectedCell, selectCell, placeLetter, resetGame, winner, lastScoredCells, wordsFormed } = useLocalGame();
  
  // To avoid hydration mismatches with timers
  const [mounted, setMounted] = useState(false);
  const [wordDef, setWordDef] = useState<{ word: string, pos: string, def: string } | null>(null);

  useEffect(() => setMounted(true), []);

  // Fetch definition when a new word is formed
  useEffect(() => {
    if (wordsFormed.length > 0) {
      const lastWord = wordsFormed[wordsFormed.length - 1];
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${lastWord}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            const meaning = data[0].meanings[0];
            setWordDef({
              word: lastWord,
              pos: meaning?.partOfSpeech || 'word',
              def: meaning?.definitions[0]?.definition || 'Valid English word.'
            });
          }
        })
        .catch(() => {
          setWordDef({ word: lastWord, pos: 'word', def: 'Definition available online.' });
        });
    } else {
      setWordDef(null);
    }
  }, [wordsFormed]);

  // Global Keyboard Listener
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (selectedCell === null || winner !== null) return;
    const key = e.key.toUpperCase();
    if (/^[A-Z]$/.test(key)) {
      placeLetter(key);
    }
  }, [selectedCell, winner, placeLetter]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"]
  ];

  // SVG dash offset calculation (0 to 113 for 30s)
  const dashOffset = 113.097 - (113.097 * (timeLeft / 30));

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-2 py-3 sm:p-6 gap-2 sm:gap-4">
      
      {/* Top Header (Mobile Only) */}
      <div className="w-full max-w-3xl flex justify-between items-center md:hidden">
        <h1 className="text-lg font-extrabold text-slate-100 tracking-tight">
          Word <span className="text-amber-400">Wala</span>
        </h1>
        <Link 
          href="/" 
          className="text-xs text-slate-500 hover:text-slate-300 transition-colors focus:outline-none focus:ring-1 focus:ring-slate-500 rounded px-2 py-1"
        >
          ← Main Menu
        </Link>
      </div>

      {/* Main Game Area */}
      <div className="flex gap-6 md:gap-8 items-start w-full max-w-4xl xl:max-w-5xl">
        
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-52 shrink-0 flex-col gap-4">
          <div className="mb-1">
            <Link 
              href="/" 
              className="text-[11px] text-slate-500 hover:text-slate-300 transition-colors focus:outline-none focus:ring-1 focus:ring-slate-500 rounded py-1 mb-2 inline-block"
            >
              ← Main Menu
            </Link>
            <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">Word Wala</h1>
            <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>Dictionary ready
            </p>
          </div>

          <div className={cn("rounded-xl border p-4 transition-all duration-300", turn === 1 ? "border-blue-500 bg-blue-500/10" : "border-slate-700 bg-slate-800/60")}>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full shrink-0 bg-blue-400"></span>
              <span className="font-semibold text-sm text-blue-400">Player 1</span>
              {turn === 1 && <span className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full border bg-blue-500/20 text-blue-300 border-blue-500/50">TURN</span>}
            </div>
            <div className="flex items-baseline gap-1">
              <p className="text-4xl font-bold tabular-nums text-blue-400">{scores.p1}</p>
              <span className="text-sm text-slate-600 font-semibold">/ 75</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">points</p>
          </div>

          <div className={cn("rounded-xl border p-4 transition-all duration-300", turn === 2 ? "border-amber-500 bg-amber-500/10" : "border-slate-700 bg-slate-800/60")}>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full shrink-0 bg-amber-400"></span>
              <span className="font-semibold text-sm text-slate-400">Player 2</span>
              {turn === 2 && <span className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full border bg-amber-500/20 text-amber-300 border-amber-500/50">TURN</span>}
            </div>
            <div className="flex items-baseline gap-1">
              <p className="text-4xl font-bold tabular-nums text-slate-300">{scores.p2}</p>
              <span className="text-sm text-slate-600 font-semibold">/ 75</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">points</p>
          </div>

          <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-4">
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5">Current Turn</p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 flex-1">
                <span className={cn("w-2 h-2 rounded-full", turn === 1 ? "bg-blue-400" : "bg-amber-400")}></span>
                <p className={cn("text-sm font-semibold", turn === 1 ? "text-blue-400" : "text-amber-400")}>
                  Player {turn}
                </p>
              </div>
              <div className="relative w-12 h-12 shrink-0">
                <svg className="w-12 h-12 -rotate-90" viewBox="0 0 44 44">
                  <circle cx="22" cy="22" r="18" fill="none" stroke="currentColor" strokeWidth="3" className="text-slate-700"></circle>
                  <circle cx="22" cy="22" r="18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="113.097" strokeDashoffset={dashOffset} className={cn("transition-all duration-1000 ease-linear", turn === 1 ? "text-blue-400" : "text-amber-400")}></circle>
                </svg>
                <span className={cn("absolute inset-0 flex items-center justify-center text-sm font-bold tabular-nums", turn === 1 ? "text-blue-400" : "text-amber-400")}>
                  {timeLeft}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Words Formed ({wordsFormed.length})</p>
              {wordsFormed.length > 0 && <span className="text-[10px] text-slate-600">all ↓</span>}
            </div>
            {wordsFormed.length === 0 ? (
              <p className="text-xs text-slate-600 italic">None yet…</p>
            ) : (
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {wordsFormed.map((w, i) => (
                  <span key={i} className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-wider">
                    {w}
                  </span>
                ))}
              </div>
            )}
          </div>

          {wordDef && (
            <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-4 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
              <p className="text-[10px] font-semibold text-indigo-400/70 uppercase tracking-widest mb-1">Word Spotlight</p>
              <p className="text-base font-bold text-slate-200 uppercase">
                {wordDef.word} <span className="text-[10px] font-normal italic text-slate-400 lowercase">{wordDef.pos}</span>
              </p>
              <p className="text-xs text-slate-300 mt-1 line-clamp-3 leading-relaxed">{wordDef.def}</p>
            </div>
          )}

          <button onClick={resetGame} className="mt-auto w-full rounded-xl border border-slate-600 bg-slate-800 hover:bg-slate-700 hover:border-slate-500 active:bg-slate-900 text-slate-400 hover:text-slate-200 font-semibold text-sm py-2.5 px-4 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900">
            ↺ Reset Game
          </button>
        </aside>

        {/* Board */}
        <main className="flex-1 min-w-0 relative">
          {winner && (
            <div className="absolute inset-0 z-10 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl">
              <h2 className="text-3xl font-bold text-white mb-4">Player {winner} Wins!</h2>
              <button onClick={resetGame} className="px-6 py-3 bg-blue-600 rounded-xl font-bold text-white">Play Again</button>
            </div>
          )}
          <div className="grid gap-1 sm:gap-1.5 p-1.5 sm:p-3 bg-slate-800/40 rounded-2xl border border-slate-700/60" style={{ gridTemplateColumns: "repeat(8, 1fr)" }}>
            {board.map((cell, idx) => {
              const scoredIndex = lastScoredCells.indexOf(idx);
              const isScored = scoredIndex !== -1;
              return (
                <motion.button 
                  key={idx}
                  onClick={() => selectCell(idx)}
                  animate={
                    isScored 
                      ? { scale: [1, 1.15, 1], backgroundColor: ["#334155", "#10b981", "#334155"], y: [0, -4, 0] } 
                      : { scale: 1, y: 0 }
                  }
                  transition={{ 
                    duration: 0.5, 
                    ease: "easeInOut",
                    delay: isScored ? scoredIndex * 0.08 : 0
                  }}
                  className={cn(
                    "w-full aspect-square flex items-center justify-center rounded-lg border text-base sm:text-xl font-bold uppercase select-none cursor-pointer focus:outline-none transition-all",
                    cell ? "bg-slate-700 border-slate-500 text-white" : "bg-slate-800 border-slate-700 hover:bg-slate-700 hover:border-slate-500 text-slate-100",
                    selectedCell === idx && "ring-2 ring-amber-400 border-amber-400 bg-slate-700 scale-105",
                    isScored && "shadow-[0_0_20px_rgba(16,185,129,0.8)] border-emerald-400 z-10"
                  )}
                >
                  {cell}
                </motion.button>
              );
            })}
          </div>
        </main>
      </div>

      {/* Keyboard (Mobile Only) */}
      <div className="w-full max-w-lg mx-auto flex-col gap-1.5 mt-4 md:hidden flex" data-keyboard="true">
        {keys.map((row, rIdx) => (
          <div key={rIdx} className="flex justify-center gap-1">
            {row.map(key => (
              <button 
                key={key}
                onClick={() => placeLetter(key)}
                disabled={selectedCell === null}
                className="flex-1 max-w-[2.5rem] h-11 rounded-lg text-sm font-bold transition-colors select-none focus:outline-none focus:ring-1 focus:ring-slate-500 bg-slate-800 text-slate-200 border border-slate-700/50 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {key}
              </button>
            ))}
          </div>
        ))}
        <p className="text-center text-[10px] text-slate-500 mt-0.5">
          Tap a cell first, then tap a letter
        </p>
      </div>

    </div>
  );
}
