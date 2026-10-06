"use client";

import { playSound } from "@/utils/sound";
import Link from "next/link";
import React from "react";

interface SoundLinkProps {
  href: string;
  target?: string;
  rel?: string;
  className?: string;
  children: React.ReactNode;
}

export default function SoundLink({ href, target, rel, className, children }: SoundLinkProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={className}
      onMouseEnter={() => playSound("hover")}
      onClick={() => playSound("click")}
    >
      {children}
    </a>
  );
}