import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Printer, ArrowRight, Truck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const OrderConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const { lastOrder } = useShop();

  if (!lastOrder) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold font-display text-zinc-950">No recent order found</h2>
        <p className="text-xs text-zinc-500">
          Looks like you haven&apos;t placed a demo order during this session yet.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="px-6 py-2.5 bg-zinc-900 text-zinc-50 text-xs font-semibold rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Success Banner */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="text-xs font-semibold text-emerald-800 uppercase tracking-widest">
          Simulated Demo Order Placed
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-display text-zinc-950 tracking-tight">
          Thank you, {lastOrder.shippingDetails.fullName.split(' ')[0]}!
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 max-w-md mx-auto">
          We have generated your demo order receipt. An order confirmation dispatch has been logged to{' '}
          <strong className="text-zinc-800">{lastOrder.shippingDetails.email}</strong>.
        </p>
      </div>

      {/* Order Details Card */}
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
        {/* Header strip */}
        <div className="bg-zinc-50/80 p-6 border-b border-zinc-200 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-[11px] text-zinc-400 uppercase tracking-wider">Order Reference</div>
            <div className="text-base font-bold font-mono text-zinc-950">{lastOrder.id}</div>
          </div>
          <div>
            <div className="text-[11px] text-zinc-400 uppercase tracking-wider">Date Placed</div>
            <div className="text-xs font-medium text-zinc-800">{lastOrder.date}</div>
          </div>
          <div>
            <div className="text-[11px] text-zinc-400 uppercase tracking-wider">Status</div>
            <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Confirmed · Preparing Crate</span>
            </div>
          </div>
          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 bg-white border border-zinc-200 hover:bg-zinc-100 rounded-lg text-xs font-medium text-zinc-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>
        </div>

        {/* Ordered items list */}
        <div className="p-6 divide-y divide-zinc-100">
          <div className="text-xs font-semibold text-zinc-900 pb-3 uppercase tracking-wider">
            Curated Artifacts ({lastOrder.items.length})
          </div>
          {lastOrder.items.map((item) => (
            <div key={`${item.product.id}-${item.selectedVariant?.id}`} className="py-4 flex gap-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-zinc-100 shrink-0">
                <ImageWithFallback
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fallbackTitle={item.product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-zinc-900 truncate">
                    {item.product.name}
                  </h4>
                  <p className="text-[11px] text-zinc-500">
                    Finish: {item.selectedVariant?.name || 'Standard'} · Qty: {item.quantity}
                  </p>
                </div>
                <span className="text-xs text-zinc-400 font-mono">
                  SKU: {item.product.id.toUpperCase()}
                </span>
              </div>
              <div className="text-right text-xs font-semibold text-zinc-950 tabular-nums">
                ${(item.product.price * item.quantity).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        {/* Shipping Destination & Financial Totals */}
        <div className="p-6 bg-zinc-50/50 border-t border-zinc-200 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 text-xs">
            <div className="font-semibold text-zinc-900 uppercase tracking-wider text-[11px]">
              Shipping Destination
            </div>
            <div className="text-zinc-700 leading-relaxed">
              <p className="font-medium">{lastOrder.shippingDetails.fullName}</p>
              <p>{lastOrder.shippingDetails.address}</p>
              {lastOrder.shippingDetails.apartment && <p>{lastOrder.shippingDetails.apartment}</p>}
              <p>
                {lastOrder.shippingDetails.city}, {lastOrder.shippingDetails.state}{' '}
                {lastOrder.shippingDetails.postalCode}
              </p>
              <p>{lastOrder.shippingDetails.country}</p>
              <p className="text-zinc-500 mt-1">{lastOrder.shippingDetails.phone}</p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="font-semibold text-zinc-900 uppercase tracking-wider text-[11px]">
              Financial Breakdown
            </div>
            <div className="space-y-1.5 text-zinc-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-zinc-900 tabular-nums">
                  ${lastOrder.subtotal.toLocaleString()}
                </span>
              </div>
              {lastOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Promotion</span>
                  <span className="font-medium tabular-nums">-${lastOrder.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-medium text-zinc-900 tabular-nums">
                  {lastOrder.shippingFee === 0 ? 'Complimentary' : `$${lastOrder.shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between font-semibold text-sm text-zinc-950 pt-2 border-t border-zinc-200">
                <span>Total Paid (Simulated)</span>
                <span className="tabular-nums">${lastOrder.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next steps info */}
      <div className="p-6 border border-zinc-200 rounded-xl bg-white flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Truck className="w-5 h-5 text-zinc-700 shrink-0" />
          <div className="text-xs">
            <div className="font-semibold text-zinc-900">Estimated Dispatch Window</div>
            <div className="text-zinc-500">
              White glove preparation will dispatch within 24–48 hours.
            </div>
          </div>
        </div>
        <Link
          to="/shop"
          className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-50 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
