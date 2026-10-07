// src/utils/watermark.ts
export interface WatermarkOptions {
  text: string;
  fontSize: number;
  color: string;
  opacity: number;
  angle: number; // 傾き（度数）
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

      // 3. 画面の中央にテキストを回転させて描画
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(options.angle * (Math.PI / 180)); // 正しいAPI名に修正
      ctx.fillText(options.text, 0, 0);
      
      ctx.restore();

      // 4. WebP形式で出力
      const dataUrl = canvas.toDataURL("image/webp", 0.92);
      resolve(dataUrl);
    };

    img.onerror = (error) => reject(error);
  });
};