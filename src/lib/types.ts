export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number; // Keep for backward compatibility
  priceUSD: number;
  priceETB: number;
  salePrice?: number; // Keep for backward compatibility
  salePriceUSD?: number;
  salePriceETB?: number;
  images: string[];
  category: 'women' | 'men' | 'kids' | 'accessories';
  type: 'dress' | 'shirt' | 'pants' | 'scarf' | 'jewelry' | 'other';
  colors: Color[] | readonly Color[];
  sizes: Size[] | readonly Size[];
  inStock: boolean;
  featured?: boolean;
  new?: boolean;
  rating?: number;
  reviewCount?: number;
  details?: {
    material?: string;
    care?: string;
    origin?: string;
    [key: string]: string | undefined;
  };
}

export interface Color {
  name: string;
  hex: string;
}

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'One Size';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: Color;
  selectedSize?: Size;
}

export interface Cart {
  items: CartItem[];
  updatedAt: string;
}

export interface ShippingAddress {
  fullName: string;
  address1: string;
  address2?: string;
  city: string;
  region: string;
  postalCode?: string;
  phone: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  contactInfo: string;
  paymentMethod: 'card' | 'mobile-money' | 'cod';
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  helpful?: number;
}

export interface FilterState {
  categories: string[];
  types: string[];
  priceRange: [number, number];
  colors: string[];
  sizes: Size[];
  search?: string;
}
