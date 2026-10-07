import Link from "next/link";
import SoundLink from "@/components/SoundLink";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between relative">
        
        <Link 
          href="/" 
          className="relative z-20 text-lg font-bold text-white tracking-wider hover:text-indigo-400 transition-colors py-2"
        >
          澄界 ｜ Hisnameissky<span className="text-indigo-500">.</span>
        </Link>

        {/* ナビゲーションメニュー */}
        <nav className="hidden sm:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link href="/#about" className="hover:text-white transition-colors py-2">
            About
          </Link>
          <Link href="/#artworks" className="hover:text-white transition-colors py-2">
            Artworks
          </Link>
          <Link href="/#projects" className="hover:text-white transition-colors py-2">
            Projects
          </Link>
          {/* ✨ ここにウォーターマークスタジオへのアクセスリンクを追加 */}
          <Link href="/watermark" className="text-indigo-400 hover:text-indigo-300 transition-colors py-2 font-semibold">
            🛡️ Watermark Studio
          </Link>
          <Link href="/#contact" className="hover:text-white transition-colors py-2">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4 relative z-20">
          <SoundLink 
            href="https://github.com/HisnameisSky" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold tracking-wide transition-all duration-300 hover:scale-105 shadow-lg shadow-indigo-500/20"
          >
            GitHub
          </SoundLink>
        </div>

      </div>
    </header>
  );
}
