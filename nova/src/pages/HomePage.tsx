import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, RotateCcw, Sparkles, Check, ArrowUpRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, CATEGORIES, TESTIMONIALS, HERO_IMAGE } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { selectCategory, updateFilter } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = PRODUCTS.filter((p) => p.isNew).slice(0, 4);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.includes('@')) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      {/* 1. Hero Section (Split-Column Balanced Layout) */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-5 flex flex-col justify-between py-4 lg:py-8 space-y-8">
            <div className="space-y-5">
              {/* Quiet text kicker (Zero-pill discipline) */}
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                2026 Spring Collection
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-zinc-950 tracking-tight leading-[1.08] text-balance">
                Objects of intention & enduring rest.
              </h1>

              <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-md">
                Honest solid walnut joinery, precision acoustic engineering, and hand-thrown stoneware crafted for calm, architectural living.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => navigate('/shop')}
                  className="px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-50 text-sm font-semibold rounded-xl transition-all duration-200 shadow-sm flex items-center gap-2 cursor-pointer group"
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => {
                    updateFilter({ sortBy: 'newest', category: 'All' });
                    navigate('/shop');
                  }}
                  className="px-6 py-3.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-sm font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  New Arrivals
                </button>
              </div>

              {/* Trust markers (Quiet editorial layout) */}
              <div className="pt-6 border-t border-zinc-200/80 flex items-center gap-6 text-xs text-zinc-500">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-zinc-700" />
                  <span>Complimentary shipping over $150</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-zinc-700" />
                  <span>10-Year Craftsmanship Guarantee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Showcase Image */}
          <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[560px] rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 shadow-sm">
            <ImageWithFallback
              src={HERO_IMAGE}
              alt="Nordic architectural living room with crafted walnut furniture"
              fallbackTitle="NOVA Market Architecture Series"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6 text-white flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-zinc-300">Curated Space</p>
                <h2 className="text-lg font-bold font-display text-white">The Sanctuary Living Series</h2>
              </div>
              <button
                onClick={() => selectCategory('Living & Furniture')}
                className="px-3.5 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg text-xs font-medium text-white transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>View Products</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-zinc-200">
          <div>
            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-1">
              Curated Disciplines
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-zinc-950 tracking-tight">
              Featured Categories
            </h2>
          </div>
          <button
            onClick={() => navigate('/shop')}
            className="text-xs font-semibold text-zinc-900 hover:text-amber-800 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => selectCategory(cat.id)}
              className="group relative rounded-xl overflow-hidden border border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col"
            >
              <div className="aspect-4/3 w-full overflow-hidden bg-zinc-100">
                <ImageWithFallback
                  src={cat.image}
                  alt={cat.name}
                  fallbackTitle={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                    <span>{cat.itemCount} Artifacts</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <h3 className="text-base font-bold font-display text-zinc-900 group-hover:text-amber-800 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1.5 line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Best-Selling Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-zinc-200">
          <div>
            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-1">
              Collector Proven
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-zinc-950 tracking-tight">
              Best Sellers
            </h2>
          </div>
          <button
            onClick={() => {
              updateFilter({ sortBy: 'rating' });
              navigate('/shop');
            }}
            className="text-xs font-semibold text-zinc-900 hover:text-amber-800 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>View All Bestsellers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Promotional Banner for Seasonal Offer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-zinc-900 text-zinc-100 p-8 sm:p-12 lg:p-16 border border-zinc-800">
          <div className="relative z-10 max-w-xl space-y-6">
            <div className="text-xs font-semibold text-amber-300 uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Limited Spring Curation</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight leading-tight">
              Crafted from unhurried natural materials.
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              We collaborate exclusively with independent workshops across Portugal, Italy, and Japan. Every item is produced in small numbered editions to preserve authenticity and material integrity.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <button
                onClick={() => selectCategory('Living & Furniture')}
                className="px-6 py-3 bg-white text-zinc-950 hover:bg-zinc-100 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Shop Furniture Editions
              </button>
              <button
                onClick={() => selectCategory('Audio & Acoustic')}
                className="px-6 py-3 bg-zinc-800/80 hover:bg-zinc-800 text-zinc-200 text-xs font-bold rounded-xl transition-colors cursor-pointer border border-zinc-700"
              >
                Explore Acoustic Systems
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. New Arrivals Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-zinc-200">
          <div>
            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-1">
              Fresh Release
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-zinc-950 tracking-tight">
              New Arrivals
            </h2>
          </div>
          <button
            onClick={() => {
              updateFilter({ sortBy: 'newest' });
              navigate('/shop');
            }}
            className="text-xs font-semibold text-zinc-900 hover:text-amber-800 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>View All New Releases</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Customer Testimonials (Clearly identified sample content) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-zinc-100/70 rounded-2xl p-8 sm:p-12 border border-zinc-200">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-1">
            Verified Collectors & Designers
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-zinc-950 tracking-tight">
            Loved for Quiet Precision
          </h2>
          <p className="text-xs text-zinc-500 mt-2">
            Fictional sample testimonials demonstrating client feedback and satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 rounded-xl border border-zinc-200/90 shadow-xs flex flex-col justify-between space-y-4"
            >
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="pt-4 border-t border-zinc-100 space-y-1">
                <div className="font-semibold text-xs text-zinc-950">{t.author}</div>
                <div className="text-[11px] text-zinc-500">{t.role} · {t.location}</div>
                <div className="text-[11px] text-amber-800 font-medium pt-1">
                  Verified: {t.verifiedItem}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Craftsmanship & Guarantees */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 border border-zinc-200 rounded-2xl bg-white">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-900 mb-3">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-zinc-900">Complimentary Courier Delivery</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              All orders above $150 ship free worldwide in reinforced, plastic-free protective packaging.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-900 mb-3">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-zinc-900">30-Day In-Home Trial</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Experience the pieces in your personal sanctuary. If you are not completely satisfied, return with ease.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-900 mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-zinc-900">10-Year Structural Guarantee</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              We stand behind our mortise-and-tenon solid wood joinery and machined acoustic housing for a full decade.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Newsletter Signup */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
          The Weekly Dispatch
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-zinc-950 tracking-tight">
          Join our architectural circle.
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 max-w-md mx-auto">
          Receive advance notice for limited studio releases, private archival sales, and interior design essays.
        </p>

        {newsletterSubscribed ? (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-lg border border-emerald-200">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Thank you for subscribing. Check your inbox for your 10% welcome coupon.</span>
          </div>
        ) : (
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-2 pt-2">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 text-xs px-4 py-3 bg-white border border-zinc-200 rounded-xl focus:outline-none focus:border-zinc-900"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-100 text-xs font-semibold rounded-xl transition-colors cursor-pointer shrink-0"
            >
              Subscribe
            </button>
          </form>
        )}
      </section>
    </div>
  );
};
