"use client";

import { ChangeEvent, DragEvent } from "react";

interface DropZoneProps {
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isProcessing: boolean;
}

export default function DropZone({ onFileChange, isProcessing }: DropZoneProps) {
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // 擬似的にインプレスのイベントオブジェクトを作成して渡す
      const fakeEvent = {
        target: { files: e.dataTransfer.files, value: "" },
      } as unknown as ChangeEvent<HTMLInputElement>;
      onFileChange(fakeEvent);
    }
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="flex flex-col items-center justify-center h-80 border-dashed border-2 border-slate-800 hover:border-indigo-500/50 transition-colors rounded-2xl text-slate-400 text-sm text-center p-6 bg-slate-950/40"
    >
      <div className="text-4xl mb-3">🖼️</div>
      <p className="mb-2 font-medium text-slate-200">
        {isProcessing ? "ウォーターマークを適用中...｜Watermarking..." : "ここにイラスト・画像をドラッグ＆ドロップ｜Drop the art here"}
      </p>
      <span className="text-xs text-slate-500 max-w-xs mb-4">
        または左側の「画像ファイルを選択」ボタンから、複数枚まとめてアップロードできます。
        <br />
        Alternatively, you can upload multiple images at once by clicking the “Select Image Files” button on the left.
      </span>
    </div>
  );
}