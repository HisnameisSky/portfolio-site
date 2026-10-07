"use client";

import { useEffect, useRef } from "react";

export default function DynamicBackground() {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // マウスカーソルに追従して光がふんわり動くインタラクション
    const handleMouseMove = (e: MouseEvent) => {
      if (!blobRef.current) return;
      const { clientX, clientY } = e;
      blobRef.current.animate(
        {
          transform: `translate(${clientX - 150}px, ${clientY - 150}px)`,
        },
        { duration: 3000, fill: "forwards" }
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 追従する光のオーブ */}
      <div
        ref={blobRef}
        className="absolute w-[300px] h-[300px] bg-indigo-600/15 rounded-full blur-[100px]"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      {/* 固定の背景グラデーションアクセント */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
    </div>
  );
}