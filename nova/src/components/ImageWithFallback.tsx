import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  fallbackCategory?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle,
  fallbackCategory,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center p-4 bg-zinc-100 text-zinc-500 text-center select-none ${className}`}
        role="img"
        aria-label={alt || 'Product placeholder'}
      >
        <div className="w-10 h-10 rounded-full bg-zinc-200/80 flex items-center justify-center text-zinc-400 mb-2">
          <ImageOff className="w-5 h-5" />
        </div>
        {fallbackTitle && (
          <span className="text-xs font-semibold text-zinc-700 line-clamp-1">
            {fallbackTitle}
          </span>
        )}
        {fallbackCategory && (
          <span className="text-[10px] text-zinc-400 mt-0.5 tracking-wider uppercase">
            {fallbackCategory}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || ''}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      onLoad={() => setIsLoaded(true)}
      className={`${className} ${
        !isLoaded ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      } transition-all duration-300`}
      {...props}
    />
  );
};
