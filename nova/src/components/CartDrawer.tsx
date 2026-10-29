import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ImageWithFallback } from './ImageWithFallback';

export const CartDrawer: React.FC = () => {
  const navigate = useNavigate();
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    shippingFee,
    tax,
    total,
    amountUntilFreeShipping,
    freeShippingThreshold,
    activePromo,
    applyPromo,
    removePromo,
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; error: boolean } | null>(null);

  if (!isCartDrawerOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    setPromoMessage({ text: res.message, error: !res.success });
    if (res.success) {
      setPromoInput('');
    }
  };

  const handleCheckout = () => {
    setIsCartDrawerOpen(false);
    navigate('/checkout');
  };

  const progressPercent = Math.min(100, Math.round(((freeShippingThreshold - amountUntilFreeShipping) / freeShippingThreshold) * 100));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 overflow-hidden bg-zinc-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={() => setIsCartDrawerOpen(false)}
    >
      <div
        className="fixed inset-y-0 right-0 max-w-full flex pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-white flex flex-col shadow-2xl border-l border-zinc-200">
          {/* Header */}
          <div className="px-6 py-5 border-b border-zinc-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-zinc-900" />
              <h2 id="cart-drawer-title" className="text-base font-semibold font-display text-zinc-950">
                Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 text-zinc-400 hover:text-zinc-900 rounded-md transition-colors cursor-pointer"
              aria-label="Close shopping bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3 bg-zinc-50 border-b border-zinc-200">
            <div className="flex items-center justify-between text-xs mb-1.5">
              {amountUntilFreeShipping > 0 ? (
                <span className="text-zinc-700">
                  Add <strong className="font-semibold text-zinc-950 tabular-nums">${amountUntilFreeShipping}</strong> more for complimentary shipping
                </span>
              ) : (
                <span className="text-emerald-700 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  You qualify for complimentary express delivery!
                </span>
              )}
              <span className="text-zinc-400 tabular-nums">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-zinc-900 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-zinc-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-zinc-900">Your bag is empty</p>
                  <p className="text-xs text-zinc-500 max-w-xs">
                    Discover crafted furniture, acoustic engineering, and timeless everyday objects.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('/shop');
                  }}
                  className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-100 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedVariant?.id}`} className="py-4 flex gap-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-zinc-100 shrink-0">
                    <ImageWithFallback
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fallbackTitle={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-semibold text-zinc-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedVariant?.id)}
                          className="text-zinc-400 hover:text-rose-600 p-0.5 transition-colors cursor-pointer"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.selectedVariant && (
                        <p className="text-[11px] text-zinc-500 mt-0.5">
                          Finish: {item.selectedVariant.name}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity stepper */}
                      <div className="flex items-center border border-zinc-200 rounded-md bg-zinc-50">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.selectedVariant?.id, item.quantity - 1)
                          }
                          className="p-1 text-zinc-600 hover:text-zinc-950 cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-medium text-zinc-900 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.selectedVariant?.id, item.quantity + 1)
                          }
                          className="p-1 text-zinc-600 hover:text-zinc-950 cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-semibold text-zinc-950 tabular-nums">
                          ${(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Calculations and Checkout */}
          {cart.length > 0 && (
            <div className="border-t border-zinc-200 p-6 bg-zinc-50/50 space-y-4">
              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Promo code (e.g. NOVA10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="w-full text-xs pl-8 pr-3 py-2 bg-white border border-zinc-200 rounded-lg focus:outline-none focus:border-zinc-900"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-100 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p
                    className={`text-[11px] ${
                      promoMessage.error ? 'text-rose-600' : 'text-emerald-700'
                    }`}
                  >
                    {promoMessage.text}
                  </p>
                )}
                {activePromo && !promoMessage && (
                  <div className="flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
                    <span>Code {activePromo.code} active ({Math.round(activePromo.rate * 100)}% off)</span>
                    <button
                      type="button"
                      onClick={removePromo}
                      className="text-emerald-900 hover:underline cursor-pointer text-[10px]"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </form>

              {/* Order financial breakdown */}
              <div className="space-y-1.5 text-xs text-zinc-600 pt-2 border-t border-zinc-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-zinc-900 tabular-nums">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount</span>
                    <span className="font-medium tabular-nums">-${discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-medium text-zinc-900 tabular-nums">
                    {shippingFee === 0 ? 'Free' : `$${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Sales Tax (8%)</span>
                  <span className="font-medium text-zinc-900 tabular-nums">
                    ${tax.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-zinc-950 pt-2 border-t border-zinc-200">
                  <span>Total</span>
                  <span className="tabular-nums">${total.toLocaleString()}</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-100 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="w-full py-2 text-zinc-600 hover:text-zinc-950 text-xs font-medium text-center cursor-pointer"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
