import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Minus, Trash2, ArrowRight, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
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

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    setPromoMessage({ text: res.message, error: !res.success });
    if (res.success) {
      setPromoInput('');
    }
  };

  const progressPercent = Math.min(
    100,
    Math.round(((freeShippingThreshold - amountUntilFreeShipping) / freeShippingThreshold) * 100)
  );

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold font-display text-zinc-950">Your Shopping Bag is Empty</h1>
        <p className="text-xs text-zinc-500 max-w-sm mx-auto">
          Explore our permanent collection of heirloom furniture, precision acoustics, and tactile lighting.
        </p>
        <Link
          to="/shop"
          className="inline-block px-6 py-3 bg-zinc-900 text-zinc-50 text-xs font-semibold rounded-xl hover:bg-zinc-800 transition-colors"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-zinc-200">
        <div>
          <h1 className="text-3xl font-bold font-display text-zinc-950 tracking-tight">
            Shopping Bag
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            {cart.reduce((a, b) => a + b.quantity, 0)} curated design items selected
          </p>
        </div>
        <Link
          to="/shop"
          className="text-xs text-zinc-600 hover:text-zinc-950 underline font-medium"
        >
          Continue Shopping
        </Link>
      </div>

      {/* Free Shipping Progress Indicator */}
      <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-2">
        <div className="flex items-center justify-between text-xs">
          {amountUntilFreeShipping > 0 ? (
            <span className="text-zinc-700">
              Add <strong className="font-semibold text-zinc-950 tabular-nums">${amountUntilFreeShipping}</strong> more for complimentary shipping
            </span>
          ) : (
            <span className="text-emerald-700 font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Items list (8 cols) */}
        <div className="lg:col-span-8 divide-y divide-zinc-200 border-t border-b border-zinc-200">
          {cart.map((item) => (
            <div
              key={`${item.product.id}-${item.selectedVariant?.id}`}
              className="py-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between"
            >
              <div className="flex gap-4 items-center">
                <Link
                  to={`/product/${item.product.id}`}
                  className="w-24 h-24 rounded-xl overflow-hidden bg-zinc-100 shrink-0"
                >
                  <ImageWithFallback
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fallbackTitle={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>
                <div className="space-y-1">
                  <div className="text-[11px] text-zinc-400 uppercase tracking-wider">
                    {item.product.category}
                  </div>
                  <Link
                    to={`/product/${item.product.id}`}
                    className="text-sm font-bold text-zinc-900 hover:text-amber-800 transition-colors line-clamp-1"
                  >
                    {item.product.name}
                  </Link>
                  {item.selectedVariant && (
                    <div className="text-xs text-zinc-500">
                      Finish: {item.selectedVariant.name}
                    </div>
                  )}
                  <div className="text-xs font-semibold text-zinc-950 sm:hidden tabular-nums">
                    ${(item.product.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 self-end sm:self-center">
                {/* Quantity stepper */}
                <div className="flex items-center border border-zinc-200 rounded-lg bg-zinc-50">
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.selectedVariant?.id, item.quantity - 1)
                    }
                    className="p-1.5 text-zinc-600 hover:text-zinc-950 cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-semibold text-zinc-900 tabular-nums">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.selectedVariant?.id, item.quantity + 1)
                    }
                    className="p-1.5 text-zinc-600 hover:text-zinc-950 cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="hidden sm:block text-right min-w-[80px]">
                  <span className="text-sm font-semibold text-zinc-950 tabular-nums">
                    ${(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(item.product.id, item.selectedVariant?.id)}
                  className="p-1.5 text-zinc-400 hover:text-rose-600 transition-colors cursor-pointer"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Summary Card (4 cols) */}
        <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-xs space-y-6">
          <h2 className="text-base font-bold font-display text-zinc-950 pb-3 border-b border-zinc-100">
            Order Summary
          </h2>

          {/* Promo code */}
          <form onSubmit={handleApplyPromo} className="space-y-1.5">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Promo code (NOVA10)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="w-full text-xs pl-8 pr-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-zinc-900"
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
              <p className={`text-[11px] ${promoMessage.error ? 'text-rose-600' : 'text-emerald-700'}`}>
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

          {/* Calculation */}
          <div className="space-y-2 text-xs text-zinc-600 pt-3 border-t border-zinc-100">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-zinc-900 tabular-nums">
                ${subtotal.toLocaleString()}
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Promotion Discount</span>
                <span className="font-semibold tabular-nums">-${discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Standard Shipping</span>
              <span className="font-semibold text-zinc-900 tabular-nums">
                {shippingFee === 0 ? 'Complimentary' : `$${shippingFee}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Sales Tax (8%)</span>
              <span className="font-semibold text-zinc-900 tabular-nums">
                ${tax.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between text-base font-bold text-zinc-950 pt-3 border-t border-zinc-200">
              <span>Total</span>
              <span className="tabular-nums">${total.toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-3.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-50 text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
