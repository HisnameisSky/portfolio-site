// src/components/SoundLink.tsx
"use client";

import { playSound } from "@/utils/sound";
import React from "react";

interface SoundLinkProps {
  href: string;
  target?: string;
  rel?: string;
  className?: string;
  children: React.ReactNode;
}

export default function SoundLink({ href, target, rel, className = "", children }: SoundLinkProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      // text-slate-100 や text-indigo-300 をデフォルトで効かせ、背景に埋もれないようにする
      className={`text-slate-100 hover:text-indigo-300 transition-colors ${className}`}
      onMouseEnter={() => playSound("hover")}
      onClick={() => playSound("click")}
    >
      {children}
    </a>
  );
}