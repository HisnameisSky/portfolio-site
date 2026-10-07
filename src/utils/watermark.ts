// src/utils/watermark.ts
export interface WatermarkOptions {
  text: string;
  fontSize: number; // フォントサイズ
  color: string;    // カスタムカラー (例: "#ffffff" や "#ff0000" など)
  opacity: number;
  angle: number;
}

export const applyWatermark = async (
  imageSrc: string,
  options: WatermarkOptions
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Canvas context is not available"));
        return;
      }

      // 1. 元画像を描画
      ctx.drawImage(img, 0, 0);

      // 2. ウォーターマークの設定
      ctx.save();
      ctx.globalAlpha = options.opacity;
      ctx.font = `${options.fontSize}px sans-serif`;
      ctx.fillStyle = options.color;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // 3. グリッド（斜め敷き詰め）によるAIスクレイピング対策強化
      const angleRad = options.angle * (Math.PI / 180);
      
      // 文字幅を大まかに計測して敷き詰めの間隔（パディング）を動的に決定
      ctx.font = `${options.fontSize}px sans-serif`;
      const textMetrics = ctx.measureText(options.text);
      const textWidth = textMetrics.width || 200;
      
      const spacingX = Math.max(textWidth * 1.8, 300);
      const spacingY = Math.max(options.fontSize * 4, 150);

      // 画面全体を覆うように斜めグリッドでループ描画
      for (let y = -canvas.height; y < canvas.height * 2; y += spacingY) {
        for (let x = -canvas.width; x < canvas.width * 2; x += spacingX) {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(angleRad);
          ctx.fillText(options.text, 0, 0);
          ctx.restore();
        }
      }

      ctx.restore();

      // 4. WebP形式で出力
      const dataUrl = canvas.toDataURL("image/webp", 0.92);
      resolve(dataUrl);
    };

    img.onerror = (error) => reject(error);
  });
};