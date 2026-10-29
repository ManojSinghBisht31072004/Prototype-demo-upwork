import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Plus, Eye, Check } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { ImageWithFallback } from './ImageWithFallback';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useShop();
  const [addedRecently, setAddedRecently] = useState(false);
  const isSaved = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.variants[0], 1);
    setAddedRecently(true);
    setTimeout(() => setAddedRecently(false), 1600);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  return (
    <article
      onClick={() => navigate(`/product/${product.id}`)}
      className="group relative flex flex-col bg-white border border-zinc-200/80 rounded-xl overflow-hidden hover:shadow-md hover:border-zinc-300 transition-all duration-200 cursor-pointer"
    >
      {/* Visual media container with 4:3 ratio */}
      <div className="relative aspect-4/3 w-full bg-zinc-100 overflow-hidden">
        <ImageWithFallback
          src={product.images[0]}
          alt={product.name}
          fallbackTitle={product.name}
          fallbackCategory={product.category}
          className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500 ease-out"
        />

        {/* Quiet editorial text status (Zero-pill discipline: subtle text badge) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          {product.isBestSeller && (
            <span className="text-[11px] font-semibold text-zinc-900 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-sm tracking-wider uppercase">
              Best Seller
            </span>
          )}
          {product.isNew && (
            <span className="text-[11px] font-semibold text-zinc-900 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-sm tracking-wider uppercase">
              New Arrival
            </span>
          )}
          {product.originalPrice && (
            <span className="text-[11px] font-semibold text-amber-900 bg-amber-50/90 backdrop-blur-xs px-2 py-0.5 rounded-sm tracking-wider uppercase">
              Sale
            </span>
          )}
        </div>

        {/* Wishlist toggle action */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
            isSaved
              ? 'bg-rose-50 text-rose-600 shadow-xs'
              : 'bg-white/80 text-zinc-700 hover:text-rose-600 hover:bg-white shadow-xs'
          } cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900`}
          aria-label={isSaved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View overlay button */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
          <button
            onClick={handleQuickView}
            className="w-full bg-white/95 hover:bg-white text-zinc-900 text-xs font-medium py-2 px-3 rounded-lg shadow-sm border border-zinc-200/60 backdrop-blur-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-zinc-600" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product metadata & purchasing */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Unboxed metadata line with typographic separator */}
          <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1">
            <span>{product.category}</span>
            <span aria-hidden="true" className="text-zinc-300">·</span>
            <span>{product.inStock ? `${product.stockCount} in stock` : 'Out of stock'}</span>
          </div>

          <h3 className="text-sm font-semibold text-zinc-900 leading-snug group-hover:text-amber-800 transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-zinc-500 mt-1 line-clamp-1">
            {product.subtitle}
          </p>
        </div>

        {/* Price & Quick Add Button */}
        <div className="pt-2 border-t border-zinc-100 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold text-zinc-950 tabular-nums">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-zinc-400 line-through tabular-nums">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
              addedRecently
                ? 'bg-zinc-900 text-zinc-100'
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-900 hover:text-zinc-950'
            } disabled:opacity-40 disabled:cursor-not-allowed`}
            aria-label={`Add ${product.name} to cart`}
          >
            {addedRecently ? (
              <>
                <Check className="w-3.5 h-3.5 text-amber-300" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
