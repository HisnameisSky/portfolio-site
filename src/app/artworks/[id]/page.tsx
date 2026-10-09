import Link from "next/link";
import ProtectedImage from "@/components/ProtectedImage"; 

// 作品データ定義
const artworks = [
  { id: 1, title: "星見雅＆月城柳", src: "/images/IMG_6406.webp", description: "" },
  { id: 2, title: "レミエール・ダン", src: "/images/IMG_6504.webp", description: "" },
  { id: 3, title: "レミエール・ダン（メイド服）", src: "/images/IMG_6520.webp", description: "" },
  { id: 4, title: "黄泉（雷電忘川守芽衣）", src: "/images/IMG_4568.webp", description: "" },
  { id: 5, title: "調月リオ＆明星ヒマリ", src: "/images/IMG_4618.webp", description: "" },
  { id: 6, title: "才羽モモイ＆才羽ミドリ", src: "/images/IMG_6337.webp", description: "" },
  { id: 7, title: "砂狼シロコテラー", src: "/images/IMG_6462.webp", description: "" },
  { id: 8, title: "ツバキ", src: "/images/IMG_6436.webp", description: "" },
  { id: 9, title: "調月リオ", src: "/images/IMG_6259.webp", description: "" },
  { id: 10, title: "姫崎莉波", src: "/images/IMG_5882.webp", description: "" },
  { id: 11, title: "砂狼シロコテラー", src: "/images/IMG_5786.webp", description: "" },
  { id: 12, title: "リンネー", src: "/images/IMG_5606.webp", description: "" },
  { id: 13, title: "ラプンツェル", src: "/images/IMG_5556.webp", description: "" },
  { id: 14, title: "明星ヒマリ＆調月リオ", src: "/images/IMG_5482.webp", description: "" },
  { id: 15, title: "V.I.H", src: "/images/IMG_4478.webp", description: "" },
  { id: 16, title: "姫崎莉波", src: "/images/IMG_5239.webp", description: "" },
  { id: 17, title: "姫崎莉波", src: "/images/IMG_5411.webp", description: "" },
  { id: 18, title: "渋谷凛", src: "/images/IMG_6416.webp", description: "" },
  { id: 19, title: "高垣楓", src: "/images/IMG_6276.webp", description: "" },
  { id: 20, title: "才羽ミドリ", src: "/images/IMG_6294.webp", description: "" },
  { id: 21, title: "高垣楓", src: "/images/IMG_3874.webp", description: "" },
  { id: 22, title: "砂狼シロコテラー", src: "/images/IMG_6479.webp", description: "" },
  { id: 23, title: "レミエール・ダン", src: "/images/IMG_6544.webp", description: "" },
  { id: 24, title: "砂狼シロコテラー", src: "/images/IMG_6309.webp", description: "" },
  { id: 25, title: "高垣楓", src: "/images/IMG_6276.webp", description: "" },
  { id: 26, title: "月城柳", src: "/images/IMG_5828.webp", description: "" },
];

// ✨ 1. ビルド時に静的生成する全パラメータ（id）の一覧を返却
export async function generateStaticParams() {
  return artworks.map((art) => ({
    id: art.id.toString(), // URLパラメータ用に文字列へ変換
  }));
}

// ✨ 2. 静的エクスポート（output: 'export'）用に動的生成を無効化
export const dynamicParams = false;

export default async function ArtworkDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const resolvedParams = await params;
  const targetId = parseInt(resolvedParams.id, 10);
  const art = artworks.find((item) => item.id === targetId);

  if (!art) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6">
        <p className="text-xl mb-4">作品が見つかりませんでした。(ID: {resolvedParams.id})</p>
        <Link href="/#artworks" className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-medium transition-colors">
          ギャラリーに戻る｜Return to gallery
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 sm:p-12">
      <div className="max-w-4xl w-full bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center animate-fadeIn">
        
        {/* 画像部分：切り出したクライアントコンポーネントで安全に保護 */}
        <div className="overflow-hidden rounded-2xl shadow-lg mb-6 bg-slate-950/50">
          <ProtectedImage 
            src={art.src} 
            alt={art.title} 
            className="max-h-[75vh] w-auto object-contain transition-transform duration-700 hover:scale-[1.02] select-none"
          />
        </div>

        {/* 作品情報と戻るボタン */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-800/80 pt-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{art.title}</h1>
            <p className="text-sm text-slate-400 mt-1">{art.description}</p>
          </div>
          <Link 
            href="/#artworks"
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition-all duration-300 hover:scale-105 border border-slate-700"
          >
            ギャラリーに戻る｜Return to gallery
          </Link>
        </div>

      </div>
    </main>
  );
}