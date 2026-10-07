
import Link from "next/link";

export default function Hero() {
  return (
    <section id="about" className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden py-20 px-4 animate-fadeIn">
      
      <div className="absolute inset-0 z-0 w-full h-full">
        <img 
          src="/images/IMG_6504.jpg" 
          alt="Background Artwork"
          className="w-full h-full object-cover object-center filter blur-[2px] opacity-25 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-slate-950" />
      </div>

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-4xl w-full mx-auto text-center flex flex-col items-center">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-medium text-indigo-300 mb-6 backdrop-blur-md shadow-inner">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          澄界 ｜ Hisnameissky - Digital Portfolio
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-normal sm:leading-relaxed mb-6">
          Bringing{" "}
          <span className="inline-block text-indigo-400 font-black drop-shadow-[0_0_20px_rgba(129,140,248,0.5)]">
            Imagination
          </span>{" "}
          to Digital Life.
        </h1>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed mb-10">
          心惹かれるイラストレーションの世界と、モダンなWebテクノロジーが融合する場所。
          <br/>
          独自のビジョンとインタラクティブな表現を形にしています。
          <br/>
          A place where the captivating world of illustration meets modern web technology.
          <br/>
          I bring unique vision and interactive expressions to life.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <Link 
            href="/#artworks"
            className="px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-xl shadow-indigo-500/30 border border-indigo-400/40 transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <span>作品集を見る</span>
            <span className="text-indigo-200">&rarr;</span>
          </Link>

          <Link 
            href="/#projects"
            className="px-8 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-100 font-semibold shadow-lg border border-slate-700 transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <span>開発プロジェクト</span>
            <span className="text-indigo-400">&rarr;</span>
          </Link>
        </div>

      </div>
    </section>
  );
}