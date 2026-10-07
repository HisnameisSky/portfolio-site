"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a") || target.closest("button") || target.closest("[role='button']")) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* メインの小さなドット */}
      <motion.div
        className="absolute top-0 left-0 w-3 h-3 bg-indigo-400 rounded-full shadow-[0_0_12px_rgba(99,102,241,0.8)]"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isHovered ? 2.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 800, damping: 35 }}
      />
      {/* 周囲をふんわり追従するグラデーションリング */}
      <motion.div
        className="absolute top-0 left-0 w-10 h-10 border border-indigo-500/40 rounded-full bg-indigo-500/5 backdrop-blur-[1px]"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovered ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </div>
  );
}