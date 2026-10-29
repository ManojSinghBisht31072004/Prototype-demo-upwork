import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
  containerClassName?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  fallbackText = 'PureSpace Professional Care',
  ...props
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-slate-100 ${containerClassName}`}>
      {!error ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          {...props}
        />
      ) : (
        <div className="w-full h-full min-h-[180px] flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-100 to-teal-50/50 text-slate-500">
          <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center mb-2 text-teal-700">
            <Sparkles className="w-5 h-5" />
          </div>
          <p className="text-xs font-semibold text-slate-700">{alt || 'PureSpace Cleaning'}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">{fallbackText}</p>
        </div>
      )}
    </div>
  );
};
