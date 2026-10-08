"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";
// 外部のマスターデータから正確にインポート
import { artworks } from "@/data/artwork";

export default function ArtworkGallery() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* SNS風（Pinterest風）のマルチカラムレイアウト */}
      <div className="w-full columns-1 sm:columns-2 md:columns-3 gap-6 [column-fill:_balance]">
        {artworks.map((art, index) => (
          <motion.div
            key={art.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
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
      </div>
    </div>
  );
}
