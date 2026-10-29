import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Lock,
  ShieldCheck,
  CreditCard,
  Truck,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  DollarSign,
  Package,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ShippingDetails } from '../types';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, subtotal, discount, shippingFee, tax, total, submitOrder } = useShop();

  const [formData, setFormData] = useState<ShippingDetails>({
    fullName: 'Clara Delacroix',
    email: 'clara.delacroix@example.com',
    phone: '+1 (415) 890-2341',
    address: '428 Sansome Street',
    apartment: 'Suite 400',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94111',
    country: 'United States',
    shippingMethod: 'standard',
    paymentMethod: 'card',
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '12/28',
    cardCvc: '888',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@'))
      errs.email = 'Valid email is required for shipping tracking';
    if (!formData.address.trim()) errs.address = 'Street address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.postalCode.trim()) errs.postalCode = 'Postal code is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      submitOrder(formData);
      setIsSubmitting(false);
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
          <Package className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold font-display text-zinc-950">Your shopping bag is empty</h2>
        <p className="text-xs text-zinc-500">
          Add items to your bag before proceeding to our checkout experience.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="px-6 py-2.5 bg-zinc-900 text-zinc-50 text-xs font-semibold rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Bar for Checkout */}
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-zinc-200">
        <button
          onClick={() => navigate('/shop')}
          className="text-xs text-zinc-500 hover:text-zinc-900 flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Store</span>
        </button>
        <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60 font-medium">
          <Lock className="w-3.5 h-3.5" />
          <span>Simulated 256-Bit SSL Demo Checkout</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Form Area (7 cols) */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-8">
          {/* Section 1: Customer Contact */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 space-y-5 shadow-xs">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold font-display text-zinc-950 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-zinc-900 text-white text-[11px] flex items-center justify-center">1</span>
                <span>Contact & Shipping Details</span>
              </h2>
              <span className="text-[11px] text-zinc-400">Step 1 of 2</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-zinc-800">
                  Full Recipient Name *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Clara Delacroix"
                  className={`w-full text-xs px-3.5 py-2.5 rounded-lg border ${
                    errors.fullName ? 'border-rose-500' : 'border-zinc-200'
                  } focus:outline-none focus:border-zinc-900`}
                />
                {errors.fullName && <p className="text-[11px] text-rose-500">{errors.fullName}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-800">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. clara@studio.com"
                  className={`w-full text-xs px-3.5 py-2.5 rounded-lg border ${
                    errors.email ? 'border-rose-500' : 'border-zinc-200'
                  } focus:outline-none focus:border-zinc-900`}
                />
                {errors.email && <p className="text-[11px] text-rose-500">{errors.email}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-800">Phone (For Delivery Dispatch)</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-zinc-200 focus:outline-none focus:border-zinc-900"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-zinc-800">Street Address *</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Street name and house number"
                  className={`w-full text-xs px-3.5 py-2.5 rounded-lg border ${
                    errors.address ? 'border-rose-500' : 'border-zinc-200'
                  } focus:outline-none focus:border-zinc-900`}
                />
                {errors.address && <p className="text-[11px] text-rose-500">{errors.address}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-800">Apartment / Suite</label>
                <input
                  type="text"
                  value={formData.apartment || ''}
                  onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                  placeholder="Apt 4B (Optional)"
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-zinc-200 focus:outline-none focus:border-zinc-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-800">City *</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className={`w-full text-xs px-3.5 py-2.5 rounded-lg border ${
                    errors.city ? 'border-rose-500' : 'border-zinc-200'
                  } focus:outline-none focus:border-zinc-900`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-800">State / Province</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-zinc-200 focus:outline-none focus:border-zinc-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-800">Postal / ZIP Code *</label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className={`w-full text-xs px-3.5 py-2.5 rounded-lg border ${
                    errors.postalCode ? 'border-rose-500' : 'border-zinc-200'
                  } focus:outline-none focus:border-zinc-900`}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Speed */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 space-y-4 shadow-xs">
            <h2 className="text-base font-bold font-display text-zinc-950 flex items-center gap-2">
              <Truck className="w-4.5 h-4.5 text-zinc-900" />
              <span>Select Shipping Method</span>
            </h2>

            <div className="space-y-2.5">
              <label
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer ${
                  formData.shippingMethod === 'standard'
                    ? 'border-zinc-900 bg-zinc-50 ring-1 ring-zinc-900'
                    : 'border-zinc-200 hover:border-zinc-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shippingMethod"
                    checked={formData.shippingMethod === 'standard'}
                    onChange={() => setFormData({ ...formData, shippingMethod: 'standard' })}
                    className="accent-zinc-900"
                  />
                  <div>
                    <div className="text-xs font-semibold text-zinc-900">
                      Standard White-Glove Ground Delivery
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      3–5 business days · Full crate insurance included
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-zinc-950">
                  {subtotal >= 150 ? 'FREE' : '$25'}
                </span>
              </label>

              <label
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer ${
                  formData.shippingMethod === 'express'
                    ? 'border-zinc-900 bg-zinc-50 ring-1 ring-zinc-900'
                    : 'border-zinc-200 hover:border-zinc-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shippingMethod"
                    checked={formData.shippingMethod === 'express'}
                    onChange={() => setFormData({ ...formData, shippingMethod: 'express' })}
                    className="accent-zinc-900"
                  />
                  <div>
                    <div className="text-xs font-semibold text-zinc-900">
                      Priority Air Expedited Courier
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      1–2 business days · Dedicated logistics concierge
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-zinc-950">$45</span>
              </label>
            </div>
          </div>

          {/* Section 3: Payment Simulation */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold font-display text-zinc-950 flex items-center gap-2">
                <CreditCard className="w-4.5 h-4.5 text-zinc-900" />
                <span>Simulated Payment Gateway</span>
              </h2>
              <span className="text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded font-medium">
                Sandbox Demo Mode
              </span>
            </div>

            <p className="text-xs text-zinc-500">
              This is a safe demonstration checkout. No real charges or payment gateway calls will occur.
            </p>

            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                className={`p-3 text-xs font-semibold rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  formData.paymentMethod === 'card'
                    ? 'border-zinc-900 bg-zinc-900 text-white'
                    : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Demo Card</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: 'apple-pay' })}
                className={`p-3 text-xs font-semibold rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  formData.paymentMethod === 'apple-pay'
                    ? 'border-zinc-900 bg-zinc-900 text-white'
                    : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Express Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                className={`p-3 text-xs font-semibold rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  formData.paymentMethod === 'cod'
                    ? 'border-zinc-900 bg-zinc-900 text-white'
                    : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Cash on Delivery</span>
              </button>
            </div>

            {formData.paymentMethod === 'card' && (
              <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 space-y-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-zinc-700">Card Number (Simulated)</label>
                  <input
                    type="text"
                    readOnly
                    value="4242 •••• •••• 4242"
                    className="w-full text-xs font-mono px-3 py-2 bg-white rounded-lg border border-zinc-200 text-zinc-800"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-zinc-700">Expiration</label>
                    <input
                      type="text"
                      readOnly
                      value="12 / 28"
                      className="w-full text-xs font-mono px-3 py-2 bg-white rounded-lg border border-zinc-200 text-zinc-800"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-zinc-700">CVC</label>
                    <input
                      type="text"
                      readOnly
                      value="888"
                      className="w-full text-xs font-mono px-3 py-2 bg-white rounded-lg border border-zinc-200 text-zinc-800"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-50 text-sm font-semibold rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Authorizing Demo Transaction...</span>
            ) : (
              <span>Complete Demo Purchase · ${total.toLocaleString()}</span>
            )}
          </button>
        </form>

        {/* Right: Order Summary Breakdown (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-xs space-y-6 lg:sticky lg:top-24">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
            <h3 className="text-base font-bold font-display text-zinc-950">
              Order Summary ({cart.reduce((a, b) => a + b.quantity, 0)})
            </h3>
            <button
              onClick={() => navigate('/cart')}
              className="text-xs text-zinc-500 hover:text-zinc-900 underline cursor-pointer"
            >
              Edit Bag
            </button>
          </div>

          {/* Itemized List */}
          <div className="divide-y divide-zinc-100 max-h-72 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={`${item.product.id}-${item.selectedVariant?.id}`} className="py-3 flex gap-3">
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-zinc-100 shrink-0">
                  <ImageWithFallback
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fallbackTitle={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-zinc-900 truncate">
                    {item.product.name}
                  </h4>
                  <div className="text-[11px] text-zinc-500">
                    Qty: {item.quantity} · {item.selectedVariant?.name || 'Standard'}
                  </div>
                </div>
                <div className="text-right text-xs font-semibold text-zinc-950 tabular-nums">
                  ${(item.product.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Calculation Lines */}
          <div className="space-y-2 pt-4 border-t border-zinc-200 text-xs text-zinc-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-zinc-900 tabular-nums">
                ${subtotal.toLocaleString()}
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Applied Promotion</span>
                <span className="font-semibold tabular-nums">-${discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery Service</span>
              <span className="font-semibold text-zinc-900 tabular-nums">
                {formData.shippingMethod === 'express'
                  ? '$45'
                  : shippingFee === 0
                  ? 'Complimentary'
                  : `$${shippingFee}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Sales Tax (8%)</span>
              <span className="font-semibold text-zinc-900 tabular-nums">
                ${tax.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between text-base font-bold text-zinc-950 pt-3 border-t border-zinc-200">
              <span>Total Due</span>
              <span className="tabular-nums">
                ${(total + (formData.shippingMethod === 'express' ? 45 : 0)).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="p-4 bg-zinc-50 rounded-xl text-[11px] text-zinc-500 space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-zinc-800">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-900" />
              <span>Buyer Protection Guarantee</span>
            </div>
            <p>
              Your simulated order is backed by NOVA Market’s 30-day return policy and full transit insurance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
