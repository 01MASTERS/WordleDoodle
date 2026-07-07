import { Menu, UserCircle2 } from "lucide-react";

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <Menu className="w-6 h-6 text-slate-400 cursor-pointer hover:text-white transition-colors" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent ml-2 tracking-tight">
          Word Wala
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="px-4 py-2 rounded-full bg-blue-600/20 text-blue-400 font-medium hover:bg-blue-600/30 transition-colors text-sm border border-blue-500/30 shadow-[0_0_15px_rgba(37,99,235,0.15)]">
          Play Online
        </button>
        <UserCircle2 className="w-8 h-8 text-slate-300 hover:text-white transition-colors cursor-pointer" />
      </div>
    </header>
  );
}
