import { Product } from '../types';

export const HERO_IMAGE = '/images/hero.jpg';
export const CHAIR_IMAGE = '/images/product-chair.jpg';
export const SPEAKER_IMAGE = '/images/product-speaker.jpg';
export const LAMP_IMAGE = '/images/product-lamp.jpg';
export const TABLE_IMAGE = '/images/product-table.jpg';
export const HEADPHONES_IMAGE = '/images/product-headphones.jpg';
export const PENDANT_IMAGE = '/images/product-pendant.jpg';
export const JACKET_IMAGE = '/images/product-jacket.jpg';

export const CATEGORIES = [
  {
    id: 'Living & Furniture',
    name: 'Living & Furniture',
    description: 'Sculptural wood, honed stone, and tactile upholstery designed for calm sanctuaries.',
    image: CHAIR_IMAGE,
    itemCount: 4,
  },
  {
    id: 'Audio & Acoustic',
    name: 'Audio & Acoustic',
    description: 'Precision acoustics cast in machined aluminum and acoustic textiles.',
    image: SPEAKER_IMAGE,
    itemCount: 3,
  },
  {
    id: 'Lighting & Ceramics',
    name: 'Lighting & Ceramics',
    description: 'Hand-thrown stoneware and diffused illumination with warm amber tones.',
    image: LAMP_IMAGE,
    itemCount: 3,
  },
  {
    id: 'Objects & Apparel',
    name: 'Objects & Apparel',
    description: 'Everyday artifacts and woven textiles crafted from heirloom natural fibers.',
    image: JACKET_IMAGE,
    itemCount: 2,
  },
] as const;

export const PRODUCTS: Product[] = [
  {
    id: 'nva-01',
    name: 'Atelier Sculpted Walnut Lounge Chair',
    slug: 'atelier-sculpted-walnut-chair',
    category: 'Living & Furniture',
    price: 890,
    originalPrice: 980,
    rating: 4.9,
    reviewCount: 42,
    isNew: false,
    isBestSeller: true,
    inStock: true,
    stockCount: 7,
    subtitle: 'FSC-Certified Solid Walnut & Bouclé Textile',
    description:
      'Engineered with organic ergonomics in mind, the Atelier Lounge Chair features steam-bent solid American walnut joinery paired with tactile, stain-resistant European bouclé. Each piece is hand-finished with natural hardwax oil to celebrate the authentic grain and warmth of the wood.',
    highlights: [
      'Steam-bent solid American walnut frame',
      'High-resilience foam core with wool bouclé wrap',
      'Hand-applied matte hardwax oil finish',
      'Mortise and tenon joinery built to last generations',
    ],
    specs: {
      Dimensions: '32" W × 34" D × 30" H',
      SeatHeight: '16.5 inches',
      Materials: 'Solid Walnut, Merino Wool Blend Bouclé',
      Weight: '38 lbs (17.2 kg)',
      Origin: 'Crafted in Porto, Portugal',
      Warranty: '10-Year Structural Framework Warranty',
    },
    images: [
      CHAIR_IMAGE,
      HERO_IMAGE,
    ],
    variants: [
      { id: 'v1', name: 'Oatmeal Bouclé', colorHex: '#EAE5DB', inStock: true },
      { id: 'v2', name: 'Charcoal Wool', colorHex: '#27272A', inStock: true },
      { id: 'v3', name: 'Forest Velvet', colorHex: '#2D3A30', inStock: false },
    ],
    deliveryEstimate: 'Delivers in 3–5 business days (White Glove Delivery Available)',
  },
  {
    id: 'nva-02',
    name: 'Aethel Precision Wireless Acoustic Speaker',
    slug: 'aethel-precision-wireless-speaker',
    category: 'Audio & Acoustic',
    price: 340,
    rating: 4.8,
    reviewCount: 78,
    isNew: true,
    isBestSeller: true,
    inStock: true,
    stockCount: 14,
    subtitle: 'Knurled Aluminum Dial & Custom Neodymium Driver',
    description:
      'Cased in deep matte anodized aluminum with acoustic mesh damping, the Aethel delivers rich 360-degree high-fidelity spatial audio. The top crown features a tactile knurled rotary dial calibrated for micro-fine volume graduation.',
    highlights: [
      'Dual custom 45mm neodymium drivers + passive bass radiator',
      'Lossless 24-bit/96kHz high-resolution audio streaming',
      '30-hour lithium rechargeable reserve with USB-C fast charge',
      'Multi-room wireless link and balanced Bluetooth 5.3',
    ],
    specs: {
      Dimensions: '5.2" Diameter × 7.6" Height',
      Weight: '3.1 lbs (1.4 kg)',
      Frequency: '42Hz – 22,000Hz',
      Battery: '30 Hours continuous playback',
      Connectivity: 'Bluetooth 5.3, AirPlay 2, Wi-Fi 6',
      Materials: 'Milled 6000-Series Aluminum, Basalt Mesh',
    },
    images: [
      SPEAKER_IMAGE,
      HEADPHONES_IMAGE,
    ],
    variants: [
      { id: 'sp1', name: 'Matte Obsidian', colorHex: '#18181B', inStock: true },
      { id: 'sp2', name: 'Raw Silver Sand', colorHex: '#D4D4D8', inStock: true },
    ],
    deliveryEstimate: 'Delivers in 2–4 business days with complimentary shipping',
  },
  {
    id: 'nva-03',
    name: 'Solstice Matte Ceramic Table Lamp',
    slug: 'solstice-matte-ceramic-table-lamp',
    category: 'Lighting & Ceramics',
    price: 210,
    originalPrice: 245,
    rating: 4.9,
    reviewCount: 36,
    isNew: false,
    isBestSeller: true,
    inStock: true,
    stockCount: 11,
    subtitle: 'Hand-Thrown Stoneware & Natural Linen Drum Shade',
    description:
      'A quiet companion for evening study and relaxed living. The Solstice is individually wheel-thrown from coarse volcanic clay with an unglazed matte tactile finish, crowned with a woven flax linen shade that casts a soothing 2700K ambient glow.',
    highlights: [
      'Individually thrown stoneware base with subtle organic variations',
      'Integrated brass turn-knob rotary dimmer',
      'Twisted herringbone cotton cloth cord with solid brass plug accents',
      'Includes calibrated warm amber LED bulb (90+ CRI)',
    ],
    specs: {
      Dimensions: '12" Diameter × 16" Height',
      CordLength: '8 feet (braided fabric)',
      BulbType: 'E26 base, Max 60W equivalent (dimmable)',
      Weight: '6.4 lbs (2.9 kg)',
      Origin: 'Artisanal Studio in Kyoto, Japan',
    },
    images: [
      LAMP_IMAGE,
      PENDANT_IMAGE,
    ],
    variants: [
      { id: 'l1', name: 'Chalk Ivory', colorHex: '#F4F1EA', inStock: true },
      { id: 'l2', name: 'Volcanic Ash', colorHex: '#44403C', inStock: true },
    ],
    deliveryEstimate: 'Delivers in 2–4 business days',
  },
  {
    id: 'nva-04',
    name: 'Kanso Monolithic Travertine Low Table',
    slug: 'kanso-monolithic-travertine-table',
    category: 'Living & Furniture',
    price: 760,
    rating: 4.7,
    reviewCount: 19,
    isNew: true,
    isBestSeller: false,
    inStock: true,
    stockCount: 4,
    subtitle: 'Honed Roman Travertine Stone with Chamfered Edges',
    description:
      'Sculpted from heavy slabs of untreated Italian travertine, the Kanso table showcases natural porous sediment and crystalline veins. Its grounded proportions create a calming anchor in contemporary living rooms.',
    highlights: [
      'Solid honed travertine stone slab with sealed protective barrier',
      'Seamless interlocking joinery with hidden leveling glides',
      'Unique earth-tone mineral banding on each piece',
    ],
    specs: {
      Dimensions: '44" L × 26" W × 14" H',
      Weight: '112 lbs (50.8 kg)',
      Care: 'Wipe with damp cloth; acid-free natural stone cleaner',
      Origin: 'Tivoli Quarry, Italy',
    },
    images: [
      TABLE_IMAGE,
      HERO_IMAGE,
    ],
    variants: [
      { id: 't1', name: 'Cream Travertine', colorHex: '#E7DFD5', inStock: true },
      { id: 't2', name: 'Silver Vein', colorHex: '#D1CBC4', inStock: true },
    ],
    deliveryEstimate: 'White Glove delivery within 7–10 days',
  },
  {
    id: 'nva-05',
    name: 'Horizon Acoustic Over-Ear Studio Monitors',
    slug: 'horizon-acoustic-over-ear-monitors',
    category: 'Audio & Acoustic',
    price: 380,
    originalPrice: 420,
    rating: 5.0,
    reviewCount: 54,
    isNew: true,
    isBestSeller: true,
    inStock: true,
    stockCount: 9,
    subtitle: 'Beryllium Diaphragms & Memory-Foam Calfskin Cushions',
    description:
      'Engineered for long listening sessions with zero ear fatigue. Custom 40mm beryllium drivers offer planar-grade transient speed and zero-distortion neutrality across dynamic frequency spectrums.',
    highlights: [
      'Custom 40mm Beryllium-coated diaphragm drivers',
      'Ultra-plush magnetic replaceable calfskin ear pads',
      'Active Hybrid ANC with transparent studio ambient mode',
      'Detachable silver-plated oxygen-free copper cables',
    ],
    specs: {
      Weight: '275 grams',
      BatteryLife: '38 hours playback with ANC enabled',
      Impedance: '32 Ohms (effortless drive from mobile devices)',
      Codecs: 'LDAC, aptX Adaptive, AAC, SBC',
    },
    images: [
      HEADPHONES_IMAGE,
      SPEAKER_IMAGE,
    ],
    variants: [
      { id: 'h1', name: 'Gunmetal Titanium', colorHex: '#3F3F46', inStock: true },
      { id: 'h2', name: 'Saddle Tan Leather', colorHex: '#8C5E39', inStock: true },
    ],
    deliveryEstimate: 'Delivers in 2–3 business days with signature tracking',
  },
  {
    id: 'nva-06',
    name: 'Lumina Cast Brass Arc Pendant',
    slug: 'lumina-cast-brass-arc-pendant',
    category: 'Lighting & Ceramics',
    price: 290,
    rating: 4.8,
    reviewCount: 29,
    isNew: false,
    isBestSeller: false,
    inStock: true,
    stockCount: 8,
    subtitle: 'Spun Solid Brass & Mouth-Blown Opal Glass Diffuser',
    description:
      'A refined geometric silhouette that floats gracefully above kitchen islands and dining tables. The spun brass canopy develops an authentic living patina over time, while the hand-blown sphere diffuses even, shadowless illumination.',
    highlights: [
      'Solid spun brass shade with protective micro-crystalline wax',
      'Triplex opal glass sphere blown in Czech workshops',
      'Adjustable 10-foot rigid brass suspension stems included',
    ],
    specs: {
      Diameter: '14 inches',
      DropLength: 'Adjustable from 18" to 72"',
      CeilingCanopy: '5" round brass plate',
      Bulb: 'Dimmable G9 LED module included (800 lumens)',
    },
    images: [
      PENDANT_IMAGE,
      LAMP_IMAGE,
    ],
    variants: [
      { id: 'b1', name: 'Brushed Brass', colorHex: '#CDB172', inStock: true },
      { id: 'b2', name: 'Burnished Bronze', colorHex: '#4A3B32', inStock: true },
    ],
    deliveryEstimate: 'Delivers in 3–5 business days',
  },
  {
    id: 'nva-07',
    name: 'Sylvan Minimalist Oak Credenza',
    slug: 'sylvan-minimalist-oak-credenza',
    category: 'Living & Furniture',
    price: 1250,
    rating: 4.9,
    reviewCount: 18,
    isNew: false,
    isBestSeller: false,
    inStock: true,
    stockCount: 3,
    subtitle: 'Quarter-Sawn White Oak with Slatted Sliding Louvers',
    description:
      'Generous storage concealed behind continuous vertical oak slats that slide seamlessly on concealed brass runners. Features integrated cord routing channels for clean media management.',
    highlights: [
      'FSC-Certified French White Oak construction',
      'Push-to-open soft closing mechanisms on all drawers',
      'Ventilated back panel for audio/video receivers and consoles',
    ],
    specs: {
      Dimensions: '72" W × 19" D × 26" H',
      Weight: '145 lbs (65.8 kg)',
      Shelving: '3 adjustable interior solid oak shelves',
      Finish: 'Matte water-based non-toxic low VOC lacquer',
    },
    images: [
      HERO_IMAGE,
      TABLE_IMAGE,
    ],
    variants: [
      { id: 'o1', name: 'Natural White Oak', colorHex: '#D8C3A5', inStock: true },
      { id: 'o2', name: 'Smoked Black Oak', colorHex: '#262422', inStock: false },
    ],
    deliveryEstimate: 'Freight Delivery in 7–12 business days',
  },
  {
    id: 'nva-08',
    name: 'Terra Form Sculptural Stoneware Vessel',
    slug: 'terra-form-sculptural-stoneware-vessel',
    category: 'Lighting & Ceramics',
    price: 145,
    rating: 4.9,
    reviewCount: 45,
    isNew: true,
    isBestSeller: false,
    inStock: true,
    stockCount: 18,
    subtitle: 'Coarse Sand Finish with Asymmetric Handles',
    description:
      'Inspired by ancient Mediterranean amphorae, this sculptural centerpiece stands out whether styled with dried botanicals or displayed purely as an architectural object on a mantel or credenza.',
    highlights: [
      'Watertight glazed interior for fresh seasonal florals',
      'Textured slip-cast exterior with hand-carved surface scoring',
      'Subtle weight distribution prevents tipping',
    ],
    specs: {
      Dimensions: '8.5" Diameter × 12.5" Height',
      Weight: '4.8 lbs (2.2 kg)',
      Care: 'Hand wash with mild organic detergent',
    },
    images: [
      LAMP_IMAGE,
      TABLE_IMAGE,
    ],
    variants: [
      { id: 'v_ter1', name: 'Sand Dune', colorHex: '#DDD1C1', inStock: true },
      { id: 'v_ter2', name: 'Terracotta Red', colorHex: '#A25946', inStock: true },
    ],
    deliveryEstimate: 'Delivers in 2–4 business days',
  },
  {
    id: 'nva-09',
    name: 'Kuro Raw Selvedge Heavy Canvas Chore Jacket',
    slug: 'kuro-raw-selvedge-heavy-canvas-jacket',
    category: 'Objects & Apparel',
    price: 260,
    rating: 4.8,
    reviewCount: 31,
    isNew: false,
    isBestSeller: true,
    inStock: true,
    stockCount: 12,
    subtitle: '14.5oz Japanese Kurabo Cotton Selvedge with Horn Buttons',
    description:
      'Woven on vintage Toyoda shuttle looms in Okayama, this chore jacket is built from dense unwashed cotton that softens and forms to the wearer’s body shape over decades of use.',
    highlights: [
      '14.5oz unsanforized Japanese red-line selvedge denim',
      'Natural corozo nut buttons custom etched with subtle monogram',
      'Triple-needle chainstitching on high-stress seams',
      'Deep utility drop pockets sized for tablets and notebooks',
    ],
    specs: {
      Material: '100% Organic Kurabo Mill Cotton',
      Cut: 'Tailored boxy workwear silhouette',
      Origin: 'Okayama, Japan',
    },
    images: [
      JACKET_IMAGE,
      CHAIR_IMAGE,
    ],
    variants: [
      { id: 'j1', name: 'Deep Indigo', colorHex: '#1B263B', inStock: true },
      { id: 'j2', name: 'Raw Natural Canvas', colorHex: '#F0ECE1', inStock: true },
      { id: 'j3', name: 'Washed Olive', colorHex: '#3D4537', inStock: true },
    ],
    deliveryEstimate: 'Delivers in 2–3 business days with free exchanges',
  },
  {
    id: 'nva-10',
    name: 'Waffle Knit Belgian Linen Throw Blanket',
    slug: 'waffle-knit-belgian-linen-throw',
    category: 'Objects & Apparel',
    price: 175,
    originalPrice: 195,
    rating: 4.9,
    reviewCount: 63,
    isNew: false,
    isBestSeller: true,
    inStock: true,
    stockCount: 16,
    subtitle: '100% Certified Masters of Linen® Pre-Washed Flax',
    description:
      'Substantial honeycomb waffle weave offers breathable thermal regulation for all seasons. Enzyme stonewashed for an exceptionally soft, lived-in feel right out of the presentation box.',
    highlights: [
      'Heavyweight 480 GSM pure flax linen',
      'Hypoallergenic, breathable, and naturally moisture-wicking',
      'Self-hemmed clean edge detailing',
      'Machine washable and softens further with every cycle',
    ],
    specs: {
      Dimensions: '58" × 80" (Generous Oversized Throw)',
      Material: '100% European Certified Flax',
      Origin: 'Woven in Flanders, Belgium',
    },
    images: [
      HERO_IMAGE,
      JACKET_IMAGE,
    ],
    variants: [
      { id: 'bl1', name: 'Flax Heather', colorHex: '#CFBFA8', inStock: true },
      { id: 'bl2', name: 'Chalk White', colorHex: '#F7F7F7', inStock: true },
      { id: 'bl3', name: 'Slate Gray', colorHex: '#52525B', inStock: true },
    ],
    deliveryEstimate: 'Delivers in 2–4 business days',
  },
  {
    id: 'nva-11',
    name: 'Strata Precision Belt-Drive Analog Turntable',
    slug: 'strata-precision-belt-drive-turntable',
    category: 'Audio & Acoustic',
    price: 520,
    rating: 4.9,
    reviewCount: 22,
    isNew: true,
    isBestSeller: false,
    inStock: true,
    stockCount: 5,
    subtitle: 'Dense Acrylic Platter & Carbon Fiber Gimbal Tonearm',
    description:
      'Engineered to extract micro-groove detail without motor resonance. A decoupled low-noise synchronous motor drives a precision machined 28mm dense acrylic platter resting on ceramic ball bearings.',
    highlights: [
      'Low-resonance machined MDF plinth with genuine walnut veneer',
      'Factory-fitted and balanced Audio-Technica elliptical cartridge',
      'Built-in switchable phono preamplifier for direct active speaker link',
    ],
    specs: {
      Speeds: '33 1/3 and 45 RPM (electronic speed selector)',
      WowAndFlutter: '< 0.08% at 33 RPM',
      Weight: '18.4 lbs (8.3 kg)',
      Outputs: 'Gold-plated RCA phono / line switchable',
    },
    images: [
      SPEAKER_IMAGE,
      HEADPHONES_IMAGE,
    ],
    variants: [
      { id: 'tt1', name: 'Solid Walnut', colorHex: '#5C4033', inStock: true },
      { id: 'tt2', name: 'Matte Slate', colorHex: '#27272A', inStock: true },
    ],
    deliveryEstimate: 'Delivers in 3–5 business days',
  },
  {
    id: 'nva-12',
    name: 'Eave Minimalist Linen Daybed & Bench',
    slug: 'eave-minimalist-linen-daybed',
    category: 'Living & Furniture',
    price: 1150,
    originalPrice: 1280,
    rating: 4.8,
    reviewCount: 15,
    isNew: false,
    isBestSeller: false,
    inStock: true,
    stockCount: 4,
    subtitle: 'Brushed Stainless Frame with Belgian Linen Tufted Bolster',
    description:
      'Minimalist architectural rest. A low-profile daybed designed for reading alcoves, quiet galleries, or living room transitions. Includes a weighted cylindrical neck bolster secured with saddle leather straps.',
    highlights: [
      'Welded heavy-gauge tubular brushed stainless steel frame',
      'Removable dry-cleanable heavyweight Belgian flax covers',
      'Saddle leather bolster strapping with brushed nickel buckles',
    ],
    specs: {
      Dimensions: '78" L × 32" W × 16" H',
      Weight: '62 lbs (28.1 kg)',
      Capacity: 'Supports up to 450 lbs distributed load',
    },
    images: [
      CHAIR_IMAGE,
      HERO_IMAGE,
    ],
    variants: [
      { id: 'db1', name: 'Sand Flax', colorHex: '#D8CFBC', inStock: true },
      { id: 'db2', name: 'Charcoal Linen', colorHex: '#3F3F46', inStock: true },
    ],
    deliveryEstimate: 'White Glove delivery within 7–10 days',
  },
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    quote:
      'The Atelier walnut chair has become the focal point of my studio. The joinery is museum grade, and the bouclé is remarkably durable. Delivery arrived on time in custom wooden crates.',
    author: 'Elena Vance',
    role: 'Architect & Interior Director',
    location: 'Zurich, Switzerland',
    verifiedItem: 'Atelier Sculpted Walnut Lounge Chair',
    rating: 5,
  },
  {
    id: 't-2',
    quote:
      'As an audio engineer, I am notoriously critical of wireless acoustic performance. The Aethel produces an astonishingly transparent soundstage with zero mechanical hum or harsh sibilance.',
    author: 'Marcus Lindqvist',
    role: 'Acoustic Sound Designer',
    location: 'Stockholm, Sweden',
    verifiedItem: 'Aethel Precision Wireless Acoustic Speaker',
    rating: 5,
  },
  {
    id: 't-3',
    quote:
      'The Solstice ceramic lamp casts exactly the warm, atmospheric glow I wanted for our library. You can immediately feel the weight and tactile quality of hand-thrown stone.',
    author: 'Clara Delacroix',
    role: 'Editorial Creative Director',
    location: 'Paris, France',
    verifiedItem: 'Solstice Matte Ceramic Table Lamp',
    rating: 5,
  },
];

export const PROMO_CODES: Record<string, number> = {
  NOVA10: 0.10, // 10% off
  DESIGN20: 0.20, // 20% off
  WELCOME15: 0.15, // 15% off
};
