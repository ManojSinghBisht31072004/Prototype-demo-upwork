import React, { useState } from 'react';
import { PageId, ServiceType, PropertyCategory } from '../types';
import { SERVICES_DATA, FAQ_ITEMS } from '../data/mockData';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Sparkles, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  ShieldCheck
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageId) => void;
  onSelectServiceForQuote: (serviceType: ServiceType) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  onSelectServiceForQuote,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'residential' | 'commercial'>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const filteredServices = SERVICES_DATA.filter((s) => {
    if (activeFilter === 'all') return true;
    return s.category === activeFilter;
  });

  return (
    <div className="space-y-20 lg:space-y-24 py-8 sm:py-12">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-6 text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200/80 px-3 py-1.5 rounded-md mb-4">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>Tailored Hygiene Standards</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Professional Cleaning Services
        </h1>
        <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
          Explore our complete range of residential and commercial cleaning packages. Every service is backed by our 100% satisfaction guarantee, transparent pricing, and vetted technicians.
        </p>

        {/* Category filter tabs */}
        <div className="mt-8 inline-flex p-1 bg-slate-100 rounded-lg">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 text-xs font-medium rounded-md transition-all ${
              activeFilter === 'all'
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Services (5)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('residential')}
            className={`px-4 py-2 text-xs font-medium rounded-md transition-all ${
              activeFilter === 'residential'
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Residential
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('commercial')}
            className={`px-4 py-2 text-xs font-medium rounded-md transition-all ${
              activeFilter === 'commercial'
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Commercial & Office
          </button>
        </div>
      </section>

      {/* Services List - Detailed alternating sections */}
      <section className="max-w-7xl mx-auto px-6 space-y-16">
        {filteredServices.map((service, index) => {
          const isEven = index % 2 === 1;
          return (
            <div
              key={service.id}
              id={service.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm p-6 sm:p-10 transition-shadow hover:shadow-md"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                {/* Visual Column */}
                <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                    <ImageWithFallback
                      src={service.image}
                      alt={service.title}
                      className="w-full h-[280px] sm:h-[360px] object-cover"
                    />
                  </div>
                  
                  {/* Quick specs pill bar */}
                  <div className="mt-4 grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200/80">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Typical Duration</span>
                      <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-teal-600" />
                        {service.typicalDuration}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Pricing Guide</span>
                      <span className="font-semibold text-teal-800 mt-0.5 block">
                        Starts at {service.startingPrice}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div className={`lg:col-span-7 space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 uppercase tracking-wider mb-2">
                      <span>{service.category === 'residential' ? 'Residential Care' : 'Commercial Facility'}</span>
                      <span className="text-slate-300">·</span>
                      <span>Service {index + 1} of {filteredServices.length}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      {service.title}
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>

                  {/* Ideal for note */}
                  <div className="p-3.5 bg-slate-50 border-l-2 border-teal-600 rounded-r-lg text-xs text-slate-700">
                    <span className="font-bold text-slate-900">Recommended for:</span> {service.idealFor}
                  </div>

                  {/* Key Benefits */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                      Key Highlights & Benefits
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {service.keyBenefits.map((benefit, bIndex) => (
                        <div key={bIndex} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Detailed Checklist Preview */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                      Included In Every Visit
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                      {service.checklist.map((item, cIndex) => (
                        <li key={cIndex} className="flex items-start gap-2">
                          <span className="text-teal-600 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action row */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onSelectServiceForQuote(service.id)}
                      className="py-3 px-6 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-sm transition-all duration-150 flex items-center justify-center gap-2 group whitespace-nowrap active:scale-[0.98]"
                    >
                      <span>Request a Quote for {service.title}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate('contact')}
                      className="py-3 px-4 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-200 rounded-lg transition-colors text-center"
                    >
                      Ask a Question
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Comparison Matrix Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10">
          <div className="max-w-2xl mb-8">
            <div className="text-xs font-semibold uppercase tracking-wider text-teal-700 mb-1">
              Transparent Scope
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Service Comparison At A Glance
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Compare what is included across our popular service tiers to pick the exact level of care your home needs.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-300 text-slate-900 font-bold">
                  <th className="py-3 px-4">Cleaning Task</th>
                  <th className="py-3 px-4 text-center">Residential Standard</th>
                  <th className="py-3 px-4 text-center bg-teal-50/50 text-teal-900">Deep Cleaning</th>
                  <th className="py-3 px-4 text-center">Move-In / Out</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {[
                  { task: 'Kitchen counter & stove exterior cleaning', standard: true, deep: true, move: true },
                  { task: 'Bathroom tile, shower & mirror sanitization', standard: true, deep: true, move: true },
                  { task: 'Floors vacuumed and sanitized mop', standard: true, deep: true, move: true },
                  { task: 'Baseboards, vents & door frames hand-wiped', standard: false, deep: true, move: true },
                  { task: 'Heavy limescale & tile grout scrubbing', standard: false, deep: true, move: true },
                  { task: 'Inside oven & refrigerator detailed scrub', standard: false, deep: false, move: true },
                  { task: 'Inside all empty cabinets and drawers', standard: false, deep: false, move: true },
                  { task: 'Window sill tracks and closet shelves wiped', standard: false, deep: false, move: true },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-100/50 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-800">{row.task}</td>
                    <td className="py-3 px-4 text-center">
                      {row.standard ? (
                        <CheckCircle2 className="w-4 h-4 text-teal-600 mx-auto" />
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center bg-teal-50/30">
                      {row.deep ? (
                        <CheckCircle2 className="w-4 h-4 text-teal-600 mx-auto" />
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {row.move ? (
                        <CheckCircle2 className="w-4 h-4 text-teal-600 mx-auto" />
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 uppercase tracking-wider mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>Got Questions?</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:text-teal-700 transition-colors"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-teal-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-teal-700 text-white rounded-2xl p-8 sm:p-12 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Not Sure Which Package Suits Your Space?
          </h3>
          <p className="text-teal-100 text-sm max-w-xl mx-auto mb-6">
            Share your space requirements and our team will recommend the optimal scope with an exact, non-binding quote.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="py-3 px-6 text-xs font-bold text-teal-950 bg-white hover:bg-teal-50 rounded-lg shadow transition-colors"
          >
            Get Custom Recommendation & Quote
          </button>
        </div>
      </section>
    </div>
  );
};
