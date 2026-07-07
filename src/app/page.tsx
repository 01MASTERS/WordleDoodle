import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-4 py-8 sm:p-8 gap-8 sm:gap-10">
      <div className="text-center">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-100 tracking-tight">
          Wordle <span className="text-amber-400">Doodle</span>
        </h1>
        <p className="mt-3 text-slate-400 text-sm sm:text-lg max-w-sm">
          Take turns placing letters on an 8×8 board. Spell words to score points.
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Link 
          href="/local"
          className="w-full rounded-2xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-lg py-4 px-6 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 shadow-lg text-left flex flex-col justify-center"
        >
          <span>🖥️ Play Locally</span>
          <span className="text-sm font-normal text-blue-200 mt-0.5">Pass &amp; play on the same device</span>
        </Link>
        <button 
          className="w-full rounded-2xl font-bold text-lg py-4 px-6 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 shadow-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white focus:ring-emerald-400 text-left flex flex-col justify-center"
        >
          <span>🌐 Play with Friends</span>
          <span className="text-sm font-normal mt-0.5 text-emerald-200">Online — invite a friend with a game code</span>
        </button>
      </div>

      <p className="text-xs text-slate-600 text-center max-w-xs">
        Click a cell, then type a letter. Words of 3+ letters score points.<br/>
        8 directions — horizontal, vertical &amp; diagonal.
      </p>
    </div>
  );
}
