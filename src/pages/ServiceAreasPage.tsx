import React, { useState } from 'react';
import { PageId } from '../types';
import { SERVICE_AREAS_DATA } from '../data/mockData';
import { 
  MapPin, 
  Search, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Building2, 
  Home, 
  Sparkles,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

interface ServiceAreasPageProps {
  onNavigate: (page: PageId) => void;
  onSelectZipCode?: (zip: string) => void;
}

export const ServiceAreasPage: React.FC<ServiceAreasPageProps> = ({ 
  onNavigate,
  onSelectZipCode
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [zipCheckInput, setZipCheckInput] = useState('');
  const [zipCheckResult, setZipCheckResult] = useState<{
    status: 'idle' | 'matched' | 'not-found';
    matchedZone?: string;
    zip?: string;
  }>({ status: 'idle' });

  // Filter service areas by search query
  const filteredAreas = SERVICE_AREAS_DATA.filter((area) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      area.name.toLowerCase().includes(q) ||
      area.countyOrZone.toLowerCase().includes(q) ||
      area.zipCodes.some((zip) => zip.includes(q)) ||
      area.neighborhoodHighlights.some((h) => h.toLowerCase().includes(q))
    );
  });

  const handleZipCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanZip = zipCheckInput.trim();
    if (!cleanZip) return;

    const match = SERVICE_AREAS_DATA.find((area) => area.zipCodes.includes(cleanZip));
    if (match) {
      setZipCheckResult({
        status: 'matched',
        matchedZone: match.name,
        zip: cleanZip,
      });
    } else {
      setZipCheckResult({
        status: 'not-found',
        zip: cleanZip,
      });
    }
  };

  const handleBookInZip = (zip: string) => {
    if (onSelectZipCode) {
      onSelectZipCode(zip);
    }
    onNavigate('contact');
  };

  return (
    <div className="space-y-16 lg:space-y-20 py-8 sm:py-12">
      {/* 1. Header */}
      <section className="max-w-7xl mx-auto px-6 text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200/80 px-3 py-1.5 rounded-md mb-4">
          <MapPin className="w-3.5 h-3.5 text-teal-600" />
          <span>Regional Service Coverage</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Where We Clean
        </h1>
        <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
          PureSpace mobile crews serve residential homes, townhouses, and commercial facilities throughout Metro Valley and neighboring zones.
        </p>

        <div className="mt-5 inline-flex items-center gap-2 text-xs text-slate-600 bg-slate-50 border border-slate-200/90 py-2 px-4 rounded-lg shadow-xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
          <span>Active daily mobile routes with guaranteed 24–48h booking availability</span>
        </div>
      </section>

      {/* 2. Interactive ZIP Code Coverage Checker */}
      <section className="max-w-4xl mx-auto px-6">
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-6">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              Check Service Availability For Your Address
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Enter your 5-digit ZIP code to confirm dispatch routes and response times.
            </p>
          </div>

          <form onSubmit={handleZipCheck} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <input
                type="text"
                maxLength={5}
                value={zipCheckInput}
                onChange={(e) => setZipCheckInput(e.target.value.replace(/\D/g, ''))}
                placeholder="e.g. 98101 or 98052"
                className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-400 text-sm rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
            <button
              type="submit"
              className="py-3 px-6 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg shadow transition-colors whitespace-nowrap"
            >
              Check Availability
            </button>
          </form>

          {/* Sample quick ZIP buttons */}
          <div className="text-center mt-3 text-xs text-slate-400">
            <span>Try sample ZIPs: </span>
            {['98101', '98112', '98052', '98134'].map((sample) => (
              <button
                key={sample}
                type="button"
                onClick={() => {
                  setZipCheckInput(sample);
                  const match = SERVICE_AREAS_DATA.find((area) => area.zipCodes.includes(sample));
                  setZipCheckResult({
                    status: match ? 'matched' : 'not-found',
                    matchedZone: match?.name,
                    zip: sample,
                  });
                }}
                className="text-teal-400 hover:underline mx-1 font-mono"
              >
                {sample}
              </button>
            ))}
          </div>

          {/* Result state */}
          {zipCheckResult.status === 'matched' && (
            <div className="mt-6 p-4 bg-teal-950/60 border border-teal-500/40 rounded-xl text-center text-xs animate-in fade-in duration-150">
              <div className="flex items-center justify-center gap-1.5 text-teal-300 font-bold text-sm mb-1">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>Great news! ZIP {zipCheckResult.zip} is in our active daily coverage.</span>
              </div>
              <p className="text-slate-300">
                Service Zone: <span className="font-semibold text-white">{zipCheckResult.matchedZone}</span>. Crews are dispatched daily with 24–48h notice.
              </p>
              <button
                type="button"
                onClick={() => handleBookInZip(zipCheckResult.zip || '')}
                className="mt-3 inline-flex items-center gap-1.5 py-2 px-4 rounded-md bg-teal-400 text-slate-950 font-bold hover:bg-teal-300 transition-colors"
              >
                <span>Request a Quote for {zipCheckResult.zip}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {zipCheckResult.status === 'not-found' && (
            <div className="mt-6 p-4 bg-slate-800/80 border border-slate-700 rounded-xl text-center text-xs animate-in fade-in duration-150">
              <div className="flex items-center justify-center gap-1.5 text-amber-300 font-bold text-sm mb-1">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <span>ZIP {zipCheckResult.zip} is outside our standard daily route.</span>
              </div>
              <p className="text-slate-300 max-w-lg mx-auto">
                However, we frequently accommodate nearby addresses and commercial special routes! Contact our team to check if our mobile crews can service your street.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="mt-3 inline-flex items-center gap-1.5 py-2 px-4 rounded-md bg-white text-slate-900 font-bold hover:bg-slate-100 transition-colors"
              >
                <span>Ask About Custom Route</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 3. Search and Zone Grid */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Active Coverage Zones ({filteredAreas.length})
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Browse primary service neighborhoods and typical dispatch times.
            </p>
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by zone or ZIP..."
              className="w-full bg-white border border-slate-300 rounded-lg py-2 pl-9 pr-3 text-xs focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>
        </div>

        {/* Zones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAreas.map((area) => (
            <div
              key={area.id}
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-semibold text-teal-700">{area.countyOrZone}</span>
                  <span className="text-[11px] flex items-center gap-1 text-slate-500">
                    <Clock className="w-3 h-3 text-teal-600" />
                    {area.typicalLeadTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-3">{area.name}</h3>

                {/* Availability badges */}
                <div className="flex flex-wrap gap-2 text-xs mb-4">
                  {area.residentialAvailable && (
                    <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium">
                      <Home className="w-3 h-3 text-teal-600" />
                      Residential
                    </span>
                  )}
                  {area.commercialAvailable && (
                    <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium">
                      <Building2 className="w-3 h-3 text-teal-600" />
                      Commercial & Office
                    </span>
                  )}
                </div>

                {/* ZIP Codes */}
                <div className="mb-4">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Primary ZIP Codes Covered
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {area.zipCodes.map((z) => (
                      <span
                        key={z}
                        className="font-mono text-xs bg-slate-50 border border-slate-200 px-2 py-0.5 rounded text-slate-800"
                      >
                        {z}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Key Neighborhoods
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1">
                    {area.neighborhoodHighlights.map((nh, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0" />
                        <span>{nh}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => handleBookInZip(area.zipCodes[0])}
                  className="w-full py-2.5 px-3 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-teal-50 hover:text-teal-900 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Book in {area.name.split('&')[0].trim()}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Don't See Your Location Invitation */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Don't See Your Specific Neighborhood?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We frequently expand our daily routes to accommodate surrounding developments, office parks, and multi-unit complexes. Reach out to our dispatch team and we will verify whether our mobile cleaning crews can accommodate your address.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="py-3 px-6 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0"
          >
            Inquire About Your Address
          </button>
        </div>
      </section>
    </div>
  );
};
