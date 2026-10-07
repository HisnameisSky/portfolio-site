// src/app/watermark/page.tsx
"use client";

import { useState, ChangeEvent } from "react";
import Link from "next/link";
import JSZip from "jszip";
import { applyWatermark, WatermarkOptions } from "@/utils/watermark";

interface ProcessedImage {
  id: string;
  name: string;
  originalSrc: string;
  previewSrc: string;
  blob?: Blob; // ZIP化用
}

export default function WatermarkStudioPage() {
  const [watermarkText, setWatermarkText] = useState("© Hisnameissky");
  const [fontSize, setFontSize] = useState(32);
  const [opacity, setOpacity] = useState(0.4);
  const [angle, setAngle] = useState(-30);
  
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isZipping, setIsZipping] = useState(false);

  // ファイル選択・ウォーターマーク適用処理
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
        
        // DataURLをBlobに変換（ZIP保存用）
        const res = await fetch(previewSrc);
        const blob = await res.blob();

        newImages.push({
          id: Math.random().toString(36).substring(2),
          name: file.name.replace(/\.[^/.]+$/, "") + "_watermarked.webp",
          originalSrc,
          previewSrc,
          blob,
        });
      } catch (err) {
        console.error("Watermark apply error:", err);
      }
    }

    setImages((prev) => [...prev, ...newImages]);
    setIsProcessing(false);
  };

  // 一括ZIPダウンロード処理
  const handleDownloadZip = async () => {
    if (images.length === 0) return;
    setIsZipping(true);

    const zip = new JSZip();
    images.forEach((img) => {
      if (img.blob) {
        zip.file(img.name, img.blob);
      }
    });

    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = "watermarked_assets.zip";
    a.click();
    
    URL.revokeObjectURL(url);
    setIsZipping(false);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              🛡️ AI Asset Watermark Studio
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              ブラウザ上だけで安全にイラストへウォーターマークを焼き込み、一括保護します。
              <br />
              Safely embed watermarks into your illustrations and protect them in bulk—all within your browser.
            </p>
          </div>
          <Link href="/" className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-sm font-medium transition-colors">
            &larr; ポートフォリオに戻る｜Return to profolio
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 左側：設定パネル */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col gap-6 h-fit">
            <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">⚙️ 設定パネル</h2>
            
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

            <label className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm cursor-pointer text-center shadow-lg shadow-indigo-500/20 transition-all">
              {isProcessing ? "処理中..." : "📁 画像ファイルを選択"}
              <input type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" />
            </label>

            {images.length > 0 && (
              <button
                onClick={handleDownloadZip}
                disabled={isZipping}
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50"
              >
                {isZipping ? "ZIP作成中..." : `📦 すべて一括ZIPダウンロード (${images.length}枚)`}
              </button>
            )}
          </div>

          {/* 右側：プレビューギャラリー */}
          <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl min-h-[450px]">
            <h2 className="text-lg font-bold text-white mb-4">🖼️ プレビュー一覧｜Preview ({images.length}件)</h2>
            
            {images.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-80 border-dashed border-2 border-slate-800 rounded-2xl text-slate-400 text-sm text-center p-6">
                <p className="mb-2">まだ画像が追加されていません｜No images have been added yet.</p>
                <span className="text-xs text-slate-500">
                  左側のボタンからイラストを選択すると、自動でウォーターマークがプレビューされます。
                  <br />
                  When you select an illustration from the buttons on the left, a preview of the watermark will automatically appear.
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {images.map((img) => (
                  <div key={img.id} className="relative group rounded-xl overflow-hidden border border-slate-800 bg-slate-950 aspect-square shadow-md">
                    <img src={img.previewSrc} alt={img.name} className="w-full h-full object-cover select-none" />
                    <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                      <a href={img.previewSrc} download={img.name} className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs rounded-lg font-medium shadow transition-transform hover:scale-105">
                        個別ダウンロード｜Individual Downloads
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