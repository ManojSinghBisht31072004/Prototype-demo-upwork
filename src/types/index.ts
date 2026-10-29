export interface ProductVariant {
  id: string;
  name: string;
  colorHex?: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'Living & Furniture' | 'Audio & Acoustic' | 'Lighting & Ceramics' | 'Objects & Apparel';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  inStock: boolean;
  stockCount: number;
  subtitle: string;
  description: string;
  highlights: string[];
  specs: Record<string, string>;
  images: string[];
  variants: ProductVariant[];
  deliveryEstimate: string;
}

export interface CartItem {
  product: Product;
  selectedVariant?: ProductVariant;
  quantity: number;
}

export interface FilterState {
  category: string;
  priceRange: [number, number];
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  searchQuery: string;
  inStockOnly: boolean;
  onSaleOnly: boolean;
}

export interface ShippingDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  shippingMethod: 'standard' | 'express';
  paymentMethod: 'card' | 'apple-pay' | 'cod';
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  shippingDetails: ShippingDetails;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  estimatedDelivery: string;
}
