// src/app/watermark/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import SoundLink from "@/components/SoundLink";

export default function WatermarkStudioPage() {
  const [watermarkText, setWatermarkText] = useState("© Hisnameissky");
  const [fontSize, setFontSize] = useState(32);
  const [opacity, setOpacity] = useState(0.4);
  const [angle, setAngle] = useState(-30);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* ヘッダー部分 */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              🛡️ AI Asset Watermark Studio
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              大切なイラストアセットにブラウザ上で安全にウォーターマークを焼き込みます（完全ローカル処理）。
              <br />
              Safely embed watermarks into your valuable illustration assets right in your browser (processed entirely locally).
            </p>
          </div>
          <Link 
            href="/"
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-sm font-medium transition-colors"
          >
            &larr; ポートフォリオに戻る｜Back to Portfolio
          </Link>
        </div>

        {/* メインのコントロール & プレビューレイアウト */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 左側：設定パネル */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col gap-6">
            <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
              ⚙️ ウォーターマーク設定｜Watermark Settings
            </h2>

            {/* テキスト設定 */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-300">透かしテキスト｜Watermark Text</label>
              <input 
                type="text" 
                value={watermarkText}
                onChange={(e) => setWatermarkText(e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* フォントサイズ */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span>フォントサイズ｜Font Size</span>
                <span className="font-mono text-indigo-400">{fontSize}px</span>
              </div>
              <input 
                type="range" 
                min="12" 
                max="120" 
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="accent-indigo-500 cursor-pointer"
              />
            </div>

            {/* 不透明度 */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span>不透明度 (Opacity)</span>
                <span className="font-mono text-indigo-400">{Math.round(opacity * 100)}%</span>
              </div>
              <input 
                type="range" 
                min="0.1" 
                max="1" 
                step="0.05"
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="accent-indigo-500 cursor-pointer"
              />
            </div>

            {/* 角度 */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span>傾き (Angle)</span>
                <span className="font-mono text-indigo-400">{angle}°</span>
              </div>
              <input 
                type="range" 
                min="-90" 
                max="90" 
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                className="accent-indigo-500 cursor-pointer"
              />
            </div>
          </div>

          {/* 右側：プレビュー & アップロードエリア */}
          <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col items-center justify-center min-h-[400px] text-center border-dashed border-2 border-slate-700/60">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-2xl">
                📁
              </div>
              <h3 className="text-lg font-bold text-white">
                画像をここにドラッグ＆ドロップ
                <br />
                Drag and drop an image here.
                </h3>
              <p className="text-slate-400 text-sm max-w-sm">
                または、下のボタンからファイルを選択して、ウォーターマークのプレビューを確認します。
                <br />
                Alternatively, select a file using the button below to preview the watermark.
              </p>
              <label className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm cursor-pointer shadow-lg shadow-indigo-500/20 transition-all">
                ファイルを選択｜Select a file
                <input type="file" accept="image/*" multiple className="hidden" />
              </label>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}