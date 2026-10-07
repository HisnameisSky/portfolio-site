import SoundLink from "@/components/SoundLink";

export default function Contact() {
  return (
    <section id="contact" className="w-full max-w-4xl mx-auto px-4 py-16 animate-fadeIn">
      <div className="bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-12 shadow-2xl flex flex-col items-center text-center relative overflow-hidden group">
        
        {/* 背景の光のアクセント */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none transition-all duration-500 group-hover:bg-indigo-500/25" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/15 rounded-full blur-3xl pointer-events-none transition-all duration-500 group-hover:bg-purple-500/25" />

        {/* セクションタイトル（透明化せず、はっきりした白文字に変更） */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
          連絡 ｜ Contact
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-xl mb-8 leading-relaxed">
          ご質問、お問い合わせ、リクエストに際して、電子メールまたは各種プラットフォームよりご連絡ください。
          <br/>If you have any questions, inquiries, or requests, please contact me via email or through one other platforms.
        </p>

        {/* メールアドレス表示エリア */}
        <div className="mb-8 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 w-full max-w-md shadow-inner transition-transform duration-300 hover:scale-[1.02]">
          <p className="text-xs text-indigo-300 font-medium mb-1">E-Mail (English / 日本語)</p>
          <SoundLink 
            href="mailto:HisnameisskyX@gmail.com" 
            className="text-white font-mono text-sm sm:text-base hover:text-indigo-200 transition-colors underline decoration-white underline-offset-4 font-semibold"
          >
            HisnameisskyX@gmail.com
          </SoundLink>
        </div>

        {/* 事前にお知らせいただきたい3つの要素のボックス */}
        <div className="mb-8 w-full max-w-md bg-slate-950/60 border border-slate-800 rounded-2xl p-5 shadow-inner flex flex-col items-center text-center">
          <p className="text-xs font-semibold text-slate-200 mb-3 tracking-wide">
            ▼ 予め以下の事項の回答をして頂けますと幸いです
            <br/>▼ I would appreciate it if you could answer the following questions in advance.
          </p>
          
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200 inline-block text-left">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
              <span><strong className="text-white">要件の内容</strong> <span className="text-slate-300">/ Content & Message</span></span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
              <span><strong className="text-white">希望する納期</strong> <span className="text-slate-300">/ Deadline & Due date</span></span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
              <span><strong className="text-white">予算また報酬</strong> <span className="text-slate-300">/ Budget & Reward</span></span>
            </li>
          </ul>
        </div>

        {/* 外部リンクボタン */}
        <div className="flex flex-wrap justify-center gap-4">
          <SoundLink 
            href="https://ko-fi.com/c/2c104782f4" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105 shadow-lg shadow-indigo-500/20 flex items-center gap-2"
          >
            <span>✨ Ko-fi でリクエスト・依頼する</span>
          </SoundLink>
          
          <SoundLink 
            href="https://hisnameissky.tumblr.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105 border border-slate-700 flex items-center gap-2"
          >
            <span>Tumblrを見る</span>
          </SoundLink>
        </div>

      </div>
    </section>
  );
}