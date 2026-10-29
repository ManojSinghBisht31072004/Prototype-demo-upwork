import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  Truck,
  RotateCcw,
  ShieldCheck,
  Heart,
  Plus,
  Minus,
  Check,
  Share2,
  ArrowRight,
  PackageX,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductVariant } from '../types';
import { ProductCard } from '../components/ProductCard';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    selectCategory,
  } = useShop();

  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS.find((p) => p.slug === id);

  const [activeImage, setActiveImage] = useState<string>('');
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'highlights' | 'care'>('specs');
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (product) {
      setActiveImage(product.images[0]);
      setSelectedVariant(product.variants[0] || null);
      setQuantity(1);
      setAddedToast(false);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
          <PackageX className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold font-display text-zinc-950">Object Not Located</h1>
        <p className="text-xs text-zinc-500 max-w-sm mx-auto">
          The requested item reference could not be found in our current archives. It may have been archived or moved.
        </p>
        <Link
          to="/shop"
          className="inline-block px-6 py-2.5 bg-zinc-900 text-zinc-50 text-xs font-semibold rounded-lg hover:bg-zinc-800 transition-colors"
        >
          Explore Complete Catalog
        </Link>
      </div>
    );
  }

  const isSaved = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedVariant || undefined, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedVariant || undefined, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Breadcrumb Bar */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-zinc-500">
        <Link to="/" className="hover:text-zinc-950 transition-colors">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <button
          onClick={() => selectCategory(product.category)}
          className="hover:text-zinc-950 transition-colors cursor-pointer"
        >
          {product.category}
        </button>
        <span aria-hidden="true">/</span>
        <span className="text-zinc-900 font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main PDP Grid: Left Sticky Gallery, Right Sticky Purchase Module */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* Left: Gallery Column (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-4/3 w-full bg-zinc-100 rounded-2xl overflow-hidden border border-zinc-200 shadow-xs relative">
            <ImageWithFallback
              src={activeImage || product.images[0]}
              alt={product.name}
              fallbackTitle={product.name}
              fallbackCategory={product.category}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />
            {product.isBestSeller && (
              <span className="absolute top-4 left-4 text-[11px] font-semibold text-zinc-900 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-sm tracking-wider uppercase shadow-xs">
                Best Seller
              </span>
            )}
          </div>

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    activeImage === img
                      ? 'border-zinc-950 ring-2 ring-zinc-950/20'
                      : 'border-zinc-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <ImageWithFallback
                    src={img}
                    alt={`${product.name} angle ${idx + 1}`}
                    fallbackTitle={product.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Story & Workshop Note */}
          <div className="p-6 bg-zinc-50 border border-zinc-200 rounded-xl space-y-2 mt-6">
            <h4 className="text-xs font-semibold text-zinc-900 uppercase tracking-wider">
              Studio Craftsmanship Statement
            </h4>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Every NOVA Market commission is produced according to rigorous European and Japanese bench standards. Materials are carefully chosen for longevity, patina, and tactile engagement in private living spaces.
            </p>
          </div>
        </div>

        {/* Right: Contiguous Purchase Module (5 cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          {/* Header & Title */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                {product.category}
              </span>
              <button
                onClick={handleShare}
                className="text-xs text-zinc-500 hover:text-zinc-900 flex items-center gap-1 cursor-pointer"
                aria-label="Share product"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-display text-zinc-950 tracking-tight">
              {product.name}
            </h1>

            <p className="text-xs sm:text-sm text-zinc-500">{product.subtitle}</p>

            {/* Rating & In-stock state */}
            <div className="flex items-center gap-3 pt-1 text-xs">
              <div className="flex items-center text-amber-600">
                <Star className="w-4 h-4 fill-current mr-1" />
                <span className="font-semibold text-zinc-900 tabular-nums">{product.rating}</span>
                <span className="text-zinc-500 ml-1">({product.reviewCount} verified reviews)</span>
              </div>
              <span aria-hidden="true" className="text-zinc-300">·</span>
              <span className="text-emerald-700 font-medium">
                {product.inStock ? `${product.stockCount} in stock & ready to ship` : 'Made to order'}
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200/80 flex items-baseline justify-between">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold font-display text-zinc-950 tabular-nums">
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-zinc-400 line-through tabular-nums">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-zinc-500 mt-1">
                Taxes calculated at checkout · Free delivery on this order
              </p>
            </div>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-2.5 rounded-full border transition-colors cursor-pointer ${
                isSaved
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-white border-zinc-200 text-zinc-700 hover:text-rose-600'
              }`}
              aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
            {product.description}
          </p>

          {/* Variants */}
          {product.variants.length > 0 && selectedVariant && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-zinc-900">
                  Select Finish: <span className="font-normal text-zinc-600">{selectedVariant.name}</span>
                </span>
                <span className="text-[11px] text-zinc-400">Authentic Material Finish</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    disabled={!variant.inStock}
                    className={`p-2.5 text-xs rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                      selectedVariant.id === variant.id
                        ? 'border-zinc-950 bg-zinc-900 text-zinc-50 shadow-xs'
                        : 'border-zinc-200 bg-white text-zinc-800 hover:border-zinc-300'
                    } disabled:opacity-40 disabled:line-through`}
                  >
                    {variant.colorHex && (
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: variant.colorHex }}
                      />
                    )}
                    <span className="truncate font-medium">{variant.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Buy CTAs */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-zinc-200 rounded-xl bg-white shadow-xs p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-zinc-600 hover:text-zinc-950 cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-xs font-semibold text-zinc-900 tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-zinc-600 hover:text-zinc-950 cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-50 text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {addedToast ? (
                  <>
                    <Check className="w-4 h-4 text-amber-300" />
                    <span>Added to Shopping Bag</span>
                  </>
                ) : (
                  <span>Add to Bag · ${(product.price * quantity).toLocaleString()}</span>
                )}
              </button>
            </div>

            {/* Direct Instant Buy Button */}
            <button
              onClick={handleBuyNow}
              disabled={!product.inStock}
              className="w-full py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-xs font-semibold rounded-xl transition-colors cursor-pointer border border-zinc-200"
            >
              Instant Express Checkout
            </button>
          </div>

          {/* Delivery & Assurance Guarantees */}
          <div className="pt-4 border-t border-zinc-200 space-y-2.5 text-xs text-zinc-600">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-zinc-900 shrink-0" />
              <span>{product.deliveryEstimate}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <RotateCcw className="w-4 h-4 text-zinc-900 shrink-0" />
              <span>30-Day complimentary in-home trial & easy returns</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-zinc-900 shrink-0" />
              <span>Includes Certificate of Authenticity & 10-Year Framework Warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs for Detailed Specifications */}
      <section className="pt-10 border-t border-zinc-200 space-y-6">
        <div className="flex items-center gap-2 border-b border-zinc-200 pb-3">
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'specs'
                ? 'bg-zinc-900 text-zinc-50'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab('highlights')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'highlights'
                ? 'bg-zinc-900 text-zinc-50'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            Highlights & Joinery
          </button>
          <button
            onClick={() => setActiveTab('care')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'care'
                ? 'bg-zinc-900 text-zinc-50'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            Care & Maintenance
          </button>
        </div>

        <div className="bg-white rounded-xl border border-zinc-200 p-6">
          {activeTab === 'specs' && (
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-xs">
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="py-2 border-b border-zinc-100 flex justify-between">
                  <dt className="text-zinc-500 font-medium">{key}</dt>
                  <dd className="text-zinc-900 font-semibold text-right">{val}</dd>
                </div>
              ))}
            </dl>
          )}

          {activeTab === 'highlights' && (
            <ul className="space-y-3 text-xs text-zinc-700">
              {product.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          )}

          {activeTab === 'care' && (
            <div className="space-y-3 text-xs text-zinc-600 leading-relaxed max-w-2xl">
              <p>
                <strong>Cleaning:</strong> Dust lightly with a dry, lint-free microfiber cloth. Never use ammonia-based sprays or abrasive chemical pads.
              </p>
              <p>
                <strong>Sunlight Exposure:</strong> Natural solid timber and vegetable-tanned hides age organically under ambient sunlight. We recommend rotating items periodically to encourage an even, luminous patina.
              </p>
              <p>
                <strong>Humidity:</strong> Best maintained in stable indoor environments between 40% and 60% relative humidity.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <section className="pt-10 border-t border-zinc-200 space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-1">
                Complementary Pieces
              </div>
              <h3 className="text-xl font-bold font-display text-zinc-950">
                You May Also Consider
              </h3>
            </div>
            <button
              onClick={() => selectCategory(product.category)}
              className="text-xs font-semibold text-zinc-900 hover:text-amber-800 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>More in {product.category}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
