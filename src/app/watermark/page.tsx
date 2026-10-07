//watermark/page.tsx

"use client";

import { useState, ChangeEvent, useEffect, useRef } from "react";
import Link from "next/link";
import JSZip from "jszip";
import { applyWatermark, WatermarkOptions } from "@/utils/watermark";
import ControlPanel from "./components/ControlPanel";
import PreviewGrid, { ProcessedImage } from "./components/PreviewGrid";

export default function WatermarkStudioPage() {
  const [options, setOptions] = useState<WatermarkOptions>({
    text: "© YourName",
    fontSize: 32,      // ★ 初期フォントサイズ
    color: "#ffffff",  // ★ 初期文字色（白）
    opacity: 0.4,
    angle: -30,
  });

  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isZipping, setIsZipping] = useState<boolean>(false);

  const rawFilesRef = useRef<{ id: string; file: File; originalSrc: string; name: string }[]>([]);

  // 設定（フォントサイズやカラー、テキスト等）が変わると自動で再計算
  useEffect(() => {
    if (rawFilesRef.current.length === 0) return;

    const recomputeImages = async () => {
      setIsProcessing(true);
      const updatedImages: ProcessedImage[] = [];

      for (const item of rawFilesRef.current) {
        try {
          const previewSrc: string = await applyWatermark(item.originalSrc, options);
          const res: Response = await fetch(previewSrc);
          const blob: Blob = await res.blob();

          updatedImages.push({
            id: item.id,
            name: item.name,
            originalSrc: item.originalSrc,
            previewSrc,
            blob,
          });
        } catch (err) {
          console.error("Recompute error:", err);
        }
      }

      setImages(updatedImages);
      setIsProcessing(false);
    };

    const timer = setTimeout(() => {
      recomputeImages();
    }, 300);

    return () => clearTimeout(timer);
  }, [options]);

  const handleOptionsChange = (newOpts: Partial<WatermarkOptions>) => {
    setOptions((prev) => ({ ...prev, ...newOpts }));
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsProcessing(true);

    const filesArray: File[] = Array.from(e.target.files);
    const newProcessedImages: ProcessedImage[] = [];

    for (const file of filesArray) {
      const id = Math.random().toString(36).substring(2);
      const originalSrc: string = URL.createObjectURL(file);
      const name = file.name.replace(/\.[^/.]+$/, "") + "_watermarked.webp";

      rawFilesRef.current.push({ id, file, originalSrc, name });

      try {
        const previewSrc: string = await applyWatermark(originalSrc, options);
        const res: Response = await fetch(previewSrc);
        const blob: Blob = await res.blob();

        newProcessedImages.push({
          id,
          name,
          originalSrc,
          previewSrc,
          blob,
        });
      } catch (err: unknown) {
        console.error("Watermark apply error:", err);
      }
    }

    setImages((prev: ProcessedImage[]) => [...prev, ...newProcessedImages]);
    setIsProcessing(false);
    e.target.value = "";
  };

  // 個別削除
  const handleRemoveImage = (id: string) => {
    rawFilesRef.current = rawFilesRef.current.filter((item) => item.id !== id);
    setImages((prev: ProcessedImage[]) => {
      const target = prev.find((img) => img.id === id);
      if (target) {
        URL.revokeObjectURL(target.originalSrc);
        URL.revokeObjectURL(target.previewSrc);
      }
      return prev.filter((img) => img.id !== id);
    });
  };

  // ★ 一括削除（クリア）
  const handleClearAll = () => {
    // メモリリーク防止のためURLを解放
    images.forEach((img) => {
      URL.revokeObjectURL(img.originalSrc);
      URL.revokeObjectURL(img.previewSrc);
    });
    rawFilesRef.current = [];
    setImages([]);
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
            &larr; ポートフォリオに戻る｜Return to portfolio
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ControlPanel
            options={options}
            onChangeOptions={handleOptionsChange}
            onFileChange={handleFileChange}
            onDownloadZip={handleDownloadZip}
            onClearAll={handleClearAll}
            isProcessing={isProcessing}
            isZipping={isZipping}
            imageCount={images.length}
          />

          <PreviewGrid
            images={images}
            onRemove={handleRemoveImage}
            onClearAll={handleClearAll}
            onFileChange={handleFileChange}
            isProcessing={isProcessing}
          />
        </div>
      </div>
    </main>
  );
}