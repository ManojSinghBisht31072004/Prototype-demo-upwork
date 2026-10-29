import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ImageWithFallback } from './ImageWithFallback';

export const WishlistDrawer: React.FC = () => {
  const navigate = useNavigate();
  const {
    isWishlistDrawerOpen,
    setIsWishlistDrawerOpen,
    wishlist,
    toggleWishlist,
    addToCart,
  } = useShop();

  if (!isWishlistDrawerOpen) return null;

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleMoveToBag = (product: typeof savedProducts[0]) => {
    addToCart(product, product.variants[0], 1);
    toggleWishlist(product.id);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="wishlist-drawer-title"
      className="fixed inset-0 z-50 overflow-hidden bg-zinc-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={() => setIsWishlistDrawerOpen(false)}
    >
      <div
        className="fixed inset-y-0 right-0 max-w-full flex pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-white flex flex-col shadow-2xl border-l border-zinc-200">
          {/* Header */}
          <div className="px-6 py-5 border-b border-zinc-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Heart className="w-5 h-5 text-zinc-900 fill-zinc-900" />
              <h2 id="wishlist-drawer-title" className="text-base font-semibold font-display text-zinc-950">
                Saved Wishlist ({savedProducts.length})
              </h2>
            </div>
            <button
              onClick={() => setIsWishlistDrawerOpen(false)}
              className="p-1.5 text-zinc-400 hover:text-zinc-900 rounded-md transition-colors cursor-pointer"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-zinc-100">
            {savedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400">
                  <Heart className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-zinc-900">Your wishlist is empty</p>
                  <p className="text-xs text-zinc-500 max-w-xs">
                    Save your favorite heirloom furniture, acoustic monitors, and ceramics while browsing.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsWishlistDrawerOpen(false);
                    navigate('/shop');
                  }}
                  className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-100 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Browse Catalog
                </button>
              </div>
            ) : (
              savedProducts.map((product) => (
                <div key={product.id} className="py-4 flex gap-4">
                  <div
                    className="w-20 h-20 rounded-lg overflow-hidden bg-zinc-100 shrink-0 cursor-pointer"
                    onClick={() => {
                      setIsWishlistDrawerOpen(false);
                      navigate(`/product/${product.id}`);
                    }}
                  >
                    <ImageWithFallback
                      src={product.images[0]}
                      alt={product.name}
                      fallbackTitle={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          onClick={() => {
                            setIsWishlistDrawerOpen(false);
                            navigate(`/product/${product.id}`);
                          }}
                          className="text-xs font-semibold text-zinc-900 hover:text-amber-800 transition-colors line-clamp-1 cursor-pointer"
                        >
                          {product.name}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-zinc-400 hover:text-rose-600 p-0.5 transition-colors cursor-pointer"
                          aria-label={`Remove ${product.name} from wishlist`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-zinc-500 mt-0.5">{product.category}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs font-semibold text-zinc-950 tabular-nums">
                        ${product.price.toLocaleString()}
                      </span>
                      <button
                        onClick={() => handleMoveToBag(product)}
                        className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-100 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
