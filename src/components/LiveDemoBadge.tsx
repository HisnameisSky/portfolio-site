"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function LiveDemoBadge() {
  const [isMounted, setIsMounted] = useState(false);
  const [isProtected, setIsProtected] = useState(true);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full max-w-sm mx-auto p-4 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-2xl h-[380px] animate-pulse" />
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto p-4 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-2xl">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className={`w-2.5 h-2.5 rounded-full ${isProtected ? 'bg-indigo-400 animate-pulse' : 'bg-emerald-400'}`} />
          <span className="text-xs font-mono text-slate-300 tracking-wider">
            AI PROTECTION STUDIO
          </span>
        </div>
        <button
          onClick={() => setIsProtected(!isProtected)}
          className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer border ${
            isProtected 
              ? "bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border-indigo-500/50" 
              : "bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700"
          }`}
        >
          {isProtected ? "🔒 プロテクト有効" : "🔓 オリジナル表示"}
        </button>
      </div>

      {/* プレビュー画像エリア */}
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner">
        <img
          src="/images/IMG_6406.webp" 
          alt="Preview"
          // プロテクト有効時は、コントラストや色味をわずかに変化させつつ、デジタルノイズ風のフィルター感を演出
          className={`w-full h-full object-cover select-none transition-all duration-300 ${
            isProtected 
              ? "contrast-125 brightness-90 saturate-50 hue-rotate-15" 
              : "contrast-100 brightness-100 saturate-100 hue-rotate-0"
          }`}
          onContextMenu={(e) => e.preventDefault()}
          draggable={false}
        />

        {/* 幾何学パターン（保護のグリッド）＋スキャンライン */}
        {isProtected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(15, 23, 42, 0.4) 50%, rgba(0, 0, 0, 0.6) 50%),
                linear-gradient(90deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))
              `,
              backgroundSize: "100% 4px, 16px 16px",
            }}
          />
        )}

        {/* ステータスバッジ */}
        <div className="absolute bottom-2 left-2 z-10">
          <span className="text-[10px] font-mono bg-slate-950/90 text-indigo-300 px-2.5 py-1 rounded backdrop-blur-md border border-indigo-500/40 shadow flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${isProtected ? 'bg-indigo-400' : 'bg-emerald-400'}`} />
            {isProtected ? "AI Noise & Grid Applied" : "Original Asset Rendered"}
          </span>
        </div>
      </div>

      <p className="text-[11px] text-slate-400 mt-3 text-center leading-relaxed">
        {isProtected 
          ? "AIの画像認識・スクレイピングを撹乱するノイズ＆グリッドパターンが適用されています。" 
          : "保護レイヤーを外し、オリジナルの高画質アセットを表示中。"}
        <br />
        <span className="text-[10px] text-slate-500">
          Interactive Scrambling & Anti-AI Filter Demo
        </span>
      </p>
    </div>
  );
}
