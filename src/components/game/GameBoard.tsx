"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function GameBoard() {
  // 8x8 grid = 64 cells
  const [board, setBoard] = useState<string[]>(Array(64).fill(""));

  return (
    <div className="w-full max-w-2xl mx-auto aspect-square bg-slate-800/50 p-2 rounded-xl shadow-2xl border border-slate-700/50 backdrop-blur-md">
      <div className="grid grid-cols-8 grid-rows-8 gap-1 h-full w-full">
        {board.map((cell, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 0.95, backgroundColor: "#1e293b" }}
            whileTap={{ scale: 0.9 }}
            className={cn(
              "flex items-center justify-center rounded-md cursor-pointer transition-colors",
              "bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/30",
              cell ? "bg-blue-600 border-blue-500 shadow-inner" : ""
            )}
          >
            {cell && (
              <span className="text-xl md:text-2xl font-bold text-white uppercase drop-shadow-md">
                {cell}
              </span>
            )}
            {/* Multiplier highlights (mock for visual aesthetics) */}
            {!cell && index % 12 === 0 && (
              <span className="text-[10px] text-pink-400/50 font-bold tracking-tighter">3W</span>
            )}
            {!cell && index % 15 === 5 && (
              <span className="text-[10px] text-blue-400/50 font-bold tracking-tighter">2L</span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
