import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 1. 静的HTMLエクスポートを有効化 */
  output: "export",

  /* 2. 静的エクスポート時はNext.jsの動的画像処理サーバーが使えないため、unoptimizedを有効化 */
  images: {
    unoptimized: true,
  },

  /* 3. CFルーティング親和性を高めるためスラッシュ出力を統一 */
  trailingSlash: true,
};

export default nextConfig;