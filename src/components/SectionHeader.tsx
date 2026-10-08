"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  label: string;  // 例: "[ 01 ] Portfolio // Works"
  title: string;  // 例: "澄み渡る世界と、デジタル領域の境界"
  align?: "center" | "left";
}

export default function SectionHeader({ label, title, align = "center" }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col gap-1.5 mb-10 ${
        align === "center" ? "items-center text-center" : "items-start text-left"
      }`}
    >
      {/* 英語サブタイトル・サイバー調ラベル */}
      <span className="font-cyber-label text-xs text-cyan-400/90 font-mono tracking-widest">
        {label}
      </span>
      {/* 和文タイトル・明朝体 */}
      <h2 className="font-chokai-title text-2xl sm:text-3xl md:text-4xl text-slate-100 font-medium tracking-widest">
        {title}
      </h2>
    </motion.div>
  );
}