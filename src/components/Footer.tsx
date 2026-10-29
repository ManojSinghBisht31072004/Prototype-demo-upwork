import React from 'react';
import { PageId } from '../types';
import { Sparkles, Phone, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold tracking-tight">PureSpace Cleaning Co.</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Dependable, premium residential and commercial cleaning with meticulous room-by-room hygiene standards. Fully vetted teams and spotless results guaranteed.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>100% Satisfaction Guarantee on Every Cleaning</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition-colors text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Cleaning Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors text-left"
                >
                  About PureSpace
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('service-areas')}
                  className="hover:text-white transition-colors text-left"
                >
                  Service Areas
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors text-left font-medium text-teal-400"
                >
                  Request a Free Quote
                </button>
              </li>
            </ul>
          </div>

          {/* Cleaning Services */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-slate-200 transition-colors text-left">
                  Residential Housekeeping
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-slate-200 transition-colors text-left">
                  Seasonal Deep Cleaning
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-slate-200 transition-colors text-left">
                  Move-In / Move-Out Turnover
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-slate-200 transition-colors text-left">
                  Commercial Office Janitorial
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-slate-200 transition-colors text-left">
                  Facility Disinfection
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Contact & Hours
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>400 Pinecrest Blvd, Suite 210<br />Metro Valley, WA 98101</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href="tel:5557827362" className="hover:text-white transition-colors">
                  (555) 782-7362
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a href="mailto:hello@purespacecleaning.example" className="hover:text-white transition-colors">
                  quotes@purespace.example
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>Mon–Fri: 7:00 AM – 7:00 PM<br />Sat: 8:00 AM – 5:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Quiet divider */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>© {new Date().getFullYear()} PureSpace Cleaning Co. All rights reserved.</span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span>Residential & Commercial Facility Services</span>
          </div>
          <div className="text-slate-400 text-center md:text-right max-w-xl text-xs leading-relaxed">
            Licensed, Bonded & Insured Professional Cleaning Services. Backed by our 100% PureSpace Clean Guarantee on all residential & commercial visits.
          </div>
        </div>
      </div>
    </footer>
  );
};
