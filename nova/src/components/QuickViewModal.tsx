import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Star, Plus, Minus, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductVariant } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

export const QuickViewModal: React.FC = () => {
  const navigate = useNavigate();
  const { quickViewProduct, setQuickViewProduct, addToCart } = useShop();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedVariant(quickViewProduct.variants[0]);
      setActiveImage(quickViewProduct.images[0]);
      setQuantity(1);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const handleAdd = () => {
    addToCart(quickViewProduct, selectedVariant, quantity);
    setQuickViewProduct(null);
  };

  const handleFullDetails = () => {
    const id = quickViewProduct.id;
    setQuickViewProduct(null);
    navigate(`/product/${id}`);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={() => setQuickViewProduct(null)}
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white text-zinc-600 hover:text-zinc-900 rounded-full shadow-xs cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image & Gallery */}
          <div className="bg-zinc-100 flex flex-col justify-between p-6">
            <div className="aspect-4/3 w-full overflow-hidden rounded-xl bg-zinc-200 mb-3">
              <ImageWithFallback
                src={activeImage || quickViewProduct.images[0]}
                alt={quickViewProduct.name}
                fallbackTitle={quickViewProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
            {quickViewProduct.images.length > 1 && (
              <div className="flex gap-2">
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                      activeImage === img ? 'border-zinc-900' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <ImageWithFallback
                      src={img}
                      alt="Thumbnail"
                      fallbackTitle={quickViewProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details & Purchasing */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1">
                  <span>{quickViewProduct.category}</span>
                  <span aria-hidden="true">·</span>
                  <div className="flex items-center text-amber-600">
                    <Star className="w-3.5 h-3.5 fill-current mr-0.5" />
                    <span className="font-medium text-zinc-800 tabular-nums">
                      {quickViewProduct.rating}
                    </span>
                    <span className="text-zinc-400 ml-1">({quickViewProduct.reviewCount})</span>
                  </div>
                </div>

                <h3 id="quick-view-title" className="text-lg font-bold font-display text-zinc-900">
                  {quickViewProduct.name}
                </h3>
                <p className="text-xs text-zinc-500 mt-1">{quickViewProduct.subtitle}</p>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-zinc-950 tabular-nums">
                  ${quickViewProduct.price.toLocaleString()}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-sm text-zinc-400 line-through tabular-nums">
                    ${quickViewProduct.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <p className="text-xs text-zinc-600 leading-relaxed line-clamp-3">
                {quickViewProduct.description}
              </p>

              {/* Variants */}
              {quickViewProduct.variants.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-zinc-100">
                  <label className="text-xs font-semibold text-zinc-900 block">
                    Finish: <span className="font-normal text-zinc-600">{selectedVariant?.name}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.variants.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariant(v)}
                        disabled={!v.inStock}
                        className={`px-3 py-1.5 text-xs rounded-lg border flex items-center gap-2 transition-all cursor-pointer ${
                          selectedVariant?.id === v.id
                            ? 'border-zinc-900 bg-zinc-900 text-white'
                            : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-zinc-300'
                        } disabled:opacity-40 disabled:line-through`}
                      >
                        {v.colorHex && (
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                            style={{ backgroundColor: v.colorHex }}
                          />
                        )}
                        <span>{v.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="flex items-center gap-4 pt-2">
                <span className="text-xs font-semibold text-zinc-900">Quantity</span>
                <div className="flex items-center border border-zinc-200 rounded-lg bg-zinc-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 text-zinc-600 hover:text-zinc-950 cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-semibold text-zinc-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 text-zinc-600 hover:text-zinc-950 cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2.5 pt-6 border-t border-zinc-100">
              <button
                onClick={handleAdd}
                className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-100 text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Add to Bag · ${(quickViewProduct.price * quantity).toLocaleString()}</span>
              </button>

              <button
                onClick={handleFullDetails}
                className="w-full py-1 text-xs text-zinc-500 hover:text-zinc-900 flex items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <span>View Full Specifications & Origin Story</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
