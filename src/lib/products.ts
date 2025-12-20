import { Product, FilterState, Color, Size } from './types';
import { api, ENDPOINTS } from './api';

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
  const baseImageUrl = import.meta.env.VITE_IMAGE_BASE_URL || 'http://52.2.218.198'; // API base URL for images

  if (apiProduct.images && apiProduct.images.length > 0) {
    images = apiProduct.images.map(img => {
      const url = img.url;
      // If URL doesn't start with http, prepend base URL
      if (url && !url.startsWith('http')) {
        return `${baseImageUrl}${url.startsWith('/') ? '' : '/'}${url}`;
      }
      return url;
    });
  } else if (apiProduct.main_image) {
    const url = apiProduct.main_image;
    if (url && url !== 'string' && !url.startsWith('http')) {
      images = [`${baseImageUrl}${url.startsWith('/') ? '' : '/'}${url}`];
    } else if (url && url !== 'string') {
      images = [url];
    }
  }

  // Ensure we always have at least one image (fallback)
  if (images.length === 0 || images[0] === 'string') {
    console.warn(`[mapApiProductToProduct] No valid images found for product ${apiProduct.name}, using fallback`);
    images = ['https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=400&h=600&fit=crop'];
  }

  // Map Colors
  const colors: Color[] = apiProduct.colors?.map(c => ({
    name: c.name,
    hex: c.hex_code
  })) || [{ name: 'Standard', hex: '#FFFFFF' }];

  // Map Sizes
  const sizes: Size[] = (apiProduct.sizes?.map(s => s.size_label as Size)) || ['One Size'];

  // Since API doesn't provide separate USD/ETB prices, we'll use the price as USD and convert to ETB
  const priceUSD = parseFloat(apiProduct.price);
  const priceETB = priceUSD * 175; // Conversion rate: 1 USD = ~120 ETB
  const salePriceNum = apiProduct.sale_price ? parseFloat(apiProduct.sale_price) : undefined;

  return {
    id: apiProduct.product_id || apiProduct.id,
    name: apiProduct.name,
    slug: apiProduct.slug,
    description: apiProduct.description || '',
    price: priceUSD, // Keep for backward compatibility
    priceUSD: priceUSD,
    priceETB: priceETB,
    salePrice: salePriceNum,
    salePriceUSD: salePriceNum,
    salePriceETB: salePriceNum ? salePriceNum * 170 : undefined,
    images: images,
    category: categoryMap[apiProduct.category?.name] || 'women',
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

    const response = await api.get<ApiProductListResponse>(`${ENDPOINTS.PRODUCTS.LIST}?${params.toString()}`);
    return response.results.map(mapApiProductToProduct);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    console.log('[getFeaturedProducts] Fetching from:', ENDPOINTS.PRODUCTS.FEATURED);
    const response = await api.get<ApiProductListResponse>(ENDPOINTS.PRODUCTS.FEATURED);
    console.log('[getFeaturedProducts] Raw API response:', response);
    console.log('[getFeaturedProducts] Number of products:', response.results?.length || 0);

    if (!response.results || response.results.length === 0) {
      console.warn('[getFeaturedProducts] No featured products, trying fallback with filter');
      // Fallback: try main endpoint with featured=true filter
      const fallback = await api.get<ApiProductListResponse>(`${ENDPOINTS.PRODUCTS.LIST}?featured=true&limit=8`);
      if (fallback.results && fallback.results.length > 0) {
        return fallback.results.map(mapApiProductToProduct);
      }
      // Last resort: get first 8 products
      const lastResort = await api.get<ApiProductListResponse>(`${ENDPOINTS.PRODUCTS.LIST}?limit=8`);
      return lastResort.results.map(mapApiProductToProduct);
    }

    const products = response.results.map(mapApiProductToProduct);
    console.log('[getFeaturedProducts] Mapped products:', products);
    console.log('[getFeaturedProducts] First product images:', products[0]?.images);
    return products;
  } catch (error) {
    console.error('[getFeaturedProducts] Failed to fetch featured products:', error);
    return [];
  }
}

export async function getNewProducts(): Promise<Product[]> {
  try {
    console.log('[getNewProducts] Fetching from:', `${ENDPOINTS.PRODUCTS.LIST}?ordering=-created_at`);
    const response = await api.get<ApiProductListResponse>(`${ENDPOINTS.PRODUCTS.LIST}?ordering=-created_at`);
    console.log('[getNewProducts] Raw API response:', response);
    console.log('[getNewProducts] Number of products:', response.results?.length || 0);

    if (!response.results || response.results.length === 0) {
      console.warn('[getNewProducts] No products returned from API');
      return [];
    }

    const products = response.results.map(mapApiProductToProduct);
    console.log('[getNewProducts] Mapped products:', products);
    return products;
  } catch (error) {
    console.error('[getNewProducts] Failed to fetch new products:', error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  try {
    // Try explicit details endpoint
    const apiProduct = await api.get<ApiProduct>(ENDPOINTS.PRODUCTS.DETAILS(slug));
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