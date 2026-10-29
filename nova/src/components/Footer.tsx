import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck, Globe } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  const { selectCategory } = useShop();
  const [selectedCurrency, setSelectedCurrency] = useState('USD ($)');
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <footer className="bg-zinc-950 text-zinc-300 border-t border-zinc-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-white font-bold font-display text-lg tracking-tight">
              <span className="w-2.5 h-2.5 bg-white rounded-xs" />
              <span>NOVA Market</span>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
              An architectural online storefront for timeless living. We curate solid timber furniture, precision acoustic monitors, hand-thrown ceramics, and heirloom textiles made to endure generations.
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-zinc-500">
              <ShieldCheck className="w-4 h-4 text-zinc-400" />
              <span>FSC-Certified Hardwoods · Plastic-Free Crating · Direct Studio Fair-Trade</span>
            </div>
          </div>

          {/* Departments */}
          <div className="space-y-3">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Departments
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => selectCategory('Living & Furniture')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Living & Furniture
                </button>
              </li>
              <li>
                <button
                  onClick={() => selectCategory('Audio & Acoustic')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Audio & Acoustic
                </button>
              </li>
              <li>
                <button
                  onClick={() => selectCategory('Lighting & Ceramics')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Lighting & Ceramics
                </button>
              </li>
              <li>
                <button
                  onClick={() => selectCategory('Objects & Apparel')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Objects & Apparel
                </button>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Complete Catalog</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div className="space-y-3">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Client Concierge
            </div>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <button
                  onClick={() => setActiveModal('shipping')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Shipping & White-Glove Transit
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('returns')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  30-Day In-Home Trial Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('warranty')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  10-Year Structural Guarantee
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('contact')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Studio Inquiries & Press
                </button>
              </li>
            </ul>
          </div>

          {/* Region & Language Selector */}
          <div className="space-y-3">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Region & Currency
            </div>
            <div className="space-y-2">
              <label htmlFor="currency-select" className="sr-only">
                Currency & Region
              </label>
              <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2">
                <Globe className="w-3.5 h-3.5 text-zinc-400" />
                <select
                  id="currency-select"
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  className="bg-transparent text-xs text-zinc-200 focus:outline-none cursor-pointer w-full"
                >
                  <option value="USD ($)" className="bg-zinc-900">United States (USD $)</option>
                  <option value="EUR (€)" className="bg-zinc-900">European Union (EUR €)</option>
                  <option value="GBP (£)" className="bg-zinc-900">United Kingdom (GBP £)</option>
                  <option value="CAD ($)" className="bg-zinc-900">Canada (CAD $)</option>
                  <option value="JPY (¥)" className="bg-zinc-900">Japan (JPY ¥)</option>
                </select>
              </div>
              <p className="text-[11px] text-zinc-500">
                Prices displayed include domestic import duty estimations.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} NOVA Market Atelier Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveModal('privacy')}
              className="hover:text-zinc-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setActiveModal('terms')}
              className="hover:text-zinc-300 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span aria-hidden="true">·</span>
            <span className="text-zinc-600">Simulated E-Commerce Prototype</span>
          </div>
        </div>
      </div>

      {/* Info Modal for Footer Links */}
      {activeModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-xs"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white text-zinc-900 max-w-lg w-full p-6 sm:p-8 rounded-2xl shadow-2xl border border-zinc-200 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <h3 className="text-base font-bold font-display capitalize">
                {activeModal === 'shipping' && 'White-Glove Shipping Guidelines'}
                {activeModal === 'returns' && '30-Day Sanctuary Guarantee'}
                {activeModal === 'warranty' && '10-Year Structural Guarantee'}
                {activeModal === 'contact' && 'Studio Concierge & Press'}
                {activeModal === 'privacy' && 'Privacy Commitment'}
                {activeModal === 'terms' && 'Terms of Demonstration'}
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="text-xs text-zinc-400 hover:text-zinc-900 p-1"
              >
                Close
              </button>
            </div>

            <div className="text-xs text-zinc-600 leading-relaxed space-y-3">
              {activeModal === 'shipping' && (
                <>
                  <p>
                    All items ship in custom-built, recyclable honeycomb timber crates. Complimentary standard ground transit applies automatically on all orders exceeding $150.
                  </p>
                  <p>
                    For large furniture like credenzas and daybeds, our white-glove partners coordinate a scheduled 2-hour appointment window, unpack in your room of choice, and remove all protective crating.
                  </p>
                </>
              )}

              {activeModal === 'returns' && (
                <>
                  <p>
                    We believe living with an object is the only true way to gauge its harmony with your architecture. Enjoy 30 days from delivery in your space.
                  </p>
                  <p>
                    If the finish or scale does not align with your interior, contact our concierge for complimentary pickup and 100% refund in original payment form.
                  </p>
                </>
              )}

              {activeModal === 'warranty' && (
                <>
                  <p>
                    Our solid American walnut joinery, Japanese selvedge stitching, and precision machined aluminum sound chambers are backed by a decade of structural coverage against defects in manufacturing.
                  </p>
                </>
              )}

              {activeModal === 'contact' && (
                <>
                  <p>
                    Studio Headquarters: 428 Sansome Street, San Francisco, CA.
                  </p>
                  <p>
                    Client Concierge: concierge@novamarket-studio.com · Response within 4 business hours.
                  </p>
                </>
              )}

              {activeModal === 'privacy' && (
                <p>
                  NOVA Market respects client privacy. In this prototype, data is stored strictly in your browser session and is never sold or transferred to 3rd-party trackers.
                </p>
              )}

              {activeModal === 'terms' && (
                <p>
                  This site is a functional e-commerce demonstration designed for review, testing, and portfolio showcasing. No real monetary transactions or financial debts are incurred.
                </p>
              )}
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-2.5 bg-zinc-900 text-white text-xs font-semibold rounded-lg hover:bg-zinc-800 transition-colors"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
