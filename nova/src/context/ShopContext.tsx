import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Product, ProductVariant, CartItem, FilterState, ShippingDetails, Order } from '../types';
import { PRODUCTS, PROMO_CODES } from '../data/products';

interface ShopContextType {
  // Navigation helper
  navigateTo: (path: string, param?: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, variantId: string | undefined, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  total: number;
  freeShippingThreshold: number;
  amountUntilFreeShipping: number;
  activePromo: { code: string; rate: number } | null;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Drawers & Modals
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isWishlistDrawerOpen: boolean;
  setIsWishlistDrawerOpen: (open: boolean) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Filters
  filterState: FilterState;
  updateFilter: (updates: Partial<FilterState>) => void;
  resetFilters: () => void;
  selectCategory: (category: string) => void;

  // Orders
  lastOrder: Order | null;
  submitOrder: (details: ShippingDetails) => Order;
}

const initialFilterState: FilterState = {
  category: 'All',
  priceRange: [0, 2000],
  sortBy: 'featured',
  searchQuery: '',
  inStockOnly: false,
  onSaleOnly: false,
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Cart persistence in localStorage with try/catch
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('nova_market_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read cart from localStorage', e);
    }
    // Initial sample products for immediate demo experience
    return [
      { product: PRODUCTS[0], selectedVariant: PRODUCTS[0].variants[0], quantity: 1 },
      { product: PRODUCTS[2], selectedVariant: PRODUCTS[2].variants[0], quantity: 1 },
    ];
  });

  // Wishlist persistence in localStorage with try/catch
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nova_market_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read wishlist from localStorage', e);
    }
    return ['nva-02', 'nva-05'];
  });

  const [activePromo, setActivePromo] = useState<{ code: string; rate: number } | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isWishlistDrawerOpen, setIsWishlistDrawerOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [filterState, setFilterState] = useState<FilterState>(initialFilterState);
  
  // Last order persistence in localStorage with try/catch
  const [lastOrder, setLastOrder] = useState<Order | null>(() => {
    try {
      const saved = localStorage.getItem('nova_market_last_order');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read last order from localStorage', e);
    }
    return null;
  });

  useEffect(() => {
    try {
      localStorage.setItem('nova_market_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('nova_market_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Could not save wishlist to localStorage', e);
    }
  }, [wishlist]);

  useEffect(() => {
    if (lastOrder) {
      try {
        localStorage.setItem('nova_market_last_order', JSON.stringify(lastOrder));
      } catch (e) {
        console.warn('Could not save last order to localStorage', e);
      }
    }
  }, [lastOrder]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const navigateTo = (path: string, param?: string) => {
    if (path === 'home') {
      navigate('/');
    } else if (path === 'shop') {
      navigate('/shop');
    } else if (path === 'product' && param) {
      navigate(`/product/${param}`);
    } else if (path === 'checkout') {
      navigate('/checkout');
    } else if (path === 'confirmation') {
      navigate('/order-confirmation');
    } else if (path === 'cart') {
      navigate('/cart');
    } else {
      navigate(path.startsWith('/') ? path : `/${path}`);
    }
  };

  const addToCart = (product: Product, variant?: ProductVariant, quantity = 1) => {
    const chosenVariant = variant || product.variants[0];
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedVariant?.id === chosenVariant?.id
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        return [...prev, { product, selectedVariant: chosenVariant, quantity }];
      }
    });
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (productId: string, variantId?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && (!variantId || item.selectedVariant?.id === variantId))
      )
    );
  };

  const updateQuantity = (productId: string, variantId: string | undefined, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && (!variantId || item.selectedVariant?.id === variantId)) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const applyPromo = (code: string) => {
    const upper = code.trim().toUpperCase();
    if (PROMO_CODES[upper]) {
      const rate = PROMO_CODES[upper];
      setActivePromo({ code: upper, rate });
      return { success: true, message: `Promo code ${upper} applied (${Math.round(rate * 100)}% off)` };
    }
    return { success: false, message: 'Invalid promo code. Try NOVA10 or DESIGN20.' };
  };

  const removePromo = () => setActivePromo(null);

  const updateFilter = (updates: Partial<FilterState>) => {
    setFilterState((prev) => ({ ...prev, ...updates }));
  };

  const resetFilters = () => setFilterState(initialFilterState);

  const selectCategory = (category: string) => {
    setFilterState((prev) => ({ ...prev, category, searchQuery: '' }));
    navigate('/shop');
  };

  // Financial Calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 150;
  const shippingFee = subtotal === 0 ? 0 : subtotal >= freeShippingThreshold ? 0 : 25;
  const discount = activePromo ? Math.round(subtotal * activePromo.rate) : 0;
  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = subtotal === 0 ? 0 : Math.round(taxableAmount * 0.08);
  const total = subtotal === 0 ? 0 : Math.max(0, taxableAmount + shippingFee + tax);
  const amountUntilFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const submitOrder = (details: ShippingDetails): Order => {
    const orderNumber = `NVA-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      id: orderNumber,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      items: [...cart],
      shippingDetails: details,
      subtotal,
      shippingFee,
      discount,
      total,
      estimatedDelivery: '3–5 business days',
    };
    setLastOrder(newOrder);
    clearCart();
    navigate('/order-confirmation');
    return newOrder;
  };

  return (
    <ShopContext.Provider
      value={{
        navigateTo,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        discount,
        shippingFee,
        tax,
        total,
        freeShippingThreshold,
        amountUntilFreeShipping,
        activePromo,
        applyPromo,
        removePromo,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isWishlistDrawerOpen,
        setIsWishlistDrawerOpen,
        isSearchModalOpen,
        setIsSearchModalOpen,
        quickViewProduct,
        setQuickViewProduct,
        filterState,
        updateFilter,
        resetFilters,
        selectCategory,
        lastOrder,
        submitOrder,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
