import SoundLink from "@/components/SoundLink";

export default function SocialLinks() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-12 animate-fadeIn">
      <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl text-center flex flex-col items-center">
        
        <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
          SNS & Platform Links
        </h3>
        <p className="text-slate-300 text-sm mb-8">
          各種プラットフォームでの作品公開やご支援はこちらからどうぞ。
          <br />
          View my work on various platforms and to show your support.
        </p>

        {/* リンクの視認性を確保（白文字＋下線） */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-6 w-full max-w-lg">
            <SoundLink 
                href="https://www.pixiv.net/users/3491142" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white font-mono text-sm sm:text-base hover:text-indigo-200 transition-colors underline decoration-white underline-offset-4 font-semibold flex items-center justify-center gap-1.5"            
            >
                <span>Pixiv Portfolio</span>
                <span className="text-indigo-300">↗</span>
            </SoundLink>
            
            <SoundLink 
                href="https://hisnameissky.tumblr.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white font-mono text-sm sm:text-base hover:text-indigo-200 transition-colors underline decoration-white underline-offset-4 font-semibold flex items-center justify-center gap-1.5"            
            >
                <span>Tumblr Portfolio</span>
                <span className="text-indigo-300">↗</span>
            </SoundLink>

            <SoundLink 
                href="https://ko-fi.com/hisnameisskyy/commissions/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white font-mono text-sm sm:text-base hover:text-indigo-200 transition-colors underline decoration-white underline-offset-4 font-semibold flex items-center justify-center gap-1.5"
            >
                <span>☕ Buy me a coffee / Ko-fi</span>
            </SoundLink>
        </div>

      </div>
    </section>
  );
}