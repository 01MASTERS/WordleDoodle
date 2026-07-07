"use client";

import { Shuffle, ArrowRightCircle, Delete } from "lucide-react";
import { motion } from "framer-motion";

export function GameControls() {
  const rack = ["W", "O", "R", "D", "A", "L", "A"];

  return (
    <div className="w-full max-w-2xl mx-auto mt-6 flex flex-col gap-6">
      {/* Letter Rack */}
      <div className="flex justify-center gap-2 sm:gap-4 p-4 bg-slate-800/40 rounded-2xl border border-slate-700/50 shadow-inner backdrop-blur-sm">
        {rack.map((letter, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-14 sm:w-16 sm:h-20 bg-gradient-to-b from-slate-600 to-slate-700 rounded-lg flex items-center justify-center cursor-pointer shadow-[0_4px_10px_rgba(0,0,0,0.5)] border-t border-slate-500 text-2xl sm:text-3xl font-bold text-white uppercase drop-shadow-md relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/5 opacity-50 pointer-events-none" />
            {letter}
            <span className="absolute bottom-1 right-2 text-[10px] text-slate-300/60 font-medium">1</span>
          </motion.div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center px-2">
        <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all font-medium border border-slate-700 hover:border-slate-600 group">
          <Shuffle className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
          <span>Shuffle</span>
        </button>

        <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-400 transition-all font-medium border border-slate-700 hover:border-red-500/30">
          <Delete className="w-5 h-5" />
          <span>Recall</span>
        </button>

        <button className="flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white transition-all font-bold shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] group">
          <span>Submit</span>
          <ArrowRightCircle className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
