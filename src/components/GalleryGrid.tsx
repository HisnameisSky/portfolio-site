'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Sparkles } from 'lucide-react';
import Image from 'next/image';

interface WorkItem {
  id: string;
  title: string;
  category: string;
  src: string;
  isProtected: boolean;
  description: string;
}

const WORKS_DATA: WorkItem[] = [
  {
    id: 'yomi',
    title: '黄泉 - YOMI',
    category: 'Illustration',
    src: 'public/images/IMG_4567.jpg',
    isProtected: true,
    description: '静謐な和風サイバーパンクの世界観を描いたデジタルイラストレーション。AI保護ウォーターマーク施工済み。',
  },
  {
    id: 'rio-himari',
    title: 'リオ＆ヒマリ',
    category: 'Fanart / SF Concept',
    src: 'public/images/IMG_4618.jpg',
    isProtected: true,
    description: '澄んだ青と白を基調とした透明感溢れるSFキャラクターコンポジション。',
  },
];

export const GalleryGrid: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedWork = WORKS_DATA.find((w) => w.id === selectedId);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* ギャラリーグリッド */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {WORKS_DATA.map((work) => (
          <motion.div
            key={work.id}
            layoutId={`card-container-${work.id}`}
            onClick={() => setSelectedId(work.id)}
            className="group relative bg-slate-900/60 border border-slate-800/80 rounded-xl overflow-hidden cursor-pointer backdrop-blur-sm hover:border-cyan-500/50 transition-colors duration-300"
            whileHover={{ y: -4 }}
          >
            <motion.div
              layoutId={`card-image-${work.id}`}
              className="relative aspect-[16/10] w-full overflow-hidden"
            >
              <Image
                src={work.src}
                alt={work.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60" />
            </motion.div>

            <div className="p-5 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-cyan-400 tracking-wider">
                  {work.category}
                </span>
                <h3 className="text-lg font-chokai-title text-slate-100 font-medium">
                  {work.title}
                </h3>
              </div>
              {work.isProtected && (
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400/90 bg-emerald-950/50 px-2 py-1 rounded border border-emerald-500/30">
                  <ShieldCheck className="w-3.5 h-3.5" /> Protected
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* 拡大モーダル (Shared Layout Animation) */}
      <AnimatePresence>
        {selectedId && selectedWork && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
            {/* 背景オーバーレイ */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
            />

            {/* モーダルコンテンツ */}
            <motion.div
              layoutId={`card-container-${selectedWork.id}`}
              className="relative w-full max-w-4xl bg-slate-900/90 border border-cyan-500/30 rounded-2xl overflow-hidden shadow-2xl z-10 backdrop-blur-2xl flex flex-col md:flex-row"
            >
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-white bg-slate-950/60 rounded-full backdrop-blur-md"
              >
                <X className="w-5 h-5" />
              </button>

              <motion.div
                layoutId={`card-image-${selectedWork.id}`}
                className="relative w-full md:w-2/3 aspect-[4/3] md:aspect-auto"
              >
                <Image
                  src={selectedWork.src}
                  alt={selectedWork.title}
                  fill
                  className="object-cover"
                />
              </motion.div>

              <div className="w-full md:w-1/3 p-6 flex flex-col justify-between bg-slate-900/40">
                <div>
                  <span className="text-xs font-mono text-cyan-400">
                    {selectedWork.category}
                  </span>
                  <h2 className="text-2xl font-chokai-title text-slate-100 mt-1 mb-4">
                    {selectedWork.title}
                  </h2>
                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    {selectedWork.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1 text-cyan-300">
                    <Sparkles className="w-3.5 h-3.5" /> High-Res Canvas
                  </span>
                  {selectedWork.isProtected && (
                    <span className="text-emerald-400">AI Protection Active</span>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};