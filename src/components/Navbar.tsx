import React, { useState } from 'react';
import { PageId } from '../types';
import { Sparkles, Menu, X, Phone } from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'service-areas', label: 'Service Areas' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Quiet top utility banner with phone & service note - clean unboxed typography */}
      <div className="bg-slate-900 text-slate-300 text-xs border-b border-slate-800 hidden sm:block">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-teal-400 font-medium">Daily Service Routes</span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <span>Serving Greater Metro Valley, Oakridge & Lakeside</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span className="text-slate-400">Mon–Sat 7:30 AM – 6:30 PM</span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <a 
              href="tel:5557827362" 
              className="inline-flex items-center gap-1.5 text-white font-medium hover:text-teal-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <span>(555) 782-7362</span>
            </a>
          </div>
        </div>
      </div>

      {/* Top Bar Contract: 3 zones, gap-8, single line elements */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-shadow">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single text element wordmark in display face) */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2 text-left group whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded"
          >
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white shadow-sm group-hover:bg-teal-700 transition-colors">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              PureSpace<span className="text-teal-600 font-semibold">.</span>
            </span>
          </button>

          {/* Zone 2: 4-5 clean single-line nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded ${
                    isActive ? 'text-teal-700 font-semibold' : 'text-slate-600'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <button
              onClick={() => handleLinkClick('contact')}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-sm transition-all duration-150 active:scale-[0.98] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
            >
              Request a Free Quote
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => handleLinkClick('contact')}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-teal-700 rounded-md shrink-0"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-6 py-4 animate-in fade-in duration-200">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-teal-50 text-teal-800 font-semibold' 
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
              <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={() => handleLinkClick('contact')}
                  className="w-full text-center py-3 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-sm transition-colors"
                >
                  Request a Free Quote
                </button>
                <div className="text-center text-xs text-slate-500 py-1">
                  Or call directly: <a href="tel:5557827362" className="text-teal-700 font-medium">(555) 782-7362</a>
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
