import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X, ArrowUpRight, User } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    selectCategory,
    cartCount,
    wishlist,
    setIsCartDrawerOpen,
    setIsWishlistDrawerOpen,
    setIsSearchModalOpen,
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);

  const handleNavClick = (category?: string) => {
    setMobileMenuOpen(false);
    if (category) {
      selectCategory(category);
    } else {
      navigate('/shop');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-zinc-50/90 backdrop-blur-md border-b border-zinc-200/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
          {/* Zone 1: Brand wordmark (single element, Outfit font) */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/"
              className="group text-left text-xl font-bold font-display tracking-tight text-zinc-900 flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 rounded-sm"
              aria-label="NOVA Market Homepage"
            >
              <span className="w-2.5 h-2.5 bg-zinc-900 group-hover:scale-125 transition-transform duration-200 rounded-xs" />
              <span>NOVA Market</span>
            </Link>
          </div>

          {/* Zone 2: Navigation Links (4-5 concise, single-line text links) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-600">
            <Link
              to="/shop"
              className={`hover:text-zinc-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                location.pathname === '/shop' ? 'text-zinc-950 font-semibold' : ''
              }`}
            >
              Shop All
            </Link>
            <button
              onClick={() => handleNavClick('Living & Furniture')}
              className="hover:text-zinc-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Living & Furniture
            </button>
            <button
              onClick={() => handleNavClick('Audio & Acoustic')}
              className="hover:text-zinc-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Audio & Acoustic
            </button>
            <button
              onClick={() => handleNavClick('Lighting & Ceramics')}
              className="hover:text-zinc-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Lighting & Ceramics
            </button>
            <button
              onClick={() => handleNavClick('Objects & Apparel')}
              className="hover:text-zinc-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Objects & Apparel
            </button>
          </nav>

          {/* Zone 3: Interactive Affordances (Search, Account, Wishlist, Cart) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Search trigger */}
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="p-2 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200/60 rounded-md transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
              aria-label="Open search dialog"
              title="Search products (Cmd+K)"
            >
              <Search className="w-4.5 h-4.5" />
            </button>

            {/* Account trigger */}
            <button
              onClick={() => setAccountModalOpen(true)}
              className="p-2 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200/60 rounded-md transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
              aria-label="Client Account"
              title="Member Account"
            >
              <User className="w-4.5 h-4.5" />
            </button>

            {/* Wishlist trigger */}
            <button
              onClick={() => setIsWishlistDrawerOpen(true)}
              className="p-2 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200/60 rounded-md transition-colors relative cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
              aria-label={`View wishlist (${wishlist.length} saved)`}
            >
              <Heart className="w-4.5 h-4.5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-zinc-900 text-zinc-100 text-[10px] font-semibold flex items-center justify-center rounded-full tabular-nums">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag / Cart trigger */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-zinc-950 bg-zinc-900/5 hover:bg-zinc-900/10 border border-zinc-200 rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
              aria-label={`Open shopping cart (${cartCount} items)`}
            >
              <ShoppingBag className="w-4 h-4 text-zinc-900" />
              <span className="hidden sm:inline">Bag</span>
              <span className="bg-zinc-900 text-zinc-50 px-1.5 py-0.5 rounded text-[11px] font-mono tabular-nums leading-none">
                {cartCount}
              </span>
            </button>

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200/60 rounded-md transition-colors focus-visible:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-200 bg-zinc-50 px-5 py-6 space-y-4 shadow-lg animate-in fade-in duration-150">
            <div className="space-y-1">
              <Link
                to="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-left py-2.5 text-base font-medium text-zinc-900 hover:text-zinc-600 flex items-center justify-between"
              >
                <span>All Products</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400" />
              </Link>
              <button
                onClick={() => handleNavClick('Living & Furniture')}
                className="w-full text-left py-2.5 text-base font-medium text-zinc-900 hover:text-zinc-600 flex items-center justify-between"
              >
                <span>Living & Furniture</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400" />
              </button>
              <button
                onClick={() => handleNavClick('Audio & Acoustic')}
                className="w-full text-left py-2.5 text-base font-medium text-zinc-900 hover:text-zinc-600 flex items-center justify-between"
              >
                <span>Audio & Acoustic</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400" />
              </button>
              <button
                onClick={() => handleNavClick('Lighting & Ceramics')}
                className="w-full text-left py-2.5 text-base font-medium text-zinc-900 hover:text-zinc-600 flex items-center justify-between"
              >
                <span>Lighting & Ceramics</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400" />
              </button>
              <button
                onClick={() => handleNavClick('Objects & Apparel')}
                className="w-full text-left py-2.5 text-base font-medium text-zinc-900 hover:text-zinc-600 flex items-center justify-between"
              >
                <span>Objects & Apparel</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400" />
              </button>
            </div>

            <div className="pt-4 border-t border-zinc-200 flex items-center justify-between text-xs text-zinc-500">
              <span>Curated in California</span>
              <span>Complimentary Shipping &gt; $150</span>
            </div>
          </div>
        )}
      </header>

      {/* Account Info Modal */}
      {accountModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-xs"
          onClick={() => setAccountModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-zinc-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <h3 className="text-sm font-bold font-display text-zinc-900">
                Collector Account
              </h3>
              <button
                onClick={() => setAccountModalOpen(false)}
                className="text-xs text-zinc-400 hover:text-zinc-900"
              >
                Close
              </button>
            </div>

            <div className="space-y-3 text-xs text-zinc-600">
              <div className="p-3 bg-zinc-50 rounded-xl space-y-1">
                <div className="font-semibold text-zinc-900">Client Portal Status</div>
                <p className="text-zinc-500 text-[11px]">
                  Logged in as <strong className="text-zinc-800">Demo Collector</strong>. Your wishlist and bag are synchronized to this browser.
                </p>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between py-1 border-b border-zinc-100">
                  <span>Saved Wishlist Items</span>
                  <span className="font-semibold text-zinc-900 tabular-nums">{wishlist.length}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-100">
                  <span>Bag Quantity</span>
                  <span className="font-semibold text-zinc-900 tabular-nums">{cartCount}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Membership Tier</span>
                  <span className="font-semibold text-amber-800">Founding Patron</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setAccountModalOpen(false);
                setIsWishlistDrawerOpen(true);
              }}
              className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              View Saved Wishlist
            </button>
          </div>
        </div>
      )}
    </>
  );
};
