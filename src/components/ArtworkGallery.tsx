"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ArtworkGallery() {
  const artworks = [
    { id: "1", title: "Artwork 01", src: "/images/IMG_6406.jpg" },
    { id: "2", title: "Artwork 02", src: "/images/IMG_6504.jpg" },
    { id: "3", title: "Artwork 03", src: "/images/IMG_6520.jpg" },
    { id: "4", title: "Artwork 04", src: "/images/IMG_4567.jpg" },
    { id: "5", title: "Artwork 05", src: "/images/IMG_4618.jpg" },
    { id: "6", title: "Artwork 06", src: "/images/IMG_6335.jpg" },
    { id: "7", title: "Artwork 07", src: "/images/IMG_6462.jpg" },
    //continue..
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {artworks.map((art, index) => (
          <motion.div
            key={art.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1, // リストの順番ごとに少しずつ遅らせて出現させる（スタッガー効果）
              ease: [0.16, 1, 0.3, 1] 
            }}
          >
            <Link 
              href={`/artworks/${art.id}`}
              className="group relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800/80 shadow-lg aspect-square cursor-pointer hover:border-indigo-500/40 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 block"
            >
              <img 
                src={art.src} 
                alt={art.title} 
                /* ✨ object-cover と w-full h-full を組み合わせて枠内に綺麗に収める */
                className="w-full h-full object-cover rounded-2xl shadow-2xl select-none"
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
        ))}
      </div>
    </div>
  );
}