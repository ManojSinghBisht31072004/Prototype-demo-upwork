import React, { useState } from 'react';
import { PropertyCategory, ServiceType, CleaningFrequency } from '../types';
import { Calculator, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

interface QuickEstimatorProps {
  onApplyEstimate: (data: {
    category: PropertyCategory;
    serviceType: ServiceType;
    bedrooms: number;
    bathrooms: number;
    frequency: CleaningFrequency;
    squareFootage: string;
  }) => void;
}

export const QuickEstimator: React.FC<QuickEstimatorProps> = ({ onApplyEstimate }) => {
  const [category, setCategory] = useState<PropertyCategory>('residential');
  const [bedrooms, setBedrooms] = useState<number>(2);
  const [bathrooms, setBathrooms] = useState<number>(2);
  const [serviceType, setServiceType] = useState<ServiceType>('residential');
  const [commercialSize, setCommercialSize] = useState<string>('2500');
  const [frequency, setFrequency] = useState<CleaningFrequency>('bi-weekly');

  // Calculation formula
  let basePrice = 120;
  let estimatedHours = 2.5;

  if (category === 'residential') {
    basePrice = 90 + bedrooms * 28 + bathrooms * 32;
    estimatedHours = 1.5 + bedrooms * 0.4 + bathrooms * 0.5;

    if (serviceType === 'deep-clean') {
      basePrice *= 1.45;
      estimatedHours *= 1.5;
    } else if (serviceType === 'move-in-out') {
      basePrice *= 1.65;
      estimatedHours *= 1.7;
    }
  } else {
    const sqft = parseInt(commercialSize, 10) || 2500;
    basePrice = 160 + (sqft / 1000) * 45;
    estimatedHours = 2.0 + (sqft / 1000) * 0.6;
  }

  // Frequency discounts
  let discountMultiplier = 1;
  let discountLabel = '';
  if (frequency === 'weekly') {
    discountMultiplier = 0.82;
    discountLabel = '18% recurring discount applied';
  } else if (frequency === 'bi-weekly') {
    discountMultiplier = 0.85;
    discountLabel = '15% recurring discount applied';
  } else if (frequency === 'monthly') {
    discountMultiplier = 0.92;
    discountLabel = '8% recurring discount applied';
  }

  const finalLow = Math.round((basePrice * discountMultiplier * 0.95) / 5) * 5;
  const finalHigh = Math.round((basePrice * discountMultiplier * 1.1) / 5) * 5;
  const crewCount = finalHigh > 260 || estimatedHours > 4 ? 2 : 1;

  const handleApply = () => {
    onApplyEstimate({
      category,
      serviceType: category === 'commercial' ? (serviceType === 'commercial' ? 'commercial' : 'office') : serviceType,
      bedrooms,
      bathrooms,
      frequency,
      squareFootage: category === 'commercial' ? `${commercialSize} sq. ft.` : `${bedrooms * 450 + 600} sq. ft.`
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-teal-700 text-xs font-semibold uppercase tracking-wider mb-1">
            <Calculator className="w-4 h-4" />
            <span>Instant Pricing Transparency</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Estimate Your Cleaning in Seconds
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Adjust your room counts or office size for an upfront ballpark estimate.
          </p>
        </div>

        {/* Category switcher */}
        <div className="flex p-1 bg-slate-100 rounded-lg shrink-0 self-start sm:self-center">
          <button
            type="button"
            onClick={() => {
              setCategory('residential');
              setServiceType('residential');
            }}
            className={`px-4 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              category === 'residential'
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Residential Home
          </button>
          <button
            type="button"
            onClick={() => {
              setCategory('commercial');
              setServiceType('office');
            }}
            className={`px-4 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              category === 'commercial'
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Commercial / Office
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-center">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          {category === 'residential' ? (
            <>
              {/* Service Type Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Cleaning Scope
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'residential', label: 'Standard Upkeep' },
                    { id: 'deep-clean', label: 'Deep Clean' },
                    { id: 'move-in-out', label: 'Move In / Out' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setServiceType(s.id as ServiceType)}
                      className={`py-2.5 px-3 text-xs font-medium rounded-lg border text-center transition-all ${
                        serviceType === s.id
                          ? 'border-teal-600 bg-teal-50/70 text-teal-900 font-semibold ring-1 ring-teal-600'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bedrooms & Bathrooms */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-medium text-slate-700">Bedrooms</label>
                    <span className="text-xs font-bold text-slate-900 tabular-nums">{bedrooms} {bedrooms === 1 ? 'bed' : 'beds'}</span>
                  </div>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBedrooms(b)}
                        className={`flex-1 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                          bedrooms === b
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {b}{b === 5 ? '+' : ''}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-medium text-slate-700">Bathrooms</label>
                    <span className="text-xs font-bold text-slate-900 tabular-nums">{bathrooms} {bathrooms === 1 ? 'bath' : 'baths'}</span>
                  </div>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBathrooms(b)}
                        className={`flex-1 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                          bathrooms === b
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {b}{b === 4 ? '+' : ''}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Commercial Size */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Facility Approximate Size
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { val: '1500', label: '< 1,500 sq ft' },
                    { val: '2500', label: '2,500 sq ft' },
                    { val: '5000', label: '5,000 sq ft' },
                    { val: '10000', label: '10,000+ sq ft' },
                  ].map((item) => (
                    <button
                      key={item.val}
                      type="button"
                      onClick={() => setCommercialSize(item.val)}
                      className={`py-2 px-2.5 text-xs font-medium rounded-lg border text-center transition-all ${
                        commercialSize === item.val
                          ? 'border-teal-600 bg-teal-50/70 text-teal-900 font-semibold ring-1 ring-teal-600'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Commercial Facility Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'office', label: 'Tech / Office Suite' },
                    { id: 'commercial', label: 'Retail / Clinic / Gym' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setServiceType(s.id as ServiceType)}
                      className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-all ${
                        serviceType === s.id
                          ? 'border-teal-600 bg-teal-50/70 text-teal-900 font-semibold ring-1 ring-teal-600'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Frequency */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Frequency Plan
              </label>
              {discountLabel && (
                <span className="text-xs text-teal-700 font-medium">
                  {discountLabel}
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'bi-weekly', label: 'Bi-Weekly', save: 'Save 15%' },
                { id: 'weekly', label: 'Weekly', save: 'Save 18%' },
                { id: 'monthly', label: 'Monthly', save: 'Save 8%' },
                { id: 'one-time', label: 'One-Time', save: 'Standard' },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFrequency(f.id as CleaningFrequency)}
                  className={`py-2 px-2 text-center rounded-lg border transition-all ${
                    frequency === f.id
                      ? 'border-teal-600 bg-teal-50 text-teal-950 font-semibold ring-1 ring-teal-600'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="text-xs font-semibold">{f.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{f.save}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Estimate Output Column */}
        <div className="lg:col-span-5 bg-slate-900 text-white rounded-xl p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800">
              <span>Estimated Investment</span>
              <span className="text-teal-400 font-medium">No Contract Required</span>
            </div>

            <div className="my-5">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight tabular-nums text-white">
                  ${finalLow} – ${finalHigh}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {frequency === 'one-time' ? '/ visit' : `/${frequency.replace('-', ' ')}`}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Estimated duration: ~{estimatedHours.toFixed(1)} hrs with {crewCount} professional cleaner{crewCount > 1 ? 's' : ''}.
              </p>
            </div>

            <div className="space-y-2 py-3 border-t border-slate-800 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>All professional supplies & HEPA equipment included</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>100% Satisfaction Guarantee · Re-clean if not perfect</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>Lock in discounted pricing on your recurring schedule</span>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="button"
              onClick={handleApply}
              className="w-full py-3.5 px-4 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg shadow-sm transition-all duration-150 flex items-center justify-center gap-2 group whitespace-nowrap active:scale-[0.98]"
            >
              <span>Lock In This Estimate & Request Quote</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <p className="text-[11px] text-center text-slate-400 mt-2">
              Free quote · No credit card required to request
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
