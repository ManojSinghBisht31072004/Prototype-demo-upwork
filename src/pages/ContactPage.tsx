import React, { useState, useEffect } from 'react';
import { 
  PageId, 
  QuoteFormData, 
  QuoteSubmissionResult, 
  PropertyCategory, 
  ServiceType, 
  CleaningFrequency 
} from '../types';
import { ADDON_OPTIONS } from '../data/mockData';
import { 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  AlertCircle, 
  FileCheck, 
  ArrowRight, 
  RefreshCw,
  Printer,
  ShieldCheck
} from 'lucide-react';

interface ContactPageProps {
  initialData?: Partial<QuoteFormData>;
  onNavigate: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ 
  initialData,
  onNavigate 
}) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    category: initialData?.category || 'residential',
    serviceType: initialData?.serviceType || 'residential',
    propertyType: initialData?.propertyType || 'Apartment / Condo',
    squareFootage: initialData?.squareFootage || '1,200 sq. ft.',
    bedrooms: initialData?.bedrooms ?? 2,
    bathrooms: initialData?.bathrooms ?? 2,
    serviceAddress: initialData?.serviceAddress || '',
    zipCode: initialData?.zipCode || '',
    desiredDate: initialData?.desiredDate || '',
    frequency: initialData?.frequency || 'bi-weekly',
    addOns: initialData?.addOns || [],
    additionalNotes: initialData?.additionalNotes || '',
  });

  // Keep state synced if initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
      }));
    }
  }, [initialData]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<QuoteSubmissionResult | null>(null);

  // Input change handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for field
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  // Toggle addons
  const handleAddOnToggle = (addonId: string) => {
    setFormData((prev) => {
      const exists = prev.addOns.includes(addonId);
      return {
        ...prev,
        addOns: exists 
          ? prev.addOns.filter((id) => id !== addonId) 
          : [...prev.addOns, addonId],
      };
    });
  };

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Please provide a valid name';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email format (e.g. name@example.com)';
    }

    const phoneClean = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required for quote confirmation';
    } else if (phoneClean.length < 10) {
      newErrors.phone = 'Please provide a valid 10-digit phone number';
    }

    if (!formData.serviceAddress.trim()) {
      newErrors.serviceAddress = 'Service address or neighborhood is required';
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (formData.zipCode.trim().length < 5) {
      newErrors.zipCode = 'Please enter a 5-digit postal/ZIP code';
    }

    if (!formData.desiredDate) {
      newErrors.desiredDate = 'Please select your preferred cleaning date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit (simulate quote calculation and confirmation)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      // Scroll to the first error
      window.scrollTo({ top: 300, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    // Simulate short network processing
    setTimeout(() => {
      // Dynamic estimation algorithm
      let baseLow = 110;
      let baseHigh = 145;
      let hours = 2.5;

      if (formData.category === 'residential') {
        baseLow = 80 + formData.bedrooms * 25 + formData.bathrooms * 30;
        baseHigh = baseLow + 40;
        hours = 1.5 + formData.bedrooms * 0.4 + formData.bathrooms * 0.5;

        if (formData.serviceType === 'deep-clean') {
          baseLow *= 1.45;
          baseHigh *= 1.45;
          hours *= 1.5;
        } else if (formData.serviceType === 'move-in-out') {
          baseLow *= 1.65;
          baseHigh *= 1.65;
          hours *= 1.7;
        }
      } else {
        baseLow = 180;
        baseHigh = 260;
        hours = 3.5;
      }

      // Add addons
      formData.addOns.forEach((addonId) => {
        const item = ADDON_OPTIONS.find((a) => a.id === addonId);
        if (item) {
          baseLow += item.price;
          baseHigh += item.price;
        }
      });

      // Frequency discount
      if (formData.frequency === 'bi-weekly') {
        baseLow *= 0.85;
        baseHigh *= 0.85;
      } else if (formData.frequency === 'weekly') {
        baseLow *= 0.82;
        baseHigh *= 0.82;
      } else if (formData.frequency === 'monthly') {
        baseLow *= 0.92;
        baseHigh *= 0.92;
      }

      const refId = `PSC-${Math.floor(10000 + Math.random() * 90000)}`;

      setSubmissionResult({
        referenceId: refId,
        submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric', year: 'numeric' }),
        data: { ...formData },
        estimatedPriceLow: Math.round(baseLow / 5) * 5,
        estimatedPriceHigh: Math.round(baseHigh / 5) * 5,
        estimatedHours: parseFloat(hours.toFixed(1)),
        recommendedCrewSize: baseHigh > 260 || hours > 4 ? 2 : 1,
      });

      setIsSubmitting(false);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }, 600);
  };

  const handleReset = () => {
    setSubmissionResult(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      category: 'residential',
      serviceType: 'residential',
      propertyType: 'Apartment / Condo',
      squareFootage: '1,200 sq. ft.',
      bedrooms: 2,
      bathrooms: 2,
      serviceAddress: '',
      zipCode: '',
      desiredDate: '',
      frequency: 'bi-weekly',
      addOns: [],
      additionalNotes: '',
    });
    setErrors({});
  };

  // Get min date string for HTML date picker (today)
  const todayDateString = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-16 lg:space-y-20 py-8 sm:py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200/80 px-3 py-1.5 rounded-md mb-4">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>Fast, Transparent Quotes</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Request Your Free Quote
        </h1>
        <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
          Tell us about your home or facility. We will review your space specifications and provide a guaranteed, upfront cleaning estimate.
        </p>

        <div className="mt-5 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200/90 rounded-lg text-xs text-slate-600 max-w-xl mx-auto shadow-xs">
          <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
          <span>
            <strong className="text-slate-900 font-semibold">Guaranteed 2-Hour Response:</strong> Upfront locked-in pricing & confirmed arrival windows with no obligations.
          </span>
        </div>
      </section>

      {/* Main Content: Form or Submission Confirmation */}
      <section className="max-w-7xl mx-auto px-6">
        {submissionResult ? (
          /* SUCCESS CONFIRMATION RECEIPT SCREEN */
          <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-10 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-7 h-7 text-teal-700" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Quote Request Received!
                  </h3>
                  <p className="text-xs text-slate-500">
                    Reference ID: <span className="font-mono font-bold text-slate-800">{submissionResult.referenceId}</span> · Submitted {submissionResult.submittedAt}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 text-teal-800 border border-teal-200 rounded-full text-xs font-semibold">
                  Booking Request Confirmed · Priority Queue
                </span>
              </div>
            </div>

            {/* Estimated Price & Details Breakdown */}
            <div className="my-8 p-6 bg-slate-900 text-white rounded-xl">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    Estimated Pricing Breakdown
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-teal-400 tabular-nums mt-1">
                    ${submissionResult.estimatedPriceLow} – ${submissionResult.estimatedPriceHigh}
                  </div>
                </div>
                <div className="text-xs text-slate-300">
                  Plan: <span className="text-white font-semibold uppercase">{submissionResult.data.frequency.replace('-', ' ')}</span>
                  {submissionResult.data.frequency !== 'one-time' && ' (discount included)'}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 text-xs">
                <div>
                  <span className="text-slate-400 block">Est. Duration</span>
                  <span className="font-semibold text-white">~{submissionResult.estimatedHours} hours</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Assigned Crew</span>
                  <span className="font-semibold text-white">
                    {submissionResult.recommendedCrewSize} Professional Cleaner{submissionResult.recommendedCrewSize > 1 ? 's' : ''}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Requested Date</span>
                  <span className="font-semibold text-white">{submissionResult.data.desiredDate}</span>
                </div>
              </div>
            </div>

            {/* Submitted Summary Details */}
            <div className="space-y-4 mb-8 text-xs text-slate-700 bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
                Submitted Space Specifications
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                <div>
                  <span className="text-slate-400 block">Contact Name:</span>
                  <span className="font-semibold text-slate-800">{submissionResult.data.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Contact Email & Phone:</span>
                  <span className="font-semibold text-slate-800">{submissionResult.data.email} · {submissionResult.data.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Property & Category:</span>
                  <span className="font-semibold text-slate-800">
                    {submissionResult.data.propertyType} ({submissionResult.data.category})
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Service Address:</span>
                  <span className="font-semibold text-slate-800">
                    {submissionResult.data.serviceAddress}, ZIP {submissionResult.data.zipCode}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Service Type:</span>
                  <span className="font-semibold text-slate-800 uppercase">
                    {submissionResult.data.serviceType.replace('-', ' ')}
                  </span>
                </div>
                {submissionResult.data.category === 'residential' && (
                  <div>
                    <span className="text-slate-400 block">Room Counts:</span>
                    <span className="font-semibold text-slate-800">
                      {submissionResult.data.bedrooms} Bedrooms, {submissionResult.data.bathrooms} Bathrooms
                    </span>
                  </div>
                )}
                {submissionResult.data.addOns.length > 0 && (
                  <div className="sm:col-span-2">
                    <span className="text-slate-400 block">Selected Add-on Treatments:</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {submissionResult.data.addOns.map((addonId) => {
                        const match = ADDON_OPTIONS.find((a) => a.id === addonId);
                        return (
                          <span key={addonId} className="px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-800 text-[11px] font-medium">
                            {match?.name || addonId}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
                {submissionResult.data.additionalNotes && (
                  <div className="sm:col-span-2">
                    <span className="text-slate-400 block">Special Instructions / Notes:</span>
                    <p className="text-slate-800 italic mt-0.5">{submissionResult.data.additionalNotes}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Next steps explanation */}
            <div className="space-y-3 p-4 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-900 mb-8">
              <div className="font-bold text-sm text-teal-950 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-teal-700" />
                <span>What Happens Next (Standard Service Workflow):</span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-teal-800 pl-1 leading-relaxed">
                <li>Our dispatch coordinator reviews your space details and assigned route crew within 2 business hours.</li>
                <li>We send you an official booking confirmation with exact arrival window and digital checklist link.</li>
                <li>No credit card is billed until after your cleaning is completed and verified against our 100% satisfaction guarantee.</li>
              </ol>
            </div>

            {/* Action buttons on receipt */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto py-2.5 px-4 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Submit Another Request</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 sm:flex-initial py-2.5 px-4 text-xs font-semibold text-slate-700 border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="flex-1 sm:flex-initial py-2.5 px-5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors"
                >
                  Return to Home
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* QUOTE REQUEST FORM + CONTACT INFO SPLIT */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Form Column */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm">
              <form onSubmit={handleSubmit} noValidate className="space-y-8">
                {/* Step 1: Category & Service Type */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <h3 className="text-base font-bold text-slate-900">
                      1. Select Your Space & Service Type
                    </h3>
                    <span className="text-xs text-slate-400">Step 1 of 4</span>
                  </div>

                  {/* Category switcher */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, category: 'residential', serviceType: 'residential' }))}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        formData.category === 'residential'
                          ? 'border-teal-600 bg-teal-50/70 ring-1 ring-teal-600'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-bold text-sm text-slate-900">Residential Cleaning</div>
                      <div className="text-xs text-slate-500 mt-0.5">Homes, townhouses, and apartments</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, category: 'commercial', serviceType: 'office' }))}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        formData.category === 'commercial'
                          ? 'border-teal-600 bg-teal-50/70 ring-1 ring-teal-600'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-bold text-sm text-slate-900">Commercial & Office</div>
                      <div className="text-xs text-slate-500 mt-0.5">Offices, clinics, storefronts & facilities</div>
                    </button>
                  </div>

                  {/* Service Specific Radio Selection */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Cleaning Package
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {formData.category === 'residential' ? (
                        <>
                          {[
                            { id: 'residential', label: 'Residential Routine', desc: 'Maintenance clean' },
                            { id: 'deep-clean', label: 'Deep Cleaning', desc: 'Top-to-bottom scrub' },
                            { id: 'move-in-out', label: 'Move In / Out', desc: 'Turnover & inspection' },
                          ].map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setFormData((p) => ({ ...p, serviceType: item.id as ServiceType }))}
                              className={`p-3 rounded-lg border text-left transition-all ${
                                formData.serviceType === item.id
                                  ? 'border-teal-600 bg-teal-50 text-teal-950 ring-1 ring-teal-600'
                                  : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              <div className="text-xs font-bold">{item.label}</div>
                              <div className="text-[11px] text-slate-500 mt-0.5">{item.desc}</div>
                            </button>
                          ))}
                        </>
                      ) : (
                        <>
                          {[
                            { id: 'office', label: 'Office Maintenance', desc: 'Regular janitorial' },
                            { id: 'commercial', label: 'Commercial Facility', desc: 'High-traffic spaces' },
                            { id: 'deep-clean', label: 'Commercial Deep Clean', desc: 'Restorative treatment' },
                          ].map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setFormData((p) => ({ ...p, serviceType: item.id as ServiceType }))}
                              className={`p-3 rounded-lg border text-left transition-all ${
                                formData.serviceType === item.id
                                  ? 'border-teal-600 bg-teal-50 text-teal-950 ring-1 ring-teal-600'
                                  : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              <div className="text-xs font-bold">{item.label}</div>
                              <div className="text-[11px] text-slate-500 mt-0.5">{item.desc}</div>
                            </button>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Step 2: Property Specs */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <h3 className="text-base font-bold text-slate-900">
                      2. Space Specifications
                    </h3>
                    <span className="text-xs text-slate-400">Step 2 of 4</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Property Type
                      </label>
                      <select
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600"
                      >
                        {formData.category === 'residential' ? (
                          <>
                            <option value="Apartment / Condo">Apartment / Condo</option>
                            <option value="Single Family Home">Single Family Home</option>
                            <option value="Townhouse">Townhouse</option>
                            <option value="Studio">Studio</option>
                          </>
                        ) : (
                          <>
                            <option value="Corporate Office Suite">Corporate Office Suite</option>
                            <option value="Creative Agency / Studio">Creative Agency / Studio</option>
                            <option value="Medical Clinic / Practice">Medical Clinic / Practice</option>
                            <option value="Retail Storefront">Retail Storefront</option>
                            <option value="Gym / Fitness Center">Gym / Fitness Center</option>
                          </>
                        )}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Approximate Size
                      </label>
                      <input
                        type="text"
                        name="squareFootage"
                        value={formData.squareFootage}
                        onChange={handleChange}
                        placeholder="e.g. 1,400 sq. ft."
                        className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600"
                      />
                    </div>
                  </div>

                  {formData.category === 'residential' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Bedrooms
                        </label>
                        <select
                          name="bedrooms"
                          value={formData.bedrooms}
                          onChange={(e) => setFormData((p) => ({ ...p, bedrooms: parseInt(e.target.value, 10) }))}
                          className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600"
                        >
                          {[1, 2, 3, 4, 5, 6].map((b) => (
                            <option key={b} value={b}>{b} {b === 1 ? 'Bedroom' : 'Bedrooms'}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Bathrooms
                        </label>
                        <select
                          name="bathrooms"
                          value={formData.bathrooms}
                          onChange={(e) => setFormData((p) => ({ ...p, bathrooms: parseInt(e.target.value, 10) }))}
                          className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600"
                        >
                          {[1, 2, 3, 4, 5].map((b) => (
                            <option key={b} value={b}>{b} {b === 1 ? 'Bathroom' : 'Bathrooms'}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Frequency selection */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Cleaning Frequency
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'bi-weekly', label: 'Bi-Weekly', note: 'Save 15%' },
                        { id: 'weekly', label: 'Weekly', note: 'Save 18%' },
                        { id: 'monthly', label: 'Monthly', note: 'Save 8%' },
                        { id: 'one-time', label: 'One-Time', note: 'Standard' },
                      ].map((f) => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setFormData((p) => ({ ...p, frequency: f.id as CleaningFrequency }))}
                          className={`p-2.5 text-center rounded-lg border transition-all ${
                            formData.frequency === f.id
                              ? 'border-teal-600 bg-teal-50 text-teal-950 font-semibold ring-1 ring-teal-600'
                              : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <div className="text-xs font-bold">{f.label}</div>
                          <div className="text-[10px] text-teal-700 mt-0.5">{f.note}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Optional add-ons */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Optional Add-On Requests
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {ADDON_OPTIONS.map((addon) => {
                        const isChecked = formData.addOns.includes(addon.id);
                        return (
                          <label
                            key={addon.id}
                            className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer text-xs transition-colors ${
                              isChecked ? 'border-teal-600 bg-teal-50/50 text-slate-900' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleAddOnToggle(addon.id)}
                                className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
                              />
                              <span>{addon.name}</span>
                            </div>
                            <span className="font-semibold text-slate-900 tabular-nums">+${addon.price}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Step 3: Location & Timing */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <h3 className="text-base font-bold text-slate-900">
                      3. Service Address & Schedule
                    </h3>
                    <span className="text-xs text-slate-400">Step 3 of 4</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Street Address or Neighborhood <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="serviceAddress"
                        value={formData.serviceAddress}
                        onChange={handleChange}
                        placeholder="e.g. 742 Evergreen Terrace, Apt 4B"
                        className={`w-full bg-white border rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 ${
                          errors.serviceAddress 
                            ? 'border-rose-400 focus:ring-rose-400' 
                            : 'border-slate-300 focus:ring-teal-600'
                        }`}
                      />
                      {errors.serviceAddress && (
                        <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.serviceAddress}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        ZIP / Postal Code <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        maxLength={5}
                        value={formData.zipCode}
                        onChange={handleChange}
                        placeholder="e.g. 98101"
                        className={`w-full bg-white border rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 ${
                          errors.zipCode 
                            ? 'border-rose-400 focus:ring-rose-400' 
                            : 'border-slate-300 focus:ring-teal-600'
                        }`}
                      />
                      {errors.zipCode && (
                        <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.zipCode}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Desired Service Date <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="desiredDate"
                      min={todayDateString}
                      value={formData.desiredDate}
                      onChange={handleChange}
                      className={`w-full sm:w-64 bg-white border rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 ${
                        errors.desiredDate 
                          ? 'border-rose-400 focus:ring-rose-400' 
                          : 'border-slate-300 focus:ring-teal-600'
                      }`}
                    />
                    {errors.desiredDate && (
                      <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.desiredDate}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Step 4: Contact Details */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <h3 className="text-base font-bold text-slate-900">
                      4. Your Contact Details
                    </h3>
                    <span className="text-xs text-slate-400">Step 4 of 4</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Jane Doe"
                        className={`w-full bg-white border rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 ${
                          errors.name 
                            ? 'border-rose-400 focus:ring-rose-400' 
                            : 'border-slate-300 focus:ring-teal-600'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jane@example.com"
                        className={`w-full bg-white border rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 ${
                          errors.email 
                            ? 'border-rose-400 focus:ring-rose-400' 
                            : 'border-slate-300 focus:ring-teal-600'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 000-0000"
                        className={`w-full bg-white border rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 ${
                          errors.phone 
                            ? 'border-rose-400 focus:ring-rose-400' 
                            : 'border-slate-300 focus:ring-teal-600'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Additional Requirements / Access Instructions (Optional)
                    </label>
                    <textarea
                      name="additionalNotes"
                      rows={3}
                      value={formData.additionalNotes}
                      onChange={handleChange}
                      placeholder="e.g. Friendly dog in the backyard, key in front lockbox code #4012, please pay special attention to master bath glass shower..."
                      className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>No upfront payment required · 100% Satisfaction Guarantee</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto py-3.5 px-8 text-sm font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-sm transition-all duration-150 flex items-center justify-center gap-2 group whitespace-nowrap active:scale-[0.98] disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Processing Quote Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Free Quote Request</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Sidebar Contact Info Column */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 space-y-6">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-teal-400 mb-1">
                    Direct Contact
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">
                    Prefer To Speak With Our Dispatch Team?
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Have questions regarding custom commercial scopes, specialized surface cleaning, or immediate same-day emergency dispatch?
                  </p>
                </div>

                <div className="space-y-4 pt-2 text-xs text-slate-200">
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[11px] text-slate-400">Phone Support</div>
                      <a href="tel:5557827362" className="text-sm font-bold text-white hover:text-teal-300 transition-colors">
                        (555) 782-7362
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[11px] text-slate-400">Direct Email</div>
                      <a href="mailto:quotes@purespace.example" className="text-white hover:text-teal-300 transition-colors">
                        quotes@purespace.example
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[11px] text-slate-400">Operations Hub</div>
                      <span className="text-white">400 Pinecrest Blvd, Suite 210<br />Metro Valley, WA 98101</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[11px] text-slate-400">Service Hours</div>
                      <span className="text-white">Monday – Friday: 7:00 AM – 7:00 PM<br />Saturday: 8:00 AM – 5:00 PM</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400">
                  * All customer service responses are provided by our in-house dispatch coordination team.
                </div>
              </div>

              {/* Trust Callout */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3 text-xs text-slate-600">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <ShieldCheck className="w-5 h-5 text-teal-600" />
                  <span>The PureSpace Guarantee</span>
                </div>
                <p className="leading-relaxed">
                  Your quote is locked in with zero surprise charges. If you are ever not 100% satisfied with any area, our team will return within 24 hours to re-clean it free of charge.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
