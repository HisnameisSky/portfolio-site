// src/components/SoundLink.tsx
"use client";

import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes } from "react";
import { playClickSound, playHoverSound } from "@/utils/sound";

type SoundLinkProps = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: React.ReactNode;
  className?: string;
};

export default function SoundLink({ href, children, onClick, onMouseEnter, ...props }: SoundLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    playClickSound(); // クリック時に音を鳴らす
    if (onClick) onClick(e);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    playHoverSound(); // ホバー時に極小の音を鳴らす
    if (onMouseEnter) onMouseEnter(e);
  };

  // 内部リンクか外部リンクかで適切に振り分け
  const isExternal = typeof href === 'string' && (href.startsWith('http') || href.startsWith('mailto:'));

  if (isExternal) {
    return (
      <a 
        href={href as string} 
        onClick={handleClick} 
        onMouseEnter={handleMouseEnter} 
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link 
      href={href} 
      onClick={handleClick} 
      onMouseEnter={handleMouseEnter} 
      {...props}
    >
      {children}
    </Link>
  );
}