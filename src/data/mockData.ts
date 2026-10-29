import { ServiceDetail, ServiceArea, Testimonial } from '../types';

export const SERVICES_DATA: ServiceDetail[] = [
  {
    id: 'residential',
    title: 'Residential Cleaning',
    shortDescription: 'Consistent, meticulous recurring or single-visit upkeep for apartments, townhouses, and family homes.',
    category: 'residential',
    image: '/src/assets/images/service_residential_1793208462761.jpg',
    startingPrice: '$129',
    typicalDuration: '2.5 – 3.5 hours',
    idealFor: 'Busy families, professionals, and homeowners wanting clean living spaces without spending weekends scrubbing.',
    keyBenefits: [
      'Flexible recurring options with 15% discounts for bi-weekly schedules',
      'Non-toxic, pet-safe and child-friendly cleaning products upon request',
      'Consistent two-cleaner assigned team who knows your home preferences',
      'Meticulous 45-point room-by-room hygiene checklist completed every visit'
    ],
    checklist: [
      'High and low dusting of furniture, trim, and light fixtures',
      'Countertops, appliance exteriors, and stovetop degreasing',
      'Sink scrubbing, chrome polishing, and backsplash sanitization',
      'Complete bathroom tile, mirror, shower, and toilet sterilization',
      'Thorough vacuuming of carpets and damp-mop hardwood/tile floor care',
      'Trash emptied and fresh liners inserted throughout'
    ]
  },
  {
    id: 'deep-clean',
    title: 'Deep Cleaning',
    shortDescription: 'An intensive, restorative top-to-bottom scrub targeting built-up grime, scale, and overlooked corners.',
    category: 'residential',
    image: '/src/assets/images/service_deep_clean_1793208464007.jpg',
    startingPrice: '$219',
    typicalDuration: '4.5 – 6.0 hours',
    idealFor: 'Seasonal spring or autumn resets, homes not cleaned professionally in 3+ months, or prior to hosting guests.',
    keyBenefits: [
      'Detailed hand-scrubbing of neglected baseboards, vents, and woodwork',
      'Aggressive limescale and soap scum extraction from shower glass and tile grout',
      'Cabinet exterior detail cleaning and interior spot-treatment',
      'Restores dull surfaces to high sheen using pH-balanced specialty agents'
    ],
    checklist: [
      'Detailed hand-wiping of all baseboards, door frames, and window sills',
      'Deep descaling of bathroom grout, shower tracks, and hardware',
      'Microwave interior & stovetop heavy grease extraction',
      'Kitchen cabinet fronts scrubbed and polished',
      'Ceiling fan blades and air return vents hand-dusted',
      'Furniture moved (up to 30 lbs) to vacuum and sanitize underneath'
    ]
  },
  {
    id: 'move-in-out',
    title: 'Move-In / Move-Out Cleaning',
    shortDescription: 'Exhaustive turnover sanitation designed to secure full lease deposits and provide spotless move-in welcomes.',
    category: 'residential',
    image: '/src/assets/images/service_move_clean_1793208464083.jpg',
    startingPrice: '$279',
    typicalDuration: '5.0 – 7.5 hours',
    idealFor: 'Tenants moving out, landlords prepping properties for rent, or new home buyers wanting pristine move-in cleanliness.',
    keyBenefits: [
      'Compliant with standard property manager move-out inspection checklists',
      'Includes deep interior sanitization of all ovens, fridges, and cabinets',
      'Detailed interior window glass and sill track detailing',
      'Guaranteed re-clean within 24 hours if inspection notes any missed areas'
    ],
    checklist: [
      'Interior and exterior scrubbing of oven, range hood, and stove',
      'Interior and exterior sanitization of refrigerator, freezer, and drawers',
      'Inside all kitchen and bathroom cabinets, drawers, and shelving',
      'Closet shelves, baseboards, and interior doors wiped clean',
      'All light switches, outlet covers, and wall smudge spot-wiping',
      'Full wall-to-wall vacuum and heavy floor wash'
    ]
  },
  {
    id: 'office',
    title: 'Office Cleaning',
    shortDescription: 'Tailored after-hours or daytime sanitization that fosters healthy teams and impresses visiting clients.',
    category: 'commercial',
    image: '/src/assets/images/service_office_commercial_1793208465058.jpg',
    startingPrice: '$180 / visit',
    typicalDuration: 'Flexible based on sq. ft.',
    idealFor: 'Creative agencies, corporate branch suites, law firms, and tech offices from 1,000 to 25,000 sq. ft.',
    keyBenefits: [
      'Unobtrusive after-hours scheduling (evenings, nights, or weekends)',
      'High-touch surface and electronics-safe sanitization protocol',
      'Dedicated account coordinator with monthly quality audits',
      'Commercial-grade HEPA air filtration vacuuming for indoor air quality'
    ],
    checklist: [
      'Conference room sanitation, glass board cleaning, and seat resetting',
      'Workstation dusting without disturbing employee documents or tech',
      'Breakroom refrigerator, sink, coffee station, and counter disinfection',
      'Executive and communal restroom restocking and deep disinfection',
      'Recycling and waste stream emptying per facility guidelines',
      'Entryway glass, door handles, and elevator panel wiping'
    ]
  },
  {
    id: 'commercial',
    title: 'Commercial Facility Cleaning',
    shortDescription: 'Comprehensive janitorial and hygiene management for clinics, retail stores, fitness centers, and education venues.',
    category: 'commercial',
    image: '/src/assets/images/service_office_commercial_1793208465058.jpg',
    startingPrice: 'Custom quote',
    typicalDuration: 'Daily, 3x/week, or 5x/week contracts',
    idealFor: 'High-foot-traffic facilities requiring regulatory compliance, spotless lobbies, and dependable crew rotations.',
    keyBenefits: [
      'Customized scope of work and OSHA-aligned health & safety protocols',
      'Commercial floor machine scrub, auto-scrubber, and vinyl tile buffing',
      'Digital checklist logs provided after every single shift',
      'Fully vetted, uniform-clad technicians with strict key-card access training'
    ],
    checklist: [
      'Heavy-duty floor scrubbing, polishing, and high-traffic zone preservation',
      'Hospital-grade surface sanitization for patient or client areas',
      'Retail display dusting, mirror cleaning, and entrance polish',
      'Locker room, gym equipment, and fitness mat sanitization',
      'Bulk commercial waste sorting and dumpster disposal',
      'Emergency spill and post-event turnaround support availability'
    ]
  }
];

export const SERVICE_AREAS_DATA: ServiceArea[] = [
  {
    id: 'metro-central',
    name: 'Downtown Metro & Financial District',
    zipCodes: ['98101', '98104', '98121'],
    countyOrZone: 'Zone 1 · Urban Core',
    residentialAvailable: true,
    commercialAvailable: true,
    typicalLeadTime: 'Same-day or next-day',
    neighborhoodHighlights: ['High-rise condos', 'Tech office towers', 'Lofts & apartments']
  },
  {
    id: 'oakridge-hills',
    name: 'Oakridge Hills & Highlands',
    zipCodes: ['98112', '98102', '98119'],
    countyOrZone: 'Zone 2 · North Enclave',
    residentialAvailable: true,
    commercialAvailable: true,
    typicalLeadTime: '24–48 hours notice',
    neighborhoodHighlights: ['Historic residences', 'Single-family estates', 'Private practices']
  },
  {
    id: 'riverfront-arts',
    name: 'Riverfront Arts & Waterfront',
    zipCodes: ['98109', '98116', '98126'],
    countyOrZone: 'Zone 3 · Waterfront West',
    residentialAvailable: true,
    commercialAvailable: true,
    typicalLeadTime: '24 hours notice',
    neighborhoodHighlights: ['Boutique studios', 'Waterfront lofts', 'Retail storefronts']
  },
  {
    id: 'westgate-park',
    name: 'Westgate Commercial Center',
    zipCodes: ['98134', '98108'],
    countyOrZone: 'Zone 4 · Industrial & Enterprise',
    residentialAvailable: false,
    commercialAvailable: true,
    typicalLeadTime: 'Contract dispatch',
    neighborhoodHighlights: ['Logistics offices', 'Creative flex spaces', 'Commercial hubs']
  },
  {
    id: 'lakeside-village',
    name: 'Lakeside Park & Village Green',
    zipCodes: ['98105', '98115', '98125'],
    countyOrZone: 'Zone 5 · East Lake',
    residentialAvailable: true,
    commercialAvailable: true,
    typicalLeadTime: '24–48 hours notice',
    neighborhoodHighlights: ['Suburban residences', 'Townhomes', 'Community clinics']
  },
  {
    id: 'tech-corridor',
    name: 'Innovation Tech Corridor & North',
    zipCodes: ['98052', '98004', '98007'],
    countyOrZone: 'Zone 6 · Eastside Campus',
    residentialAvailable: true,
    commercialAvailable: true,
    typicalLeadTime: 'Daily service routes',
    neighborhoodHighlights: ['Corporate headquarters', 'Executive townhomes', 'Tech campuses']
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't-1',
    quote: "PureSpace has been handling our bi-weekly home cleaning for six months. Coming back on cleaning day to a gleaming kitchen and pristine floors without any chemical smell is genuinely the highlight of my week.",
    clientName: "Elena Rostova",
    clientRole: "Homeowner & Architect",
    serviceUsed: "Bi-Weekly Residential Cleaning",
    rating: 5,
    date: "October 2026"
  },
  {
    id: 't-2',
    quote: "We manage 45 tech workstations and 3 conference rooms. The PureSpace evening crew is quiet, trustworthy, and leaves our breakroom and glass walls immaculate every single morning.",
    clientName: "Marcus Vance",
    clientRole: "Director of Operations, Slate Labs",
    serviceUsed: "Commercial Office Maintenance",
    rating: 5,
    date: "September 2026"
  },
  {
    id: 't-3',
    quote: "Our landlord is notorious for keeping security deposits. We booked PureSpace for a full Move-Out Deep Clean, and the inspector remarked it was the cleanest unit they had received in five years. Full deposit refunded.",
    clientName: "Devon & Chloe Chen",
    clientRole: "Tenants & Relocating Residents",
    serviceUsed: "Move-Out Deep Cleaning",
    rating: 5,
    date: "August 2026"
  }
];

export const ADDON_OPTIONS = [
  { id: 'fridge', name: 'Interior Refrigerator Cleaning', price: 35, time: '30 min' },
  { id: 'oven', name: 'Interior Oven Degreasing', price: 45, time: '45 min' },
  { id: 'cabinets', name: 'Interior Cabinets Scrubbing', price: 50, time: '45 min' },
  { id: 'windows', name: 'Interior Window Pane Washing (up to 10)', price: 40, time: '30 min' },
  { id: 'green', name: 'Certified Eco-Only Hypoallergenic Kit', price: 15, time: '0 min' },
  { id: 'pet', name: 'Specialty Pet Hair Extraction', price: 30, time: '30 min' }
];

export const FAQ_ITEMS = [
  {
    question: "Do I need to be present during the cleaning?",
    answer: "No, you do not need to be present. Many clients leave access instructions or lockbox codes. Our staff are vetted, professional, and follow secure entry and exit protocols."
  },
  {
    question: "Do you bring your own cleaning supplies and equipment?",
    answer: "Yes, our team arrives fully equipped with commercial-grade vacuums, microfiber cloths, and pH-neutral sanitizing agents. If you prefer specific products or your own vacuum, we gladly accommodate your preferences."
  },
  {
    question: "What happens if an area does not meet my expectations?",
    answer: "We offer a 100% Satisfaction Guarantee. Simply notify us within 24 hours with a quick note or photo, and we will dispatch a team to re-clean the specific area at no additional charge."
  },
  {
    question: "How are commercial contracts billed and managed?",
    answer: "Commercial clients receive a single monthly itemized invoice with net-30 terms, dedicated account manager contact, and scheduled quality inspection logs."
  }
];
