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
                className="text-white font-mono text-sm sm:text-base hover:text-indigo-300 transition-colors underline decoration-indigo-400 underline-offset-4"            
                >
                <span>Pixiv Portfolio</span>
                <span className="text-indigo-400">↗</span>
            </SoundLink>
            
            <SoundLink 
                href="https://hisnameissky.tumblr.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white font-mono text-sm sm:text-base hover:text-indigo-300 transition-colors underline decoration-indigo-400 underline-offset-4"            
                >
                <span>Tumblr Portfolio</span>
                <span className="text-indigo-400">↗</span>
            </SoundLink>

            <SoundLink 
                href="https://ko-fi.com/hisnameisskyy/commissions/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white font-mono text-sm sm:text-base hover:text-indigo-300 transition-colors underline decoration-indigo-400 underline-offset-4"
                >
                <span>☕ Buy me a coffee / Ko-fi</span>
            </SoundLink>
        </div>

      </div>
    </section>
  );
}