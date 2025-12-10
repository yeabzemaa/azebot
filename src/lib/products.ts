import { Product, FilterState } from './types';
import { productsData } from '@/data/products';

// Image mappings from Unsplash
const productImages: Record<string, string[]> = {
  'prod_001': ['https://images.unsplash.com/photo-1633980990916-74317cba1ea3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldGhpb3BpYW4lMjB0cmFkaXRpb25hbCUyMGRyZXNzJTIwd2hpdGV8ZW58MXx8fHwxNzY1Mjg0NTg4fDA&ixlib=rb-4.1.0&q=80&w=1080'],
  'prod_002': ['https://images.unsplash.com/photo-1741173826628-199d13c4914a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGNvdHRvbiUyMHNjYXJmfGVufDF8fHx8MTc2NTI4NDU4OHww&ixlib=rb-4.1.0&q=80&w=1080'],
  'prod_003': ['https://images.unsplash.com/photo-1565728769229-e6e5b989a824?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW5zJTIwbGluZW4lMjB0dW5pYyUyMGJlaWdlfGVufDF8fHx8MTc2NTI4NDU4OXww&ixlib=rb-4.1.0&q=80&w=1080'],
  'prod_004': ['https://images.unsplash.com/photo-1636357724570-a619b5f47be5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwd2hpdGUlMjBkcmVzc3xlbnwxfHx8fDE3NjUyODQ1ODl8MA&ixlib=rb-4.1.0&q=80&w=1080'],
  'prod_005': ['https://images.unsplash.com/photo-1762331974787-76476e26c7a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwY3Jvc3MlMjBwZW5kYW50JTIwamV3ZWxyeXxlbnwxfHx8fDE3NjUyODQ1ODl8MA&ixlib=rb-4.1.0&q=80&w=1080'],
  'prod_006': ['https://images.unsplash.com/photo-1598122666068-59b41e0a3193?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldGhpb3BpYW4lMjB0cmFkaXRpb25hbCUyMGNsb3RoaW5nfGVufDF8fHx8MTc2NTI4NDU5MXww&ixlib=rb-4.1.0&q=80&w=1080'],
  'prod_007': ['https://images.unsplash.com/photo-1565728769229-e6e5b989a824?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW5zJTIwbGluZW4lMjB0dW5pYyUyMGJlaWdlfGVufDF8fHx8MTc2NTI4NDU4OXww&ixlib=rb-4.1.0&q=80&w=1080'],
  'prod_008': ['https://images.unsplash.com/photo-1601330862030-1e08c703ac04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3ZlbiUyMGJhc2tldCUyMGJhZ3xlbnwxfHx8fDE3NjUyODQ1OTB8MA&ixlib=rb-4.1.0&q=80&w=1080'],
};

// Get all products with images
export function getAllProducts(): Product[] {
  const products = productsData.products.map(product => ({
    ...product,
    images: productImages[product.id] || [productImages['prod_001'][0]],
  }));
  return products;
}

// Get featured products
export function getFeaturedProducts(): Product[] {
  return getAllProducts().filter(product => product.featured);
}

// Get new arrivals
export function getNewProducts(): Product[] {
  return getAllProducts().filter(product => product.new);
}

// Get product by slug
export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find(product => product.slug === slug);
}

// Get product by ID
export function getProductById(id: string): Product | undefined {
  return getAllProducts().find(product => product.id === id);
}

// Filter products
export function filterProducts(filters: Partial<FilterState>): Product[] {
  let products = getAllProducts();

  if (filters.categories && filters.categories.length > 0) {
    products = products.filter(product =>
      filters.categories!.includes(product.category)
    );
  }

  if (filters.types && filters.types.length > 0) {
    products = products.filter(product =>
      filters.types!.includes(product.type)
    );
  }

  if (filters.priceRange) {
    const [min, max] = filters.priceRange;
    products = products.filter(product => {
      const price = product.salePrice || product.price;
      return price >= min && price <= max;
    });
  }

  if (filters.sizes && filters.sizes.length > 0) {
    products = products.filter(product =>
      product.sizes.some(size => filters.sizes!.includes(size))
    );
  }

  return products;
}

// Sort products
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

// Get related products
export function getRelatedProducts(productId: string, limit: number = 4): Product[] {
  const product = getProductById(productId);
  if (!product) return [];

  const allProducts = getAllProducts();
  const related = allProducts
    .filter(p => p.id !== productId && p.category === product.category)
    .slice(0, limit);

  return related;
}