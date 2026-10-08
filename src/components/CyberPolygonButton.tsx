'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface CyberButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: LucideIcon;
  variant?: 'cyan' | 'purple' | 'emerald';
  className?: string;
}

export const CyberPolygonButton: React.FC<CyberButtonProps> = ({
  children,
  onClick,
  icon: Icon,
  variant = 'cyan',
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // テーマ別のグラデーション＆ネオン発光色
  const themeStyles = {
    cyan: {
      border: 'from-cyan-400 via-blue-500 to-indigo-500',
      bgHover: 'from-cyan-950/80 via-slate-900 to-blue-950/80',
      glow: 'rgba(6, 182, 212, 0.4)',
      accent: 'text-cyan-400',
    },
    purple: {
      border: 'from-fuchsia-500 via-purple-500 to-cyan-500',
      bgHover: 'from-purple-950/80 via-slate-900 to-fuchsia-950/80',
      glow: 'rgba(168, 85, 247, 0.4)',
      accent: 'text-fuchsia-400',
    },
    emerald: {
      border: 'from-emerald-400 via-teal-500 to-cyan-500',
      bgHover: 'from-emerald-950/80 via-slate-900 to-teal-950/80',
      glow: 'rgba(16, 185, 129, 0.4)',
      accent: 'text-emerald-400',
    },
  }[variant];

  // ホバー時のグリッチ・シェイクアニメーション
  const glitchAnimation = {
    hover: {
      x: [0, -2, 2, -1, 1, 0],
      transition: { duration: 0.2, ease: 'easeInOut' },
    },
  };

  // クリップパスの定義（対角16pxカット）
  const clipPathStyle = {
    clipPath: 'polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)',
  };

  return (
    <motion.button
      variants={glitchAnimation}
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative group inline-flex items-center justify-center p-[1.5px] transition-all duration-300 ${className}`}
      style={{
        filter: isHovered ? `drop-shadow(0 0 12px ${themeStyles.glow})` : 'none',
      }}
    >
      {/* 1. 外枠グラデーションライン（クリップパス適用） */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${themeStyles.border} transition-opacity duration-300 opacity-60 group-hover:opacity-100`}
        style={clipPathStyle}
      />

      {/* 2. ボタン本体（内側背景） */}
      <div
        className="relative w-full h-full px-7 py-3.5 bg-slate-950/90 backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-3 text-slate-100 font-medium text-sm tracking-wider"
        style={clipPathStyle}
      >
        {/* ホバー時背景スライドグラデーション */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${themeStyles.bgHover} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        {/* スキャンライン・光のフラッシュ効果 */}
        {isHovered && (
          <motion.div
            initial={{ x: '-100%', opacity: 0.8 }}
            animate={{ x: '200%', opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
          />
        )}

        {/* アイコン & テキスト */}
        {Icon && (
          <Icon className={`w-4 h-4 relative z-10 transition-transform duration-300 group-hover:scale-110 ${themeStyles.accent}`} />
        )}
        <span className="relative z-10 font-sans tracking-widest uppercase">
          {children}
        </span>

        {/* コーナーのサイバーパンクアクセント・デコレーション */}
        <span className="absolute top-1 right-3 text-[9px] font-mono opacity-40 text-cyan-300 pointer-events-none">
          01 //
        </span>
      </div>
    </motion.button>
  );
};