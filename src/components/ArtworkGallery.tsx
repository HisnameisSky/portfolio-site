"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
// 外部のマスターデータから正確にインポート
import { artworks } from "@/data/artwork";
import SectionHeader from "@/components/SectionHeader"; 

export default function ArtworkGallery() {
  // 初期表示数を 6 枚に設定
  const [visibleCount, setVisibleCount] = useState<number>(6);

  // もっと表示（6枚ずつ追加表示）
  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, artworks.length));
  };

  // 表示対象の作品をスライス
  const displayedArtworks = artworks.slice(0, visibleCount);
  const hasMore = visibleCount < artworks.length;

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* ✨ 正しい配置位置 */}
      <SectionHeader 
        label="[ 01 ] Portfolio // Works" 
        title="澄み渡る世界と、デジタル領域の境界" 
      />

      {/* SNS風（Pinterest風）のマルチカラムレイアウト */}
      <div className="w-full columns-1 sm:columns-2 md:columns-3 gap-6 [column-fill:_balance]">
        <AnimatePresence>
          {displayedArtworks.map((art, index) => (
            <motion.div
              key={art.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: (index % 6) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 break-inside-avoid"
            >
              <Link 
                href={`/artworks/${art.id}`}
                className="group relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800/80 shadow-lg cursor-pointer block w-full"
              >
                <img 
                  src={art.src} 
                  alt={art.title} 
                  // イラストの縦横比を一切崩さず、そのまま美しく表示
                  className="w-full h-auto object-cover select-none transition-transform duration-700 group-hover:scale-105"
                  onContextMenu={(e) => e.preventDefault()}
                  draggable={false}
                />
                
                {/* ホバー時にふんわり浮かび上がる上品なオーバーレイ */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <div>
                    <span className="text-white font-semibold text-sm tracking-wide block transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      {art.title}
                    </span>
                    {art.description && (
                      <span className="text-slate-400 text-xs block mt-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                        {art.description}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ✨ Show More / もっと表示 ボタン */}
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleShowMore}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-slate-900/80 border border-cyan-500/30 hover:border-cyan-400 text-slate-200 hover:text-white font-mono text-sm tracking-wider backdrop-blur-md shadow-lg shadow-cyan-950/20 transition-all duration-300 hover:shadow-cyan-500/20 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>Show More // もっと表示</span>
            <span className="text-cyan-400 text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors duration-300">
              {visibleCount} / {artworks.length}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}