import { Trophy, Users, Star, Timer } from "lucide-react";

export function Sidebar() {
  return (
    <div className="w-full lg:w-80 flex flex-col gap-6">
      {/* Score Card */}
      <div className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-indigo-500/20 rounded-lg">
            <Trophy className="w-6 h-6 text-indigo-400" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Current Game</h2>
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center p-3 rounded-xl bg-slate-900/50 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold text-white">Y</div>
              <span className="text-slate-200 font-medium">You</span>
            </div>
            <span className="text-2xl font-black text-blue-400">142</span>
          </div>
          
          <div className="flex justify-between items-center p-3 rounded-xl bg-slate-800/30 border border-slate-700/30 opacity-70">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-sm font-bold text-white">O</div>
              <span className="text-slate-300 font-medium">Opponent</span>
            </div>
            <span className="text-2xl font-black text-purple-400">89</span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between text-sm text-slate-400 border-t border-slate-700/50 pt-4">
          <div className="flex items-center gap-1.5">
            <Timer className="w-4 h-4" />
            <span>Time: 12:45</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>Tiles: 42 left</span>
          </div>
        </div>
      </div>

      {/* Online Status */}
      <div className="bg-slate-800/40 rounded-2xl p-6 border border-slate-700/50 backdrop-blur-md">
        <div className="flex items-center gap-3 mb-4">
          <Users className="w-5 h-5 text-slate-400" />
          <h3 className="text-lg font-semibold text-slate-200">Online Players</h3>
          <span className="ml-auto flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
        </div>
        <p className="text-slate-400 text-sm">
          243 players online. Looking for a match?
        </p>
        <button className="w-full mt-4 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition-colors border border-slate-600">
          Find Match
        </button>
      </div>
    </div>
  );
}
