// src/app/watermark/page.tsx
"use client";

import { useState, useEffect, ChangeEvent } from "react";
import Link from "next/link";
import { applyWatermark, WatermarkOptions } from "@/utils/watermark";
import SoundLink from "@/components/SoundLink";


interface ProcessedImage {
  id: string;
  name: string;
  originalSrc: string;
  previewSrc: string;
}

export default function WatermarkStudioPage() {
  const [watermarkText, setWatermarkText] = useState("© Hisnameissky");
  const [fontSize, setFontSize] = useState(32);
  const [opacity, setOpacity] = useState(0.4);
  const [angle, setAngle] = useState(-30);
  
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // ファイルが選択されたときの処理
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsProcessing(true);

    const filesArray = Array.from(e.target.files);
    const newImages: ProcessedImage[] = [];

    for (const file of filesArray) {
      const originalSrc = URL.createObjectURL(file);
      const options: WatermarkOptions = { text: watermarkText, fontSize, color: "#ffffff", opacity, angle };
      
      try {
        const previewSrc = await applyWatermark(originalSrc, options);
        newImages.push({
          id: Math.random().toString(36.substring(2)),
          name: file.name,
          originalSrc,
          previewSrc,
        });
      } catch (err) {
        console.error("Watermark apply error:", err);
      }
    }

    setImages((prev) => [...prev, ...newImages]);
    setIsProcessing(false);
  };

  // 設定値（テキストやスライダー）が変わったときにプレビューを再描画する処理などをここに繋げます
  // ...

return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            🛡️ AI Asset Watermark Studio
          </h1>
          <Link href="/" className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-sm font-medium transition-colors">
            &larr; ポートフォリオに戻る｜Return to portfolio
          </Link>
        </div>

        {/* コントロールパネルとプレビューグリッドの配置 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左側：設定パネル */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col gap-6 h-fit">
            <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">⚙️ 設定｜Setting</h2>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-300">透かしテキスト｜Watermark text</label>
              <input 
                type="text" 
                value={watermarkText}
                onChange={(e) => setWatermarkText(e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-300">不透明度｜Opacity: {Math.round(opacity * 100)}%</label>
              <input 
                type="range" min="0.1" max="1" step="0.05" value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="accent-indigo-500 cursor-pointer"
              />
            </div>

            <label className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm cursor-pointer text-center shadow-lg shadow-indigo-500/20 transition-all">
              {isProcessing ? "処理中..." : "画像を追加する"}
              <input type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" />
            </label>
          </div>

          {/* 右側：プレビューギャラリー */}
          <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl min-h-[400px]">
            <h2 className="text-lg font-bold text-white mb-4">🖼️ プレビュー一覧｜Preview ({images.length}件)</h2>
            
            {images.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 border-dashed border-2 border-slate-800 rounded-2xl text-slate-400 text-sm">
                左側のパネルから画像をアップロードしてください｜ Please upload an image from the panel on the left.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {images.map((img) => (
                  <div key={img.id} className="relative group rounded-xl overflow-hidden border border-slate-800 bg-slate-950 aspect-square">
                    <img src={img.previewSrc} alt={img.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                      <a href={img.previewSrc} download={`watermarked_${img.name}`} className="px-3 py-1.5 bg-indigo-600 text-white text-xs rounded-lg font-medium shadow">
                        ダウンロード｜Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
