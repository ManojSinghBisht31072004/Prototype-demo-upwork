import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AnnouncementBar: React.FC = () => {
  const navigate = useNavigate();
  const [dismissed, setDismissed] = useState(false);
  const { applyPromo } = useShop();

  if (dismissed) return null;

  return (
    <aside
      aria-label="Promotional announcement"
      className="bg-zinc-900 text-zinc-100 text-xs px-4 py-2 relative transition-all border-b border-zinc-800"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center gap-2 text-center">
          <span className="font-medium tracking-wide">Spring Equinox Curation</span>
          <span aria-hidden="true" className="text-zinc-600">·</span>
          <span className="text-zinc-300 hidden sm:inline">Complimentary shipping on orders over $150</span>
          <span aria-hidden="true" className="text-zinc-600 hidden sm:inline">·</span>
          <button
            onClick={() => {
              applyPromo('NOVA10');
              navigate('/shop');
            }}
            className="text-amber-300 hover:text-amber-200 underline font-medium cursor-pointer inline-flex items-center gap-1"
          >
            <span>Use code NOVA10 for 10% off</span>
            <ArrowRight className="w-3 h-3 inline" />
          </button>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-zinc-400 hover:text-zinc-100 p-1 rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
