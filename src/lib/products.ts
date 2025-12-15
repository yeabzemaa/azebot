import { Product, FilterState, Color, Size } from './types';
import { api } from './api';

// Types for API Responses
interface ApiProduct {
  id: string;
  product_id: string;
  name: string;
  slug: string;
  price: string;
  sale_price: string | null;
  current_price: string;
  is_on_sale: boolean;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  // API output doesn't seem to have valid main_image top-level always, or we should prefer images array
  main_image?: string;
  rating: string | null;
  review_count: number;
  in_stock: boolean;
  featured: boolean;
  is_new: boolean;
  description?: string;
  details?: Record<string, string>;

  // New structure from User
  product_type?: string;
  images: Array<{
    id: string;
    url: string;
    alt_text: string;
    is_primary: boolean;
  }>;
  colors?: Array<{
    name: string;
    hex_code: string;
  }>;
  sizes?: Array<{
    size_label: string;
  }>;
}

interface ApiProductListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ApiProduct[];
}

// Adapter: Convert API Product to Frontend Product
function mapApiProductToProduct(apiProduct: ApiProduct): Product {
  // Map category string to union type
  const categoryMap: Record<string, 'women' | 'men' | 'kids' | 'accessories'> = {
    'Women': 'women',
    'Men': 'men',
    'Kids': 'kids',
    'Accessories': 'accessories',
    'women': 'women',
    'men': 'men',
    'kids': 'kids',
    'accessories': 'accessories'
  };

  // Construct images array
  // If images array exists and has length, use it. Otherwise fallback to main_image if present.
  let images: string[] = [];
  if (apiProduct.images && apiProduct.images.length > 0) {
    images = apiProduct.images.map(img => img.url);
  } else if (apiProduct.main_image) {
    images = [apiProduct.main_image];
  }

  // Map Colors
  const colors: Color[] = apiProduct.colors?.map(c => ({
    name: c.name,
    hex: c.hex_code
  })) || [{ name: 'Standard', hex: '#FFFFFF' }];

  // Map Sizes
  const sizes: Size[] = (apiProduct.sizes?.map(s => s.size_label as Size)) || ['One Size'];

  return {
    id: apiProduct.product_id || apiProduct.id,
    name: apiProduct.name,
    slug: apiProduct.slug,
    description: apiProduct.description || '',
    price: parseFloat(apiProduct.price),
    salePrice: apiProduct.sale_price ? parseFloat(apiProduct.sale_price) : undefined,
    images: images,
    category: categoryMap[apiProduct.category?.name] || 'women', // Handle object or string safely if needed
    type: (apiProduct.product_type as any) || 'dress',
    colors: colors,
    sizes: sizes,
    inStock: apiProduct.in_stock,
    featured: apiProduct.featured,
    new: apiProduct.is_new,
    rating: apiProduct.rating ? parseFloat(apiProduct.rating) : 0,
    reviewCount: apiProduct.review_count,
    details: apiProduct.details || {}
  };
}

// --- Async API Functions ---

export async function getAllProducts(filters?: Partial<FilterState>): Promise<Product[]> {
  try {
    // Construct query params from filters
    const params = new URLSearchParams();

    if (filters?.categories?.length) {
      // API expects single 'category' usually, or multiple? 
      // Based on typical Django filters, usually ?category=women
      // If multiple, maybe loop. Let's assume single for now or take the first.
      // Or if the API supports ?category__in=...
      // Let's stick to appending multiple 'category' keys if the API supports it (arrays), 
      // or just one.
      filters.categories.forEach(c => params.append('category', c));
    }

    if (filters?.types?.length) {
      filters.types.forEach(t => params.append('type', t));
    }

    if (filters?.priceRange) {
      const [min, max] = filters.priceRange;
      if (min > 0) params.append('price_min', min.toString());
      if (max < 500) params.append('price_max', max.toString()); // Only send if constrained
    }

    if (filters?.colors?.length) {
      filters.colors.forEach(c => params.append('color', c));
    }

    if (filters?.sizes?.length) {
      filters.sizes.forEach(s => params.append('size', s));
    }

    if (filters?.search) {
      params.append('search', filters.search);
    }

    const response = await api.get<ApiProductListResponse>(`/products/?${params.toString()}`);
    return response.results.map(mapApiProductToProduct);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const response = await api.get<ApiProductListResponse>('/products/featured/');
    return response.results.map(mapApiProductToProduct);
  } catch (error) {
    console.error('Failed to fetch featured products:', error);
    return [];
  }
}

export async function getNewProducts(): Promise<Product[]> {
  try {
    const response = await api.get<ApiProductListResponse>('/products/?ordering=-created_at');
    return response.results.map(mapApiProductToProduct);
  } catch (error) {
    console.error('Failed to fetch new products:', error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  try {
    // Try explicit details endpoint
    const apiProduct = await api.get<ApiProduct>(`/products/${slug}/`);
    return mapApiProductToProduct(apiProduct);
  } catch (error) {
    console.error(`Failed to fetch product ${slug}:`, error);
    return undefined;
  }
}

export async function getRelatedProducts(productId: string, limit: number = 4): Promise<Product[]> {
  // Placeholder logic: Fetch list and filter client side or use API specific endpoint
  // For now, just return featured as related
  return getFeaturedProducts();
}

// Client-side sorter helper
export function sortProducts(
  products: Product[],
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating'
): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => {
        const priceA = a.salePrice || a.price;
        const priceB = b.salePrice || b.price;
        return priceA - priceB;
      });
    case 'price-desc':
      return sorted.sort((a, b) => {
        const priceA = a.salePrice || a.price;
        const priceB = b.salePrice || b.price;
        return priceB - priceA;
      });
    case 'newest':
      return sorted.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
    case 'rating':
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    case 'featured':
    default:
      return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }
}