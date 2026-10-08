'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

export const BlurImage: React.FC<ImageProps> = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative overflow-hidden w-full h-full bg-slate-900">
      <Image
        {...props}
        className={`
          duration-700 ease-out object-cover transition-all
          ${isLoading ? 'scale-105 blur-lg opacity-30' : 'scale-100 blur-0 opacity-100'}
          ${props.className || ''}
        `}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  );
};