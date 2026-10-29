import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ImageWithFallback } from './ImageWithFallback';

export const SearchModal: React.FC = () => {
  const navigate = useNavigate();
  const { isSearchModalOpen, setIsSearchModalOpen, updateFilter } = useShop();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      } else if (e.key === 'Escape' && isSearchModalOpen) {
        setIsSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchModalOpen, setIsSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  const trimmed = query.trim().toLowerCase();
  const matchedProducts = trimmed
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmed) ||
          p.category.toLowerCase().includes(trimmed) ||
          p.subtitle.toLowerCase().includes(trimmed) ||
          p.description.toLowerCase().includes(trimmed)
      ).slice(0, 6)
    : [];

  const handleSelectProduct = (id: string) => {
    setIsSearchModalOpen(false);
    navigate(`/product/${id}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      updateFilter({ searchQuery: query.trim(), category: 'All' });
      setIsSearchModalOpen(false);
      navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const quickTerms = ['Walnut Lounge', 'Wireless Speaker', 'Ceramic Lamp', 'Belgian Linen', 'Travertine'];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-zinc-950/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={() => setIsSearchModalOpen(false)}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="relative border-b border-zinc-200">
          <label htmlFor="catalog-search" className="sr-only" id="search-modal-title">
            Search catalog
          </label>
          <div className="flex items-center px-4 py-3.5">
            <Search className="w-5 h-5 text-zinc-400 shrink-0 mr-3" />
            <input
              id="catalog-search"
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search design objects, furniture, audio, lighting..."
              className="w-full text-base sm:text-lg bg-transparent text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-1 text-zinc-400 hover:text-zinc-600 rounded-md"
                aria-label="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsSearchModalOpen(false)}
              className="ml-2 text-xs font-medium text-zinc-500 bg-zinc-100 hover:bg-zinc-200 px-2 py-1 rounded-md"
            >
              ESC
            </button>
          </div>
        </form>

        {/* Results or Quick Recommendations */}
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {query.trim() === '' ? (
            <div className="py-2 space-y-4">
              <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Popular Inquiries
              </div>
              <div className="flex flex-wrap gap-2">
                {quickTerms.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      setQuery(term);
                    }}
                    className="text-xs text-zinc-700 bg-zinc-100 hover:bg-zinc-200 hover:text-zinc-950 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : matchedProducts.length > 0 ? (
            <div className="space-y-1">
              <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider px-2 py-1">
                Matching Artifacts ({matchedProducts.length})
              </div>
              {matchedProducts.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => handleSelectProduct(product.id)}
                  className="w-full text-left flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-zinc-100 transition-colors group cursor-pointer"
                >
                  <ImageWithFallback
                    src={product.images[0]}
                    alt={product.name}
                    fallbackTitle={product.name}
                    className="w-12 h-12 object-cover rounded-lg bg-zinc-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-zinc-500">{product.category}</div>
                    <div className="text-sm font-semibold text-zinc-900 truncate group-hover:text-amber-800 transition-colors">
                      {product.name}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-medium text-zinc-900 tabular-nums">
                      ${product.price.toLocaleString()}
                    </span>
                    <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 group-hover:translate-x-0.5 transition-all mt-0.5 ml-auto" />
                  </div>
                </button>
              ))}

              <div className="pt-3 border-t border-zinc-100 mt-2 text-center">
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="text-xs text-zinc-600 hover:text-zinc-950 font-medium inline-flex items-center gap-1.5 py-1"
                >
                  <span>View all results in catalog</span>
                  <CornerDownLeft className="w-3.5 h-3.5 text-zinc-400" />
                </button>
              </div>
            </div>
          ) : (
            <div className="py-10 text-center space-y-2">
              <p className="text-sm font-medium text-zinc-800">
                No artifacts found for &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-zinc-500">
                Try searching for broader categories like furniture, lighting, or acoustics.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
