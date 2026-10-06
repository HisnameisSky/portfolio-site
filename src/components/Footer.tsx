import SoundLink from "@/components/SoundLink";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-900 text-slate-400 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        
        {/* 左側：ブランド名・コピーライト */}
        <div className="flex flex-col items-center md:items-start">
          <span className="text-white font-bold text-lg tracking-tight mb-1">
            澄界 ｜ Hisnameissky<span className="text-indigo-400">.</span>
          </span>
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Hisnameissky. All rights reserved.
          </p>
        </div>

        {/* 右側：綺麗に整理されたリンク集（スマホでも重ならないよう調整） */}
        <div className="flex flex-wrap justify-center items-center gap-3 text-sm font-medium">
          <SoundLink 
            href="#artworks" 
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all duration-300 shadow-sm"
          >
            Artworks
          </SoundLink>
          <span className="text-slate-700 hidden sm:inline">/</span>
          <SoundLink 
            href="#projects" 
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all duration-300 shadow-sm"
          >
            Projects
          </SoundLink>
          <span className="text-slate-700 hidden sm:inline">/</span>
          <SoundLink 
            href="#contact" 
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all duration-300 shadow-sm"
          >
            Contact
          </SoundLink>
        </div>

      </div>
    </footer>
  );
}
