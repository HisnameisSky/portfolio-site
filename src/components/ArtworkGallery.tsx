"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React from "react";

// 個別のカードを3Dチルトさせるサブコンポーネント
function TiltCard({ art, index }: { art: { id: string; title: string; src: string }; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // マウス座標の傾きを滑らかにするスプリング設定
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="w-full aspect-square rounded-2xl"
      >
        <Link 
          href={`/artworks/${art.id}`}
          className="group relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800/80 shadow-lg aspect-square cursor-pointer hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500 block h-full w-full"
          style={{ transform: "translateZ(50px)" }}
        >
          <img 
            src={art.src} 
            alt={art.title} 
            className="w-full h-full object-cover rounded-2xl shadow-2xl select-none transition-transform duration-500 group-hover:scale-105"
            onContextMenu={(e) => e.preventDefault()}
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
            <span className="text-white font-semibold text-sm tracking-wide transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              {art.title}
            </span>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function ArtworkGallery() {
  const artworks = [
    { id: "1", title: "Artwork 01", src: "/images/IMG_6406.jpg" },
    { id: "2", title: "Artwork 02", src: "/images/IMG_6504.jpg" },
    { id: "3", title: "Artwork 03", src: "/images/IMG_6520.jpg" },
    { id: "4", title: "Artwork 04", src: "/images/IMG_4567.jpg" },
    { id: "5", title: "Artwork 05", src: "/images/IMG_4618.jpg" },
    { id: "6", title: "Artwork 06", src: "/images/IMG_6335.jpg" },
    { id: "7", title: "Artwork 07", src: "/images/IMG_6462.jpg" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {artworks.map((art, index) => (
          <TiltCard key={art.id} art={art} index={index} />
        ))}
      </div>
    </div>
  );
}
