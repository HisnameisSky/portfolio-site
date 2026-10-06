import SoundLink from "@/components/SoundLink";

export default function SocialLinks() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-12 animate-fadeIn">
      <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl text-center flex flex-col items-center">
        
        <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
          SNS & Platform Links
        </h3>
        <p className="text-slate-400 text-sm mb-8">
          各種プラットフォームでの作品公開やご支援はこちらからどうぞ。
        </p>

        {/* スマホでも縦並びまたは綺麗なフレックスで崩れないように調整 */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 w-full max-w-md">
            <SoundLink 
                href="https://www.pixiv.net/users/3491142" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-100 text-sm font-medium border border-slate-700 shadow-md transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 w-full sm:w-auto"
            >
                <span>Pixiv Portfolio</span>
                <span className="text-indigo-400">↗</span>
            </SoundLink>
            
            <SoundLink 
                href="https://hisnameissky.tumblr.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-100 text-sm font-medium border border-slate-700 shadow-md transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 w-full sm:w-auto"
            >
                <span>Tumblr Portfolio</span>
                <span className="text-indigo-400">↗</span>
            </SoundLink>

            <SoundLink 
                href="https://ko-fi.com/c/2c104782f4" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-500/20 border border-indigo-400/30 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 w-full sm:w-auto"
            >
                <span>☕ Buy me a coffee / Ko-fi</span>
            </SoundLink>
        </div>

      </div>
    </section>
  );
}