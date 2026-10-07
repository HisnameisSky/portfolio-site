"use client";

import DropZone from "./DropZone";
import { ChangeEvent } from "react";

export interface ProcessedImage {
  id: string;
  name: string;
  originalSrc: string;
  previewSrc: string;
  blob?: Blob;
}

interface PreviewGridProps {
  images: ProcessedImage[];
  onRemove: (id: string) => void;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isProcessing: boolean;
}

export default function PreviewGrid({
  images,
  onRemove,
  onFileChange,
  isProcessing,
}: PreviewGridProps) {
  return (
    <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl min-h-[450px] flex flex-col">
      <h2 className="text-lg font-bold text-white mb-4">
        🖼️ プレビュー一覧 ｜ Preview ({images.length}件)
      </h2>
      
      {images.length === 0 ? (
        <DropZone onFileChange={onFileChange} isProcessing={isProcessing} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 overflow-y-auto max-h-[600px] pr-1">
          {images.map((img: ProcessedImage) => (
            <div 
              key={img.id} 
              className="relative group rounded-xl overflow-hidden border border-slate-800 bg-slate-950 aspect-square shadow-md"
            >
              <img src={img.previewSrc} alt={img.name} className="w-full h-full object-cover select-none" />
              
              {/* ホバー時に個別ダウンロードと「撤回（削除）」ボタンを表示 */}
              <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3">
                <a 
                  href={img.previewSrc} 
                  download={img.name} 
                  className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs rounded-lg font-medium text-center shadow transition-transform hover:scale-105"
                >
                  個別ダウンロード｜Download individualy
                </a>
                <button
                  onClick={() => onRemove(img.id)}
                  className="w-full py-1.5 bg-rose-600/80 hover:bg-rose-600 text-white text-xs rounded-lg font-medium text-center shadow transition-transform hover:scale-105"
                >
                  ✕ 選択を撤回｜Revoke selection
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}