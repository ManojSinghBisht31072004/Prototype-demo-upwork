import React from 'react';
import { PageId } from '../types';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { 
  Sparkles, 
  ShieldCheck, 
  Users, 
  CheckCircle2, 
  HeartHandshake, 
  Leaf, 
  Clock, 
  ArrowRight,
  ClipboardList
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-20 lg:space-y-24 py-8 sm:py-12">
      {/* 1. Header & Intro */}
      <section className="max-w-7xl mx-auto px-6 text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200/80 px-3 py-1.5 rounded-md mb-4">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>About PureSpace Cleaning Co.</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          A Fresh Standard in Professional Cleanliness
        </h1>
        <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
          PureSpace was designed around a simple belief: clean spaces foster mental clarity, calmer homes, and more productive workplaces. We combine meticulous hygiene protocols with friendly, dependable service.
        </p>

        <div className="mt-6 inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200/90 rounded-lg text-xs text-slate-600 max-w-xl mx-auto shadow-xs">
          <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
          <span>Licensed, Bonded & Insured Staff · Strict 45-Point Room Hygiene Standard</span>
        </div>
      </section>

      {/* 2. Team Photo & Story Split */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 relative">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
              <ImageWithFallback
                src="/src/assets/images/about_team_1793208465258.jpg"
                alt="The PureSpace professional cleaning team"
                className="w-full h-[380px] sm:h-[460px] object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 hidden sm:block bg-slate-900 text-white p-4 rounded-xl shadow-lg border border-slate-800 max-w-xs text-xs">
              <div className="font-bold text-teal-400 mb-0.5">Uniformed & Trained Cleaners</div>
              <div className="text-slate-300">Every team member completes extensive checklist training before visiting client spaces.</div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-teal-700 mb-1">
                Our Foundation
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Meticulous Attention to Every Detail
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We know welcoming cleaners into your home or commercial office requires complete trust. That is why we emphasize clear communication, predictable arrival windows, and consistent team assignments.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 shrink-0 mt-0.5">
                  <ClipboardList className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">45-Point Verified Checklist</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    No guesswork. Our cleaners follow strict room-by-room hygiene guidelines and sign off on completion before departure.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 shrink-0 mt-0.5">
                  <Leaf className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Responsible, Non-Toxic Supplies</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    We select effective, low-odor, pH-balanced formulas that sanitize thoroughly without harsh fumes or residues.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 shrink-0 mt-0.5">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Dedicated Client Support</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Need to reschedule, add an oven clean, or provide access instructions? Our dispatch team responds quickly via phone or message.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Four Core Pillars / Why Choose PureSpace */}
      <section className="bg-slate-50 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs font-semibold uppercase tracking-wider text-teal-700 mb-1">
              The PureSpace Difference
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Why Clients Choose PureSpace
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Built from the ground up for homeowners, tenants, and business operators who value consistency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-700">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">100% Satisfaction</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                If any area does not meet your expectations, let us know within 24 hours and we will re-clean it free of charge.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-700">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Reliable Arrival Windows</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We respect your schedule with 60-minute arrival windows and automated ETA notifications when the team is on the way.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-700">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Consistent Cleaners</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                For recurring services, we pair you with the same cleaning team whenever possible so they learn your home's unique preferences.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-700">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Transparent Quotes</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Upfront estimates with clear itemization. No surprise surcharges or hidden travel fees tacked onto your invoice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Standards Checklist Walkthrough */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-teal-700">
                Service Standards
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Our 5 Commitment Checkpoints
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Every team member is trained to adhere to these core operating standards across residential and commercial accounts.
              </p>
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 py-3 px-5 rounded-lg transition-colors"
              >
                <span>Request Your Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="font-bold text-slate-900 text-sm mb-1">01. Cross-Contamination Guard</div>
                <p className="text-slate-600">Color-coded microfiber towels and mop pads prevent bacteria transfer between bathrooms and kitchens.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="font-bold text-slate-900 text-sm mb-1">02. HEPA Air Filtration</div>
                <p className="text-slate-600">Commercial vacuums capture 99.97% of dust mites, pollen, and pet dander rather than recirculating them.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="font-bold text-slate-900 text-sm mb-1">03. Surface Safety Awareness</div>
                <p className="text-slate-600">Specially formulated non-abrasive cleaners protect natural stone, marble, hardwood, and stainless steel.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="font-bold text-slate-900 text-sm mb-1">04. Secure Key & Access Handling</div>
                <p className="text-slate-600">Strict lockbox and digital alarm protocols ensure your property remains safe and secure at all times.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
