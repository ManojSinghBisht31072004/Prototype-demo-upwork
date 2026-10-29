export type PageId = 'home' | 'services' | 'about' | 'service-areas' | 'contact';

export type ServiceType = 
  | 'residential' 
  | 'deep-clean' 
  | 'move-in-out' 
  | 'office' 
  | 'commercial';

export type PropertyCategory = 'residential' | 'commercial';

export type CleaningFrequency = 'one-time' | 'weekly' | 'bi-weekly' | 'monthly';

export interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  category: PropertyCategory;
  serviceType: ServiceType;
  propertyType: string;
  squareFootage: string;
  bedrooms: number;
  bathrooms: number;
  serviceAddress: string;
  zipCode: string;
  desiredDate: string;
  frequency: CleaningFrequency;
  addOns: string[];
  additionalNotes: string;
}

export interface QuoteSubmissionResult {
  referenceId: string;
  submittedAt: string;
  data: QuoteFormData;
  estimatedPriceLow: number;
  estimatedPriceHigh: number;
  estimatedHours: number;
  recommendedCrewSize: number;
}

export interface ServiceDetail {
  id: ServiceType;
  title: string;
  shortDescription: string;
  category: PropertyCategory;
  image: string;
  keyBenefits: string[];
  checklist: string[];
  idealFor: string;
  typicalDuration: string;
  startingPrice: string;
}

export interface ServiceArea {
  id: string;
  name: string;
  zipCodes: string[];
  countyOrZone: string;
  residentialAvailable: boolean;
  commercialAvailable: boolean;
  typicalLeadTime: string;
  neighborhoodHighlights: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  clientRole: string;
  serviceUsed: string;
  rating: number;
  date: string;
}
