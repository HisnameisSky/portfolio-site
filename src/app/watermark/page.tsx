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
  blob?: Blob;
}

interface PresetItem {
  label: string;
  value: string;
}

export default function WatermarkStudioPage() {
  const [watermarkText, setWatermarkText] = useState<string>("© YourName");
  const [fontSize, setFontSize] = useState<number>(32);
  const [opacity, setOpacity] = useState<number>(0.4);
  const [angle, setAngle] = useState<number>(-30);
  
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isZipping, setIsZipping] = useState<boolean>(false);

  const presets: PresetItem[] = [
    { label: "©️ Copyright", value: "© YourName" },
    { label: "🎨 Handle / ID", value: "@YourHandle" },
    { label: "🛡️ AI Protected", value: "DO NOT AI SCRAPE" },
  ];

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsProcessing(true);

    const filesArray: File[] = Array.from(e.target.files);
    const newImages: ProcessedImage[] = [];

    for (const file of filesArray) {
      const originalSrc: string = URL.createObjectURL(file);
      const options: WatermarkOptions = { text: watermarkText, fontSize, color: "#ffffff", opacity, angle };
      
      try {
        const previewSrc: string = await applyWatermark(originalSrc, options);
        const res: Response = await fetch(previewSrc);
        const blob: Blob = await res.blob();

        newImages.push({
          id: Math.random().toString(36).substring(2),
          name: file.name.replace(/\.[^/.]+$/, "") + "_watermarked.webp",
          originalSrc,
          previewSrc,
          blob,
        });
      } catch (err: unknown) {
        console.error("Watermark apply error:", err);
      }
    }

    setImages((prev: ProcessedImage[]) => [...prev, ...newImages]);
    setIsProcessing(false);
  };

  const handleDownloadZip = async (): Promise<void> => {
    if (images.length === 0) return;
    setIsZipping(true);

    const zip = new JSZip();
    images.forEach((img: ProcessedImage) => {
      if (img.blob) {
        zip.file(img.name, img.blob);
      }
    });

    const content: Blob = await zip.generateAsync({ type: "blob" });
    const url: string = URL.createObjectURL(content);
    
    const a: HTMLAnchorElement = document.createElement("a");
    a.href = url;
    a.download = "watermarked_assets.zip";
    a.click();
    
    URL.revokeObjectURL(url);
    setIsZipping(false);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4"[cite: 11]>
      <div className="max-w-6xl mx-auto"[cite: 11]>
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800"[cite: 11]>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white"[cite: 11]>
              🛡️ AI Asset Watermark Studio
            </h1>
            <p className="text-slate-400 text-sm mt-1"[cite: 11]>
              ブラウザ上だけで安全にイラストへウォーターマークを焼き込み、一括保護します[cite: 11]。
            </p>
          </div>
          <Link href="/" className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-sm font-medium transition-colors"[cite: 11]>
            &larr; ポートフォリオに戻る
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8"[cite: 11]>
          
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col gap-6 h-fit"[cite: 11]>
            <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3"[cite: 11]>⚙️ 設定パネル</h2>
            
            <div className="flex flex-col gap-2"[cite: 11]>
              <label className="text-xs font-semibold text-slate-300">透かしテキスト ｜ Watermark Text</label>
              <input 
                type="text" 
                value={watermarkText}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setWatermarkText(e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"[cite: 11]
              />
              
              <div className="flex flex-wrap gap-1.5 mt-2">
                <span className="text-[10px] text-slate-400 w-full mb-0.5">クイックプリセット:</span>
                {presets.map((p: PresetItem, idx: number) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setWatermarkText(p.value)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white text-xs font-medium transition-colors border border-slate-700"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2"[cite: 11]>
              <label className="text-xs font-semibold text-slate-300">不透明度 ｜ Opacity: {Math.round(opacity * 100)}%</label>
              <input 
                type="range" min="0.1" max="1" step="0.05" value={opacity}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setOpacity(Number(e.target.value))}
                className="accent-indigo-500 cursor-pointer"[cite: 11]
              />
            </div>

            <label className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm cursor-pointer text-center shadow-lg shadow-indigo-500/20 transition-all"[cite: 11]>
              {isProcessing ? "処理中..." : "📁 画像ファイルを選択"}
              <input type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden"[cite: 11] />
            </label>

            {images.length > 0 && (
              <button
                onClick={handleDownloadZip}
                disabled={isZipping}
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50"[cite: 11]
              >
                {isZipping ? "ZIP作成中..." : `📦 すべて一括ZIPダウンロード (${images.length}枚)`}
              </button>
            )}
          </div>

          <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl min-h-[450px]"[cite: 11]>
            <h2 className="text-lg font-bold text-white mb-4"[cite: 11]>🖼️ プレビュー一覧 ｜ Preview ({images.length}件)</h2>
            
            {images.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-80 border-dashed border-2 border-slate-800 rounded-2xl text-slate-400 text-sm text-center p-6"[cite: 11]>
                <p className="mb-2"[cite: 11]>まだ画像が追加されていません</p>
                <span className="text-xs text-slate-500"[cite: 11]>
                  左側のボタンからイラストを選択すると、自動でウォーターマークがプレビューされます[cite: 11]。
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4"[cite: 11]>
                {images.map((img: ProcessedImage) => (
                  <div key={img.id} className="relative group rounded-xl overflow-hidden border border-slate-800 bg-slate-950 aspect-square shadow-md"[cite: 11]>
                    <img src={img.previewSrc} alt={img.name} className="w-full h-full object-cover select-none"[cite: 11] />
                    <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2"[cite: 11]>
                      <a href={img.previewSrc} download={img.name} className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs rounded-lg font-medium shadow transition-transform hover:scale-105"[cite: 11]>
                        個別ダウンロード
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