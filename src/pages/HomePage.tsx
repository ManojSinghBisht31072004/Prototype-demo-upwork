import React from 'react';
import { PageId, ServiceType, PropertyCategory, CleaningFrequency } from '../types';
import { SERVICES_DATA, TESTIMONIALS_DATA } from '../data/mockData';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { QuickEstimator } from '../components/QuickEstimator';
import { 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Users, 
  Star, 
  ChevronRight,
  MapPin,
  ClipboardCheck,
  CalendarCheck
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onSelectServiceForQuote: (serviceType: ServiceType) => void;
  onApplyEstimatorData: (data: {
    category: PropertyCategory;
    serviceType: ServiceType;
    bedrooms: number;
    bathrooms: number;
    frequency: CleaningFrequency;
    squareFootage: string;
  }) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectServiceForQuote,
  onApplyEstimatorData,
}) => {
  return (
    <div className="space-y-20 lg:space-y-28">
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-12 pb-8 sm:pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-50/90 border border-teal-200/80 px-3 py-1.5 rounded-md">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>Professional Residential & Commercial Cleaning</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] text-balance">
                Spotless Spaces. <br className="hidden sm:inline" />
                <span className="text-teal-700">Dependable Care.</span> Zero Hassle.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                From routine apartment housekeeping to corporate facility maintenance, PureSpace delivers hospital-grade hygiene, transparent pricing, and trusted technicians you can welcome with total confidence.
              </p>

              {/* Action buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="py-3.5 px-6 text-sm font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-sm transition-all duration-150 flex items-center justify-center gap-2 group whitespace-nowrap active:scale-[0.98]"
                >
                  <span>Request a Free Quote</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="py-3.5 px-6 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors whitespace-nowrap text-center"
                >
                  Explore Our Services
                </button>
              </div>

              {/* Trust highlights checklist */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>100% Satisfaction Re-Clean Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Vetted, Background-Checked Cleaners</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Eco-Friendly & Pet-Safe Options Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Prompt 2-Hour Quote Response Windows</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100">
                <ImageWithFallback
                  src="/images/hero_cleaning_1793208461954.jpg"
                  alt="Professional PureSpace cleaner sanitizing a contemporary bright living room"
                  className="w-full h-[380px] sm:h-[460px] object-cover"
                />
                
                {/* Floating trust badge at bottom of image */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3.5 border border-slate-200 shadow-md flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-700">
                      <Star className="w-5 h-5 fill-teal-600 text-teal-600" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">4.9 / 5.0 Client Rating</div>
                      <div className="text-[11px] text-slate-500">Over 2,400+ cleanings completed</div>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-0.5 whitespace-nowrap"
                  >
                    <span>Get Quote</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS & PROOF STRIP (Full-width row) */}
      <section className="bg-slate-50 border-y border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-1">
              <div className="text-3xl font-extrabold text-slate-900 tabular-nums">2,400+</div>
              <div className="text-xs font-medium text-slate-500">Homes & Offices Cleaned</div>
              <div className="text-[11px] text-slate-400">Metro Valley & Suburbs</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-extrabold text-teal-700 tabular-nums">4.9 / 5</div>
              <div className="text-xs font-medium text-slate-500">Average Client Rating</div>
              <div className="text-[11px] text-slate-400">Verified Client Reviews</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-extrabold text-slate-900 tabular-nums">100%</div>
              <div className="text-xs font-medium text-slate-500">Satisfaction Guaranteed</div>
              <div className="text-[11px] text-slate-400">Free re-clean within 24 hours</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-extrabold text-teal-700 tabular-nums">45-Point</div>
              <div className="text-xs font-medium text-slate-500">Hygiene Checklist</div>
              <div className="text-[11px] text-slate-400">Room-by-room audit</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. RESIDENTIAL & COMMERCIAL SERVICES CARDS */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-teal-700 mb-2">
              Comprehensive Cleaning Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Tailored Services for Every Space
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl">
              Whether you need routine home housekeeping or scheduled after-hours commercial sanitation, our trained staff delivers spotless consistency.
            </p>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-900 whitespace-nowrap self-start md:self-end"
          >
            <span>View All Service Checklists</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Bento grid layout for services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.slice(0, 3).map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <ImageWithFallback
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-semibold uppercase tracking-wider text-teal-700">
                      {service.category === 'residential' ? 'Residential' : 'Commercial'}
                    </span>
                    <span className="font-medium text-slate-700">Starts at {service.startingPrice}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {service.shortDescription}
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {service.keyBenefits.slice(0, 2).map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => onSelectServiceForQuote(service.id)}
                  className="py-2.5 px-4 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap"
                >
                  Request a Quote
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Learn More →
                </button>
              </div>
            </div>
          ))}

          {/* Commercial 2-column feature card */}
          <div className="md:col-span-2 lg:col-span-3 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl overflow-hidden p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-teal-400">
                Commercial & Facility Maintenance
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Corporate Offices, Clinics & Commercial Facilities
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                We handle regular evening or weekend janitorial services for tech studios, law firms, clinics, and retail storefronts. Includes digital checklists, dedicated account lead, and hospital-grade surface sanitization.
              </p>
              <div className="flex flex-wrap gap-4 text-xs text-slate-300 pt-2">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  <span>After-hours & Weekend Scheduling</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  <span>Electronics & Tech-Safe Protocols</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  <span>Net-30 Monthly Corporate Billing</span>
                </div>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onSelectServiceForQuote('office')}
                  className="py-3 px-5 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg shadow-sm transition-all whitespace-nowrap"
                >
                  Request Commercial Proposal
                </button>
              </div>
            </div>
            <div className="lg:col-span-5">
              <ImageWithFallback
                src="/images/service_office_commercial_1793208465058.jpg"
                alt="Spotless corporate office cleaned by PureSpace"
                className="w-full h-56 sm:h-64 rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. THREE-STEP PROCESS */}
      <section className="bg-slate-50/80 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs font-semibold uppercase tracking-wider text-teal-700 mb-2">
              Simple & Reliable Booking
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              A Seamless Three-Step Experience
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Getting your home or office professionally cleaned should never feel complicated.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-white p-7 rounded-xl border border-slate-200 shadow-sm relative">
              <div className="w-12 h-12 rounded-lg bg-teal-50 border border-teal-100 text-teal-700 flex items-center justify-center font-extrabold text-lg mb-5">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Request a Free Quote
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Tell us about your space, square footage, and preferred service frequency through our 60-second online quote form.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-7 rounded-xl border border-slate-200 shadow-sm relative">
              <div className="w-12 h-12 rounded-lg bg-teal-50 border border-teal-100 text-teal-700 flex items-center justify-center font-extrabold text-lg mb-5">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Choose Your Service
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Review your upfront transparent pricing, pick convenient arrival windows, and select your tailored 45-point checklist options.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-7 rounded-xl border border-slate-200 shadow-sm relative">
              <div className="w-12 h-12 rounded-lg bg-teal-50 border border-teal-100 text-teal-700 flex items-center justify-center font-extrabold text-lg mb-5">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Enjoy a Cleaner Space
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our uniform-wearing, vetted cleaning technicians arrive on time with all commercial gear and restore your space to spotless clarity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE QUICK ESTIMATOR */}
      <section className="max-w-7xl mx-auto px-6">
        <QuickEstimator onApplyEstimate={onApplyEstimatorData} />
      </section>

      {/* 6. CUSTOMER TESTIMONIALS (Clearly Identified Sample Content) */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-teal-700 mb-1">
              Real Impact & Client Stories
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              What Our Clients Say
            </h2>
          </div>
          <div className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Verified Client Ratings · Metro Valley & Surrounding Areas</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 sm:p-7 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 italic leading-relaxed mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="text-sm font-bold text-slate-900">{t.clientName}</div>
                <div className="text-xs text-slate-500">{t.clientRole}</div>
                <div className="text-[11px] text-teal-700 font-medium mt-1">
                  {t.serviceUsed}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. SERVICE AREA PREVIEW */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 bg-teal-100/60 px-2.5 py-1 rounded">
              <MapPin className="w-3.5 h-3.5 text-teal-700" />
              <span>Route Coverage</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Serving Greater Metro Valley, Oakridge, and Surrounding Areas
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              We operate daily mobile cleaning crews across the urban core and residential suburbs. Check your ZIP code to verify availability or see typical dispatch response times.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('service-areas')}
              className="py-3 px-5 text-xs font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap"
            >
              View All 6 Service Zones
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="py-3 px-5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-sm transition-colors whitespace-nowrap"
            >
              Check My ZIP Code
            </button>
          </div>
        </div>
      </section>

      {/* 8. FINAL QUOTE-REQUEST CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-6">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-14 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready for an Effortlessly Spotless Space?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Submit your space details today for an upfront, transparent estimate. No obligations, no hidden fees, and zero hassle.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto py-3.5 px-8 text-sm font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg shadow-sm transition-all whitespace-nowrap"
              >
                Request a Free Quote
              </button>
              <a
                href="tel:5557827362"
                className="w-full sm:w-auto py-3.5 px-8 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
              >
                Call (555) 782-7362
              </a>
            </div>
            <p className="text-xs text-slate-400">
              Quotes typically answered within 2 hours during normal business hours.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
