"use client";

import { ChangeEvent } from "react";
import { WatermarkOptions } from "@/utils/watermark";

interface PresetItem {
  label: string;
  value: string;
}

interface ControlPanelProps {
  options: WatermarkOptions;
  onChangeOptions: (newOpts: Partial<WatermarkOptions>) => void;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onDownloadZip: () => void;
  isProcessing: boolean;
  isZipping: boolean;
  imageCount: number;
}

export default function ControlPanel({
  options,
  onChangeOptions,
  onFileChange,
  onDownloadZip,
  isProcessing,
  isZipping,
  imageCount,
}: ControlPanelProps) {
  const presets: PresetItem[] = [
    { label: "©️ Copyright", value: "© YourName" },
    { label: "🎨 Handle / ID", value: "@YourHandle" },
    { label: "🛡️ AI Protected", value: "DO NOT AI SCRAPE" },
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col gap-6 h-fit">
      <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">⚙️ 設定パネル｜Settings panel</h2>
      
      {/* 透かしテキスト ＆ プリセット */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-300">透かしテキスト ｜ Watermark Text</label>
        <input 
          type="text" 
          value={options.text}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeOptions({ text: e.target.value })}
          className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
        />
        
        <div className="flex flex-wrap gap-1.5 mt-2">
          <span className="text-[10px] text-slate-400 w-full mb-0.5">クイックプリセット｜Quick reset:</span>
          {presets.map((p: PresetItem, idx: number) => (
            <button
              key={idx}
              type="button"
              onClick={() => onChangeOptions({ text: p.value })}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white text-xs font-medium transition-colors border border-slate-700"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* 不透明度スライダー */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-300">
          不透明度 ｜ Opacity: {Math.round(options.opacity * 100)}%
        </label>
        <input 
          type="range" min="0.1" max="1" step="0.05" value={options.opacity}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeOptions({ opacity: Number(e.target.value) })}
          className="accent-indigo-500 cursor-pointer"
        />
      </div>

      {/* ファイル選択トリガー（DropZone等に渡すための窓口） */}
      <label className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm cursor-pointer text-center shadow-lg shadow-indigo-500/20 transition-all">
        {isProcessing ? "処理中...｜processing..." : "📁 画像ファイルを選択｜Choose image"}
        <input type="file" accept="image/*" multiple onChange={onFileChange} className="hidden"/>
      </label>

      {/* 一括ZIPダウンロード */}
      {imageCount > 0 && (
        <button
          onClick={onDownloadZip}
          disabled={isZipping}
          className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50"
        >
          {isZipping ? "ZIP作成中...｜Zipping..." : `📦 すべて一括ZIPダウンロード｜Bulk download (${imageCount}枚)`}
        </button>
      )}
    </div>
  );
}