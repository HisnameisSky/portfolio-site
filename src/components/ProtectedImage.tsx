"use client";

interface ProtectedImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ProtectedImage({ src, alt, className }: ProtectedImageProps) {
  return (
    <img 
      src={src} 
      alt={alt} 
      className={className}
      style={{ WebkitTouchCallout: "none" }}
      onContextMenu={(e) => e.preventDefault()}
      draggable={false}
    />
  );
}