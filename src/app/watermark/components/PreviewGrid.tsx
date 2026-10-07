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
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white">
          🖼️ プレビュー一覧 ｜ Preview ({images.length}件)
        </h2>
        {images.length > 0 && (
          <span className="text-xs text-slate-400">
            画像ごとに個別ダウンロードや撤回が可能です
            <br />
            You can download or remove each image individually.
          </span>
        )}
      </div>
      
      {images.length === 0 ? (
        <DropZone onFileChange={onFileChange} isProcessing={isProcessing} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 overflow-y-auto max-h-[600px] pr-1">
          {images.map((img: ProcessedImage) => (
            <div 
              key={img.id} 
              className="relative group rounded-xl overflow-hidden border border-slate-800 bg-slate-950 aspect-square shadow-md flex flex-col"
            >
              {/* プレビュー画像本体 */}
              <img src={img.previewSrc} alt={img.name} className="w-full h-full object-cover select-none" />
              
              {/* 右上に常時配置する「撤回（削除）」ボタン */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(img.id);
                }}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center text-xs font-bold shadow-lg transition-transform hover:scale-110 z-10"
                title="この選択を撤回（削除）"
              >
                ✕
              </button>

              {/* 下部に配置する個別ダウンロードボタン */}
              <div className="absolute bottom-2 inset-x-2">
                <a 
                  href={img.previewSrc} 
                  download={img.name} 
                  className="block w-full py-1.5 bg-slate-900/90 hover:bg-indigo-600 text-slate-200 hover:text-white text-xs rounded-lg font-medium text-center shadow border border-slate-700 transition-colors"
                >
                  個別ダウンロード｜Individual Downloads
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}