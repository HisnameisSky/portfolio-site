import Link from "next/link";
import ProtectedImage from "@/components/ProtectedImage"; 

const artworks = [
  { id: 1, title: "星見雅＆月城柳", src: "/images/IMG_6406.jpg", description: "" },
  { id: 2, title: "レミエール・ダン", src: "/images/IMG_6504.jpg", description: "" },
  { id: 3, title: "レミエール・ダン（メイド服）", src: "/images/IMG_6520.jpg", description: "" },
  { id: 4, title: "黄泉（雷電忘川守芽衣）", src: "/images/IMG_4567.jpg", description: "" },
  { id: 5, title: "調月リオ＆明星ヒマリ", src: "/images/IMG_4618.jpg", description: "" },
  { id: 6, title: "才羽モモイ＆才羽ミドリ", src: "/images/IMG_6335.jpg", description: "" },
  { id: 7, title: "砂狼シロコテラー", src: "/images/IMG_6462.jpg", description: "" },
  //continue..
];

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