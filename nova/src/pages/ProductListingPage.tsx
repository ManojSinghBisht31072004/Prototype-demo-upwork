import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, SlidersHorizontal, X, Search, RotateCcw, ArrowUpDown } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const ProductListingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { filterState, updateFilter, resetFilters } = useShop();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    const cat = searchParams.get('category');
    const q = searchParams.get('q');
    if (cat) {
      updateFilter({ category: cat });
    }
    if (q) {
      updateFilter({ searchQuery: q });
    }
  }, [searchParams]);

  const categories = ['All', ...CATEGORIES.map((c) => c.id)];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (filterState.category !== 'All' && product.category !== filterState.category) {
        return false;
      }

      // In stock only
      if (filterState.inStockOnly && !product.inStock) {
        return false;
      }

      // On sale only
      if (filterState.onSaleOnly && !product.originalPrice) {
        return false;
      }

      // Price range
      if (
        product.price < filterState.priceRange[0] ||
        product.price > filterState.priceRange[1]
      ) {
        return false;
      }

      // Search query
      if (filterState.searchQuery.trim()) {
        const q = filterState.searchQuery.toLowerCase();
        const matches =
          product.name.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.subtitle.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filterState.sortBy === 'price-asc') return a.price - b.price;
      if (filterState.sortBy === 'price-desc') return b.price - a.price;
      if (filterState.sortBy === 'rating') return b.rating - a.rating;
      if (filterState.sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // featured default
    });
  }, [filterState]);

  const activeFiltersCount =
    (filterState.category !== 'All' ? 1 : 0) +
    (filterState.inStockOnly ? 1 : 0) +
    (filterState.onSaleOnly ? 1 : 0) +
    (filterState.searchQuery ? 1 : 0) +
    (filterState.priceRange[1] < 2000 ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Title & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-zinc-200">
        <div>
          <div className="text-xs text-zinc-500 mb-1 flex items-center gap-1.5">
            <span>Catalog</span>
            <span aria-hidden="true">/</span>
            <span className="text-zinc-900 font-medium">{filterState.category}</span>
          </div>
          <h1 className="text-3xl font-bold font-display text-zinc-950 tracking-tight">
            {filterState.category === 'All' ? 'Complete Collection' : filterState.category}
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Displaying {filteredProducts.length} curated design objects
          </p>
        </div>

        {/* Sort & Mobile Filter Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden flex items-center gap-2 px-3.5 py-2 text-xs font-semibold bg-white border border-zinc-200 rounded-lg text-zinc-900 shadow-xs cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
          </button>

          <div className="flex items-center gap-2 bg-white border border-zinc-200 rounded-lg px-3 py-1.5 shadow-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
            <label htmlFor="sort-select" className="sr-only">
              Sort by
            </label>
            <select
              id="sort-select"
              value={filterState.sortBy}
              onChange={(e) => updateFilter({ sortBy: e.target.value as any })}
              className="text-xs font-medium text-zinc-900 bg-transparent focus:outline-none cursor-pointer pr-1"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Layout: Filters Bar / Sidebar + Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <aside
          aria-label="Product filters"
          className={`space-y-6 md:block ${
            mobileFilterOpen ? 'block' : 'hidden'
          } bg-white md:bg-transparent p-5 md:p-0 rounded-xl md:rounded-none border md:border-none border-zinc-200 shadow-sm md:shadow-none`}
        >
          {/* Search box inside filter */}
          <div>
            <label className="text-xs font-semibold text-zinc-900 block mb-2">
              Filter by Keyword
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search..."
                value={filterState.searchQuery}
                onChange={(e) => updateFilter({ searchQuery: e.target.value })}
                className="w-full text-xs pl-8 pr-3 py-2 bg-white border border-zinc-200 rounded-lg focus:outline-none focus:border-zinc-900"
              />
              {filterState.searchQuery && (
                <button
                  onClick={() => updateFilter({ searchQuery: '' })}
                  className="absolute right-2.5 top-2.5 text-zinc-400 hover:text-zinc-600 p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Department / Category Filter */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-zinc-900 block">Department</span>
            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => updateFilter({ category: cat })}
                  className={`w-full text-left px-3 py-1.5 text-xs rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                    filterState.category === cat
                      ? 'bg-zinc-900 text-zinc-50 font-medium'
                      : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950'
                  }`}
                >
                  <span>{cat}</span>
                  <span className="text-[11px] opacity-70 tabular-nums">
                    {cat === 'All'
                      ? PRODUCTS.length
                      : PRODUCTS.filter((p) => p.category === cat).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-3 pt-4 border-t border-zinc-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-900">Max Price</span>
              <span className="text-xs font-semibold text-zinc-950 tabular-nums">
                ${filterState.priceRange[1]}
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="2000"
              step="50"
              value={filterState.priceRange[1]}
              onChange={(e) =>
                updateFilter({ priceRange: [filterState.priceRange[0], Number(e.target.value)] })
              }
              className="w-full accent-zinc-900 cursor-pointer"
            />
            <div className="flex gap-1.5 flex-wrap">
              <button
                onClick={() => updateFilter({ priceRange: [0, 300] })}
                className="text-[11px] px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 rounded text-zinc-700 cursor-pointer"
              >
                Under $300
              </button>
              <button
                onClick={() => updateFilter({ priceRange: [0, 600] })}
                className="text-[11px] px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 rounded text-zinc-700 cursor-pointer"
              >
                Under $600
              </button>
              <button
                onClick={() => updateFilter({ priceRange: [0, 2000] })}
                className="text-[11px] px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 rounded text-zinc-700 cursor-pointer"
              >
                All Prices
              </button>
            </div>
          </div>

          {/* Toggles: In Stock & On Sale */}
          <div className="space-y-2 pt-4 border-t border-zinc-200">
            <span className="text-xs font-semibold text-zinc-900 block mb-2">Availability</span>
            <label className="flex items-center gap-2 text-xs text-zinc-700 cursor-pointer">
              <input
                type="checkbox"
                checked={filterState.inStockOnly}
                onChange={(e) => updateFilter({ inStockOnly: e.target.checked })}
                className="rounded accent-zinc-900"
              />
              <span>In stock items only</span>
            </label>
            <label className="flex items-center gap-2 text-xs text-zinc-700 cursor-pointer">
              <input
                type="checkbox"
                checked={filterState.onSaleOnly}
                onChange={(e) => updateFilter({ onSaleOnly: e.target.checked })}
                className="rounded accent-zinc-900"
              />
              <span>Special offer / Sale items</span>
            </label>
          </div>

          {/* Reset Filters action */}
          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              className="w-full py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          )}
        </aside>

        {/* Product Grid Area */}
        <main className="md:col-span-3 space-y-6">
          {/* Active Filter Chips */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-zinc-400">Active filters:</span>
              {filterState.category !== 'All' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-zinc-200 text-zinc-800 rounded-md">
                  <span>{filterState.category}</span>
                  <button onClick={() => updateFilter({ category: 'All' })} className="cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filterState.searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-zinc-200 text-zinc-800 rounded-md">
                  <span>&ldquo;{filterState.searchQuery}&rdquo;</span>
                  <button onClick={() => updateFilter({ searchQuery: '' })} className="cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filterState.inStockOnly && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-zinc-200 text-zinc-800 rounded-md">
                  <span>In Stock</span>
                  <button onClick={() => updateFilter({ inStockOnly: false })} className="cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filterState.onSaleOnly && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-zinc-200 text-zinc-800 rounded-md">
                  <span>On Sale</span>
                  <button onClick={() => updateFilter({ onSaleOnly: false })} className="cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filterState.priceRange[1] < 2000 && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-zinc-200 text-zinc-800 rounded-md">
                  <span>Under ${filterState.priceRange[1]}</span>
                  <button onClick={() => updateFilter({ priceRange: [0, 2000] })} className="cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                onClick={resetFilters}
                className="text-xs text-amber-900 underline font-medium hover:text-amber-700 ml-2 cursor-pointer"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Grid or Empty State */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-white rounded-2xl border border-zinc-200 space-y-4">
              <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
                <Filter className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-zinc-950">No matching creations found</h3>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                  Try adjusting your price threshold, removing keyword filters, or exploring all departments.
                </p>
              </div>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-100 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
